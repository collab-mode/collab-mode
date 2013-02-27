from socket import *
import threading

class Listiner(threading.Thread):
    def __init__(self,soc):
        threading.Thread.__init__(self)
        self.tcplisSoc = soc
    def run(self):
        message = ''
        ans = 1
        while ans == 1:
            try:
                message = self.tcplisSoc.recv(10240)
                print message
            except:
                print 'socket closed'
                ans = 0


serverName = raw_input('Input server name or address: ')

#serverName = 'localhost'
serverPort = 10068
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName,serverPort))
ans = 1;
t = Listiner(clientSocket)
t.start()
while ans == 1:
    message = raw_input('Input message: ')
    message = message + '\0'
    if message == '<exit>\0':
        ans = 0;
    clientSocket.send(message)
clientSocket.close()
