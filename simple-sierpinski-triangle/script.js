var app = new Vue({
  el: '#app',
  data: {
    canvasBgColor: 'slategray',//color of the canvas background
    dotCounterBgColor: 'slateblue',//color of the background behind the dot counter
    polySides: 3,//number of sides of the polygon (min 3)
    minArea: 200000,
    sideDotRad: 3,//the dots that make up the side's radii
    sideDotColor: 'blue',//the dots that make up the side's colorl either random or color name or hex
    dotRad: 1,//radius of the dots being generated in px
    dotColor: 'random',//color of generated dots. either random or color name or hex
    dotMove: 2,// 1/dotMove will be how far dots are placed towards their destination
    cycle: 10,//how often a dot is generated in milleseconds
    canw: 10,
    canh: 10,
    can: undefined,
    ctx: undefined,
    active: false
  },
  methods: {
    randInt: function(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    },
    randCirc: function() {
      var randx = this.randInt(0, (this.canw+1));
      var randy = this.randInt(0, (this.canh+1));
      return {x: randx, y: randy};
    },
    getDist: function(x1, y1, x2, y2) {
      var a = x1 - x2;
      var b = y1 - y2;
      return Math.sqrt( a*a + b*b );
    },
    findCenter: function(points) {
      var x = 0, y = 0, len = points.length;
      for (var i = 0; i < len; i++) {
        x += points[i].x;
        y += points[i].y;
      }
      return {x: x / len, y: y / len};
    },
    findAngles: function(c, points) {
      var len = points.length, p, dx, dy;
      for (var i = 0; i < len; i++) {
        p = points[i];
        dx = p.x - c.x;
        dy = p.y - c.y;
        p.angle = Math.atan2(dy, dx);
      }
    },
    polyArea: function(points) {
      var area = 0, n = points.length;
      for (var i=0; i < n-1;i++){
        area += points[i].x * points[i+1].y - points[i].y* points[i+1].x;
      }
      if (n > 2){
        area += points[n-1].x * points[0].y - points[n-1].y * points[0].x;
      }
      return Math.abs(area/2);
    },
    randColor: function() {
      return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    },
    drawCircle: function(x, y, rad, color) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, rad, 0, 2*Math.PI, false);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.stroke();
    },
    drawLine: function(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    },
    canvas: function() {
      var points = [];
      while (1) {
        for (var i = 0; i < this.polySides; i++) {
          points.push(this.randCirc());
        }
        if (this.polyArea(points) > this.minArea) {
          points.forEach((cords) => {
            if (this.sideDotColor == 'random') {
              this.drawCircle(cords.x, cords.y, this.sideDotRad, this.randColor());
            }else {
              this.drawCircle(cords.x, cords.y, this.sideDotRad, this.sideDotColor);
            }
          });
          break;
        }else {
          points = [];
        }
      }

      this.findAngles(this.findCenter(points), points);
      points.sort(function(a, b) {
        if (a.angle > b.angle) return 1;
        else if (a.angle < b.angle) return -1;
        return 0;
      });

      for (var i = 0; i < points.length; i++) {
        if (i !== points.length-1) {
          this.drawLine(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
        }else {
          this.drawLine(points[i].x, points[i].y, points[0].x, points[0].y);
        }
      }

      var lastx = points[0].x, lasty = points[0].y, dots = 0;
      this.active = true;
      var loop = setInterval(() => {
        if (!this.active) {
          clearInterval(loop);
        }
        var dir = this.randInt(0,points.length), newx, newy;
        newx = (lastx+points[dir].x)/this.dotMove;
        newy = (lasty+points[dir].y)/this.dotMove;

        if (this.dotColor == 'random') {
          this.drawCircle(newx, newy, this.dotRad, this.randColor());
        }else {
          this.drawCircle(newx, newy, this.dotRad, this.dotColor);
        }
        lastx = newx;
        lasty = newy;

        dots++;
        this.ctx.fillStyle = this.dotCounterBgColor;
        this.ctx.fillRect(this.canw-120, 0, 150, 30);
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(('Dots:'+dots), this.canw-5, 20);
      }, this.cycle);
    },
    start: async function() {
      this.active = false;
      await this.sleep(100);
      this.clearCan();
      this.canvas();
    },
    stop: function() {
      this.active = false;
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    createCtx: function() {
      this.can = document.getElementById('ctx');
      this.ctx = this.can.getContext('2d');
      this.ctx.canvas.width  = window.innerWidth-15;
      this.ctx.canvas.height = window.innerHeight-15;
      this.canw = this.can.width;
      this.canh = this.can.height;

      this.clearCan();

      this.ctx.font = '30px Arial';
      this.ctx.fillStyle = 'black';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Scroll Down To Start', this.canw/2, this.canh/2);
      this.ctx.font = '18px Arial';
    },
    clearCan: function() {
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canw, this.canh);
      this.ctx.fillStyle = this.canvasBgColor;
      this.ctx.fill();
    }
  },
  mounted: function() {
    this.createCtx();
  }
});
