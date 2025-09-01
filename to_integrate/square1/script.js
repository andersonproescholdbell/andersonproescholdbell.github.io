var app = new Vue({
  el: '#app',
  data: {
    canw: 0,
    canh: 0,
    can: undefined,
    ctx: undefined
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
    inside: function(x, y, vs) {
      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
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

      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canw, this.canh);
      this.ctx.fillStyle = 'slategray';
      this.ctx.fill();
    },
    start: function() {
      //this.drawCircle((this.canw/2), (this.canh/2), 4, 'red');

      var points = [{x:(this.canw/2 - 300), y:(this.canh/2 - 300)},
                    {x:(this.canw/2 - 300), y:(this.canh/2 + 300)},
                    {x:(this.canw/2 + 300), y:(this.canh/2 + 300)},
                    {x:(this.canw/2 + 300), y:(this.canh/2 - 300)}];

      this.ctx.beginPath();
      this.ctx.moveTo(points[0].x, points[0].y);
      this.ctx.lineTo(points[1].x, points[1].y);
      this.ctx.lineTo(points[2].x, points[2].y);
      this.ctx.lineTo(points[3].x, points[3].y);
      this.ctx.lineTo(points[0].x, points[0].y);
      this.ctx.stroke();

      points.forEach((cords) => {
        this.drawCircle(cords.x, cords.y, 2, 'black');
      });

      //adding points
      var lastx = points[0].x, lasty = points[0].y, lastDir = -1, dots = 0, allDots = [];
      setInterval(() => {
        allDots = [];
        data = this.createDots(points, lastx, lasty, lastDir, dots, allDots);
        lastx = data.lastx, lasty = data.lasty, lastDir = data.lastDir, dots = data.dots, allDots = data.allDots;

        allDots.forEach((dot) => {
          this.drawCircle(dot.x, dot.y, 1, 'black');
        });

        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = 'slateblue';
        this.ctx.fillRect(this.canw-120, 0, 150, 30);
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(('Dots:'+dots), this.canw-5, 20);
      }, 1000/60);
    },
    createDots: function(points, lastx, lasty, lastDir, dots, allDots) {
      for (var i = 0; i < 7; i++) {
        var dir;
        while (1) {
          dir = this.randInt(0,4);
          if (dir != lastDir) {
            lastDir = dir;
            break;
          }
        }
        var newx = (lastx+points[dir].x)/2;
        var newy = (lasty+points[dir].y)/2;
        allDots.push({x:newx, y:newy});

        lastx = newx;
        lasty = newy;

        dots++;
      }
      return {lastx:lastx, lasty:lasty, lastDir:lastDir, dots:dots, allDots:allDots};
    }
  },
  mounted: function() {
    this.createCtx();
    this.start();
  }
});
