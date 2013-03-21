(require 'password-cache)

(defun collab-login ()
  "Prompts for a username and password. Passes username and
password to COLLAB-MODE-CM-XMPP-LOGIN."
  (interactive)
  (collab-mode-cm-xmpp-login
   (read-from-minibuffer "Username: ")
   (password-read "Password: ")))
