#include <iostream>
#include <string>
#include <vector>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/time.h>

// Project Orion: High-performance Port Scanner
// Features: Custom timeouts, Real-time status, Known ports optimization

using namespace std;

bool scanPort(const string& ip, int port, int timeoutSec, int timeoutUsec) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) return false;

    // Set non-blocking
    fcntl(sock, F_SETFL, O_NONBLOCK);

    struct sockaddr_in serv_addr;
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(port);
    inet_pton(AF_INET, ip.c_str(), &serv_addr.sin_addr);

    connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr));

    fd_set fdset;
    FD_ZERO(&fdset);
    FD_SET(sock, &fdset);

    struct timeval tv;
    tv.tv_sec = timeoutSec;
    tv.tv_usec = timeoutUsec;

    // Wait for connection with timeout
    int result = select(sock + 1, NULL, &fdset, NULL, &tv);
    
    bool isOpen = false;
    if (result == 1) {
        int so_error;
        socklen_t len = sizeof so_error;
        getsockopt(sock, SOL_SOCKET, SO_ERROR, &so_error, &len);
        if (so_error == 0) {
            isOpen = true;
        }
    }

    close(sock);
    return isOpen;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cout << "Usage: ./orion <IP_ADDRESS>" << endl;
        return 1;
    }

    string targetIp = argv[1];
    cout << "Starting Project Orion Scan on " << targetIp << "..." << endl;
    cout << "Scanning Well-Known Ports (1-1024)..." << endl;

    int openPorts = 0;
    for (int port = 1; port <= 1024; port++) {
        // Real-time feedback with carriage return
        cout << "\rScanning port " << port << " / 1024 [" << (port * 100 / 1024) << "%]   " << flush;
        
        if (scanPort(targetIp, port, 0, 500000)) { // 0.5s timeout
            cout << "\n[+] Port " << port << " is OPEN" << endl;
            openPorts++;
        }
    }

    cout << "\n\nScan Complete." << endl;
    cout << "Total Open Ports Found: " << openPorts << endl;
    
    return 0;
}
