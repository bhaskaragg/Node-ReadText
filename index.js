const express = require('express');
const cors = require('cors');
var http = require('http');
var fs = require('fs');
var cp = require('child_process');
const hostname = 'localhost';
var port = 3000;
//var server = http.createServer((req, res) => {
const app = express();
app.use(cors());
app.use((req, res, next) => {
    fs.readFile("temp.txt", function (err, data) {
        var arr = [""];
        var k = 0;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] == 10) {
                    k++;
                    arr[k] = "";
                } else if (data[i] !== 13) {
                    arr[k] = arr[k] + String.fromCharCode(data[i]);
                }
            }
            var d = "";
            if (k - 9 >= 0) {
                for (i = k-9; i<=k; i++) {
                    d = d + arr[i].toString() + '\n';
                }
            } else {
                for (i = 0; i<=k; i++) {
                    d = d + arr[i].toString() + '\n';
                }
            }
            res.setHeader('Content-Type', 'text/plaintext');
            res.end(d);
        }
    });
    fs.watch('temp.txt', () => {
        // location.reload();
        // //process.exit(1);
        // process.reload();
        console.log('File changed');
        //res.end('<html><body>' + d + '</body></html>');
    });

});

const server = http.createServer(app);
const io = require('socket.io')(server);
io.on('connection', function (client) {
    console.log("Socket connection is ON!");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
fs.watchFile('temp.txt', function (curr, prev) {
    // file changed push this info to client.
    console.log("file Changed");
    io.emit('fileChanged', 'File has been changed.');
});

