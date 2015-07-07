(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (options) {
    this.heading = 0;
    this.pos = options.pos;
    this.game = options.game;
    this.ctx = options.ctx;
    this.RADIUS = 5;
    this.COLOR = 'black';
    this.vel = [0, 0];
    this.sprite = new Image();
    this.sprite.src = 'assets/images/ship_1.png';

    Asteroids.MovingObject.call(this, {
      color: this.COLOR,
      radius: this.RADIUS,
      vel: this.vel,
      pos: this.pos,
      game: this.game,
      ctx: this.ctx
    });
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function () {
    var offsetX = -25;
    var offsetY = -20;

    var x = this.pos[0];
    var y = this.pos[1];
    var angleDiffMouse = this.game.angleDiffMouse(this.pos, this.game.mousePos);
    var deltaHeadingMouse = Math.abs(angleDiffMouse - this.heading);

    //
    if (deltaHeadingMouse >= 0) {
      // move heading clockwise
      this.heading += deltaHeadingMouse;
    } else {
      this.heading -= deltaHeadingMouse;
    }

    this.ctx.save();
    // move canvas to location of ship
    this.ctx.translate(x, y);
    var rotationAngle = Math.PI/180 * angleDiffMouse;

    // rotate canvas
    this.ctx.rotate(rotationAngle);

    // move canvas back to original position
    this.ctx.translate(-x, -y);

    // draw ship
    this.ctx.drawImage(this.sprite, x + offsetX, y + offsetY);

    // revert rotation of canvas
    this.ctx.restore();

    // Code for when ship was a dot. ///////////////////////////////////////
    // ctx.beginPath();
    // ctx.arc(
    //   x,
    //   y,
    //   this.radius,
    //   0,
    //   Math.PI * 2
    // );
    //
    // if (this.color) {
    //   ctx.fillStyle = this.color;
    //   ctx.fill();
    // } else {
    //   ctx.stroke();
    // }
    //////////////////////////////////////////////////////////////////////////
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      game: this.game,
      shipHeading: this.heading
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.power = function (impulse) {
    impX = impulse[0];
    impY = impulse[1];

    this.vel[0] += impX;
    this.vel[1] += impY;
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
  };
})();
