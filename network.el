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
          (when (looking-at "<stream:stream[^>]*\\(>\\)")
            ;; make it a parsable tag
            (replace-match "/>" t t nil 1)))

        ;; stream close
        (when (looking-at "</stream:stream>")
          (return (collab-infinoted-close-stream SOMETHING)))

        (let ((beg (point))
              (xml-data))
          (ignore-errors (setq xml-data (xml-parse-tag))) ; an error means we don't have enough data yet, no biggie
          (if (not xml-data)
              (return)
            (delete-region beg (point)) ; remove the tag we just parsed
            (collab-infinoted-handle-stanza xml-data)))))))

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
  (concat (mapcar #'(lambda (segment) (if (listp segment) (caddr segment) segment)) segment-xml)))

(defun collab-infinoted-increment-vector (vector diff)
  (loop
   with new-vector = (copy-sequence vector)
   for prop on diff by #'cddr
   do
   (let ((user-id (car prop))
         (op-count (cadr prop)))
     (plist-put new-vector user-id (+ op-count
                                      (or (plist-get new-vector user-id)
                                          0))))
   finally return new-vector))

(defun collab-infinoted-increment-user-vector (user-id vector-diff)
  )

(defun collab-infinoted-handle-request (user-id operation)
  (pcase operation
    (`(insert-caret ,pos ,text)
     (progn
       (goto-char (+ 1 pos))
       (insert text)))))

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
               (let ((id (assoc-default 'id attributes))
                     (name (assoc-default 'name attributes)))
                 (setq infinoted-nodes
                       (plist-put infinoted-nodes
                                  name
                                  (assq-delete-all 'seq attributes)))
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
               (let ((name (assoc-default 'name attributes))
                     (id (assoc-default 'id attributes))
                     (group (assoc-default 'group attributes)))
                 (collab-infinoted-create-session name id group)
                 (collab-infinoted-send-subscribe-ack id)
                 (collab-infinoted-send-user-join "emacs-joel" group)))
              (subscribe-chat
               ;; add chat and ack
               )
              (sync-begin) ; not really needed
              (sync-end) ; not really needed
              (sync-user
               ;; store user data
               )
              (sync-segment
               ;; fill in buffer data
               )
              (sync-request
               ;; add requests to the log. dont apply them
               )
              (user-join
               ;; store user data
               (let ((name (assoc-default 'name attributes))
                     (id (assoc-default 'id attributes))
                     (vector (collab-infinoted-read-vector (assoc-default 'time attributes)))
                     (hue (string-to-number (assoc-default 'hue attributes)))
                     (caret (string-to-number (assoc-default 'caret attributes)))
                     (selection (string-to-number (assoc-default 'selection attributes)))
                     (status (assoc-default 'status attributes)))
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
              (request
               (let ((user-id (string-to-number (assoc-default 'user attributes)))
                     (vector-diff (collab-infinoted-read-vector (assoc-default 'time attributes)))
                     (operation-xml (car contents)))
                 ;; pass request to handler
                 (when session-buffer
                   (with-current-buffer session-buffer
                     (collab-infinoted-increment-user-vector user-id vector-diff)
                     (collab-infinoted-handle-request user-id (collab-infinoted-xml-to-operation operation-xml)))))))))

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
