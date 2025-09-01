var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log('Server has started.');
//-------------------------------------------------

var SOCKET_LIST = {};
var PLAYER_LIST = {};
var canvas = {
  w:1625,
  h:900
}
var FOOD_LIST = [];
const sizes = {
  fRadius:12.5,
  pRadius:25
}
var foodCount = 0;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}

function pairwise(list) {
  if (list.length < 2) { return []; }
  var first = list[0],
      rest  = list.slice(1),
      pairs = rest.map(function (x) { return [first, x]; });
  return pairs.concat(pairwise(rest));
}

function pairs(array1, array2) {
  var combos = [];
  array1.forEach(function(a1){
    array2.forEach(function(a2){
      combos.push([a1, a2]);
    });
  });
  return combos;
}

function updateCanvas() {
  io.emit('updateCanvas', {
    players:PLAYER_LIST,
    food:FOOD_LIST
  });
}

function foodContact() {
  for (playerId in PLAYER_LIST) {
    player = PLAYER_LIST[playerId];
    for (foodId in FOOD_LIST) {
      food = FOOD_LIST[foodId];
      const distance  = getDistance(player.x, player.y, food.x, food.y);
      const range = player.radius+food.radius;
      if (distance < range) {
        var area = Math.pow(player.radius,2)*Math.PI;
        area += Math.pow(food.radius,2)*Math.PI;
        player.radius = Math.sqrt(area/Math.PI);
        FOOD_LIST.splice(foodId, 1);
      }
    }
  }
}

function resetPos(playerId) {
  var player = PLAYER_LIST[playerId];
  player.x = getRndInteger(sizes.pRadius,(canvas.w-sizes.pRadius));
  player.y = getRndInteger(sizes.pRadius,(canvas.h-sizes.pRadius));
  player.radius = sizes.pRadius;
  playerContact();
  foodContact();
  updateCanvas();
}

function playerContact(player) {
  if (Object.keys(PLAYER_LIST).length > 1) {
    var array2 = [];
    for (playerId1 in PLAYER_LIST) {
      array2.push(PLAYER_LIST[playerId1]);
    }
    const combos = pairs([player], array2);
    for (var i = 0; i < combos.length; i++) {
      const distance = getDistance(combos[i][0].x, combos[i][0].y, combos[i][1].x, combos[i][1].y);
      const range = combos[i][0].radius+combos[i][1].radius;
      if (distance < range) {
        if (combos[i][0].radius > combos[i][1].radius) {
          var area = (Math.pow(combos[i][0].radius,2)*Math.PI) + (Math.pow(combos[i][1].radius,2)*Math.PI);
          PLAYER_LIST[combos[i][0].id].radius = Math.sqrt(area/Math.PI);
          resetPos(combos[i][1].id);
        }else if (combos[i][1].radius > combos[i][0].radius) {
          var area = (Math.pow(combos[i][0].radius,2)*Math.PI) + (Math.pow(combos[i][1].radius,2)*Math.PI);
          PLAYER_LIST[combos[i][1].id].radius = Math.sqrt(area/Math.PI);
          resetPos(combos[i][0].id);
        }
      }
    }
  }
}

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
  SOCKET_LIST[socket.id] = socket;
  console.log(socket.id + ' has connected.');
  socket.on('join', function(data) {
    PLAYER_LIST[socket.id] = {
      id: socket.id,
      x:getRndInteger(sizes.pRadius,(canvas.w-sizes.pRadius)),
      y:getRndInteger(sizes.pRadius,(canvas.h-sizes.pRadius)),
      radius:sizes.pRadius,
      color:data[1],
      name:data[0],
      nameColor:data[2],
      pressingRight:false,
      pressingLeft:false,
      pressingUp:false,
      pressingDown:false,
      maxSpeed:3,
    };
    playerContact(PLAYER_LIST[socket.id]);
    updateCanvas();
  });

  socket.on('keyPress', function(press) {
    try {
      var player = PLAYER_LIST[socket.id];
      if (press.key == 'right') {
        if (press.state) {
          player.pressingRight = true;
        }else {
          player.pressingRight = false;
        }
      }
      if (press.key == 'left') {
        if (press.state) {
          player.pressingLeft = true;
        }else {
          player.pressingLeft = false;
        }
      }
      if (press.key == 'up') {
        if (press.state) {
          player.pressingUp = true;
        }else {
          player.pressingUp = false;
        }
      }
      if (press.key == 'down') {
        if (press.state) {
          player.pressingDown = true;
        }else {
          player.pressingDown = false;
        }
      }
    }catch {
      //player hasn't joined yet
    }
  });

  socket.on('sendMsgToServer', function(data) {
    var playerName;
    try {
      playerName = PLAYER_LIST[socket.id].name;
    }catch {
      playerName = data[1];
    }

    io.emit('addToChat', playerName+': ' + data[0]);
  });

  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id];
    console.log(socket.id + ' has disconnected.');
    try {
      delete PLAYER_LIST[socket.id];
    }
    catch {
      //deleted
    }
    updateCanvas();
  });

});

setInterval(function() {
  for (playerId in PLAYER_LIST) {
    var player = PLAYER_LIST[playerId];
    player.maxSpeed = 400*(1/player.radius);
    if (player.pressingRight) {
      player.x += player.maxSpeed;
      playerContact(player);
      if (player.x > canvas.w) {
        player.x = canvas.w;
      }
    }
    if (player.pressingLeft) {
      player.x -= player.maxSpeed;
      playerContact(player);
      if (player.x < 0) {
        player.x = 0;
      }
    }
    if (player.pressingUp) {
      player.y -= player.maxSpeed;
      playerContact(player);
      if (player.y < 0) {
        player.y = 0;
      }
    }
    if (player.pressingDown) {
      player.y += player.maxSpeed;
      playerContact(player);
      if (player.y > canvas.h) {
        player.y = canvas.h;
      }
    }
    foodContact();
    updateCanvas();
  }
},1000/60);

setInterval(function() {
  const totalFood = 50;
  var food = {
    id: foodCount,
    x:getRndInteger(sizes.fRadius,(canvas.w-sizes.fRadius)),
    y:getRndInteger(sizes.fRadius,(canvas.h-sizes.fRadius)),
    radius:sizes.fRadius,
    color:'blue'
  };
  FOOD_LIST.push(food);
  foodCount++;
  foodContact();
  updateCanvas();
},1000/1);
