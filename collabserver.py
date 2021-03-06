#collabserver.py
#Author: Josiah Powell

from socket import *
import ssl
import sys
import threading
import Queue
import xmpp

usrlst = []
rooms = [['main',usrlst]]
lock = threading.Lock()
messageq = Queue.Queue()
unames = {}



class xmppWait(threading.Thread):
	def __init__(self,cl):
		threading.Thread.__init__(self)
		self.cli = cl
	def run(self):
		while self.cli.Process(1):
			pass

class MainListiningThread(threading.Thread):
	def __init__(self, soc):
		threading.Thread.__init__(self)
		self.tcplisSoc = soc
		self.connected_users = []
                self.readButNotParsed = ''
                self.myroom = 0
                self.sendMessage(self.addrListString())
		self.myJID = ''
		self.myxmppCl = None
		self.myxmppCON = None
		self.xmppIsCon = False
	def recvUntilNull(self):
                buffer = ''
                while True:
                        if self.readButNotParsed:
                                newInfo = self.readButNotParsed
                                self.readButNotParsed = ''
                        else:
                                #newInfo = self.tcplisSoc.recv(1024)
				newInfo = self.tcplisSoc.read()
                                if not newInfo:
                                        return newInfo
                        spl = newInfo.split('\0', 1)
                        if len(spl) > 1:
                                a, b = spl
                                buffer += a
                                self.readButNotParsed = b
                                return buffer
                        else:
                                buffer += newInfo
	def run(self):
		key = ''
		mymessage = ''
		while key != '<exit':
			try:
				message = self.recvUntilNull()
				if not message:
					key = '<exit'
					message = ''
					self.userQuit()
					break
			except:
				key = '<exit'
				message = ''
				self.userQuit()
				break
			try:
				meskey = message.split('>',1)
				if (len(meskey) > 0):
					mymessage = meskey[1]
				key = meskey[0]
			except:
				key = '<invalid format'
			if key == '<list addr':
				self.sendAddrList()
				key = ''
				mymessage = ''
			if key == '<xmpp connect':
				self.xmppConnect(mymessage)
				key = ''
				mymessage = ''
			if key == '<list self addr':
                                messageq.put([str(self.tcplisSoc.getpeername()),self.tcplisSoc])
                                key = ''
                                mymessage = ''
			if key == '<exit':
				self.userQuit()
			if key == '<help':
				message = "type <list addr> to get a list of connected ip's \n"
				message = message + "type <create room>(room name) to create a new room \n"
				message = message + "type <join room>(room name) to join an already created room \n"
				message = message + "type <list rooms> to get a list of the current rooms \n"
                                message = message + "type <list self addr> to show your ip and port \n"
				message = message + "type <exit> to end session \n"
				message = message + "type <message>(message to send) to send message to all users in room.\n"
                                message = message + "type <broadcast>(message to send) to broadcast a message to all users in all rooms.\n"
				messageq.put([message,self.tcplisSoc])
				key = ''
				mymessage = ''
			if key == '<create room':
                                self.createRoom(mymessage)
                                key = ''
                                mymessage = ''
			if key == '<connect':
				self.startConnect(mymessage)
				key = ''
				mymessage = ''
			if key == '<list rooms':
                                self.listRooms()
                                key = ''
                                mymessage = ''
                        if key == '<join room':
                                self.joinRoom(mymessage)
                                key = ''
                                mymessage = ''
			if key == '<message':
				self.sendMessage(mymessage)
				key = ''
				mymessage = ''
			if key == '<broadcast':
                                self.sendBroadcast(mymessage)
                                key = ''
                                mymessage = ''
			if key == '<xmpp friends':
				self.xmppGetFriends()
				key = ''
				mymessage = ''
			if key == '<invite':
				self.sendInvite(mymessage)
				key = ''
				mymessage = ''
			if key == '<xmpp chat':
				self.xmppChat(mymessage)
				key = ''
				mymessage = ''
			if key == '<invalid format':
				messageq.put(['recieved invalid format for message',self.tcplisSoc])
				key = ''
				mymessage = ''
	def xmppChat(self,mymess):
		if(self.xmppIsCon):
			(mid,sendmess) = mymess.split(' ',1)
			myjid = xmpp.protocol.JID(mid)
			self.myxmppCl.send(xmpp.protocol.Message(myjid,sendmess))
	def sendInvite(self,mymess):
		myaddr = ''
		for sock,uname in unames.iteritems():
			if uname[0] == mymess:
				myaddr = sock
		for i in rooms:
                        for j in i[1]:
				if(str(j.getpeername()) == myaddr):
					mess = '(:invite ' + '"' + str(rooms[self.myroom][0]) + '")'
					messageq.put([mess,j])
        def createRoom(self,mymess):
                validrm = True
                global rooms
                for i in rooms:
                        if i[0] == mymess:
                                messageq.put(['room name already in use',self.tcplisSoc])
                                validrm = False
                if(validrm == True and len(mymess) < 21):
                        rooms = rooms + [[mymess,[]]]
	def presenceHandler(self,con, presence):
		#print 'presence: ' + str(presence)
		if presence:
			if (presence.getType() != 'unavailable'):
				who = presence.getFrom()
				con.send(xmpp.Presence(to=who, typ = 'subscribed'))
				con.send(xmpp.Presence(to=who, typ = 'subscribe'))
	def messageHandler(self,con,mess):
		if (mess.getBody() != None):
			mymess = '(:whisper "' +str(mess.getFrom()).split("/",1)[0] + '"  "' +  str(mess.getBody()) + '")' 
			messageq.put([mymess,self.tcplisSoc])
	def xmppConnect(self,mymess):
		errortype = '';
		try:
			(uname, passw) = mymess.split(' ')
			self.myJID = uname
			jid = xmpp.protocol.JID(uname,passw,'gmail.com')
			cl = xmpp.Client('gmail.com',debug=[])
			con = cl.connect(server=('talk.google.com',5222))
			if not con:
				messageq.put(['could not connect',self.tcplisSoc])
			else:
				auth = cl.auth(uname,passw,'gmail.com')
				if not auth:
					messageq.put(['could not authorize',self.tcplisSoc])
				else:
					messageq.put(['connected and authorized',self.tcplisSoc])
					self.myxmppCl = cl
					self.myxmppCON = con
					self.xmppIsCon = True
					uintname = uname
					for i in uname:
						if(not i.isalpha()):
							uintname = uname.replace(i,'')
					(r,g,b) = (str(int(uintname,36)*2 % 255).replace('L',''),str(int(uintname,36)*3 % 255).replace('L',''), str(int(uintname,36)*4 % 255).replace('L',''))
					unames[str(self.tcplisSoc.getpeername())] = (uname,(r,g,b))
					errortype = 'name'
					cl.RegisterHandler('presence',self.presenceHandler)
					cl.RegisterHandler('message',self.messageHandler)
					errortype = 'handler'
					cl.sendInitPresence()
					errortype = 'presence'
					xt2 = xmppWait(cl)
					xt2.start()
					self.sendMessage(self.addrListString())

		except:
			print "error: " + errortype

	def xmppGetFriends(self):
		if(self.xmppIsCon):
			rost = self.myxmppCl.getRoster()
			rost.Request(force=1)
			mysend = '(:xmppfriends '
			index = 0;
			for i in rost.keys():
				#if (str(rost.getName(i)) == 'None'):
				mysend = mysend + '(' + str(index) + ' "' + str(i) + '"' #.split('@')[0] + '"'
				#else:
				#	mysend = mysend + '('+ str(index) + ' "' + str(rost.getName(i)) + '"'
				if(len(rost.getResources(i)) > 0):
					if(str(rost.getShow(i)) == 'None'): 
						mysend = mysend + ' "online"'
					elif(str(rost.getShow(i)) == 'dnd'):
						mysend = mysend + ' "dnd"'
					elif(str(rost.getShow(i)) == 'away'):
						mysend = mysend + ' "away"'
					else:
						mysend = mysend + ' "online"'
				else:
					mysend = mysend + ' "offline"'
				mysend = mysend + ')'
				index = index + 1;
			mysend = mysend + ')';
			messageq.put([mysend,self.tcplisSoc])
		else:
			messageq.put(['(:error (0 "Not Loged In"))',self.tcplisSoc])
        def joinRoom(self,mymess):
                rmindex = -1
                j = 0
                global rooms
                for i in rooms:
                        if i[0] == mymess:
                                rmindex = j
                        j = j + 1
                if (rmindex == -1):
                        messageq.put(['room not found',self.tcplisSoc])
                else:
                        rooms[self.myroom][1].remove(self.tcplisSoc)
                        self.sendMessage(self.addrListString())
                        rooms[rmindex][1].append(self.tcplisSoc)
                        self.myroom = rmindex
                        self.sendMessage(self.addrListString())

        def listRooms(self):
                mymess = '(:rooms '
                indx = 0
                for i in rooms:
                        mymess = mymess + '(' + str(indx) + ' "' + i[0] +'"'
                        if (indx == self.myroom):
                                mymess = mymess + ' :self-room)'
                        else:
                                mymess = mymess +')'
                        indx = indx + 1
                mymess = mymess + ')'
                messageq.put([mymess,self.tcplisSoc])
                        
        
	def sendAddrList(self):
		sendmsg = '(:users '
		for i in range(len(rooms[self.myroom][1])):
                        sendmsg = sendmsg + '(' + str(i) + ' ' + str(rooms[self.myroom][1][i].getpeername()).replace('(','',1).replace(',',' ',1).replace("'","\"").replace(')','')
			#if (unames[str(rooms[self.myroom][1][i].getpeername())][0] != ''):
			sendmsg = sendmsg + ' "' + str(unames[str(rooms[self.myroom][1][i].getpeername())][0]) + '"'
			sendmsg = sendmsg + " " + str(unames[str(rooms[self.myroom][1][i].getpeername())][1]).replace("(",'').replace("'",'').replace(',',' ').replace(')','')
                        if (rooms[self.myroom][1][i] == self.tcplisSoc):
                                sendmsg = sendmsg + ' :you)'
                        else:
                                sendmsg = sendmsg + ')'
                sendmsg = sendmsg + ')'
		messageq.put([sendmsg,self.tcplisSoc])
	def addrListString(self):
                sendmsg = '(:users '
		for i in range(len(rooms[self.myroom][1])):
                        sendmsg = sendmsg + '(' + str(i) + ' ' + str(rooms[self.myroom][1][i].getpeername()).replace('(','',1).replace(',',' ',1).replace("'","\"").replace(')','')
			#if (unames[str(rooms[self.myroom][1][i].getpeername())][0] != ''):
			sendmsg = sendmsg + ' "' + str(unames[str(rooms[self.myroom][1][i].getpeername())][0]) + '"'
			sendmsg = sendmsg + " " + str(unames[str(rooms[self.myroom][1][i].getpeername())][1]).replace("(",'').replace("'",'').replace(',',' ').replace(')','')
                        sendmsg = sendmsg + ')'
                sendmsg = sendmsg + ')'
                return sendmsg
	def startConnect(self,mymess):
		try:
			indxnum = int(mymess)
			CliSock2 = usrlst[indxnum]
			self.connected_users.append(CliSock2)
			messageq.put(["connected to "+str(CliSock2.getpeername()),self.tcplisSoc])
			messageq.put(["connected to "+str(self.tcplisSoc.getpeername()),CliSock2])
		except:
			messageq.put(["invalid index",self.tcplisSoc])

	def sendMessage(self,mymess):
		for i in rooms[self.myroom][1]:
                        if (i != self.tcplisSoc):
                                messageq.put([mymess,i])

        def sendBroadcast(self,mymess):
                for i in rooms:
                        for j in i[1]:
                                messageq.put([mymess,j])
	def userQuit(self):
		try:
			del unames[str(rooms[self.myroom][1][i].getpeername())]
		except:
			pass
		try:
                        rooms[self.myroom][1].remove(self.tcplisSoc)
                        print str(self.tcplisSoc.getpeername()) + ' quit'
		except:
			print 'not able to remove '
		try:
			self.myxmppCl.disconnect()
		except:
			pass
		self.sendMessage(self.addrListString())
		self.tcplisSoc.close()

