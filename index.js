var i = 0;
var net = require('net');
var svrport = (process.env.PORT || 5000);
var svr = net.createServer(function(sock) {
    console.log('CONNECT ' + i++);
    sock.on('data', function(data) { console.log('MESSAGE'); sock.write(data);
    });
    sock.on('end', function() { console.log('DISCONNECT');
    });
}).listen(svrport);
 
console.log('Server Created at ' + svrport);
