(defun collab-mode ()
  "Starts collab-mode and opens users buffer."
  (interactive)
  (pop-to-buffer (get-buffer-create "users")))