(require 'cl)

(defstruct infinote-request "An infinote request" user target-vector operation)

(defun infinote-transform (operation against-operation &optional cid)
  "Get an operation transformed against another operation."
  (pcase operation
    (`(,:noop) '(:noop))
    (`(,:insert ,position ,text) 
     (pcase against-operation
       (`(,:insert ,position2 ,text2) ; TODO: use the cid like py-infinote
        (cond
         ((< position position2) operation)
         ((>= position position2) `(:insert ,(+ position (length text2)) ,text))))
       (`(,:delete ,position2 ,text2)
        (cond
         ((>= position (+ position2 (length text2)))
          `(:insert ,(- position (length text2)) ,text))
         ((< position position2)
          `(:insert ,position ,text))
         ((and (>= position position2) (< position (+ position2 (length text2)))) 
          `(:insert ,position2 ,text))))))
    (`(,:delete ,position ,text)
     (pcase against-op
       (_ operation)
;       (`(,:insert ,position2 ,text2)
;        (null))
                   ; TODO: All the delete transforms
         ))))

(defun infinote-increment-vector (vector request)
  "Add a request to a vector"
  (push request (aref vector (infinote-request-user request))))

(defun infinote-transform-request (request against-request)
  "Rebase a request onto another request"
  (make-infinote-request :user (infinote-request-user request)
                         :target-vector (let ((new-vector (copy-sequence (infinote-request-vector request))))
                                   (infinote-increment-vector new-vector request)
                                   new-vector)
                         :operation (infinote-transform-operation
                                     (infinote-request-operation request)
                                     (infinote-request-operation against-request))))

(defun infinote-splice (start length &optional text)
  "Get a string with <length> characters starting from index <start> replaced with <text>"
  (save-excursion
    (goto-char start)
    (delete-char length)
    (when text (insert (propertize text 'font-lock-face `(:background ,(if (= user 0) "red" "blue")))))))

(defun infinote-apply (operation)
  "Get a string with the operation applied"
  (pcase operation
    (`(,:insert ,position ,text) (infinote-splice position 0 text))
    (`(,:delete ,position ,text) (infinote-splice position (length text)))))

(defun infinote-previous-vector (user target-vector)
  "Get the vector as it was one request ago"
  (if (= user 0)
      [(aref target-vector 0) (cdr (aref target-vector 1))]
    [(cdr (aref target-vector 0)) (aref target-vector 1)]))

(defun infinote-previous-request (user target-vector)
  "Get the request that brought the vector to its current state"
  (car (aref target-vector (- 1 user))))

(defun infinote-translate (request target-vector)
  "Get a request modified to be applicable to a state at the target-vector"
  ; If the request is for the target-vector, return it
  (if (equal (infinote-request-vector request) target-vector)
      request
    (let* ((user (infinote-request-user request))
           (previous-vector (infinote-previous-vector user target-vector)))
      (infinote-transform-request
       (infinote-translate request previous-vector)
       (infinote-translate (infinote-previous-request user target-vector) previous-vector)))
  ; Find a user with a target-vector value greater than in the request vector
  ; Get the last-request that caused that user's value to be set to the target-vector value
  ; Get the last-targe-value, the target-value from before the last-request was applied
  ; Translate the request against the last-target-value
  ; Translate the last-request against the last-target-value
  ; Now that request and last-request are translated to the same last-target-value, they can be transformed
  ; Transform request against last-request
  ; Return transformed request
  ))
(defun infinote-execute (request)
  "Translate and execute a request"
  ; TODO: everything needed for more than two users. queue, can-executep, etc
  ; Translate the request to the state's vector
  (let* ((translated-request (infinote-translate request infinote-vector))
         (operation (infinote-request-operation translated-request))
         (user (infinote-request-user request)))
    (push translated-request (aref infinote-vector user))
    (push translated-request infinote-log)
    (infinote-apply operation))
  ; Append the translated request to the log
  ; Execute the request
  ; Since we only handle insert/delete right now, executing is just applying
  ; Apply request's operation to state's buffer
  ; Increment the state's vector at the request's user slot
  )

(defun infinote-insert (pos text)
  "Insert some text"
  (infinote-execute
   (make-infinote-request :user infinote-user
                          :target-vector infinote-vector
                          :operation `(:insert ,pos ,text))))

(defun infinote-delete (pos text)
  "Delete some text"
  (infinote-execute
   (make-infinote-request :user infinote-user
                          :target-vector infinote-vector
                          :operation `(:delete ,pos ,text))))

(defun infinote-init ()
  "Set up the buffer local infinote state"
  (set (make-local-variable infinote-user) 0)
  (set (make-local-variable infinote-state) nil)
  (set (make-local-variable infinote-vector) [nil nil])
  (set (make-local-variable infinote-log) nil))
