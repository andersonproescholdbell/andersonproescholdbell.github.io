const socketio = require('socket.io');
const express = require('express');
const app = express();
const http = require('http');
const serv = http.Server(app);
const io = socketio(serv);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));

serv.listen(process.env.PORT || 2000);
console.log('Server has started.');
//-------------------------------------------------

const world = {
  width: 1920,
  height: 1920,
  players: {},
  ids: []
}

function assignId() {
  if (world.ids.length > 0) {
    for (var i = 0; i < world.ids.length; i++) {
      if (!world.ids.includes(i)) {
        world.ids.push(i);
        return i;
      }
    }
    world.ids.push(world.ids[world.ids.length-1]+1);
    return world.ids[world.ids.length-1];
  }else {
    world.ids.push(0);
    return 0;
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.id = assignId();
    this.color = (Math.random()*0xFFFFFF<<0);
  }
  getData() {
    return {
      x: this.x,
      y: this.y,
      radius: this.radius,
      id: this.id,
      color: this.color
    }
  }
}

io.sockets.on('connection', socket => {
  world.players[socket.id] = new Player(
    randInt(0, world.width),
    randInt(0, world.height)
  );
  console.log(world.players[socket.id].id + ' has connected.');

  socket.on('disconnect', () => {
    console.log(world.players[socket.id].id + ' has disconnected.');
    world.ids.splice(world.ids.indexOf(world.players[socket.id].id), 1);
    delete world.players[socket.id];
  });

  socket.on('keystroke', dir => {
    if (dir == 'up') world.players[socket.id].y -= 5;
    if (dir == 'left') world.players[socket.id].x -= 5;
    if (dir == 'down') world.players[socket.id].y += 5;
    if (dir == 'right') world.players[socket.id].x += 5;
    if (world.players[socket.id].x < 0) {
      world.players[socket.id].x += 5;
    }
    if (world.players[socket.id].y < 0) {
      world.players[socket.id].y += 5;
    }
  });

  setInterval(() =>  {
    for (let id in world.players) {
      let player = world.players[id];
      let players = Object.values(world.players).map(p => p.getData());
      players.forEach(p => {
        p.self = p.id === player.id;
      });
      io.sockets.connected[id].emit(
        'serverUpdate',
        players
      );
    }
  }, 1000/60);
});
