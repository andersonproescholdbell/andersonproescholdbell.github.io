//graphic variables
const bgColor = 'slategray';//color of the canvas background
const dotBGColor = 'slateblue';//color of the background behind the dot counter
const dotRad = 1;//radius of the dots being generated in px
const dotMove = 2;// 1/dotMove will be how far dots are placed towards their destination
const cycleMS = 10;//cycle length in milleseconds
const dotColor = 'random';//color of generated dots. either random or color name or hex
const initDotsCount = 3;//number of initial dots CURRENTLY ONLY WORKS WITH 3
const initDotRad = 1;//the initial dots' radii
const initDotColor = 'random';//the initial dots' color

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
  return [randx, randy];
}

function getDist(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.sqrt( a*a + b*b );
}

var points = [];
while (1) {
  points = [];
  for (var i = 0; i < initDotsCount; i++) {
    points.push(randCirc());
  }
  var area = Math.abs(points[0][0]*(points[1][1]-points[2][1]) + points[1][0]*(points[2][1]-points[0][1]) + points[2][0]*(points[0][1]-points[1][1]))/2
  if (area > 200000) {
    if (initDotColor == 'random') {
      drawCircle(points[0][0], points[0][1], initDotRad, randColor());
      drawCircle(points[1][0], points[1][1], initDotRad, randColor());
      drawCircle(points[2][0], points[2][1], initDotRad, randColor());
    }else {
      drawCircle(points[0][0], points[0][1], initDotRad, initDotColor);
      drawCircle(points[1][0], points[1][1], initDotRad, initDotColor);
      drawCircle(points[2][0], points[2][1], initDotRad, initDotColor);
    }

    break;
  }
}

var lastx = points[0][0];
var lasty = points[0][1];
var dots = 0;
setInterval(function() {
  const point = randInt(1,4);
  var newx;
  var newy;
  if (point == 1) {
    newx = (lastx+points[0][0])/dotMove;
    newy = (lasty+points[0][1])/dotMove;
  }else if(point == 2) {
    newx = (lastx+points[1][0])/dotMove;
    newy = (lasty+points[1][1])/dotMove;
  }else {
    newx = (lastx+points[2][0])/dotMove;
    newy = (lasty+points[2][1])/dotMove;
  }
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
