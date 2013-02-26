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
  (interactive)
  (let ()
    (setq entries)
    (dolist (user (collab-users))
      (setq entries
	    (append entries (list (list nil (vector (cons (collab-user-text user)
							  `(face (:foreground ,(collab-user-color user) :underline t)))))))))
    (print entries)))

(defun collab-user-text (user)
  "Returns user entry label with appropriate face and connection glyph."
  (if (collab-user-connected user)
      (concat "● " user)
    (concat "○ " user)))

(defun collab-user-connected (user)
  "Returns whether USER is connected."
  (if (string= "Jeff" user)
      'true
    nil))

(defun collab-users ()
  "Returns a list of all available users."
  (list "Andrew" "Joel" "Jeff"))

(defun collab-user-color (user)
  "Returns USER's color."
  (if (string= "Jeff" user)
      "red"
    "blue"))
