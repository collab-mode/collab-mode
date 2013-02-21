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
  (list '(nil [("● user1" . (action (lambda (arg) (message "blah"))))])
    '(nil [("○ user2" . (face (:foreground "red" :underline t)))])))

(defun collab-test-get-entries ()
  "Test building list for collab-get-entries"
  (interactive)
  (let ((entries '(nil)))
    (dolist (user (collab-users))
      (nconc entries (list
		      (list nil (vector (cons (user-text user) "blah"))))))
    (print (cdr entries))))

(defun user-text (user)
  "Returns user entry label with appropriate face and connection glyph."
  (if (user-connected user)
      (concat "● " user)
    (concat "○ " user)))

(defun user-connected (user)
  "Returns whether USER is connected."
  (if (string= "Jeff" user)
      'true
    nil))

(defun collab-users ()
  "Returns a list of all available users."
  (list "Andrew" "Joel" "Jeff"))
