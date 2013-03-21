(require 'ewoc)

(defun collab-pp (data)
  "Prints messages."
  (insert data))

(defvar collab-point-insert nil
  "Position where the message being composed starts")

(defvar collab-chat-ewoc nil
  "The ewoc showing the messages of this chat buffer.")

(defvar collab-chat-keymap 
  (let ((map (make-sparse-keymap)))
    (define-key map "\r" 'collab-chat-buffer-send)
    map))

(defun collab-test ()
  "test"
  (interactive)
  (with-current-buffer (get-buffer-create "test")
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
    (use-local-map collab-chat-keymap)))

(defun collab-chat-buffer-send ()
  (interactive)
  (let ((body (delete-and-extract-region collab-point-insert (point-max))))
    (ewoc-enter-last collab-chat-ewoc body)))

;;(collab-test)

;;(ewoc-enter-last collab-chat-ewoc "some stuff 2")
