(defun collab-mode ()
  "Starts collab-mode and opens users buffer."
  (interactive)
  (pop-to-buffer (get-buffer-create "users")))

(define-derived-mode collab-users-mode tabulated-list-mode "Users Mode"
  "Major mode for managing connections with users"
  (setq tabulated-list-format [("Users" 18 t)])
  (setq tabulated-list-padding 2)
  (tabulated-list-init-header))

(defun print-current-line-id ()
  (interactive)
  (message (concat "current line ID is: " (tabulated-list-get-id))))

(defun collab-list-users ()
  (interactive)
  (pop-to-buffer "*Users*" nil)
  (collab-users-mode)
  (setq tabulated-list-entries '(("1" ["User1"]) ("2" ["User2"])))
  (tabulated-list-print t))
