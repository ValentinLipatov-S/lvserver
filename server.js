'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var clients = {};

var chatroom = {
	clients: {}
};
var chatrooms = {};


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
	  
    if(msg['comand'] == 'add_to_chatroom') {
    	if(chatrooms[msg['chatroom_name']].clients.indexOf(msg['user_id']) == -1) {
		chatrooms[msg['chatroom_name']].clients.push(msg['user_id']);
	}
    }    
    if(msg['comand'] == 'kick_from_chatroom') {
	var index = chatrooms[msg['chatroom_name']].clients.indexOf(msg['user_id']);
    	if(index > -1) {
		chatrooms[msg['chatroom_name']].clients.slice(index, 1);
	}
    }    
    if(msg['comand'] == 'create_chatroom') {
	    if(chatrooms[msg['chatroom_name']] == undefined) {
		    var this_chatroom = chatroom;
		    this_chatroom.clients.push(socket.id.toString());
		    chatrooms[msg['chatroom_name']] = this_chatroom;
		    
		    console.log('create_chatroom');
		    
		    for(var key in clients) clients[key].json.send({'comand': 'message', 'user_id': socket.id.toString(), 'text': "chatroomcreated"}); 
	    }
    }
   if(msg['comand'] == 'send_to_chatroom') {
	   var current_chatroom = chatrooms[msg['chatroom_name']];
	   if(current_chatroom != undefined) {
   		for(var i = 0; i < current_chatroom.clients.length; i++)
		{
			clients[current_chatroom.clients[i]].send({'comand': 'message', 'user_id': socket.id.toString(), 'text': msg['message_text']});
		}
	   }
   }	    
	  
    for(var key in clients) clients[key].json.send({'comand': 'message', 'user_id': socket.id.toString(), 'text': msg}); 
    //console.log('Client send messgae ' + msg); 
  });
});
//io.emit('time', new Date().toTimeString());
