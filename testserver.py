#simple test server
#author josiah powell
from socket import *
import sys
import threading
import Queue

usrlst = []
lock = threading.Lock()

class MainThread(threading.Thread):
    def __init__(self, socque, ip):
        threading.Thread.__init__(self)
        self.socque = socque
        self.myip = ip
    def run(self):
        tcpCliSock = self.socque.get()
        message = ''
        while message != 'exit':    
            message = tcpCliSock.recv(10240)
            if message == 'list addr':
                self.sendAddrList(tcpCliSock)
                message = ''
            if message == 'exit':
                self.userQuit(tcpCliSock)
            if message == 'help':
                tcpCliSock.send("type 'list addr' to get a list of connected ip's \n type 'exit' to end session")
                message = ''
            if message != '' and message != 'exit':
                tcpCliSock.send("recieved message: " + message)          
    def sendAddrList(self,CliSock):
        sendmsg = '+'.join(usrlst)
        CliSock.send(sendmsg)

    def userQuit(self,CliSock):
        CliSock.send('leaving server')
        print self.myip + ' left server'
        
        try:
            lock.acquire()
            usrlst.remove(self.myip)
            lock.release()
        except:
            print 'not able to remove '
        CliSock.close()
        


def main():
    socque = Queue.Queue()
    serverPort = 10068
    serverSocket = socket(AF_INET, SOCK_STREAM)
    serverip = raw_input('input server ip: ')
    serverSocket.bind(( serverip, serverPort))
    serverSocket.listen(5)
    # Strat receiving data from the client
    while 1:
        #print 'Ready to serve...'
        (tcpCliSock, addr) = serverSocket.accept()
        socque.put(tcpCliSock)
        print 'Received a connection from:', addr
        lock.acquire()
        usrlst.append(addr[0])
        lock.release()
        t = MainThread(socque,addr[0])
        t.setDaemon(True)
        t.start()


if __name__ == "__main__":
    main()
