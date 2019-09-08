var http = require('http');
var fs = require('fs');
var cp = require('child_process');
const hostname = 'localhost';
var port = 3000;
 fs.watch('temp.txt', () => {
    process.exit(1);
 });
    var server =  http.createServer((req,res)=> {
    fs.readFile("temp.txt", function(err, data) {
        var arr = [""];
        var k = 0;
        if(data) {
            for (var i = -0; i < data.length; i++) {
                if (data[i] == 10) {
                    k++;
                    arr[k] = "";
                } else if (data[i] !== 13) {
                    arr[k] = arr[k] + String.fromCharCode(data[i]);
                }
            }
                        var d = "";
                        if (k-9 >= 0) {
                            for (i = k-9; i<= k; i++) {
                                d = d + arr[i].toString() +'<br>';
                            }
                        } else {
                            for (i = 0; i <= k; i++) {
                                d = d + arr[i].toString() +'<br>';
                            }
                        }
        res.end('<html><body>' + d + '</body></html>');
        }
    });
});
server.listen(port, hostname, () => {
    console.log(`Server is not running at http://${hostname}:${port}/`);
});
