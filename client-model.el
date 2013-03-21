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

(defun collab-mode-cm-update-user-list ()
 (interactive)
 (when collab-mode-cm-XMPP-username
  (collab-network-send-to-server nil "<list addr>")))

(defun collab-mode-cm-update-friend-list ()
 (interactive)
 (collab-network-send-to-server nil "<xmpp friends>"))

(defun collab-mode-cm-xmpp-login (username password)
 "Perform XMPP login with provided username and password"
 (setq collab-mode-cm-last-attempted-login username)
 (collab-network-send-string-to-server nil
  (concat "<xmpp connect>" username " " password))
 (collab-mode-cm-update-user-list))

(defun collab-mode-cm-rgb-to-color (r g b)
 (format "#%02x%02x%02x" r g b))

(defun collab-mode-cm-color-for-user (user)
 (pcase user
  (`(,num ,ip ,port ,username ,r ,g ,b . ,_)
   (collab-mode-cm-rgb-to-color r g b))))

(defun collab-mode-cm-format-user (user)
 (pcase user
  ;; Server user
  (`(,num ,ip ,port ,username ,r ,g ,b . ,_)
   (list
    (cond
     ((equal username (collab-self-username)) 'you)
     (t 'collaborating))
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
  if (not (collab-user-from-username (cadr friend)))
  collect friend))

(defun collab-users ()
 (mapcar #'collab-mode-cm-format-user
  (append collab-server-users (collab-server-friends-minus-server-users))))

(defun collab-user-from-username (username)
 (loop for user in collab-server-users
  if (equal (collab-username-from-user user) username)
  return user))

(defun collab-username-from-user (user)
 (cadddr user))

(defun collab-self-user ()
 (let ((current-you (loop for user in collab-server-users
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

(defun collab-mode-cm-send-chat (msg)
 (collab-network-send-to-server
  `(:chat ,(collab-self-username) ,msg)))

(defun collab-mode-cm-new-users-received (users)
 (collab-self-user) ;; call this so that it can be re-cached if needed
 (setq collab-server-users users)
 (let ((buffer (get-buffer "*Users*")))
  (when buffer
   (with-current-buffer buffer
    (revert-buffer t t t)))))

(defun collab-mode-cm-new-friends-received (friends)
 (setq collab-server-friends friends)
 (let ((buffer (get-buffer "*Users*")))
  (when buffer
   (with-current-buffer buffer
    (revert-buffer t t t)))))

(defun collab-mode-cm-login-status-changed (logged-in)
 (if logged-in
  (progn
   (setq collab-mode-cm-XMPP-username collab-mode-cm-last-attempted-login)
   (run-at-time 3 nil #'collab-mode-cm-update-friend-list)
   (run-at-time t 5 #'collab-mode-cm-update-friend-list))
  (setq collab-mode-cm-XMPP-username nil)))

(defun font-for-user (user)
 `(:box ,(if (= user 0) "firebrick" "dodger blue")))

(defun collab-mode-cm-insert (string location)
 "inserts STRING into current buffer at LOCATION"
 (with-current-buffer collab-mode-cm-buffer
  (when (not collab-mode-cm-updating-infinote)
   (let ((collab-mode-cm-applying-changes t))
    (save-excursion
     (goto-char location)
     (insert (propertize string 'font-lock-face (font-for-user (- 1 infinote-user)))))))))

(defun collab-mode-cm-delete (start end)
 "removes text in current buffer from START to END"
 (with-current-buffer collab-mode-cm-buffer
  (when (not collab-mode-cm-updating-infinote)
   (let ((collab-mode-cm-applying-changes t))
    (delete-region start end)))))

(defun collab-mode-cm-post-change-hook ()
 "send a cursor update if changed"
 (let ((cursor-pos (point)))
  (unless (equal cursor-pos collab-mode-cm-last-cursor-pos)
   (setq collab-mode-cm-last-cursor-pos cursor-pos)
   (collab-network-send-to-server
    `(:cursor ,(collab-username-from-user (collab-self-user)) ,cursor-pos)))))

(defun collab-mode-cm-before-change-hook (start end)
 "save string for region about to be deleted"
 (setq collab-mode-cm-text-to-be-changed
  (buffer-substring-no-properties start end)))

(defun collab-mode-cm-after-change-hook (start end previous-length)
 "handler for hook that the buffer just changed"
 (when (not collab-mode-cm-applying-changes)
  (put-text-property start end 'font-lock-face (font-for-user infinote-user))
  (let ((collab-mode-cm-updating-infinote t))
   (when (/= previous-length 0)
    (collab-mode-network-post-delete
     collab-mode-cm-network-connection
     start collab-mode-cm-text-to-be-changed))
   (when (/= start end)
    (collab-mode-network-post-insert
     collab-mode-cm-network-connection
     start (buffer-substring-no-properties start end)))))
 (setq collab-mode-cm-text-to-be-changed ""))

(defun collab-invite-user (user)
 (message "{%s}" user))

(defun collab-mode-cm-init (user-id)
 "Initialization for the client model
TBD: how many times is this called, and in what contexts"
 (setq collab-mode-cm-buffer (current-buffer))
 (set (make-local-variable 'collab-mode-cm-applying-changes) nil)
 ;(set (make-local-variable 'collab-mode-cm-other-buffer)
  ;(or other-buffer (get-buffer-create "*mirror*")))
 (set (make-local-variable 'collab-mode-cm-network-connection)
  (collab-mode-network-connect "ec2.alcobb.com" 10068))
 (setq collab-mode-cm-text-to-be-changed "")
 (setq collab-server-users '())
 (setq collab-server-friends '())
 (setq collab-server-rooms '())
 (setq infinote-user (if (> user-id 0) 1 0))
 ;(unless other-buffer
   ;(collab-mode-network-init-remote-document collab-mode-cm-network-connection (buffer-string)))
 (add-hook 'post-command-hook #'collab-mode-cm-post-change-hook nil t)
 (add-hook 'before-change-functions #'collab-mode-cm-before-change-hook nil t)
 (add-hook 'after-change-functions #'collab-mode-cm-after-change-hook nil t))

(defun collab-mode-network-post-delete (network-obj start old-text)
 "send delete over the network"
 (infinote-delete start old-text))

(defun collab-mode-network-post-insert (network-obj start string)
 "send insert over the network"
 (infinote-insert start string))

;; (defun collab-mode-network-init-remote-document (network-obj string)
;;  "pretends to send the entire document across the network to start editing"
;;  (with-current-buffer (cadr network-obj)
;;   (delete-region (point-min) (point-max))
;;   (insert string)
;;   (collab-mode-cm-init (caddr network-obj))))

(defun collab-mode-network-connect (host port)
 "connect to collabserver located at host:port"
 (infinote-init)
 (collab-network-connect-to-server)
 (collab-mode-cm-update-user-list)
 `(opaque-network-object ,(current-buffer)))

(provide 'client-model)
