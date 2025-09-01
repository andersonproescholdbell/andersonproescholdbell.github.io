const can = document.getElementById('ctx');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
ctx.font = "19px Arial";
const chatText = document.getElementById('chat-text');
const chatInput = document.getElementById('chat-input');
const chatForm = document.getElementById('chat-form');

function lightOrDark(color) {
  var r, g, b, hsp;
  if (color.match(/^rgb/)) {
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {
    color = +("0x" + color.slice(1).replace(
    color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }
  hsp = Math.sqrt(
  0.299 * (r * r) +
  0.587 * (g * g) +
  0.114 * (b * b)
  );
  if (hsp>127.5) {
    return 'light';
  }
  else {
    return 'dark';
  }
}

var socket = io();

socket.on('addToChat', function(data) {
  chatText.innerHTML += '<div>' + data + '</div>';
});

chatForm.onsubmit = function(e) {
  e.preventDefault();
  socket.emit('sendMsgToServer', [chatInput.value, 'spectator']);
  chatInput.value = '';
}

socket.on('updateCanvas', function(data) {
  const PLAYER_LIST = data.players;
  const FOOD_LIST = data.food;
  ctx.clearRect(0,0,canWidth,canHeight);
  for (foodId in FOOD_LIST) {
    var food = FOOD_LIST[foodId]
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = food.color;
    ctx.fill();
  }
  for (playerId in PLAYER_LIST) {
    var player = PLAYER_LIST[playerId];
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.fillStyle = player.nameColor;
    ctx.textAlign = 'center';
    ctx.fillText(player.name, player.x, player.y+3);
  }

});

document.getElementById('join').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const color = document.getElementById('cPicker').value;
  let nameColor;
  if (lightOrDark(color) == 'light') {
    nameColor = 'black';
  }else {
    nameColor = 'white';
  }
  socket.emit('join', [name, color, nameColor]);
});

document.onkeydown = function(event) {
  if (event.keyCode === 39) //right
    socket.emit('keyPress', {key:'right',state:true});
  else if (event.keyCode === 40) //down
    socket.emit('keyPress', {key:'down',state:true});
  else if (event.keyCode === 37) //left
    socket.emit('keyPress', {key:'left',state:true});
  else if (event.keyCode === 38) //forward
    socket.emit('keyPress', {key:'up',state:true});
}

document.onkeyup = function(event) {
  if (event.keyCode === 39) //right
    socket.emit('keyPress', {key:'right',state:false});
  else if (event.keyCode === 40) //down
    socket.emit('keyPress', {key:'down',state:false});
  else if (event.keyCode === 37) //left
    socket.emit('keyPress', {key:'left',state:false});
  else if (event.keyCode === 38) //forward
    socket.emit('keyPress', {key:'up',state:false});
}
