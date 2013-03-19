(defconst collab-prompt "IJS> ")

(defun elnode-ijs/input-sender (proc input)
  (message input))

(define-derived-mode
  elnode-ijs/mode comint-mode "IJSM"
  "Run a Javascript shell."
  (setq comint-prompt-regexp (concat "^" (regexp-quote collab-prompt)))
  (setq comint-input-sender 'elnode-ijs/input-sender)

  (unless (comint-check-proc (current-buffer))
    ;; Was cat, but on non-Unix platforms that might not exist, so
    ;; use hexl instead, which is part of the Emacs distribution.
    (let ((fake-proc
	   (condition-case nil
	       (start-process "ijsm" (current-buffer) "hexl")
	     (file-error (start-process "ijsm" (current-buffer) "cat")))))
      (set-process-query-on-exit-flag fake-proc nil)
      ;; Add a silly header
      (insert "Chat Mode\n")
      (set-marker
       (process-mark fake-proc) (point))
      (comint-output-filter fake-proc collab-prompt))))
