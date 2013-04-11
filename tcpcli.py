from socket import *
import threading
import ssl
import pprint
#import xmpp

class Listiner(threading.Thread):
    def __init__(self,soc):
        threading.Thread.__init__(self)
        self.tcplisSoc = soc
    def run(self):
        message = ''
        ans = 1
        while ans == 1:
            try:
                #message = self.tcplisSoc.recv(10240)
                message = self.tcplisSoc.read()
                print message
            except:
                print 'socket closed'
                ans = 0


serverName = raw_input('Input server name or address: ')

serverPort = 10069
clientSocket = socket(AF_INET, SOCK_STREAM)
ssl_sock = ssl.wrap_socket(clientSocket,ca_certs="/etc/ca_certs_file",
                           cert_reqs=ssl.CERT_NONE)
ssl_sock.connect((serverName,serverPort))


ans = 1;
t = Listiner(ssl_sock)
t.start()
while ans == 1:
    message = raw_input('Input message: ')
    message = message + '\0'
    if message == '<exit>\0':
        ans = 0;
    ssl_sock.send(message)
ssl_sock.close();
