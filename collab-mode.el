(let* ((fname (or load-file-name buffer-file-name))
       (dname (file-name-directory fname)))
 (load (expand-file-name "infinote.el" dname))
 (load (expand-file-name "network.el" dname))
 (load (expand-file-name "client-model.el" dname)))

(defun collab-mode (user-id)
  "Starts collab-mode and opens users buffer."
  (interactive "P")
  (collab-mode-cm-init (or user-id 0))
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
  (setq tabulated-list-entries '(("1" [("button1" . (action (lambda (arg) (message "blah"))))])
				 ("2" [("button2" . ())])))
  (tabulated-list-print t))
