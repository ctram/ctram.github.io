(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  Asteroids.generateCornerCoord = function (rotation, origin, radius) {
    var x;
    var y;
    var result;
    var randomAngle = Math.random() * 40;
    rotation += randomAngle;


    if (rotation > 360) {
      rotation = 360;
    }

    var radians;

    if (rotation > 0 && rotation <= 90) {
      radians = Asteroids.Util.degToRad(rotation);
      x = radius * Math.sin(radians);
      y = radius * Math.cos(radians);
      result = [x, -y];
    } else if (rotation > 90 && rotation <= 180 ) {
      rotation -= 90;
      radians = Asteroids.Util.degToRad(rotation);
      x = radius * Math.cos(radians);
      y = radius * Math.sin(radians);
      result = [x, y];
    } else if (rotation > 180 && rotation <= 270){
      rotation -= 180;
      radians = Asteroids.Util.degToRad(rotation);
      x = radius * Math.sin(radians);
      y = radius * Math.cos(radians);
      result = [-x, y];
    } else if (rotation > 270 && rotation <= 360) {
      rotation -= 270;
      radians = Asteroids.Util.degToRad(rotation);
      x = radius * Math.cos(radians);
      y = radius * Math.sin(radians);
      result = [-x, -y];
    }
    return result;
  };

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.radius = Math.random() * 25;
    this.minRadius = 5;
    this.pos = options.pos;
    this.speed = Math.random() * 3;
    this.game = options.game;
    this.ctx = options.ctx;
    this.cornerCoords = [];
    this.numSides = parseInt(Math.random() * 9);
    this.minSides = 5;

    if (this.numSides < this.minSides) {
      this.numSides = this.minSides;
    }

    if (this.radius < this.minRadius) {
      this.radius = this.minRadius;
    }

    var increment = 360 / this.numSides;
    var rotation = 0;
    var coords = [];

    for (var i = 0; i < this.numSides; i++) {

      rotation += increment;
      // if (rotation > 360 ) {
      //   rotation = 360;
      // }
      //
      coords = Asteroids.generateCornerCoord(rotation, this.pos, this.radius);
      this.cornerCoords.push(coords);
    }

    Asteroids.MovingObject.call(this, {
      radius: this.radius,
      vel: Asteroids.Util.randomVel(this.speed),
      pos: this.pos,
      game: this.game
    });
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      // NOTE: turned off ship relocating for now
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function (ctx) {

    var coords;
    var orgX = this.pos[0];
    var orgY = this.pos[1];
    var deltaX;
    var deltaY;
    var x;
    var y;



    ctx.beginPath();
    for (var i = 0; i < this.numSides; i++) {
      coord = this.cornerCoords[i];
      deltaX = coord[0];
      deltaY = coord[1];
      x = orgX + deltaX;
      y = orgY + deltaY;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.strokeStyle="white";
    ctx.stroke();
  };
})();
