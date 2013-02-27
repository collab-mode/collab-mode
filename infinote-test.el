(require 'cl)
(defun test-insert (text pos)
  (goto-char pos)
  (insert (propertize text 'font-lock-face `(:box ,(if (= user 0) "firebrick" "dodger blue")))))
(defun test-delete (pos end)
  (goto-char pos)
  (delete-char (- end pos)))
(defun insert-request (user vector pos text)
  (make-infinote-request :user user
                         :target-vector vector
                         :operation `(:insert ,pos ,text)))

(defun delete-request (user vector pos text)
  (make-infinote-request :user user
                         :target-vector vector
                         :operation `(:delete ,pos ,text)))

(with-current-buffer "*infinote-tests*"
  (delete-region (point-min) (point-max))
  (flet ((collab-mode-cm-insert (text pos) (test-insert text pos))
         (collab-mode-cm-delete (pos end) (test-delete pos end))
         (collab-network-send-to-server (text) (message text)))
    (infinote-init)
    (assert (= 1 (infinote-find-translatable-user (insert-request 0 [0 3] 0 "Test") [0 4])))

    (infinote-execute (insert-request 1 [0 0] 1 "This is a test")) ; 14
    
    (infinote-execute (insert-request 1 [0 1] 11 "fine "))
    (infinote-execute (insert-request 0 [0 1] 15 ", no?"))
    (assert (equal (buffer-string) "This is a fine test, no?"))

    (infinote-execute (insert-request 0 [1 2] 9 "quite "))
    (infinote-execute (insert-request 1 [1 2] 8 "n't"))
    (assert (equal (buffer-string) "This isn't quite a fine test, no?"))
    
    (infinote-execute (delete-request 0 [1 1] 1 "ha"))))
