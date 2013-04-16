(eval-when-compile (require 'cl))

(load-file "xml.el")
(load-file "xmlgen.el")

(defgroup infinote nil
  "infinote"
  :group 'communication)

(defcustom infinote-server "irc.joelhough.com"
  "infinote server"
  :group 'infinote
  :type 'string)

(defcustom infinote-port 6523
  "infinote port"
  :group 'infinote
  :type 'integer)

(defcustom infinote-user-name (user-full-name)
  "User name"
  :group 'infinote
  :type 'string)

(defcustom infinote-hue (random* 1.0)
  "Your hue [0.0-1.0]"
  :group 'infinote
  :type 'float)

;; globals
(defvar infinote-connection nil "Active connection to infinote server")
(defvar infinote-connection-buffer nil "Process buffer for connection to server")
(defvar infinote-connection-ready nil "non-nil when the connection auth'd and handshook")
(defvar infinote-verbose nil "Print debug messages")

;; connection (process-buffer) locals
(defvar infinote-nodes nil "Nodes (documents and subdirectories) on a server")
(make-variable-buffer-local 'infinote-nodes)
(defvar infinote-sessions nil "Active infinote sessions with a server")
(make-variable-buffer-local 'infinote-sessions)

;; session (document-buffer) locals
(defvar infinote-group-name nil "Session group for this document")
(make-variable-buffer-local 'infinote-group-name)
(defvar infinote-node-id nil "Node id of this document")
(make-variable-buffer-local 'infinote-node-id)
(defvar infinote-node-type nil "Node type of this document")
(make-variable-buffer-local 'infinote-node-type)
(defvar infinote-users nil "plist of (user-id <user-state-plist> ...)")
(make-variable-buffer-local 'infinote-users)
(defvar infinote-user-id nil "Local user's id for this document")
(make-variable-buffer-local 'infinote-user-id)
(defvar infinote-request-log nil "List of requests that have been applied to this document")
(make-variable-buffer-local 'infinote-request-log)
(defvar infinote-request-queue nil "List of requests waiting to be applied to this document")
(make-variable-buffer-local 'infinote-request-queue)
(defvar infinote-my-last-sent-vector nil "The vector as of the last outgoing request")
(make-variable-buffer-local 'infinote-my-last-sent-vector)
(defvar infinote-inhibit-change-hooks nil "Inhibits the hooks that generate Infinote changes")
(make-variable-buffer-local 'infinote-inhibit-change-hooks)
(defvar infinote-before-change-text nil "Text about to be changed by a local edit")
(make-variable-buffer-local 'infinote-text-before-change)
(defvar infinote-syncing nil "In the process of syncing this document")
(make-variable-buffer-local 'infinote-syncing)

(define-minor-mode infinote-mode
  "infinote"
  :lighter " Infinote"
  (if infinote-mode
      (progn
        (unless infinote-connection (infinote-connect-to-server))
        (unless infinote-node-id
          (let ((name (buffer-name)))
          (with-current-buffer (process-buffer infinote-connection)
            (infinote-send-add-node name))))
        ;; (unless infinote-chat-buffer (infinote-join-chat))
        ;; (unless infinote-users-buffer (infinote-create-users-buffer))
        
        (add-hook 'before-change-functions #'infinote-before-change nil t)
        (add-hook 'after-change-functions #'infinote-after-change nil t)
        (add-hook 'post-command-hook #'infinote-post-command nil t)
        (add-hook 'kill-buffer-hook #'infinote-close-session nil t))
    (remove-hook 'before-change-functions #'infinote-before-change t)
    (remove-hook 'after-change-functions #'infinote-after-change t)
    (remove-hook 'post-command-hook #'infinote-post-command t)
    (remove-hook 'kill-buffer-hook #'infinote-close-session t)
    (infinote-close-session)))

(defun infinote-find-file (filename)
  (interactive "sInfinote file: ")
  (unless infinote-connection (infinote-connect-to-server))
  (with-current-buffer (process-buffer infinote-connection)
    (let ((existing-file (lax-plist-get infinote-nodes filename)))
      (if existing-file
          (infinote-send-subscribe-session (lax-plist-get existing-file 'id))
        (infinote-send-add-node filename)))))

(defun infinote-before-change (start end)
  (unless infinote-inhibit-change-hooks
    (setq infinote-before-change-text (buffer-substring-no-properties start end))))

(defun infinote-after-change (start end previous-length)
  (unless infinote-inhibit-change-hooks
    (let ((insert-text (buffer-substring-no-properties start end))
          (changed? (> previous-length 0))
          (inserted? (> end start)))
      (assert (>= end start))
      (when changed?
        (infinote-local-delete start infinote-before-change-text))
      (when inserted?
        (infinote-local-insert start insert-text)))))

(defun infinote-post-command ()
  )

(defun infinote-close-session ()
  (when (buffer-live-p infinote-connection-buffer)
    (when infinote-connection
      (ignore-errors (infinote-send-session-unsubscribe)))
    (let ((group-name infinote-group-name))
      (with-current-buffer infinote-connection-buffer
        (setq infinote-sessions (lax-plist-put infinote-sessions group-name nil)))))
  (setq infinote-group-name nil)
  (setq infinote-node-id nil)
  (setq infinote-node-type nil)
  (setq infinote-users nil)
  (setq infinote-user-id nil)
  (setq infinote-request-log nil)
  (setq infinote-request-queue nil)
  (setq infinote-my-last-sent-vector nil)
  (setq infinote-inhibit-change-hooks nil)
  (setq infinote-before-change-text nil)
  (setq infinote-syncing nil))

(defun infinote-server-buffer-killed ()
  (when (eq (current-buffer)
            infinote-connection-buffer)
    (setq infinote-connection nil)
    (setq infinote-connection-ready nil)
    ;; un-infinote any open session buffers
    ))

(defun infinote-connect-to-server ()
  (unless infinote-connection
    (let* ((connection-name (format "*infinote-server-%s:%d*" infinote-server infinote-port))
           (network-process (open-network-stream connection-name connection-name infinote-server infinote-port)))
      (setq infinote-connection network-process)
      (set-process-filter network-process #'infinote-filter)
      (with-current-buffer (process-buffer network-process)
        (add-hook 'kill-buffer-hook #'infinote-server-buffer-killed nil t)
        (setq infinote-connection-buffer (current-buffer))
        (setq infinote-group-name "InfDirectory")
        (setq infinote-node-id 0)
        (setq infinote-node-type "InfDirectory")
        (setq infinote-sessions (list "InfDirectory" (current-buffer)))
        (infinote-send-stream-header infinote-server)
        (infinote-wait-for-connection)
        ))))

(defun infinote-wait-for-connection ()
  (while (and infinote-connection
              (not infinote-connection-ready))
    (accept-process-output infinote-connection 1.0)))

(defun infinote-filter (network-process string)
  ;; a lot of the xml parsing trickiness is straight from jabber.el's xmpp filter
  (when (buffer-live-p (process-buffer network-process))
    (with-current-buffer (process-buffer network-process)
      ;; append new data to the buffer and set up for parsing
      (goto-char (point-max))
      (insert string)
      (goto-char (point-min))

      (block message-loop
        (while (> (point-max) (point-min))
          ;; delete anything that isn't a tag opening. mainly worried about whitespace
          (delete-region (point) (progn (skip-chars-forward "^<") (point)))

          ;; xmpp opens a stream tag that remains open for the duration of the communication,
          ;; which means that we have to handle the stream header and stream close separately
          ;; from our normal xml parsing. we can parse the tags by making them valid tags.
          ;; the stream close has nothing of interest to parse

          ;; stream header
          (save-excursion
            (when (looking-at "<stream:stream[^>]*[^/]\\(>\\)")
              ;; make it a parsable tag
              (replace-match "/>" t t nil 1)))

          ;; stream close
          (when (looking-at "</stream:stream>")
            (kill-buffer)
            (return-from message-loop))

          (let ((beg (point))
                xml-data)
            (ignore-errors (setq xml-data (xml-parse-tag-1))) ; an error means we don't have enough data yet, no biggie
            (if (not xml-data)
                (return-from message-loop)
              (delete-region beg (point)) ; remove the tag we just parsed
              (infinote-handle-stanza xml-data))))))))

(defun infinote-handle-stanza (xml-data)
  ;; TODO: error handling, including state errors
  (let ((tag (car xml-data))
        (attributes (cadr xml-data))
        (contents (cddr xml-data)))
    (case tag
              (stream:stream) ; assume the stream is fine and do nothing
              (stream:error
               (kill-buffer infinote-connection-buffer)
               (error (format "stream error: %s" contents)))
              (stream:features
               (when (cddr xml-data)
                 (infinote-send-auth)))
              (challenge
               (infinote-send-sasl-response infinote-user-name))
              (success
               (infinote-send-stream-header infinote-server))
              (group
               (infinote-handle-group-commands (assoc-default 'name attributes) contents)))))

(defun infinote-send-string (string)
  (assert infinote-connection)
  (process-send-string infinote-connection string))

(defun infinote-send-xml (xml-data)
  (infinote-send-string (xmlgen xml-data)))

(defun infinote-send-group-command (xml-data &optional group-name) 
  (let ((group (or group-name infinote-group-name)))
    (infinote-send-xml
     `(group :name ,group
             :publisher "you"
             ,xml-data))))

(defun infinote-send-request (xml-data)
  (infinote-send-group-command
   `(request :user ,infinote-user-id
             :time ,(infinote-vector-to-string (infinote-diff-since-last-sent-vector))
             ,xml-data)))

(defun infinote-send-auth ()
  (infinote-send-xml
   '(auth :xmlns "urn:ietf:params:xml:ns:xmpp-sasl"
          :mechanism "ANONYMOUS")))
  
(defun infinote-send-sasl-response (username)
  (infinote-send-xml
   `(response :xmlns "urn:ietf:params:xml:ns:xmpp-sasl"
              ,(base64-encode-string username))))

(defun infinote-send-stream-header (to)
  (infinote-send-string
   (replace-regexp-in-string ; xmpp stream tags aren't closed until we close the stream
    "/>" ">"
    (xmlgen `(stream:stream :version "1.0"
                            :xmlns "jabber:client"
                            :xmlns:stream "http://etherx.jabber.org/streams"
                            :to ,to)))))

(defun infinote-send-explore (node-id)
  (infinote-send-group-command
   `(explore-node :seq "0"
                  :id ,node-id)))

(defun infinote-send-subscribe-session (node-id)
  (infinote-send-group-command
   `(subscribe-session :seq "0"
                       :id ,node-id)))

(defun infinote-send-session-unsubscribe ()
  (infinote-send-group-command
   '(session-unsubscribe)))

(defun infinote-send-add-node (filename)
  (infinote-send-group-command
   `(add-node :seq "0"
              :parent "0"
              :type "InfText"
              :name ,filename
              (subscribe))))

(defun infinote-send-subscribe-ack (node-id)
  (infinote-send-group-command
   `(subscribe-ack :id ,node-id)))

(defun infinote-send-sync-ack ()
  (infinote-send-group-command
   `(sync-ack)))

(defun infinote-send-user-join (name group)
  (infinote-send-group-command
   `(user-join :seq "0"
               :name ,name
               :status "active"
               :time ,(infinote-vector-to-string (infinote-my-vector))
               :caret "0"
               :hue ,infinote-hue)
   group))

(defun infinote-send-insert (pos text)
  (infinote-send-request
   `(insert-caret :pos ,pos
                  ,text)))

(defun infinote-send-delete (pos len)
  (infinote-send-request
   `(delete-caret :pos ,pos
                  :len ,len)))

(defun infinote-local-insert (pos text)
  (let ((pos (- pos 1)))
    (infinote-send-insert pos text)
    (push (list infinote-user-id
                (infinote-my-vector)
                (list 'insert-caret pos text))
          infinote-request-log)
    (infinote-increment-my-vector infinote-user-id)
    (setq infinote-my-last-sent-vector (infinote-my-vector))))

(defun infinote-local-delete (pos text)
  (let ((pos (- pos 1)))
    (infinote-send-delete pos (length text))
    (push (list infinote-user-id
                (infinote-my-vector)
                (list 'delete-caret pos text))
          infinote-request-log) 
    (infinote-increment-my-vector infinote-user-id)
    (setq infinote-my-last-sent-vector (infinote-my-vector))))

(defun infinote-diff-since-last-sent-vector ()
  (infinote-vector-subtract (infinote-my-vector) infinote-my-last-sent-vector))

(defun infinote-vector-to-string (vector)
  (mapconcat
   #'identity
   (loop for user-operation on vector by #'cddr
         unless (zerop (cadr user-operation))
         collect (let ((user-id (car user-operation))
                       (operation-count (cadr user-operation)))
                   (format "%d:%d"
                           (car user-operation)
                           (cadr user-operation)))
         into vector-strings
         finally return vector-strings)
   ";"))

(defun infinote-create-session (name id group-name)
  (let ((new-buffer (get-buffer name)))
    (when (or (not new-buffer)
              (not (buffer-local-value 'infinote-mode new-buffer))
              (buffer-local-value 'infinote-node-id new-buffer))
      (setq new-buffer (generate-new-buffer name)))
    (with-current-buffer new-buffer
      (setq infinote-group-name group-name)
      (setq infinote-node-id id)
      (setq infinote-node-type "InfText")
      (unless infinote-mode (infinote-mode))
      (display-buffer (current-buffer)))
    (setq infinote-sessions (lax-plist-put infinote-sessions group-name new-buffer))))

(defun infinote-user-join (name id vector hue caret selection status)
  (setq infinote-users (lax-plist-put
                         infinote-users
                         id
                         (list 'name name
                               'id id
                               'vector (if (and syncing (equal name infinote-user-name)) nil vector)
                               'hue hue
                               'caret caret
                               'selection selection
                               'status status)))
  (when (equal name infinote-user-name)
    (setq infinote-user-id id)
    (unless (or infinote-syncing
                (= (point-min) (point-max)))
      (infinote-local-insert 1 (buffer-substring-no-properties (point-min) (point-max))))
    (setq infinote-syncing nil)))

(defun infinote-read-vector (vector-string)
  (mapcar #'string-to-number (split-string vector-string "[:;]" t)))

(defun infinote-xml-to-operation (operation-xml)
  (let* ((operation (car operation-xml))
         (attributes (cadr operation-xml))
         (contents (cddr operation-xml))
         (pos-string (assoc-default 'pos attributes))
         (len-string (assoc-default 'len attributes))
         (caret-string (assoc-default 'caret attributes))
         (selection-string (assoc-default 'selection attributes))
         (pos (and pos-string (string-to-number pos-string)))
         (len (and len-string (string-to-number len-string)))
         (caret (and caret-string (string-to-number caret-string)))
         (selection (and selection-string (string-to-number selection-string))))
    (case operation
      ((insert insert-caret) (let ((text (car contents)))
                               (list operation pos text)))
      ((delete delete-caret) (if len
                                 (list operation pos len)
                               (let ((text (infinote-segment-xml-to-text contents)))
                                 (list operation pos (length text) text))))
      ((no-op undo undo-caret redo redo-caret) (list operation))
      (move (list operation caret selection)))))

(defun infinote-segment-xml-to-text (segment-xml)
  ;; TODO: mark this with author ids
  (apply #'concat (mapcar #'(lambda (segment) (if (listp segment) (caddr segment) segment)) segment-xml)))

(defun infinote-vector-includes (vector-1 vector-2)
  (loop
   for user-operation on vector-2 by #'cddr
   if (let ((user-id (car user-operation))
            (op-count (cadr user-operation)))
        (not (equal op-count
                    (infinote-operation-count user-id vector-1))))
   return nil
   finally return t))

(defun infinote-vector-equal (vector-1 vector-2)
  (and (infinote-vector-includes vector-1 vector-2)
       (infinote-vector-includes vector-2 vector-1)))

(defun infinote-vector-subtract (vector-1 vector-2)
  (loop
   with new-vector = (copy-sequence vector-1)
   for prop on vector-2 by #'cddr
   do
   (let ((user-id (car prop))
         (op-count (cadr prop)))
     (setq new-vector (lax-plist-put new-vector
                                 user-id
                                 (- (infinote-operation-count user-id new-vector)
                                    op-count))))
   finally return new-vector))

(defun infinote-diffed-vector (vector diff)
  (loop
   with new-vector = (copy-sequence vector)
   for prop on diff by #'cddr
   do
   (let ((user-id (car prop))
         (op-count (cadr prop)))
     (setq new-vector (lax-plist-put new-vector
                                 user-id
                                 (+ op-count
                                    (infinote-operation-count user-id new-vector)))))
   finally return new-vector))

(defun infinote-vector-least-common-successor (vector-1 vector-2)
  (loop
   with new-vector = (copy-sequence vector-1)
   for prop on vector-2 by #'cddr
   do
   (let ((user-id (car prop))
         (op-count (cadr prop)))
     (setq new-vector (lax-plist-put new-vector
                                 user-id
                                 (max (infinote-operation-count user-id new-vector)
                                      op-count))))
   finally return new-vector))

(defun infinote-diff-user-vector (user-id diff)
  (let* ((user-data (lax-plist-get infinote-users user-id))
         (vector (lax-plist-get user-data 'vector)))
    (setq infinote-users
          (lax-plist-put infinote-users
                     user-id
                     (lax-plist-put user-data
                                'vector
                                (infinote-diffed-vector vector diff))))))

(defun infinote-increment-my-vector (user-id)
  (infinote-diff-user-vector infinote-user-id (list user-id 1)))

(defun infinote-user-vector (user-id)
  (lax-plist-get (lax-plist-get infinote-users user-id) 'vector))

(defun infinote-get-user-data (user-id field)
  (lax-plist-get (lax-plist-get infinote-users user-id) field))

(defun infinote-set-user-data (user-id field value)
  (let ((user-data (lax-plist-get infinote-users user-id)))
    (setq infinote-users
          (lax-plist-put infinote-users
                     user-id
                     (lax-plist-put user-data field value)))))

(defun infinote-insert-segment (author-id text)
  (let ((infinote-inhibit-change-hooks t))
    ;; TODO: propertize with author
    (insert text)))

(defun infinote-operation-count (user-id vector)
  (or (lax-plist-get vector user-id) 0))

(defun infinote-nth-user-request-from-log (user-id n)
  (loop for request in infinote-request-log
        if (and (equal (car request) user-id)
                (= (- n 1) (infinote-operation-count user-id (cadr request))))
        return request
        finally return nil))

(defun infinote-translatable-user (request-user-id request-vector target-vector)
  (loop for target-operation on target-vector by #'cddr
        if (let ((target-user-id (car target-operation))
                 (target-operation-count (cadr target-operation)))
             (and (/= target-user-id request-user-id)
                  (> target-operation-count (infinote-operation-count target-user-id request-vector))))
        return (car target-operation)
        finally return nil))

(defun infinote-closer-target-request (request-user-id request-vector target-vector)
  (let* ((translatable-user (infinote-translatable-user request-user-id request-vector target-vector))
         (translatable-request (infinote-nth-user-request-from-log
                                translatable-user
                                (infinote-operation-count translatable-user target-vector)))
         (translatable-vector (cadr translatable-request))
         (translatable-operation (caddr translatable-request))
         (closer-vector (infinote-diffed-vector target-vector (list translatable-user -1))))
    (list translatable-user closer-vector (infinote-translate-operation
                                           translatable-user
                                           translatable-vector
                                           closer-vector
                                           translatable-operation))))

(defun infinote-op-type (op)
  (cond
   ((member op '(split)) 'split)
   ((member op '(delete delete-caret)) 'delete)
   ((member op '(insert insert-caret)) 'insert)
   ((member op '(undo undo-caret)) 'undo)
   ((member op '(redo redo-caret)) 'redo)))

(defun infinote-transform-operation (operation against-operation cid-is-op)
 "Get an operation transformed against another operation."
  (pcase (list operation against-operation)
    (`((split ,operation-1 ,operation-2) ,against-operation)
     `(split ,(infinote-transform-operation operation-1 against-operation cid-is-op)
              ,(infinote-transform-operation operation-2 against-operation cid-is-op)))

    (`(,operation (split ,operation-1 ,operation-2))
     (infinote-transform-operation
      (infinote-transform-operation operation operation-1 cid-is-op)
      (infinote-transform-operation operation-2 operation-1 cid-is-op)
      cid-is-op))

    (`((,op-1 ,position-1 ,text-or-length-1) (,op-2 ,position-2 ,text-or-length-2))
     (let* ((text-1 (and (stringp text-or-length-1) text-or-length-1))
            (text-2 (and (stringp text-or-length-2) text-or-length-2))
            (length-1 (or (and text-1 (length text-1)) text-or-length-1))
            (length-2 (or (and text-2 (length text-2)) text-or-length-2))
            (end-1 (+ position-1 length-1))
            (end-2 (+ position-2 length-2)))
       (pcase (list (infinote-op-type op-1) (infinote-op-type op-2))
         (`(insert insert)
          (if (or (< position-1 position-2) (and (= position-1 position-2) (not cid-is-op)))
              (list op-1 position-1 text-1)
            (list op-1 (+ position-1 length-2) text-1)))

         (`(insert delete)
          (cond
           ((>= position-1 end-2)
            (list op-1 (- position-1 length-2) text-1))
           ((< position-1 position-2)
            (list op-1 position-1 text-1))
           (t
            (list op-1 position-2 text-1))))

         (`(delete insert)
          (cond
           ((>= position-2 end-1)
            (list op-1 position-1 length-1))
           ((<= position-2 position-1)
            (list op-1 (+ position-1 length-2) length-1))
           ((and (> position-2 position-1)
                 (< position-2 end-1))
            (infinote-split-operation operation (- position-2 position-1) length-2))))

         (`(delete delete)
          (cond
           ((<= end-1 position-2)
            (list op-1 position-1 length-1))
           ((>= position-1 end-2)
            (list op-1 (- position-1 length-2) length-1))
           ((>= position-1 position-2)
            (if (<= end-1 end-2)
                (list op-1 position-2 0)
              (list op-1 position-2 (- end-1 end-2))))
           ((< position-1 position-2)
            (if (<= end-1 end-2)
                (list op-1 position-1 (- position-2 position-1))
              (list op-1 position-1 (- length-1 length-2)))))))))))

(defun infinote-split-operation (operation split-at space)
  (let ((op (car operation))
        (pos (cadr operation))
        (length (caddr operation)))
    (list 'split (list 'delete pos split-at) (list 'delete (+ split-at space) (- length split-at)))))

(defun infinote-translate-operation (user-id request-vector target-vector operation)
  (if (infinote-vector-equal request-vector
                                     target-vector)
      operation
    (let ((closer-target-request (infinote-closer-target-request user-id request-vector target-vector)))
     (destructuring-bind (closer-target-user closer-target-vector closer-target-operation) closer-target-request
       (let ((translated-operation (infinote-translate-operation user-id request-vector closer-target-vector operation)))
       (infinote-transform-operation
        translated-operation
        closer-target-operation
        (infinote-cid-is-op user-id request-vector translated-operation closer-target-user closer-target-vector closer-target-operation)))))))

(defun infinote-cid-is-op (user vector operation against-user against-vector against-operation)
  (let ((op-1 (infinote-op-type (car operation)))
        (op-2 (infinote-op-type (car against-operation))))
    (if (not (member op-1 '(insert split)))
        t
      (if (and (equal op-1 'insert)
               (member op-2 '(insert delete))
               (/= (cadr operation) (cadr against-operation)))
          (> (cadr operation) (cadr against-operation))
        (< user against-user)))))


(defun infinote-my-vector ()
  (lax-plist-get (lax-plist-get infinote-users infinote-user-id) 'vector))

(defun infinote-can-apply (vector onto-vector)
  (loop for user-operations on vector by #'cddr
        if (let ((user-id (car user-operations))
                 (operation-count (cadr user-operations)))
             (> operation-count (infinote-operation-count user-id onto-vector)))
        return nil
        finally return t))

(defun infinote-process-request-queue ()
  (let ((my-vector (infinote-my-vector)))
    (loop for request in infinote-request-queue
          if (destructuring-bind (user-id vector operation) request
               (infinote-can-apply vector my-vector))
          do
          (setq infinote-request-queue (remove request infinote-request-queue))
          (apply #'infinote-handle-request request)
          and return nil)))

(defun infinote-affected-text (operation)
  (destructuring-bind (op pos len) operation
    (let ((start (+ pos 1))
          (end (+ pos 1 len)))
      (buffer-substring-no-properties start end))))

(defun infinote-contextualize-delete (operation currently-applicable-operation)
  (destructuring-bind (op pos len) operation
    (list op pos (infinote-affected-text currently-applicable-operation))))

(defun infinote-handle-request (user-id vector operation)
  (let ((request (list user-id vector operation)))
    (if syncing
        (progn
          (push request infinote-request-log)
          (infinote-increment-my-vector user-id))
      (let ((op-type (infinote-op-type (car operation))))
        (when (member op-type '(insert delete))
          (let ((my-vector (infinote-my-vector)))
            (if (infinote-can-apply vector my-vector)
                (let ((translated-operation (infinote-translate-operation user-id vector my-vector operation)))
                  ;(when (equal op-type 'delete)
                  ;  (setq request (list user-id vector (infinote-contextualize-delete operation translated-operation))))
                  (infinote-apply-operation user-id translated-operation)
                  (push request infinote-request-log)
                  (infinote-increment-my-vector user-id)
                  (infinote-diff-user-vector user-id (list user-id 1))
                  (infinote-process-request-queue))
              (push request infinote-request-queue))))))))

(defun infinote-apply-operation (user-id operation)
  (let ((infinote-inhibit-change-hooks t))
    (pcase operation
      (`(split ,operation-1 ,operation-2)
       (infinote-apply-operation user-id operation-1)
       (infinote-apply-operation user-id
                                 (infinote-transform-operation operation-2 operation-1 t)))
      (`(insert ,pos ,text)
       (save-excursion
         (goto-char (+ 1 pos))
         (insert text)))
      (`(insert-caret ,pos ,text)
       (save-excursion
         (goto-char (+ 1 pos))
         (insert text)))
      (`(delete ,pos ,len)
       (save-excursion
         (delete-region (+ 1 pos) (+ 1 pos len))))
      (`(delete-caret ,pos ,len)
       (save-excursion
         (delete-region (+ 1 pos) (+ 1 pos len)))))))

(defun infinote-node-from-id (id)
  (loop for node on infinote-nodes by #'cddr
        if (equal id
                  (lax-plist-get (cadr node) 'id))
        return (cadr node)
        finally return nil))

(defun infinote-handle-group-commands (group-name commands)
  (mapcar #'infinote-handle-group-command commands))

(defun infinote-handle-group-command (command-xml-data)
  (let ((command (car command-xml-data))
        (attributes (cadr command-xml-data))
        (contents (cddr command-xml-data))
        (session-buffer (lax-plist-get infinote-sessions group-name)))
    (when infinote-verbose (message (format "Got group %S command %S" group-name command-xml-data)))
    (case command
              (welcome
               (infinote-send-explore 0))
              (explore-begin) ; not really needed
              (explore-end ; not really needed
               (setq infinote-connection-ready t))
              (add-node
               ;; add node to file list
               (let ((id (string-to-number (assoc-default 'id attributes)))
                     (name (assoc-default 'name attributes))
                     (parent (string-to-number (assoc-default 'id attributes)))
                     (type (assoc-default 'type attributes)))
                 (setq infinote-nodes
                       (lax-plist-put infinote-nodes
                                  name
                                  (list 'id id
                                        'parent parent
                                        'name name
                                        'type type)))
                 (let ((first-content-tag (car contents)))
                   (when (equal 'subscribe (car first-content-tag))
                     (let ((group (assoc-default 'group (cadr first-content-tag))))
                       (infinote-create-session name id group)
                       (infinote-send-subscribe-ack id)
                       (infinote-send-user-join infinote-user-name group)
                       (setq infinote-my-last-sent-vector (infinote-my-vector)))))))
              (sync-in
               ;; send document sync
               )
              (remove-node) ; not supported
              (subscribe-session
               ;; add session and ack
               (let* ((id (string-to-number (assoc-default 'id attributes)))
                      (name (lax-plist-get (infinote-node-from-id id) 'name))
                      (group (assoc-default 'group attributes)))
                 (infinote-create-session name id group)
                 (infinote-send-subscribe-ack id)))
              (subscribe-chat
               ;; add chat and ack
               )
              (sync-begin
               (when session-buffer
                 (with-current-buffer session-buffer
                   (setq infinote-syncing t))))
              (sync-end
               (when infinote-verbose (message (format "Session buffer %S" session-buffer)))
               (when session-buffer
                 (with-current-buffer session-buffer
                   (infinote-send-sync-ack)
                   (infinote-send-user-join infinote-user-name group-name)
                   (setq infinote-my-last-sent-vector (infinote-my-vector))))) 
              (sync-segment
               ;; fill in buffer data
               (when session-buffer
                 (with-current-buffer session-buffer
                   (infinote-insert-segment (assoc-default 'author attributes) (car contents)))))
              ((user-join sync-user)
               ;; store user data
               (let ((name (assoc-default 'name attributes))
                     (id (string-to-number (assoc-default 'id attributes)))
                     (vector (infinote-read-vector (assoc-default 'time attributes)))
                     (hue (string-to-number (assoc-default 'hue attributes)))
                     (caret (string-to-number (assoc-default 'caret attributes)))
                     (selection (string-to-number (assoc-default 'selection attributes)))
                     (status (assoc-default 'status attributes))
                     (syncing (eq command 'sync-user)))
                 (when session-buffer
                   (with-current-buffer session-buffer
                     (infinote-user-join name id vector hue caret selection status)))))
              (user-rejoin
               ;; store user data
               )
              (session-close) ; not supported
              (user-status-change) ; not supported
              (sync-message) ; not supported
              (message) ; not supported
              ((request sync-request)
               (let ((user-id (string-to-number (assoc-default 'user attributes)))
                     (vector-diff (infinote-read-vector (assoc-default 'time attributes)))
                     (operation-xml (car contents))
                     (syncing (eq command 'sync-request)))
                 ;; pass request to handler
                 (when session-buffer
                   (with-current-buffer session-buffer
                     (unless syncing (infinote-diff-user-vector user-id vector-diff))
                     (let ((request-vector (if syncing vector-diff (infinote-user-vector user-id))))
                       (infinote-handle-request user-id request-vector (infinote-xml-to-operation operation-xml))))))))))

(defun infinote-test-session ()
  (with-current-buffer (get-buffer-create " *test-results*")
    (show-buffer nil (current-buffer))
    (let ((test-files (directory-files "test" nil "\.xml$"))
          (results-buffer (current-buffer))
          (actual "")
          (expected ""))
      (loop for test-file in test-files
            do (insert (format "%s %s\n" test-file (if (infinote-test-session-from-file (concat "test/" test-file))
                   "passed!"
                 (format "failed! expected: %s\ngot: %s" expected actual))))))))

(defun infinote-test-xml-from-file (filename)
  (remove-if #'stringp (car (xml-parse-file filename))))

(defun infinote-test-run-command-from-xml-data (xml-data)  
  (let ((tag (car xml-data))
        (attributes (cadr xml-data))
        (contents (remove-if #'stringp (cddr xml-data))))
    (message (format "%s %s %s" tag attributes contents))
    (cond
     ((equal 'user tag)
      (infinote-test-add-user (string-to-number (assoc-default 'id attributes))))
     ((equal 'initial-buffer tag)
      (infinote-test-initial-buffer contents))
     ((equal 'request tag)
      (infinote-test-request (infinote-read-vector (assoc-default 'time attributes))
                             (string-to-number (assoc-default 'user attributes))
                             (infinote-xml-to-operation (car contents))))
     ((equal 'final-buffer tag)
      (infinote-test-final-buffer contents)))))

(defun infinote-test-run-commands-from-xml-data (xml-data)
  (car (last (mapcar #'infinote-test-run-command-from-xml-data (cddr xml-data)))))

(defun infinote-test-session-from-file (filename)
  (let ((xml-data (infinote-test-xml-from-file filename)))
    (with-temp-buffer
      (setq syncing nil)
      (infinote-test-run-commands-from-xml-data xml-data))))

(defun infinote-test-segments-to-string (segments)
  (message (format "%s" segments))
  (mapconcat #'caddr (remove-if #'stringp segments) ""))

(defun infinote-test-add-user (id)
  (infinote-user-join (format "user-%d" id) id (infinote-read-vector "") (random* 1.0) 0 0 "test"))

(defun infinote-test-initial-buffer (segments)
  (insert (infinote-test-segments-to-string segments)))

(defun infinote-test-request (time user operation)
  (infinote-diff-user-vector user time)
  (infinote-handle-request user (infinote-user-vector user) operation))

(defun infinote-test-final-buffer (segments)
  (setq expected (infinote-test-segments-to-string segments))
  (setq actual (buffer-string))
  (equal expected actual))

