(require 'cl)

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
      (message "%S" msg)
      (setq messages (cdr messages))
      (setq collab-server-input-buffer
       (mapconcat 'identity messages "\000"))
      (pcase msg
       (`(:infinote ,infinote-message)
        (with-demoted-errors (infinote-execute infinote-message)))
       (`(:chat ,chat-message)
        (error "to be implemented..."))
       (`(:cursor ,user ,cursor-loc)
        (with-current-buffer collab-mode-cm-buffer
         (collab-cursor
          (collab-mode-cm-format-user (collab-user-from-username user))
          cursor-loc)))
       (`(:users . ,users)
        (collab-mode-cm-new-users-received users))
       (`(:rooms . ,rooms)
        (serq collab-server-rooms rooms))
       ;; TODO: change server messages for these
       (`connected (message "Login successful"))
       (`could (message "Login failed"))
       (msg (error "unknown server message: %S" msg)))))))

(defun collab-network-send-to-server (request &optional command)
 (collab-network-send-string-to-server
  (let ((print-level nil) (print-length nil))
   (prin1-to-string request))
  command))


(defun collab-network-send-string-to-server (request &optional command)
 (let ((message (concat (or command "<message>") request "\000")))
  (message "%s" message)
  (process-send-string collab-server-process message)))

(provide 'network)
