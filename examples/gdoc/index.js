// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

var prevText = "";

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public/'));

// Chatroom

io.on('connection', function (socket) {
  // when the client emits 'new message', this listens and executes
  socket.on('init',function(data) {
	io.emit('text',prevText);
  });
  socket.on('text', function (data) {
    // we tell the client to execute 'text'
    //console.log(data);
    debugger;
    io.emit('text', data);
    prevText = data;
  });
});
