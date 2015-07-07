(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.canvasEl = options.canvasEl;
    this.ctx = options.ctx;
    this.drawn = false;

  };

  MovingObject.prototype.collideWith = function (otherObj) {
    //
    // this.game.remove(otherObj);
    // this.game.remove(this);
  };

  MovingObject.prototype.draw = function (ctx) {
    // sample code from documentions
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    var x = this.pos[0];
    var y = this.pos[1];

    ctx.beginPath();
    ctx.arc(
      x,
      y,
      this.radius,
      0,
      Math.PI * 2
    );

    if (this.color) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var distX = otherObj.pos[0] - this.pos[0];
    var distY = otherObj.pos[1] - this.pos[1];

    var dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < (this.radius + otherObj.radius)) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.isWrappable = function () {
    return true;
  };

  MovingObject.prototype.move = function () {
    posX = this.pos[0];
    posY = this.pos[1];

    velX = this.vel[0];
    velY = this.vel[1];
    //

    posX += velX;
    posY += velY;

    var isOutBounds = this.game.isOutOfBounds([posX, posY]);
    var wrappable = this.isWrappable();

    if (isOutBounds) {
      if (wrappable) {
        this.pos = this.game.wrap([posX, posY]);
      } else {
        this.game.remove(this);
      }
    } else {
      this.pos = [posX, posY];
    }
  };
})();
