;;; -*- lexical-binding: t -*-
;;
;; collab-mode
;; client-model.el
;;

(require 'cl)

(defvar collab-mode-cm-applying-changes nil
 "Internal variable used to keep track of which changes collab-mode is making,
so it doesn't rebroadcast itself into an infinite loop")
(defvar collab-mode-cm-updating-infinote nil)
(defvar collab-mode-cm-network-connection nil)
(defvar collab-mode-cm-buffer nil "The buffer")
(defvar collab-mode-cm-last-cursor-pos nil "Last transmitted cursor position")
(defvar collab-mode-cached-self-user nil)
(defvar collab-mode-cm-XMPP-username nil "XMPP username we're logged in as or nil")
(defvar collab-mode-cm-last-attempted-login nil "Last XMPP username we tried to log in as")
(defvar collab-server-friends '())
(defvar collab-server-users '())
(defvar collab-server-main-users '())
(defvar collab-server-rooms '())

(defun collab-mode-cm-update-room-list ()
 (interactive)
 (collab-network-send-to-server nil "<list rooms>"))

(defun collab-mode-cm-update-user-list ()
 (interactive)
 (collab-network-send-to-server nil "<list addr>")
 (collab-network-send-to-server nil "<list main addr>"))

(defun collab-mode-cm-update-friend-list ()
 (interactive)
 (when (collab-mode-connected-p)
  (when collab-mode-cm-XMPP-username
   (collab-network-send-to-server nil "<xmpp friends>"))
  (collab-network-send-to-server nil "<list main addr>")))

(defun collab-mode-cm-connect (username password)
 (setq collab-mode-cm-network-connection
  (collab-mode-network-connect))
 (setq collab-mode-cm-should-finish-login-after-users t)
 (collab-list-users)
 (if (and username password)
  (collab-mode-cm-xmpp-login username password)
  (collab-mode-cm-post-login)))

(defun collab-mode-cm-post-login ()
 (setq infinote-user-name (collab-self-username))
 (setq infinote-hue (collab-mode-cm-hue-for-user (collab-self-user)))
 (assert infinote-user-name)
 (assert infinote-hue)
 ;;(message "post-login, uname = %S, hue = %S" infinote-user-name infinote-hue)
 (infinote-connect-to-server))

(defun collab-mode-cm-xmpp-login (username password)
 "Perform XMPP login with provided username and password"
 (setq collab-mode-cm-last-attempted-login username)
 (collab-network-send-string-to-server nil
  (concat "<xmpp connect>" username " " password))
 (collab-mode-cm-update-user-list))

(defun collab-mode-cm-rgb-to-color (r g b)
 ;;(format "#%02x%02x%02x" r g b)
 ;; err, it used to be rgb anyway...
 (infinote-hue-to-color (/ r 255.0) 0.7 1.0))

(defun collab-mode-cm-color-for-user (user)
 (pcase user
  (`(,num ,ip ,port ,username ,r ,g ,b . ,_)
   (collab-mode-cm-rgb-to-color r g b))))

(defun collab-mode-cm-hue-for-user (user)
 (pcase user
  (`(,num ,ip ,port ,username ,r ,g ,b . ,_)
   (/ r 255.0))))

(defun collab-mode-cm-user-in-room (user)
 (member (collab-username-from-user user)
  (mapcar #'collab-username-from-user collab-server-users)))

(defun collab-mode-cm-format-user (user)
 (pcase user
  ;; Server user
  (`(,num ,ip ,port ,username ,r ,g ,b . ,_)
   (list
    (cond
     ((equal username (collab-self-username)) 'you)
     ((collab-mode-cm-user-in-room user) 'collaborating)
     (t 'not-collaborating))
    username
    (collab-mode-cm-rgb-to-color r g b)))
  ;; Friend list user
  (`(,num ,username ,status)
   (list
    (if (equal status "offline")
     'offline
     'available)
    username
    "black"))))

(defun collab-server-friends-minus-server-users ()
 (loop for friend in collab-server-friends
  if (or
      (not (collab-user-from-username (cadr friend)))
      (not (equal (caddr friend) "offline")))
  collect friend))

(defun collab-merged-users ()
 "lists all the collab users in both main and the current room"
 (remove-duplicates
  (append collab-server-users collab-server-main-users)
  :key #'collab-username-from-user
  :test #'equal
  :from-end t))

(defun collab-user-status-order (status)
 (case status
  (you 0)
  (collaborating 1)
  (not-collaborating 2)
  (available 3)
  (offline 4)
  (t 5)))

(defun collab-users ()
 (sort
  (mapcar #'collab-mode-cm-format-user
   (append (collab-merged-users) (collab-server-friends-minus-server-users)))
  (lambda (a b)
   (let ((status-a (collab-user-status-order (car a)))
         (status-b (collab-user-status-order (car b))))
    (cond
     ((= status-a status-b)
      (not (string< (cadr a) (cadr b))))
     (t (> status-a status-b)))))))

(defun collab-user-from-username (username)
 (loop for user in (collab-merged-users)
  if (equal (collab-username-from-user user) username)
  return user))

(defun collab-username-from-user (user)
 (cadddr user))

(defun collab-self-user ()
 (let ((current-you (loop for user in (collab-merged-users)
                     if (equal (last user) '(:you))
                     return user)))
  (when current-you
   (setq collab-mode-cached-self-user current-you))
  collab-mode-cached-self-user))

(defun collab-self-username ()
 (collab-username-from-user (collab-self-user)))

(defun collab-mode-cm-chat-font-for-username (username)
 (append
  (if (equal username (collab-self-username))
   '(:weight bold)
   '())
  `(:foreground
    ,(collab-mode-cm-color-for-user
      (collab-user-from-username username)))))

(defun string/starts-with (s arg)
 "returns non-nil if string S starts with ARG.  Else nil."
 (cond ((>= (length s) (length arg))
        (string-equal (substring s 0 (length arg)) arg))
  (t nil)))

(defun string/ends-with (s ending)
      "return non-nil if string S ends with ENDING."
      (let ((elength (length ending)))
        (string= (substring s (- 0 elength)) ending)))

(defun collab-friends-matching-prefix (prefix)
 (loop for friend in collab-server-friends
  if (and
      (string/starts-with (cadr friend) prefix)
      (not (equal (caddr friend) "offline")))
  collect (cadr friend)))

(defun collab-mode-cm-send-chat (msg)
 (let* ((split (split-string msg ":"))
        (prefix (car split)))
  (if (cdr split)
   (let ((possible-targets
          (collab-friends-matching-prefix prefix)))
    (pcase (length possible-targets)
     (`0 (collab-chat-system-message
          (format "no user starting with \"%s\" found." prefix))
      nil)
     (`1 (collab-network-send-string-to-server
         (format "%s %s"
          (car possible-targets)
          (mapconcat #'identity (cdr split) ":"))
         "<xmpp chat>")
      t)
     (n (collab-chat-system-message
         (format (concat "%s users starting with \"%s\" found,"
			 " please be more specific.")
		 n prefix)))))
   (collab-network-send-to-server
    `(:chat ,(collab-self-username) ,msg))
   t)))

(defun collab-mode-cm-revert-user-list-buffer ()
 (let ((buffer (get-buffer "*Collab Users*")))
  (when buffer
   ;; workaround for a bug where revert scrolls another window
   (let* ((window (selected-window))
          (start (window-start window)))
    (with-current-buffer buffer
     (revert-buffer t t t))
    (set-window-start window start)))))

(defvar collab-mode-cm-should-finish-login-after-users nil)
(defun collab-mode-cm-new-users-received (users)
 (collab-self-user) ;; call this so that it can be re-cached if needed
 (setq collab-server-users users)
 (collab-restrict-cursors-to-users
  (mapcar #'collab-username-from-user collab-server-users))
 (collab-mode-cm-revert-user-list-buffer)
 (when collab-mode-cm-should-finish-login-after-users
  (setq collab-mode-cm-should-finish-login-after-users nil)
  (collab-mode-cm-post-login)))

(defun collab-mode-cm-new-main-users-received (users)
 (setq collab-server-main-users users)
 (collab-mode-cm-revert-user-list-buffer))

(defun collab-mode-cm-new-friends-received (friends)
 (setq collab-server-friends friends)
 (collab-mode-cm-revert-user-list-buffer))

(defun collab-mode-cm-new-rooms-received (rooms)
 (setq collab-server-rooms rooms))

(defun collab-mode-cm-current-room ()
 (loop for room in collab-server-rooms
  if (equal (last room) '(:self-room))
  return (cadr room)
  finally return "main"))

(defvar collab-mode-cm-timers '())
(defun collab-mode-cm-kill-timers ()
 (mapc #'cancel-timer collab-mode-cm-timers)
 (setq collab-mode-cm-timers '()))

(defun collab-mode-cm-login-status-changed (logged-in)
 (if logged-in
  (setq collab-mode-cm-XMPP-username collab-mode-cm-last-attempted-login)
  (setq collab-mode-cm-XMPP-username nil))

 (collab-mode-cm-kill-timers)
 (add-to-list 'collab-mode-cm-timers (run-at-time 3 nil #'collab-mode-cm-update-friend-list))
 (add-to-list 'collab-mode-cm-timers (run-at-time t 5 #'collab-mode-cm-update-friend-list))

 (setq collab-mode-cm-should-finish-login-after-users t)
 (collab-mode-cm-update-user-list))

(defun collab-mode-cm-post-change-hook ()
 "send a cursor update if changed"
 (let ((cursor-pos (point)))
  (unless (equal cursor-pos collab-mode-cm-last-cursor-pos)
   (setq collab-mode-cm-last-cursor-pos cursor-pos)
   (collab-network-send-to-server
    `(:cursor ,(collab-username-from-user (collab-self-user)) ,cursor-pos)))))

(defun collab-mode-cm-switch-to-room (room)
 (collab-network-send-string-to-server room "<create room>")
 (collab-network-send-string-to-server room "<join room>")
 (collab-mode-cm-update-room-list))

(defun collab-invite-user (user)
 (collab-network-send-string-to-server user "<invite>"))

(defun collab-mode-cm-invite-received (room)
 (infinote-find-file room))

(defun collab-mode-cm-init-this-buffer ()
 "Initialization for the client model"
 (when (buffer-live-p collab-mode-cm-buffer)
  (with-current-buffer collab-mode-cm-buffer
   (collab-mode 0)))
 (setq collab-mode-cm-buffer (current-buffer))
 (setq collab-mode-cm-text-to-be-changed "")
 (add-hook 'post-command-hook #'collab-mode-cm-post-change-hook nil t)
 (if (not infinote-mode)
  (infinote-share-this-file))
 (when infinote-file-name
  (collab-mode-cm-switch-to-room infinote-file-name)))

(defun collab-mode-cm-deinit-this-buffer ()
 (remove-hook 'post-command-hook #'collab-mode-cm-post-change-hook t)
 (collab-mode-cm-kill-timers)
 (infinote-deinit-this-buffer)
 (collab-mode-cm-switch-to-room "main"))

(defun collab-mode-connected-p ()
 (when (boundp 'collab-server-process)
  (process-live-p collab-server-process)))

(defun collab-mode-network-connect ()
 (setq collab-server-users '())
 (setq collab-server-friends '())
 (setq collab-server-rooms '())
 (collab-network-connect-to-server)
 (collab-mode-cm-update-user-list)
 `(opaque-network-object ,(current-buffer)))

(provide 'collab-client-model)