class MainSendingThread(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
	def run(self):
		while 1:
			try:
				message = messageq.get()
				message[1].send(message[0] + '\0')
			except:
				print "no data to send"





def main():
	socque = Queue.Queue()
	serverPort = 10069
	serverSocket = socket(AF_INET, SOCK_STREAM)
        serverSocket.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
	#serverip = gethostbyname(gethostname())
	serverip = ''
	serverSocket.bind(( serverip, serverPort))
	serverSocket.listen(5)
	print "Server Started at address: ", serverip, " and port # ", serverPort
        t = MainSendingThread()
	t.start()
        while 1:
		(tcpCliSock, addr) = serverSocket.accept()
		connstream = ssl.wrap_socket(tcpCliSock,server_side=True,
					     certfile="server.crt",
					     keyfile="server.key",
					     ssl_version=ssl.PROTOCOL_TLSv1)
		print 'Received a connection from:', addr
		usrlst.append(connstream)
		uintname = str(addr)
		for i in str(addr):
			if(not i.isdigit()):
				uintname = uintname.replace(i,'')
		(r,g,b) = (str(int(uintname,36)*2 % 255).replace('L',''),str(int(uintname,36)*3 % 255).replace('L',''), str(int(uintname,36)*4 % 255).replace('L',''))
		myun = str(addr)
		myun = myun.replace('(','<')
		myun = myun.replace("'",'')
		myun = myun.replace(",",":")
		myun = myun.replace(")",">")
		myun = myun.replace(" ","")
		unames[str(addr)] = (myun,(r,g,b))
		#unames[str(addr)] = ('','')
		try:
			t2 = MainListiningThread(connstream)
			t2.start()
		except:
			connstream.close()


if __name__ == "__main__":
	main()
