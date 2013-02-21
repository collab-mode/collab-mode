(defun collab-network-connect-to-server ()
  (setq collab-server-process (open-network-stream "collab-server" "*collab-server*" "ec2.alcobb.com" 10068))
  (set-process-filter collab-server-process #'collab-network-receive-from-server))

(defun collab-network-receive-from-server (process data)
  ; TODO: Handle fragments
  (infinote-execute (read data)))

(defun collab-network-send-to-server (text)
  (process-send-string collab-server-process (concat "<message>" text)))

