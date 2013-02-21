(defun collab-network-connect-to-server ()
 (when (boundp 'collab-server-process)
  (process-kill-without-query collab-server-process))
 (setq collab-server-process (open-network-stream "collab-server" "*collab-server*" "ec2.alcobb.com" 10068))
 (set-process-filter collab-server-process #'collab-network-receive-from-server))

(setq collab-server-input-buffer "")

(defun collab-network-receive-from-server (process data)
  ; TODO: Handle fragments
  (setq collab-server-input-buffer (concat collab-server-input-buffer data))
  (let ((messages (split-string data "[\000]")))
    (when (> (length messages) 1)
      (infinote-execute (read (car messages)))
      (setq collab-server-input-buffer (mapconcat 'identity (cdr messages) "\000")))))

(defun collab-network-send-to-server (text)
  (process-send-string collab-server-process (concat "<message>" text "\000")))

(provide 'network)
