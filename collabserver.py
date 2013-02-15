#

from socket import *
import sys
import threading
import Queue

usrlst = []
lock = threading.Lock()
messageq = Queue.Queue()

class MainListiningThread(threading.Thread):
	def __init__(self, soc):
		threading.Thread.__init__(self)
		self.tcplisSoc = soc
		self.connected_users = []
	def run(self):
		key = ''
		mymessage = ''
		while key != '<exit':
			try:
				message = self.tcplisSoc.recv(1024)
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
			if key == '<exit':
				self.userQuit()
			if key == '<help':
				message = "type <list addr> to get a list of connected ip's \n"
				message = message + "type <exit> to end session \n"
				message = message + "type <connect>(index #) to connect to another ip \n"
				message = message + "type <message>(message to send) to send message to all connect users.\n"
				messageq.put([message,self.tcplisSoc])
				key = ''
				mymessage = ''
			if key == '<connect':
				self.startConnect(mymessage)
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


	def sendAddrList(self):
		sendmsg = ''
		for i in range(len(usrlst)):
			sendmsg = sendmsg + "\n" + str(i) + " " + str(usrlst[i].getpeername())
		messageq.put([sendmsg,self.tcplisSoc])
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
		for i in self.connected_users:
			messageq.put([mymess,i])


	def userQuit(self):
		try:
			usrlst.remove(self.tcplisSoc)
		except:
			print 'not able to remove '
		self.tcplisSoc.close()

class MainSendingThread(threading.Thread):
	def __init__(self):
		threading.Thread.__init__(self)
	def run(self):
		while 1:
			try:
				message = messageq.get()
				message[1].send(message[0])
			except:
				print "no data to send"





def main():
	socque = Queue.Queue()
	serverPort = 10068
	serverSocket = socket(AF_INET, SOCK_STREAM)
	serverip = gethostbyname(gethostname()) 
	serverSocket.bind(( serverip, serverPort))
	serverSocket.listen(5)
	print "Server Started at address: ", serverip, " and port # ", serverPort
	while 1:
		(tcpCliSock, addr) = serverSocket.accept()
		print 'Received a connection from:', addr
		usrlst.append(tcpCliSock)
		t = MainSendingThread()
		t.start()
		t2 = MainListiningThread(tcpCliSock)
		t2.setDaemon(True)
		t2.start()


if __name__ == "__main__":
	main()