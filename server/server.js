const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 8080;

// express routing
app.use(express.static('public'));


// signaling
io.on('connection', function(socket){
    console.log('a user connecteda');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
      socket.broadcast.emit('chat message', msg);
    });
  });
  


// listener
http.listen(port || 8080, function () {
    console.log('listening on', port);
});
