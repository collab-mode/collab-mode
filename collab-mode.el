(defun collab-mode ()
  "Starts collab-mode and opens users buffer."
  (interactive)
  (pop-to-buffer (get-buffer-create "users")))

(define-derived-mode collab-users-mode tabulated-list-mode "Users Mode"
  "Major mode for managing connections with users"
  (setq tabulated-list-format [("Users" 18 t)])
  (setq tabulated-list-padding 2)
  (tabulated-list-init-header))

(defun collab-list-users ()
  (interactive)
  (pop-to-buffer "*Users*" nil)
  (collab-users-mode)
  (setq tabulated-list-entries (collab-get-entries))
  (tabulated-list-print t))

(defun collab-get-entries ()
  "Returns the tabulated-list-entries argument for listing users. It gets the list of
users, checks which are connected, and returns the appropriate list of entries."
  (list '("1" [("● user1" . (action (lambda (arg) (message "blah"))))])
    '("2" [("○ user2" . (face (:foreground "red" :underline t) ))])))
