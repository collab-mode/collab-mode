#collabserver.py
#Author: Josiah Powell

from socket import *
import sys
import threading
import Queue

usrlst = []
rooms = [['main',usrlst]]
lock = threading.Lock()
messageq = Queue.Queue()

class MainListiningThread(threading.Thread):
	def __init__(self, soc):
		threading.Thread.__init__(self)
		self.tcplisSoc = soc
		self.connected_users = []
                self.readButNotParsed = ''
                self.myroom = 0
                self.sendMessage(self.addrListString())
	def recvUntilNull(self):
                buffer = ''
                while True:
                        if self.readButNotParsed:
                                newInfo = self.readButNotParsed
                                self.readButNotParsed = ''
                        else:
                                newInfo = self.tcplisSoc.recv(1024)
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
				message = message + "type <connect>(index #) to connect to another ip \n"
				message = message + "type <message>(message to send) to send message to all connect users.\n"
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
			if key == '<invalid format':
				messageq.put(['recieved invalid format for message',self.tcplisSoc])
				key = ''
				mymessage = ''

        def createRoom(self,mymess):
                validrm = True
                global rooms
                for i in rooms:
                        if i[0] == mymess:
                                messageq.put(['room name already in use',self.tcplisSoc])
                                validrm = False
                if(validrm == True and len(mymess) < 21):
                        rooms = rooms + [[mymess,[]]]
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


	def userQuit(self):
		try:
                        rooms[self.myroom][1].remove(self.tcplisSoc)
                        print str(self.tcplisSoc.getpeername()) + ' quit'
		except:
			print 'not able to remove '
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
	serverPort = 10068
	serverSocket = socket(AF_INET, SOCK_STREAM)
        serverSocket.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
	serverip = gethostbyname(gethostname())
	serverip = ''
	serverSocket.bind(( serverip, serverPort))
	serverSocket.listen(5)
	print "Server Started at address: ", serverip, " and port # ", serverPort
        t = MainSendingThread()
	t.start()
        while 1:
		(tcpCliSock, addr) = serverSocket.accept()
		print 'Received a connection from:', addr
		usrlst.append(tcpCliSock)
		t2 = MainListiningThread(tcpCliSock)
		t2.start()


if __name__ == "__main__":
	main()
