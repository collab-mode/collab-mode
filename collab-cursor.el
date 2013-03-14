(defun collab-cursor-move-to-char (position)
 (unless (boundp 'collab-cursor-overlay)
  (setq collab-cursor-overlay (make-overlay 1 2 (current-buffer) t))
  (overlay-put collab-cursor-overlay 'face '((foreground-color . "black") (background-color . "red"))))
 (move-overlay collab-cursor-overlay position (+ position 1)))

;; Debugging stuff
(if (boundp 'collab-cursor-overlay)
 (makunbound 'collab-cursor-overlay))
