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
  (collab-mode-network-post-delete
   collab-mode-cm-network-connection
   start (+ start previous-length)))
 (when (/= start end)
  (collab-mode-network-post-insert
   collab-mode-cm-network-connection
   start (buffer-substring-no-properties start end))))

(defvar collab-mode-cm-other-buffer nil)
(defvar collab-mode-cm-network-connection nil)

(defun collab-mode-cm-init (&optional other-buffer)
 "Initialization for the client model
TBD: how many times is this called, and in what contexts"
 (set (make-local-variable 'collab-mode-cm-applying-changes) nil)
 (set (make-local-variable 'collab-mode-cm-other-buffer)
  (or other-buffer (get-buffer-create "*mirror*")))
 (set (make-local-variable 'collab-mode-cm-network-connection)
  (collab-mode-network-connect "ec2.alcobb.com" 10068))
 (unless other-buffer
   (collab-mode-network-init-remote-document collab-mode-cm-network-connection (buffer-string)))
 (add-hook 'after-change-functions #'collab-mode-cm-after-change-hook nil t))

;; STUB FUNCTIONS
(defun collab-mode-network-post-delete (network-obj start end)
 "pretends to send delete over the network"
 (with-current-buffer (cadr network-obj)
  (collab-mode-cm-delete start end)))

(defun collab-mode-network-post-insert (network-obj start string)
 "pretends to send insert over the network"
 (with-current-buffer (cadr network-obj)
  (collab-mode-cm-insert string start)))

(defun collab-mode-network-init-remote-document (network-obj string)
 "pretends to send the entire document across the network to start editing"
 (with-current-buffer (cadr network-obj)
  (delete-region (point-min) (point-max))
  (insert string)
  (collab-mode-cm-init (caddr network-obj))))

(defun collab-mode-network-connect (host port)
 "pretends to connect to collabserver located at host:port"
 `(opaque-network-object ,collab-mode-cm-other-buffer ,(current-buffer)))

(provide 'client-model)
