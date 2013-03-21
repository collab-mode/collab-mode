(require 'ewoc)

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
  (let ((body (delete-and-extract-region collab-point-insert (point-max))))
    (collab-chat-buffer-receive body (collab-self-username))
    (collab-mode-cm-send-chat body)))

(defun collab-chat-buffer-receive (msg username)
 (let* ((face (collab-mode-cm-chat-font-for-username username))
        (user-text (propertize username 'face `(:underline t . ,face)))
        (message-text (propertize msg 'face face)))
  (ewoc-enter-last collab-chat-ewoc
    (concat user-text ": " message-text))))
