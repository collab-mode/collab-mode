(require 'ewoc)
(require 'password-cache)
(require 'xmlgen)
(require 'collab-infinote)
(require 'collab-client-model)

(defvar collab-users-list nil)

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
  (setq tabulated-list-format [("" 11 t) ("Users" 18 t)])
  (setq tabulated-list-padding 2)
  (tabulated-list-init-header)
  (add-hook 'tabulated-list-revert-hook
	    (lambda ()
	      (setq tabulated-list-entries (collab-get-entries))
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
  (let ((entries '()))
    (dolist (user (collab-users))
      (add-to-list 'entries
		   (list
		    (cadr user) ;; tablulated ID
		    (vector
		     (collab-user-status user)
		     (cons (collab-user-text user)
			   `(face (:foreground ,(collab-user-color user) :underline t)
				  action collab-user-action))))))
    entries))

(defun collab-user-action (mark)
  (collab-invite-user (tabulated-list-get-id mark)))

(defun collab-user-status (user)
  (cond
   ((equal (car user) 'you) "(you)")
   ((equal (car user) 'collaborating) "(connected)")
   ((equal (car user) 'available) "●")
   ((equal (car user) 'offline) "○")
   (t "")))

(defun collab-user-text (user)
  "Returns user entry label with appropriate face and connection glyph."
  (cadr user))

(defun collab-user-color (user)
  "Returns USER's color."
  (caddr user))



(defun collab-pp (data)
  "Prints messages for ewoc."
  (insert data))

(defvar collab-point-insert nil
  "Position where the message being composed starts")

(defvar collab-chat-ewoc nil
  "The ewoc showing the messages of this chat buffer.")

(defvar collab-chat-keymap
  (let ((map (make-sparse-keymap)))
    (define-key map "\r" 'collab-chat-buffer-send)
    map)
  "The keymap for collab-chat-mode.")

(defun collab-chat ()
  "Creates collab-chat-mode window."
  (interactive)
  ;;(setq collab-point-insert nil)
  ;;(setq collab-chat-ewoc nil)
  (pop-to-buffer (get-buffer-create "chat"))
  (unless collab-chat-ewoc
    (setq collab-chat-ewoc
	  (ewoc-create 'collab-pp nil "---"))
    (goto-char (point-max))
    (put-text-property (point-min) (point) 'read-only t)
    (let ((inhibit-read-only t))
      (put-text-property (point-min) (point) 'front-sticky t)
      (put-text-property (point-min) (point) 'rear-nonsticky t))
    (setq collab-point-insert (point-marker)))
  (setq major-mode 'collab-chat-mode
	mode-name "collab-chat")
  (use-local-map collab-chat-keymap))

(defun collab-chat-buffer-send ()
  (interactive)
  (let ((body (delete-and-extract-region collab-point-insert (point-max))))
    (collab-chat-buffer-receive body (collab-self-username))
    (collab-mode-cm-send-chat body)))

(defun collab-chat-buffer-receive (msg username)
  (let* ((face (collab-mode-cm-chat-font-for-username username))
	 (user-text (propertize username 'face `(:underline t . ,face)))
	 (message-text (propertize msg 'face face)))
    (ewoc-enter-last collab-chat-ewoc
		     (concat user-text ": " message-text))))

(defun collab-login ()
  "Prompts for a username and password. Passes username and
password to COLLAB-MODE-CM-XMPP-LOGIN."
  (interactive)
  (collab-mode-cm-xmpp-login
   (read-from-minibuffer "Username: ")
   (password-read "Password: ")))

(provide 'collab-mode)
