(defvar collab-network-verbose nil "Set to t to see all messages")

(defun collab-network-connect-to-server ()
 (when (boundp 'collab-server-process)
  (delete-process collab-server-process))
 (setq collab-server-process (open-network-stream "collab-server" "*collab-server*" "cobbal.com" 10068))
 (set-process-filter collab-server-process #'collab-network-receive-from-server))

(setq collab-server-input-buffer "")

(defun collab-network-receive-from-server (process data)
  ; TODO: Handle fragments
  (setq collab-server-input-buffer (concat collab-server-input-buffer data))
  (let ((messages (split-string collab-server-input-buffer "[\000]")))
    (while (> (length messages) 1)
     (let ((msg (read (car messages))))
      (when collab-network-verbose (message "%S" msg))
      (setq messages (cdr messages))
      (setq collab-server-input-buffer
       (mapconcat 'identity messages "\000"))
      (pcase msg
       (`(:infinote ,infinote-message)
        (with-demoted-errors (infinote-execute infinote-message)))
       (`(:cursor ,user ,cursor-loc)
        (with-current-buffer collab-mode-cm-buffer
         (collab-cursor
          (collab-mode-cm-format-user (collab-user-from-username user))
          cursor-loc)))
       (`(:users . ,users)
        (collab-mode-cm-new-users-received users))
       (`(:xmppfriends . ,friends)
        (collab-mode-cm-new-friends-received friends))
       (`(:invite ,room)
        (collab-mode-cm-invite-received room))
       (`(:rooms . ,rooms)
        (collab-mode-cm-new-rooms-received rooms))
       (`(:chat ,from-username ,msg)
        (collab-chat-buffer-receive msg from-username))

       ;; TODO: change server messages for these
       (`connected
        (message "Login successful")
        (collab-mode-cm-login-status-changed t))
       (`could
        (message "Login failed")
        (collab-mode-cm-login-status-changed nil))

       (`room nil) ;; ignore

       (`(:error . ,_) nil)

       (msg (error "unknown server message: %S" msg)))))))

(defun collab-network-send-to-server (request &optional command)
 (collab-network-send-string-to-server
  (let ((print-level nil) (print-length nil))
   (prin1-to-string request))
  command))


(defun collab-network-send-string-to-server (request &optional command)
 (let ((msg (concat (or command "<message>") request "\000")))
  (when collab-network-verbose (message "%s" msg))
  (process-send-string collab-server-process msg)))

(provide 'collab-network)
