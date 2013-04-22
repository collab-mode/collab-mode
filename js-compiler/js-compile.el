;;; -*- lexical-binding: t -*-

(defvar js-uninterned-sym-trans-table nil)
(defun js-uninterned-sym-trans (sym)
 (or
  (cdr (assq sym js-uninterned-sym-trans-table))
  (cdar
   (push (cons sym (gensym (symbol-name sym)))
    js-uninterned-sym-trans-table))))

(defun js-sym-trans (sym)
 (if (not (intern-soft sym))
  (setq sym (js-uninterned-sym-trans sym)))
 (cond
  ;; keywords ruin everything...
  ((eq sym 'default) "_$default")
  (t
   (mapconcat
    (lambda (c)
     (pcase c
      (`?- "_")
      (`?_ "$_")
      (`?> "$GT_")
      (`?< "$LT_")
      (`?= "$EQ_")
      (`?+ "$PLUS_")
      (`?? "$HUH_")
      (_ (string c))))
    (string-to-list (symbol-name sym)) ""))))

(defun js-arg-trans (sym)
 (concat "arg$" (js-sym-trans sym)))

(defun js-old-trans (sym)
 (concat "old$" (js-sym-trans sym)))

(defun string-it (it)
 (replace-regexp-in-string "\r" "\\\\r"
  (replace-regexp-in-string "\t" "\\\\t"
   (let ((print-escape-newlines t)
         (print-escape-non-ascii nil)
         (print-escape-multibyte nil))
    (prin1-to-string it)))))

(defun js-fn-trans (fn-sym)
 (concat "FN_" (js-sym-trans fn-sym)))

(defun js-quote (exp)
 (pcase exp

  (`nil "false")
  (`t "true")

  ((pred symbolp)
   (string-it (symbol-name exp)))

  ((pred consp)
   (concat
    "FN_cons("
    (js-quote (car exp))
    ", "
    (js-quote (cdr exp))
    ")"))

  ((pred stringp)
   (string-it exp))

  ((pred numberp)
   (string-it exp))

  (_ (error "don't know how to quote %S" exp))))

(defun make-js-parend (exp)
 (concat "(" (make-js exp) ")"))

(defun js-stmt-to-expr (stmt)
 `("(function () {\n" ,@stmt ";\n})()"))

(defun undefined-check (sym)
 (concat
  "((typeof(" (js-sym-trans sym) ") !== 'undefined') ? "
  (js-sym-trans sym) " : undefined)" ))

(defun extract-let-vars (let-bindings)
 (mapcar (lambda (x) (if (consp x) (car x) x)) let-bindings))

(defun extract-let-binds (let-bindings)
 (mapcar (lambda (x) (car-safe (cdr-safe x))) let-bindings))

(defun make-js (exp)
 ;;(message "%S" `(make-js ,exp))
 (mapconcat #'identity
  (pcase exp

   ;;(`(defun ,name ,formals . ,body)
   ;;`("function " ,(js-fn-trans name) "("
   ;;,(mapconcat #'js-sym-trans (remove-if (lambda (x) (eq x '&optional)) formals) ", ")
   ;;") {"
   ;;"return " ,(mapconcat #'make-js-parend body ", ") ";"
   ;;"}"))

   ((pred stringp)
    (list (string-it exp)))

   (`(let ,vars-and-bindings . ,body)
    (let ((vars (extract-let-vars vars-and-bindings))
          (bindings (extract-let-binds vars-and-bindings)))
     `(,(make-js `(λ ,vars ,@body))
       "("
       ,(mapconcat #'make-js-parend bindings ", ")
       ")")))

   (`(let* () . ,body)
    (list
     (make-js
      `(let () . ,body))))

   (`(let* ((,v ,b) . ,bindings) . ,body)
    (list
     (make-js
      `(let ((,v ,b))
        (let* ,bindings . ,body)))))

   (`(let* (,(and (pred symbolp) v) . ,bindings) . ,body)
    (list
     (make-js
      `(let ((,v nil))
        (let* ,bindings . ,body)))))

   (`(,(or `lambda `λ) ,formals . ,body)
    (let* ((no-options (remove-if (lambda (x) (eq x '&optional)) formals))
           (rest-suspect (last no-options 2))
           (rest-actual (when (eq (car-safe rest-suspect) '&rest)
                         (cdr-safe rest-suspect)))
           (real-formals (if rest-actual
                          (butlast no-options 2)
                          no-options))
           (no-opt-count (or (position '&optional formals) (length real-formals))))
     `("(function ("
       ,(mapconcat #'js-arg-trans real-formals ", ")
       ") {\n"
       ,@(loop for arg in real-formals
          collect
          (concat
           "var " (js-old-trans arg) " = " (undefined-check arg) ";\n"
           (js-sym-trans arg) " = " (js-arg-trans arg) ";\n"))
       "try {\n"
       ,@(loop for i from no-opt-count to (1- (length real-formals))
          collect (let ((x (js-sym-trans (nth i real-formals))))
                   (concat x " = (typeof(" x ") === 'undefined') ? false : " x ";\n")))
       ,@(when rest-actual
          `("var " ,(js-sym-trans rest-actual)
            " = Array.prototype.slice.call(arguments, "
            ,(string-it (length real-formals)) ");\n"))
       "return (" ,(mapconcat #'make-js-parend (or body '(nil)) ",\n") ");\n"
       "} finally {"
       ,@(loop for arg in real-formals
          collect
          (concat (js-sym-trans arg) " = " (js-old-trans arg) ";\n"))
       "}})")))

   (`(closure ,_ ,formals . ,body)
    (list (make-js `(λ ,formals . ,body))))

   (`(if ,condition ,consequent)
    (list (make-js `(if ,condition ,consequent '()))))

   (`(if ,condition ,consequent ,alternate)
    `("(("
      ,(make-js condition)
      ") !== false) ? ("
      ,(make-js consequent)
      ") : ("
      ,(make-js alternate)
      ")"))

   (`(if ,condition ,consequent . ,alternates)
    (list (make-js `(if ,condition ,consequent
                     (progn . ,alternates)))))

   (`(cond) (list "false"))

   (`(cond (,conditional ,consequent) . ,clauses)
    (list
     (make-js `(if ,conditional
                ,consequent
                (cond . ,clauses)))))

   (`(cond (,conditional ,c1 . ,c-rest) . ,clauses)
    (list
     (make-js `(if ,conditional
                (progn ,c1 . ,c-rest)
                (cond . ,clauses)))))

   (`(and) (list "true"))
   (`(and ,exp)
    (list (make-js exp)))
   (`(and ,exp . ,rest)
    (list
     (make-js
      `(if ,exp
        (and . ,rest)))))

   (`(or) (list "false"))
   (`(or ,exp)
    (list (make-js exp)))
   (`(or ,exp . ,rest)
    (list
     (make-js
      (let (($exp (gensym "exp")))
       `(let ((,$exp ,exp))
         (if ,$exp
          ,$exp
          (or . ,rest)))))))

   (`(quote ,inner)
    (list (js-quote inner)))

   (`(function ,(and (pred symbolp) fn))
    (list (js-fn-trans fn)))

   (`(function ,fn)
    (list (make-js fn)))

   (`(progn ,body)
    (list (make-js body)))

   (`(progn . ,body)
    `("(" ,(mapconcat #'make-js-parend (cons nil body) ", ") ")"))

   (`(prog1 ,first . ,body)
    `("(function () {\n"
      "var $ret = (" ,(make-js first) ");\n"
      ,(mapconcat #'make-js (cons nil body) ";\n ") ";\n"
      "return $ret;\n"
      "})()"))

   (`(while ,test . ,body)
    (js-stmt-to-expr
     `("while (" ,(make-js-parend test) " !== false) {"
       ,(mapconcat #'make-js body ";\n ")
       "}")))

   (`(setq ,var ,val)
    `("(" ,(js-sym-trans var) "=" ,(make-js-parend val) ")"))

   (`(setq ,var ,val . ,rest)
    `("("
      ,(js-sym-trans var) "=" ,(make-js-parend val) ", "
      ,(make-js-parend `(setq . ,rest))
      ")"))

   (`(interactive . ,_) '("false"))

   (`(unwind-protect ,body . ,protect-forms)
    `("(function () {\n"
      "try {\n"
      "return " ,(make-js body) ";\n"
      "} finally {\n"
      ,(mapconcat #'make-js protect-forms ";\n")
      "}})()"))

   (`(save-current-buffer . ,body)
    (list (make-js `(save-current-buffer-fn (lambda () . ,body)))))

   (`(save-excursion . ,body)
    (list (make-js `(save-excursion-fn (lambda () . ,body)))))

   (`(,(pred
        (lambda (x)
         (member x
          '(and catch cond condition-case defconst defvar
            function if interactive let let* or prog1 prog2
            progn quote save-current-buffer save-excursion
            save-restriction setq setq-default track-mouse
            unwind-protect while)))) . ,args)
    (error "make-js: unhandled special form %s" exp))

   (`(,(and (pred symbolp) func) . ,args)
    `("("
      ,(js-fn-trans func)
      ")("
      ,(mapconcat #'make-js-parend args ", ")
      ")"))

   (`t '("true"))
   (`nil '("false"))

   ((pred symbolp)
    (list (js-sym-trans exp)))

   ((pred numberp)
    (list (string-it exp)))

   ;;(_ (list (string-it exp)))
   (_ (error "make-js: unhandled %s" exp)))
  ""))

(setq max-lisp-eval-depth 3400)
(setq max-specpdl-size 3400)

(require 'collab-mode)

(let* ((interesting-functions
        '(
          infinote-find-file
          infinote-before-change
          infinote-after-change
          infinote-post-command
          infinote-handle-stanza
          ;;infinote-send-string
          infinote-send-xml
          infinote-send-group-command
          infinote-send-request
          infinote-send-auth
          infinote-send-sasl-response
          infinote-send-stream-header
          infinote-send-explore
          infinote-send-subscribe-session
          infinote-send-session-unsubscribe
          infinote-send-add-node
          infinote-send-subscribe-ack
          infinote-send-sync-ack
          infinote-send-user-join
          infinote-send-insert
          infinote-send-delete
          ;;infinote-collab-text-properties
          infinote-local-insert
          infinote-local-delete
          infinote-diff-since-last-sent-vector
          infinote-vector-to-string
          infinote-create-session
          infinote-user-join
          infinote-read-vector
          infinote-xml-to-operation
          infinote-segment-xml-to-text
          infinote-vector-includes
          infinote-vector-equal
          infinote-vector-subtract
          infinote-diffed-vector
          infinote-diff-user-vector
          infinote-increment-my-vector
          infinote-user-vector
          infinote-get-user-data
          infinote-set-user-data
          infinote-insert-segment
          infinote-operation-count
          infinote-nth-user-request-from-log
          infinote-translatable-user
          infinote-closer-target-request
          infinote-op-type
          infinote-transform-operation
          infinote-translate-operation
          infinote-my-vector
          infinote-can-apply
          infinote-process-request-queue
          infinote-affected-text
          infinote-contextualize-delete
          infinote-handle-request
          infinote-apply-operation
          infinote-node-from-id
          infinote-handle-group-commands
          infinote-handle-group-command

          xmlgen
          xmlgen-extract-plist
          xmlgen-attr-to-string
          xmlgen-string-escape

          xml-parse-tag-1
          xml-parse-attlist
          xml-maybe-do-ns
          xml-substitute-special
          xml-parse-string
          xml-get-attribute
          xml-get-attribute-or-nil
          xml-node-attributes
          ))
       (interesting-vars
        '(
          infinote-server
          infinote-port
          infinote-user-name
          infinote-hue
          infinote-connection
          infinote-connection-buffer
          infinote-connection-ready
          infinote-verbose
          infinote-nodes
          infinote-sessions
          infinote-group-name
          infinote-node-id
          infinote-node-type
          infinote-users
          infinote-user-id
          infinote-request-log
          infinote-request-queue
          infinote-my-last-sent-vector
          infinote-inhibit-change-hooks
          infinote-before-change-text
          infinote-syncing

          xmlgen-escape-attribute-vals
          xmlgen-escape-elm-vals
          xmlgen-escapees

          xml-validating-parser
          xml-sub-parser

          xml-undefined-entity
          xml-default-ns
          xml-name-start-char-re
          xml-name-char-re
          xml-name-re
          xml-names-re
          xml-nmtoken-re
          xml-nmtokens-re
          xml-char-ref-re
          xml-entity-ref
          xml-entity-alist
          xml-entity-or-char-ref-re
          xml-pe-reference-re
          xml-reference-re
          xml-att-value-re
          xml-tokenized-type-re
          xml-notation-type-re
          xml-enumeration-re
          xml-enumerated-type-re
          xml-att-type-re
          xml-default-decl-re
          xml-att-def-re
          xml-entity-value-re
          xml-entity-expansion-limit
          ))
       (make-buffer-local-vars
        '(
          infinote-nodes
          infinote-sessions
          infinote-group-name
          infinote-node-id
          infinote-node-type
          infinote-users
          infinote-user-id
          infinote-request-log
          infinote-request-queue
          infinote-my-last-sent-vector
          infinote-inhibit-change-hooks
          infinote-text-before-change
          infinote-syncing))
       (result (apply #'concat
                `(,@(loop for sym in interesting-functions
                     collect
                     (concat
                      (js-fn-trans sym)
                      " = "
                      (make-js (macroexpand-all (symbol-function sym)))
                      ";\n"))
                  ,@(loop for sym in interesting-vars
                     collect
                     (concat
                      (js-sym-trans sym)
                      " = "
                      (make-js `(quote ,(symbol-value sym)))
                      ";\n"))
                  ,@(loop for sym in make-buffer-local-vars
                     collect
                     (concat
                      "buffer_add_make_local_var('"
                      (js-sym-trans sym)
                      "');\n"))))))
 (with-temp-buffer
  (c-mode)
  (insert result)
  ;;(indent-region (point-min) (point-max))
  (write-region nil nil "tmp")))
