collab-mode
===========

Collaborative editing for Emacs.

What has been turned in
=======================
Three major components are included: collab-mode, collabserver, infinote-mode

To "make", elisp files should be loaded into Emacs and eval'd, at which point their interactive functions become available.
The collabserver should be run with a recent version of python.

collab-mode requires a collabserver to function. infinoted-mode requires an infinoted server, which comes with libinfinity.

collab-mode
===========
The emacs extensions that include, among other things, the user list, the chat window, the text coloring, the frontend interfaces for gmail auth, and an not-quite-gobby-compatible version of the infinote protocol.

Files:
- chat-buffer.el
- client-model.el
- collab-auth-prompt.el
- collab-mode.el
- infinote.el
- network.el

collabserver
============
The backend server to support collab-mode

Files:
- collabserver.py

infinote-mode
=============
A gobby compatible infinote protocol implementation with just enough front-end functions to be stand alone

Files:
- infinote-mode.el

