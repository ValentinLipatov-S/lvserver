var net = require('net');
 
var svr = net.createServer(function(sock) {
    console.log('CONNECT');
    sock.on('data', function(data) { console.log('MESSAGE'); sock.write(data);
    });
 
    sock.on('end', function() { console.log('DISCONNECT');
    });
});
 
var svraddr = '127.0.0.1';
var svrport = (process.env.PORT || 5000);
 
svr.listen(svrport);
console.log('Server Created at ' + svraddr + ':' + svrport + '\n');
