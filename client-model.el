;;; -*- lexical-binding: t -*-
;;
;; collab-mode
;; client-model.el
;;

(defvar collab-mode-cm-applying-changes nil
 "Internal variable used to keep track of which changes collab-mode is making,
so it doesn't rebroadcast itself into an infinite loop")

(defun collab-mode-cm-insert (string location)
 "inserts STRING into current buffer at LOCATION"
 (let ((collab-mode-cm-applying-changes t))
  (save-excursion
   (goto-char location)
   (insert string))))

(defun collab-mode-cm-delete (start end)
 "removes text in current buffer from START to END"
 (let ((collab-mode-cm-applying-changes t))
   (delete-region start end)))

(defun collab-mode-cm-after-change-hook (start end previous-length)
 "handler for hook that the buffer just changed"
 (when (/= previous-length 0)
  (collab-mode-network-post-delete start (+ start previous-length)))
 (when (/= start end)
  (collab-mode-network-post-insert start (buffer-substring-no-properties start end))))

(defvar collab-mode-cm-other-buffer nil)

(defun collab-mode-cm-init (&optional other-buffer)
 (make-local-variable 'collab-mode-cm-applying-changes)
 (set (make-local-variable 'collab-mode-cm-other-buffer)
  (or other-buffer "*mirror*"))
 (unless other-buffer
  (let ((first-buffer (current-buffer))
        (string (buffer-string)))
   (with-current-buffer (get-buffer-create "*mirror*")
    (delete-region (point-min) (point-max))
    (insert string)
    (collab-mode-cm-init first-buffer))))
 (add-hook 'after-change-functions #'collab-mode-cm-after-change-hook t))

;; STUB FUNCTIONS
(defun collab-mode-network-post-delete (start end)
 (with-current-buffer collab-mode-cm-other-buffer
  (collab-mode-cm-delete start end)))
(defun collab-mode-network-post-insert (start string)
 (with-current-buffer collab-mode-cm-other-buffer
  (collab-mode-cm-insert string start)))
