(when nil
;; eval the following form to load collab-mode
 (let* ((fname (or load-file-name buffer-file-name))
        (dname (file-name-directory fname)))
  (load (expand-file-name "collab-mode.el" dname))
  (load (expand-file-name "infinote.el" dname))
  (load (expand-file-name "network.el" dname))
  (load (expand-file-name "client-model.el" dname))
  (load (expand-file-name "collab-cursor.el" dname))
  )

)

(setq collab-users-list)

(defun collab-cursor (user position)
  "Places a cursor for USER at POSITION with COLOR.
If POSITION is <= 1 then the overlay is deleted."
  (interactive)
  (setq color (collab-user-color user))
  (if (< position 1)
      (when (assoc user collab-users-list)
	(progn
	  (delete-overlay (cdr (assoc user collab-users-list)))
	  (assq-delete-all user collab-users-list)))
    (if (not (assoc user collab-users-list))
	(progn
	  (setq collab-users-list (append collab-users-list `(,(cons user (make-overlay position (+ position 1) (current-buffer) t)))))
	  (overlay-put (cdr (assoc user collab-users-list)) 'face `((foreground-color . "white") (background-color . ,color))))
      (move-overlay (cdr (assoc user collab-users-list)) position (+ position 1))
      (overlay-put (cdr (assoc user collab-users-list)) 'face `((foreground-color . "white") (background-color . ,color))))))


(defun collab-mode (user-id)
  "Starts collab-mode and opens users buffer."
  (interactive "P")
  (collab-mode-cm-init (or user-id 0)))

(define-derived-mode collab-users-mode tabulated-list-mode "Users Mode"
  "Major mode for managing connections with users"
  (setq tabulated-list-format [("Users" 18 t)])
  (setq tabulated-list-padding 2)
  (tabulated-list-init-header)
  (add-hook 'tabulated-list-revert-hook (lambda () (setq tabulated-list-entries (collab-get-entries))
					  (tabulated-list-print))))

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
 (concat
  (if (car user) "● " "○ ")
  (cadr user)))

;; (defun collab-user-connected (user)
;;   "Returns whether USER is connected."
;;   (if (string= "Jeff" user)
;;       'true
;;     nil))

;; (defun collab-users ()
;;   "Returns a list of all available users."
;;   (list "Andrew" "Joel" "Jeff"))

(defun collab-user-color (user)
  "Returns USER's color."
  (caddr user))
