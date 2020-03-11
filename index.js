var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var state = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('connected a user');

  io.emit('state', state);

  socket.on('disconnect', function() {
    console.log('disconnected a user');
  })

  socket.on('move', function(m) {
    if (m == 'up') {
      ++state;
    }

    if (m == 'down') {
      --state;
    }
    
    io.emit('state', state);
  })
})

http.listen(4000, function(){
  console.log('listening on *:4000');
});

