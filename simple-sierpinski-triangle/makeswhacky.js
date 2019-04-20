//graphic variables
const bgColor = 'slategray';//color of the canvas background
const dotBGColor = 'slateblue';//color of the background behind the dot counter

const sides = 4;//number sides in the polygon (min 3)
const initDotRad = 1;//the initial dots' radii
const initDotColor = 'random';//the initial dots' color

const dotRad = 1;//radius of the dots being generated in px
const dotColor = 'random';//color of generated dots. either random or color name or hex

const dotMove = 2;// 1/dotMove will be how far dots are placed towards their destination
const cycleMS = 10;//cycle length in milleseconds

//creating canvas
const can = document.getElementById('ctx');
const ctx = can.getContext('2d');
ctx.canvas.width  = window.innerWidth-15;
ctx.canvas.height = window.innerHeight-15;
const canw = can.width;
const canh = can.height;
ctx.font = '18px Arial';

ctx.beginPath();
ctx.rect(0, 0, canw, canh);
ctx.fillStyle = bgColor;
ctx.fill();

function randColor() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

function drawCircle(x, y, rad, color) {
  ctx.beginPath();
  ctx.arc(x, y, rad, 0, 2*Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randCirc() {
  var randx = randInt(0, (canw+1));
  var randy = randInt(0, (canh+1));
  return {x: randx, y: randy};
}

function getDist(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.sqrt( a*a + b*b );
}

function findCenter(points) {
  var x = 0, y = 0, len = points.length;
  for (var i = 0; i < len; i++) {
    x += points[i].x;
    y += points[i].y;
  }
  return {x: x / len, y: y / len};
}

function findAngles(c, points) {
  var len = points.length, p, dx, dy;
  for (var i = 0; i < len; i++) {
    p = points[i];
    dx = p.x - c.x;
    dy = p.y - c.y;
    p.angle = Math.atan2(dy, dx);
  }
}

function polyArea(points) {
  var area = 0, n = points.length;
  for (var i=0; i < n-1;i++){
    area += points[i].x * points[i+1].y - points[i].y* points[i+1].x;
  }

  if (n > 2){
    area += points[n-1].x * points[0].y - points[n-1].y * points[0].x;
  }

  return area/2;
}

var points = [];
while (1) {
  for (var i = 0; i < sides; i++) {
    points.push(randCirc());
    drawCircle(points[i].x, points[i].y, 3, 'blue');
  }
  console.log(polyArea(points));
  if (polyArea(points) > 200000) {
    break;
  }
}

findAngles(findCenter(points), points);
points.sort(function(a, b) {
  if (a.angle > b.angle) return 1;
  else if (a.angle < b.angle) return -1;
  return 0;
});

for (var i = 0; i < points.length; i++) {
  if (i !== points.length-1) {
    drawLine(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
  }else {
    drawLine(points[i].x, points[i].y, points[0].x, points[0].y);
  }
}

var lastx = points[0].x, lasty = points[0].y, dots = 0;
setInterval(function() {
  var dir = randInt(0,points.length), newx, newy;
  newx = (lastx+points[dir].x)/dotMove;
  newy = (lasty+points[dir].y)/dotMove;

  if (dotColor == 'random') {
    drawCircle(newx, newy, dotRad, randColor());
  }else {
    drawCircle(newx, newy, dotRad, dotColor);
  }
  lastx = newx;
  lasty = newy;

  dots++;
  ctx.fillStyle = dotBGColor;
  ctx.fillRect(canw-120, 0, 150, 30);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  ctx.fillText(('Dots:'+dots), canw-5, 20);
}, cycleMS);
