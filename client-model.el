;;; -*- lexical-binding: t -*-
;;
;; collab-mode
;; client-model.el
;;

(require 'network "network.el")

(defvar collab-mode-cm-applying-changes nil
 "Internal variable used to keep track of which changes collab-mode is making,
so it doesn't rebroadcast itself into an infinite loop")
(defvar collab-mode-cm-updating-infinote nil)

(defvar collab-mode-cm-hack-buffer nil "the buffer")

(defun collab-mode-cm-update-user-list ()
 (interactive)
 (collab-network-send-to-server nil "<list addr>"))

(defun collab-mode-cm-format-user (user)
 (pcase user
  (`(,num ,ip ,port . ,_)
   (format "%d (%s:%d)" num ip port))))

(defun collab-users ()
 (mapcar #'collab-mode-cm-format-user collab-server-users))

(defun collab-user-connected (user)
 (loop for user2 in collab-server-users
  if (equal (cdddr user2) '(:you))
  return (equal user (collab-mode-cm-format-user user2))))

(defun font-for-user (user)
 `(:box ,(if (= user 0) "firebrick" "dodger blue")))

(defun collab-mode-cm-insert (string location)
 "inserts STRING into current buffer at LOCATION"
 (with-current-buffer collab-mode-cm-hack-buffer
  (when (not collab-mode-cm-updating-infinote)
   (let ((collab-mode-cm-applying-changes t))
    (save-excursion
     (goto-char location)
     (insert (propertize string 'font-lock-face (font-for-user (- 1 infinote-user)))))))))

(defun collab-mode-cm-delete (start end)
 "removes text in current buffer from START to END"
 (with-current-buffer collab-mode-cm-hack-buffer
  (when (not collab-mode-cm-updating-infinote)
   (let ((collab-mode-cm-applying-changes t))
    (delete-region start end)))))

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

;(defvar collab-mode-cm-other-buffer nil)
(defvar collab-mode-cm-network-connection nil)

(defun collab-mode-cm-init (user-id)
 "Initialization for the client model
TBD: how many times is this called, and in what contexts"
 (setq collab-mode-cm-hack-buffer (current-buffer))
 (set (make-local-variable 'collab-mode-cm-applying-changes) nil)
 ;(set (make-local-variable 'collab-mode-cm-other-buffer)
  ;(or other-buffer (get-buffer-create "*mirror*")))
 (set (make-local-variable 'collab-mode-cm-network-connection)
  (collab-mode-network-connect "ec2.alcobb.com" 10068))
 (setq collab-mode-cm-text-to-be-changed "")
 (setq collab-server-users '())
 (setq infinote-user (if (> user-id 0) 1 0))
 ;(unless other-buffer
   ;(collab-mode-network-init-remote-document collab-mode-cm-network-connection (buffer-string)))
 (add-hook 'after-change-functions #'collab-mode-cm-after-change-hook nil t))

;; STUB FUNCTIONS
(defun dummy-string-of-length (n)
 (apply #'concat (loop repeat n append '("."))))

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
 `(opaque-network-object ,(current-buffer)))

(provide 'client-model)
