// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var redis = require('socket.io-redis');
var port = process.env.PORT || 8000;

// io.adapter(redis({ host: 'redis', port: 6379 }));
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
app.get('/socket', function (req, res) {
  res.send('Hello World!');
});
// Routing
// app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    var ret = {
      username: socket.username,
      message: data,
      timestamp : Math.floor(new Date())
    };

    io.emit('new message', ret);
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
      timestamp : Math.floor(new Date())
    });
  });



  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers,
        timestamp : Math.floor(new Date())
      });
    }
  });
});
