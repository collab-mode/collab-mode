(define-derived-mode collab-users-mode tabulated-list-mode "Users Mode"
  "Major mode for managing connections with users."
  ;; Width doesn't matter because there's only one column (so just set it to zero).
  (setq tabulated-list-format [("Users" 0 t)])
  ;; Adds two spaces to the left of the list.
  (setq tabulated-list-padding 2)
  (tabulated-list-init-header))

(defun collab-list-users ()
  "This is the function that is called by the user to bring up the users list."
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
      (setq entries (append entries (list (list user (vector (cons (collab-user-text user)
							  `(face (:foreground ,(collab-user-color user) :underline t)
								 action collab-connect-user button "blah"))))))))
    (print entries))) ;; @debug (print)

(defun collab-user-text (user)
  "Returns user entry label with appropriate connection glyph."
  (if (collab-user-connected user)
      (concat "● " user)
    (concat "○ " user)))

(defun collab-connect-user (user)
  "Attempts to connect USER."
  (if (string= "Jeff" (tabulated-list-get-id user))
      (if collab-jeff-connected
	  (setq collab-jeff-connected nil)
	(setq collab-jeff-connected 'true)))
  ;; Must re-set TABULATED-LIST-ENTRIES and call TABULATED-LIST-PRINT
  ;;  to update and re-display the table contents.
  (setq tabulated-list-entries (collab-get-entries))
  (tabulated-list-print)
  (print (tabulated-list-get-id user))) ;; @debug (print)

(setq collab-jeff-connected ()) ;; @debug

(defun collab-user-connected (user)
  "Returns whether USER is connected.
This is a temporary function. Actual function will be provided by the client."
  (if (string= "Jeff" user)
      collab-jeff-connected
    nil))

;; @debug
(defun test-jeff-connected ()
  (interactive)
  (print (collab-user-connected "Jeff")))

(defun collab-users ()
  "Returns a list of all available users.
This is a temporary function. Actual function will be provided by the client."
  (list "Andrew" "Joel" "Jeff"))

(defun collab-user-color (user)
  "Returns USER's color.
This is a temporary function. Actual function will be provided by the client."
  (if (string= "Jeff" user)
      "red"
    "blue"))
