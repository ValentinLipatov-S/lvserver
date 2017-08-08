'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var clients = {};

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function (socket) {

  clients[socket.id.toString()] = socket;
  console.log('Client connected');
	
  socket.on('disconnect', function () { 
    if(clients[socket.id.toString()] != undefined) delete clients[socket.id.toString()];
    console.log('Client disconnected'); });
  /*MESSAGE*/
  socket.on('message', function (msg) { 
    for(var key in clients) clients[key].json.send({'comand': 'message', 'user_id': socket.id.toString(), 'text': msg}); 
    //console.log('Client send messgae ' + msg); 
  });
});
//io.emit('time', new Date().toTimeString());
