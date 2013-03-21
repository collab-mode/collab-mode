(require 'password-cache)

(defun collab-login ()
  "Prompts for a username and password. Passes username as car and
password as cdr to COLLAB-MODE-CM-XMPP-LOGIN."
  (interactive)
  (collab-mode-cm-xmpp-login
   (cons (read-from-minibuffer "Username: ")
	 (password-read "Password: "))))

(defun collab-mode-cm-xmpp-login (info)
  "Usage example."
  (message "username: %s, password: %s" (car info) (cdr info)))
