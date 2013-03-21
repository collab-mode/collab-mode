(eval-when-compile (require 'cl))

(require 'xmlgen)

;; globals
(defvar infinoted-connections nil "Active connections to infinote servers")

;; connection (process-buffer) locals
(defvar infinoted-nodes nil "Nodes (documents and subdirectories) on a server")
(make-variable-buffer-local 'infinoted-nodes)
(defvar infinoted-sessions nil "Active infinoted sessions with a server")
(make-variable-buffer-local 'infinoted-sessions)

;; session (document-buffer) locals
(defvar infinoted-group-name nil "Session group for this document")
(make-variable-buffer-local 'infinoted-group-name)
(defvar infinoted-node-id nil "Node id of this document")
(make-variable-buffer-local 'infinoted-node-id)
(defvar infinoted-node-type nil "Node type of this document")
(make-variable-buffer-local 'infinoted-node-type)
(defvar infinoted-users nil "plist of (user-id <user-state-plist> ...)")
(make-variable-buffer-local 'infinoted-users)
(defvar infinoted-user-id nil "Local user's id for this document")
(make-variable-buffer-local 'infinoted-user-id)
(defvar infinoted-connection nil "Infinoted connection associated with this document")
(make-variable-buffer-local 'infinoted-connection)
(defvar infinoted-request-log nil "List of requests that have been applied to this document")
(make-variable-buffer-local 'infinoted-request-log)
(defvar infinoted-request-queue nil "List of requests waiting to be applied to this document")
(make-variable-buffer-local 'infinoted-request-queue)

(defun collab-infinoted-connect-to-server ()
  ;; Handle existing connections
  ;;  by saying they are already connected
  ;; New connection
  (let ((network-process (open-network-stream "infinoted-server-localhost" "*infinoted-server-localhost*" "localhost" 6523)))
    (setq infinoted-connections (cons network-process infinoted-connections))
    (set-process-filter network-process #'collab-infinoted-filter)
    (with-current-buffer (process-buffer network-process)
      (setq infinoted-group-name "InfDirectory")
      (setq infinoted-node-id 0)
      (setq infinoted-node-type "InfDirectory")
      (setq infinoted-sessions (list "InfDirectory" (current-buffer)))
      (setq infinoted-connection network-process)
      (collab-infinoted-send-stream-header "localhost"))))

(defun collab-infinoted-filter (network-process string)
  ;; a lot of the xml parsing trickiness is straight from jabber.el's xmpp filter
  (when (buffer-live-p (process-buffer network-process))
    (with-current-buffer (process-buffer network-process)
      ;; append new data to the buffer and set up for parsing
      (goto-char (process-mark network-process))
      (insert string)
      (set-marker (process-mark network-process) (point))
      (goto-char (point-min))

      (block message-loop
        (while (> (point-max) (point-min))
          (display-buffer (current-buffer))
          (sit-for 0.1)
          
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
            (return (collab-infinoted-close-stream SOMETHING)))

          (let ((beg (point))
                (xml-data))
            (ignore-errors (setq xml-data (xml-parse-tag-1))) ; an error means we don't have enough data yet, no biggie
            (if (not xml-data)
                (return-from message-loop)
              (delete-region beg (point)) ; remove the tag we just parsed
              (collab-infinoted-handle-stanza xml-data))))))))

(defun collab-infinoted-handle-stanza (xml-data)
  ;; TODO: error handling, including state errors
  (let ((tag (car xml-data))
        (attributes (cadr xml-data))
        (contents (cddr xml-data)))
    (case tag
              (stream:stream) ; assume the stream is fine and do nothing
              (stream:features
               (when (cddr xml-data)
                 (collab-infinoted-send-auth)))
              (challenge
               (collab-infinoted-send-sasl-response "joel"))
              (success
               (collab-infinoted-send-stream-header "localhost"))
              (group
               (collab-infinoted-handle-group-commands (assoc-default 'name attributes) contents)))))

(defun collab-infinoted-send-string (string)
  (process-send-string infinoted-connection string))

(defun collab-infinoted-send-xml (xml-data)
  (collab-infinoted-send-string (xmlgen xml-data)))

(defun collab-infinoted-send-group-command (xml-data &optional group-name) 
  (let ((group (or group-name infinoted-group-name)))
    (collab-infinoted-send-xml
     `(group :name ,group
             :publisher "you"
             ,xml-data))))

(defun collab-infinoted-send-auth ()
  (collab-infinoted-send-xml
   '(auth :xmlns "urn:ietf:params:xml:ns:xmpp-sasl"
          :mechanism "ANONYMOUS")))
  
(defun collab-infinoted-send-sasl-response (username)
  (collab-infinoted-send-xml
   `(response :xmlns "urn:ietf:params:xml:ns:xmpp-sasl"
              ,(base64-encode-string username))))

(defun collab-infinoted-send-stream-header (to)
  (collab-infinoted-send-string
   (replace-regexp-in-string ; xmpp stream tags aren't closed until we close the stream
    "/>" ">"
    (xmlgen `(stream:stream :version "1.0"
                            :xmlns "jabber:client"
                            :xmlns:stream "http://etherx.jabber.org/streams"
                            :to ,to)))))

(defun collab-infinoted-send-explore (node-id)
  (collab-infinoted-send-group-command
   `(explore-node :seq "0"
                  :id ,node-id)))

(defun collab-infinoted-send-subscribe-session (node-id)
  (collab-infinoted-send-group-command
   `(subscribe-session :seq "0"
                       :id ,node-id)))

(defun collab-infinoted-send-add-node (filename)
  (collab-infinoted-send-group-command
   `(add-node :seq "0"
              :parent "0"
              :type "InfText"
              :name ,filename
              (subscribe))))

(defun collab-infinoted-send-subscribe-ack (node-id)
  (collab-infinoted-send-group-command
   `(subscribe-ack :id ,node-id)))

(defun collab-infinoted-send-user-join (name group)
  (collab-infinoted-send-group-command
   `(user-join :seq "0"
               :name ,name
               :status "active"
               :time ""
               :caret "0"
               :hue "0.56")
   group))

(defun collab-infinoted-find-file (filename)
  (let ((existing-file (lax-plist-get infinoted-nodes filename)))
    (if existing-file
        (collab-infinoted-send-subscribe-session (plist-get existing-file 'id))
      (collab-infinoted-send-add-node filename))))

(defun collab-infinoted-create-session (name id group-name)
  (let ((network-process infinoted-connection) ; the new buffer inherits the current buffer's connection
        (new-buffer (generate-new-buffer name)))
    (with-current-buffer new-buffer
      (setq infinoted-group-name group-name)
      (setq infinoted-node-id id)
      (setq infinoted-node-type "InfText")
      (setq infinoted-connection network-process)
      (display-buffer (current-buffer)))
    (setq infinoted-sessions (plist-put infinoted-sessions group-name new-buffer))))

(defun collab-infinoted-user-join (name id vector hue caret selection status)
  (when (equal name "emacs-joel")
    (setq infinoted-user-id id))
  (setq infinoted-users (plist-put
                         infinoted-users
                         id
                         (list 'name name
                               'id id
                               'vector vector
                               'hue hue
                               'caret caret
                               'selection selection
                               'status status))))

(defun collab-infinoted-read-vector (vector-string)
  (mapcar #'string-to-number (split-string vector-string "[:;]" t)))

(defun collab-infinoted-xml-to-operation (operation-xml)
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
                               (let ((text (collab-infinoted-segment-xml-to-text contents)))
                                 (list operation pos (length text) text))))
      ((no-op undo undo-caret redo redo-caret) (list operation))
      (move (list operation caret selection)))))

(defun collab-infinoted-segment-xml-to-text (segment-xml)
  ;; TODO: mark this with author ids
  (apply #'concat (mapcar #'(lambda (segment) (if (listp segment) (caddr segment) segment)) segment-xml)))

(defun collab-infinoted-vector-includes (vector-1 vector-2)
  (loop
   for user-operation on vector-2 by #'cddr
   if (let ((user-id (car user-operation))
            (op-count (cadr user-operation)))
        (not (equal op-count
                    (collab-infinoted-operation-count user-id vector-1))))
   return nil
   finally return t))

(defun collab-infinoted-vector-equal (vector-1 vector-2)
  (and (collab-infinoted-vector-includes vector-1 vector-2)
       (collab-infinoted-vector-includes vector-2 vector-1)))

(defun collab-infinoted-diffed-vector (vector diff)
  (loop
   with new-vector = (copy-sequence vector)
   for prop on diff by #'cddr
   do
   (let ((user-id (car prop))
         (op-count (cadr prop)))
     (setq new-vector (plist-put new-vector
                                 user-id
                                 (+ op-count
                                    (collab-infinoted-operation-count user-id new-vector)))))
   finally return new-vector))

(defun collab-infinoted-diff-user-vector (user-id diff)
  (let* ((user-data (plist-get infinoted-users user-id))
         (vector (plist-get user-data 'vector)))
    (setq infinoted-users
          (plist-put infinoted-users
                     user-id
                     (plist-put user-data
                                'vector
                                (collab-infinoted-diffed-vector vector diff))))))

(defun collab-infinoted-increment-my-vector (user-id)
  (collab-infinoted-diff-user-vector infinoted-user-id (list user-id 1)))

(defun collab-infinoted-user-vector (user-id)
  (plist-get (plist-get infinoted-users user-id) 'vector))

(defun collab-infinoted-insert-segment (author-id text)
  ;; TODO: propertize with author
  (insert text))

(defun collab-infinoted-operation-count (user-id vector)
  (or (plist-get vector user-id) 0))

(defun collab-infinoted-nth-user-request-from-log (user-id n)
  (loop for request in infinoted-request-log
        if (and (equal (car request) user-id)
                (= (- n 1) (collab-infinoted-operation-count user-id (cadr request))))
        return request
        finally return nil))

(defun collab-infinoted-translatable-user (request-user-id request-vector target-vector)
  (loop for target-operation on target-vector by #'cddr
        if (let ((target-user-id (car target-operation))
                 (target-operation-count (cdr target-operation)))
             (and (/= target-user-id request-user-id)
                  (> target-operation-count (collab-infinoted-operation-count target-user-id request-vector))))
        return target-user-id
        finally return nil))

(defun collab-infinoted-closer-target-request (request-user-id request-vector target-vector)
  (let* ((translatable-user (collab-infinoted-translatable-user request-user-id request-vector target-vector))
         (translatable-request (collab-infinoted-nth-user-request-from-log
                                translatable-user
                                (collab-infinoted-operation-count translatable-user target-vector)))
         (translatable-vector (cadr translatable-request))
         (translatable-operation (caddr translatable-request))
         (closer-vector (collab-infinoted-diffed-vector target-vector (list translatable-user -1))))
    (list translatable-user closer-vector (collab-infinoted-translate-operation
                                           translatable-user
                                           translatable-vector
                                           closer-vector
                                           translatable-operation))))

(defun collab-infinoted-op-type (op)
  (cond
   ((member op '(delete delete-caret)) 'delete)
   ((member op '(insert insert-caret)) 'insert)
   ((member op '(undo undo-caret)) 'undo)
   ((member op '(redo redo-caret)) 'redo)))

(defun collab-infinoted-transform-operation (operation against-operation)
 "Get an operation transformed against another operation."
                                        ; TODO use the cid like py-infinote
  (pcase (list operation against-operation)
    (`((split ,operation-1 ,operation-2) ,against-operation)
     `(split ,(collab-infinoted-transform-operation operation-1 against-operation)
              ,(collab-infinoted-transform-operation operation-2 against-operation)))

    (`(,operation (split ,operation-1 ,operation-2))
     (collab-infinoted-transform-operation
      (collab-infinoted-transform-operation operation operation-1)
      (collab-infinoted-transform-operation operation-2 operation-1)))

    (`((,op-1 ,position-1 ,text-1) (,op-2 ,position-2 ,text-2))
     (let* ((length-1 (length text-1))
            (length-2 (length text-2))
            (end-1 (+ position-1 length-1))
            (end-2 (+ position-2 length-2)))
       (pcase (list (collab-infinoted-op-type op-1) (collab-infinoted-op-type op-2))
         (`(insert insert)
          (if (< position-1 position-2)
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
            (list op-1 position-1 text-1))
           ((<= position-2 position-1)
            (list op-1 (+ position-1 length-2) text-1))
           ((and (> position-2 position-1)
                 (< position-2 end-1))
            (infinote-split-operation operation (- position-2 position-1) length-2))))

         (`(delete delete)
          (cond
           ((<= end-1 position-2)
            (list op-1 position-1 text-1))
           ((>= position-1 end-2)
            (list op-1 (- position-1 length-2) text-1))
           ((>= position-1 position-2)
            (if (<= end-1 end-2)
                (list op-1 position-2 "")
              (list op-1 position-2 (substring text-1 (- end-2 position-1)))))
           ((< position-1 position-2)
            (if (<= end-1 end-2)
                (list op-1 position-1 (substring text-1 0 (- position-2 position-1)))
              (let* ((before-inner (substring text-1 0 (- position-2 position-1)))
                     (after-inner (substring text-1 (- end-2 position-1))))
                     (text-without-inner (concat before-inner after-inner)))
                (list op-1 position-1 text-without-inner))))))))))

(defun collab-infinoted-translate-operation (user-id request-vector target-vector operation)
  (if (collab-infinoted-vector-equal request-vector
                                     target-vector)
      operation
    (let ((closer-target-request (collab-infinoted-closer-target-request user-id request-vector target-vector)))
     (destructuring-bind (closer-target-user closer-target-vector closer-target-operation) closer-target-request
       (collab-infinoted-transform-operation
        (collab-infinoted-translate-operation user-id request-vector closer-target-vector operation)
        closer-target-operation)))))

(defun collab-infinoted-my-vector ()
  (plist-get (plist-get infinoted-users infinoted-user-id) 'vector))

(defun collab-infinoted-can-apply (vector onto-vector)
  (loop for user-operations on vector by #'cddr
        if (let ((user-id (car user-operations))
                 (operation-count (cadr user-operations)))
             (> operation-count (collab-infinoted-operation-count user-id onto-vector)))
        return nil
        finally return t))

(defun collab-infinoted-process-request-queue ()
  (let ((my-vector (collab-infinoted-my-vector)))
    (loop for request in infinoted-request-queue
          if (destructuring-bind (user-id vector operation) request
               (collab-infinoted-can-apply vector my-vector))
          do
          (setq infinoted-request-queue (remove request infinoted-request-queue))
          (apply #'collab-infinoted-handle-request request)
          and return nil)))

(defun collab-infinoted-affected-text (operation)
  (destructuring-bind (op pos len) operation
    (let ((start (+ pos 1))
          (end (+ pos 1 len)))
      (buffer-substring start end))))

(defun collab-infinoted-contextualize-delete (operation currently-applicable-operation)
  (destructuring-bind (op pos len) operation
    (list op pos len (collab-infinoted-affected-text currently-applicable-operation))))

(defun collab-infinoted-handle-request (user-id vector operation)
  (let ((request (list user-id vector operation)))
    (if syncing
        (progn (push request infinoted-request-log)
               (collab-infinoted-increment-my-vector user-id))
      (let ((op-type (collab-infinoted-op-type (car operation))))
        (when (member op-type '(insert delete))
          (let ((my-vector (collab-infinoted-my-vector)))
            (if (collab-infinoted-can-apply vector my-vector)
                (let ((translated-operation (collab-infinoted-translate-operation user-id vector my-vector operation)))
                  (when (equal op-type 'delete)
                    (setq request (list user-id vector (collab-infinoted-contextualize-delete operation translated-operation))))
                  (collab-infinoted-apply-operation user-id translated-operation)
                  (push request infinoted-request-log)
                  (collab-infinoted-increment-my-vector user-id)
                  (collab-infinoted-diff-user-vector user-id (list user-id 1))
                  (collab-infinoted-process-request-queue))
              (push request infinoted-request-queue))))))))

(defun collab-infinoted-apply-operation (user-id operation)
  (pcase operation
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
       (delete-region (+ 1 pos) (+ 1 pos len))))))

(defun collab-infinoted-node-from-id (id)
  (loop for node on infinoted-nodes by #'cddr
        if (equal id
                  (plist-get (cadr node) 'id))
        return (cadr node)
        finally return nil))

(defun collab-infinoted-handle-group-commands (group-name commands)
  (mapcar #'collab-infinoted-handle-group-command commands))

(defun collab-infinoted-handle-group-command (command-xml-data)
  (let ((command (car command-xml-data))
        (attributes (cadr command-xml-data))
        (contents (cddr command-xml-data))
        (session-buffer (lax-plist-get infinoted-sessions group-name)))
    (message (format "Got group %S command %S" group-name command-xml-data))
    (case command
              (welcome
               (collab-infinoted-send-explore 0))
              (explore-begin) ; not really needed
              (explore-end) ; not really needed
              (add-node
               ;; add node to file list
               (let ((id (string-to-number (assoc-default 'id attributes)))
                     (name (assoc-default 'name attributes))
                     (parent (string-to-number (assoc-default 'id attributes)))
                     (type (assoc-default 'type attributes)))
                 (setq infinoted-nodes
                       (plist-put infinoted-nodes
                                  name
                                  (list 'id id
                                        'parent parent
                                        'name name
                                        'type type)))
                 (let ((first-content-tag (car contents)))
                   (when (equal 'subscribe (car first-content-tag))
                     (let ((group (xml-get-attribute first-content-tag 'group)))
                       (collab-infinoted-create-session name id group)
                       (collab-infinoted-send-subscribe-ack id)
                       (collab-infinoted-send-user-join "emacs-joel" group))))))
              (sync-in
               ;; send document sync
               )
              (remove-node) ; not supported
              (subscribe-session
               ;; add session and ack
               (let* ((id (string-to-number (assoc-default 'id attributes)))
                      (name (plist-get (collab-infinoted-node-from-id id) 'name))
                      (group (assoc-default 'group attributes)))
                 (collab-infinoted-create-session name id group)
                 (collab-infinoted-send-subscribe-ack id)
                 (collab-infinoted-send-user-join "emacs-joel" group)))
              (subscribe-chat
               ;; add chat and ack
               )
              (sync-begin) ; not really needed
              (sync-end) ; not really needed
              (sync-segment
               ;; fill in buffer data
               (when session-buffer
                 (with-current-buffer session-buffer
                   (collab-infinoted-insert-segment (assoc-default 'author attributes) (car contents)))))
              ((user-join sync-user)
               ;; store user data
               (let ((name (assoc-default 'name attributes))
                     (id (string-to-number (assoc-default 'id attributes)))
                     (vector (collab-infinoted-read-vector (assoc-default 'time attributes)))
                     (hue (string-to-number (assoc-default 'hue attributes)))
                     (caret (string-to-number (assoc-default 'caret attributes)))
                     (selection (string-to-number (assoc-default 'selection attributes)))
                     (status (assoc-default 'status attributes))
                     (syncing (eq command 'sync-user)))
                 (when session-buffer
                   (with-current-buffer session-buffer
                     (collab-infinoted-user-join name id vector hue caret selection status)))))
              (user-rejoin
               ;; store user data
               )
              (session-close) ; not supported
              (user-status-change) ; not supported
              (sync-message) ; not supported
              (message) ; not supported
              ((request sync-request)
               (let ((user-id (string-to-number (assoc-default 'user attributes)))
                     (vector-diff (collab-infinoted-read-vector (assoc-default 'time attributes)))
                     (operation-xml (car contents))
                     (syncing (eq command 'sync-request)))
                 ;; pass request to handler
                 (when session-buffer
                   (with-current-buffer session-buffer
                     (unless syncing (collab-infinoted-diff-user-vector user-id vector-diff))
                     (let ((request-vector (if syncing vector-diff (collab-infinoted-user-vector user-id))))
                       (collab-infinoted-handle-request user-id request-vector (collab-infinoted-xml-to-operation operation-xml))))))))))

(defun collab-network-connect-to-server ()
 (when (boundp 'collab-server-process)
  (process-kill-without-query collab-server-process))
 (setq collab-server-process (open-network-stream "collab-server" "*collab-server*" "cobbal.com" 10068))
 (set-process-filter collab-server-process #'collab-network-receive-from-server))

(setq collab-server-input-buffer "")

(defun collab-network-receive-from-server (process data)
  ; TODO: Handle fragments
  (setq collab-server-input-buffer (concat collab-server-input-buffer data))
  (let ((messages (split-string collab-server-input-buffer "[\000]")))
    (while (> (length messages) 1)
     (message "%S" (read (car messages)))
     (pcase (read (car messages))
      (`(:infinote ,infinote-message)
       (with-demoted-errors (infinote-execute infinote-message)))
      (`(:chat ,chat-message)
       (error "to be implemented..."))
      (`(:cursor ,user ,cursor-loc)
       (collab-cursor-move-to-char cursor-loc))
      (`(:users . ,users)
       (setq collab-server-users users))
      (message (error "unknown server message: %S" message)))
     (setq messages (cdr messages)))
    (setq collab-server-input-buffer (mapconcat 'identity messages "\000"))))

(defun collab-network-send-to-server (request &optional command)
 (let ((message (concat (or command "<message>")
                 (let ((print-level nil) (print-length nil))
                  (prin1-to-string request)) "\000")))
  (message "%s" message)
  (process-send-string collab-server-process message)))

(provide 'network)
