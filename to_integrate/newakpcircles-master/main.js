const game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

class Player extends Phaser.Sprite {
  constructor(x, y, radius, color) {
    let graphics = new Phaser.Graphics(game, 0, 0);
    graphics.beginFill(color, 1);
    graphics.drawCircle(x, y, radius*2);

    super(game, x, y, graphics.generateTexture());
    this.anchor.set(0.5, 0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  }
}

var socket = io();

let players = {};
let newPlayers = [];
socket.on('serverUpdate', data => {
  newPlayers = data;
});

function preload() {

}

let player,
    keys;
function create() {
  game.stage.backgroundColor = '#124184';

  game.world.setBounds(0, 0, 1920, 1920);
  addTiles(75);

  keys = {
    w: game.input.keyboard.addKey(Phaser.Keyboard.W),
    a: game.input.keyboard.addKey(Phaser.Keyboard.A),
    s: game.input.keyboard.addKey(Phaser.Keyboard.S),
    d: game.input.keyboard.addKey(Phaser.Keyboard.D)
  }

  game.physics.startSystem(Phaser.Physics.ARCADE);
}

function update() {
  if (keys.w.isDown) socket.emit('keystroke', 'up');
  if (keys.a.isDown) socket.emit('keystroke', 'left');
  if (keys.s.isDown) socket.emit('keystroke', 'down');
  if (keys.d.isDown) socket.emit('keystroke', 'right');
}

function render() {
  newPlayers.forEach(player => {
    if (typeof players[player.id] === 'undefined') {
      players[player.id] = new Player(player.x,player.y,player.radius,player.color);
      console.log(player.x, player.y);
      game.add.existing(players[player.id]);
      player.self && game.camera.follow(players[player.id]);
    }else {
      players[player.id].x = player.x;
      players[player.id].y = player.y;
    }
  });
}

function addTiles(width) {
  var tilesWide = Math.ceil(game.world.bounds.width/width);
  var tilesHigh = Math.ceil(game.world.bounds.height/width);

  let graphics = new Phaser.Graphics(game, 0, 0);
  graphics.lineStyle(2, 0x000000, 0.5)

  for (var i = 0; i < tilesWide; i++) {
    for (var j = 0; j < tilesHigh; j++) {
      // let color = (i%2) ^ (j%2) ? 0xffffff : 0xffffff;
      let color = (Math.random()*0xFFFFFF<<0);
      graphics.beginFill(color, 1);
      graphics.drawRect(width*i, width*j, width, width);
    }
  }
  game.add.existing(graphics);
}
