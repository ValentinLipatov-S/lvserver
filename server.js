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

  var ID = socket.id;
  clients.ID = socket;
	
  console.log('Client connected');
  console.log(clients);
  socket.on('disconnect', function () { 
    if(socket[ID] != undefined) delete socket[ID];
    console.log('Client disconnected'); });
  
  socket.on('message', function (msg) { 
    console.log('Client send messgae ' + msg); });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
