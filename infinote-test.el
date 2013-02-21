(require 'cl)
(defun test-insert (text pos)
  (goto-char pos)
  (insert (propertize text 'font-lock-face `(:background ,(if (= user 0) "red" "blue")))))
(defun test-delete (pos end)
  (goto-char pos)
  (delete-char (- end pos)))
(defun test-insert-request (user vector pos text)
  (let ((request (make-infinote-request :user user
                                        :target-vector vector
                                        :operation `(:insert ,pos ,text))))
    (infinote-execute request)))

(with-current-buffer "*infinote-tests*"
  (delete-region (point-min) (point-max))
  (flet ((collab-mode-cm-insert (text pos) (test-insert text pos))
         (collab-mode-cm-delete (pos end) (test-delete pos end))
         (collab-network-send-to-server (text) (message text)))
    (infinote-init)
    (test-insert-request 1 [0 0] 1 "I ")
    (test-insert-request 1 [0 1] 3 "am ")
    (test-insert-request 1 [0 2] 6 "a ")
    (test-insert-request 0 [0 1] 1 "hallo ")
    (test-insert-request 1 [0 3] 8 "test")))
