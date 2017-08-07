 var net = require('net');
//Keep track of connections
var count = 0;

var server = net.createServer(function (connection) {
    connection.setEncoding('utf8');
    connection.write(
        '\n > welcome to \033[92mnode-chat\033[39m!' +
        '\n > ' +count+ ' other people are connected at this time.' +
        '\n > please write your name and press enter: '
    );
    count++;
    connection.on('data', function (data) {
       console.log(data);
    });

    connection.on('close', function (error) {
        console.log('Error: ' + error);
        count--;
    });
});

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('\033[90m   server listening on *:' + port + '\033[39m');
});
