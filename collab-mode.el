(require 'ewoc)
(require 'password-cache)
(require 'collab-infinote)
(require 'collab-network)
(require 'collab-client-model)

(defvar collab-users-list nil)

(defun collab-cursor (user position)
  "Places a cursor for USER at POSITION with COLOR.
If POSITION is <= 1 then the overlay is deleted."
  (interactive)
  (setq color (or (collab-user-color
                   (collab-mode-cm-format-user
                    (collab-user-from-username user)))
               "#808080"))
  (if (< position 1)
      (when (assoc user collab-users-list)
	(progn
	  (delete-overlay (cdr (assoc user collab-users-list)))
          (setq collab-users-list
	    (delq (assoc user collab-users-list) collab-users-list))))
    (if (not (assoc user collab-users-list))
	(progn
	  (setq collab-users-list (append collab-users-list `(,(cons user (make-overlay position (+ position 1) (current-buffer) t)))))
	  (overlay-put (cdr (assoc user collab-users-list)) 'face `((foreground-color . "white") (background-color . ,color))))
      (move-overlay (cdr (assoc user collab-users-list)) position (+ position 1))
      (overlay-put (cdr (assoc user collab-users-list)) 'face `((foreground-color . "white") (background-color . ,color))))))

(defun collab-restrict-cursors-to-users (users)
 (mapc (lambda (u) (collab-cursor u 0))
  (remove-if (lambda (u) (member u users)) (mapcar #'car collab-users-list))))

(define-minor-mode collab-mode
 "collab-mode is a collaborative editing mode based on the infinote protocol"
 :lighter " collab-mode"
 (if collab-mode
  (progn
   (when (not (collab-mode-connected-p))
    (collab-connect))
   (collab-mode-cm-init-this-buffer))
  (collab-mode-cm-deinit-this-buffer)))

;; (defun collab-mode ()
;;   "Starts collab-mode and opens users buffer."
;;   (interactive)
;;   (collab-mode-cm-init))

(define-derived-mode collab-users-mode tabulated-list-mode "Users Mode"
  "Major mode for managing connections with users"
  (setq tabulated-list-format [("" 11 t) ("Users" 18 t)])
  (setq tabulated-list-padding 2)
  (tabulated-list-init-header)
  (add-hook 'tabulated-list-revert-hook
	    (lambda ()
	      (setq tabulated-list-entries (collab-get-entries))
	      (tabulated-list-print))))

(defun collab-list-users (&optional dont-change-selected)
 (interactive)
 (let* ((buffer (get-buffer-create "*Collab Users*"))
        (window (display-buffer buffer nil)))
  (with-current-buffer buffer
   (collab-users-mode)
   (setq tabulated-list-entries (collab-get-entries))
   (tabulated-list-print t))
  (if (not dont-change-selected)
   (select-window window))))


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
    (define-key map "\r" #'collab-chat-buffer-send)
    map)
  "The keymap for collab-chat-mode.")

(defun collab-chat ()
  "Creates collab-chat-mode window."
  (interactive)
  ;;(setq collab-point-insert nil)
  ;;(setq collab-chat-ewoc nil)
  (pop-to-buffer (get-buffer-create "*Collab Chat*"))
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

(defun collab-chat-buffer-receive (msg username &optional whisper)
  (let* ((face (collab-mode-cm-chat-font-for-username username))
	 (user-text (propertize
                     (concat
                      (if whisper "whisper from " "")
                      username)
                     'face `(:underline t . ,face)))
	 (message-text (propertize msg 'face face)))
    (ewoc-enter-last collab-chat-ewoc
		     (concat user-text ": " message-text))))

(defun collab-chat-system-message (msg)
  (let* ((text (propertize msg 'face '(:slant italic))))
   (ewoc-enter-last collab-chat-ewoc text)))

(defun collab-connect ()
 (interactive)
 (let* ((username-in (read-from-minibuffer "Google Talk username (or blank): "))
        (username (if (> (length username-in) 0)
                   username-in))
        (password (if username
                   (password-read "Password: "))))
  (collab-mode-cm-connect username password)))

(defun collab-insert-share-URL ()
 (interactive)
 (insert "http://collab-mode.com/collab-js?room=main"))

(provide 'collab-mode)
