(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroids = window.Asteroids;

  var Game = Asteroids.Game = function (options) {
    this.$score = $('.score');
    this.score = 0;
    this.ctx = options.ctx;
    this.DIM_X = options.DIM_X;
    this.DIM_Y = options.DIM_Y;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.mousePos = {x: 0, y: 0};
    this.ship = new Asteroids.Ship({
      // NOTE: static position until game is done
      pos: [400, 400],
      game: this,
      ctx: this.ctx
    });
    this.canvasEl = options.canvasEl;
    this.canvasEl.addEventListener('mousemove', function(evt) {
      var mouseX = this.getMousePos(this.canvasEl, evt).x;
      var mouseY = this.getMousePos(this.canvasEl, evt).y;

      this.mousePos = {x: mouseX, y: mouseY};

      // var mousePos = this.getMousePos(this.canvasEl, evt);
      var angleDiffMouse = this.angleDiffMouse(this.ship.pos, this.mousePos);
      this.ship.heading = angleDiffMouse;
      // this.mousePos = mousePos;
      this.message = 'Mouse position: X: ' + this.mousePos.x + ' Y: ' + this.mousePos.y + ', Heading: ' + this.ship.heading;
      // this.writeMessage(this.canvasEl, message);
    }.bind(this), false);
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else {
      // bullet
      this.bullets.push(obj);
    }
  };

  Game.prototype.addAsteroids = function () {

    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var asteroid = new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this,
        ctx: this.ctx
      });

      this.asteroids.push(asteroid);
    }
  };

  Game.prototype.allObjects = function () {

    arrShip = [this.ship];
    return arrShip.concat(this.bullets).concat(this.asteroids);
  };

  Game.prototype.angleDiffMouse = function (objPos, mousePos) {
    //
    var mouseX = mousePos.x;
    var mouseY = mousePos.y;

    var objX = objPos[0];
    var objY = objPos[1];

    var deltaX = mouseX - objX;
    var deltaY = mouseY - objY;

    var diffAngle;

    if (deltaX > 0 && deltaY < 0) {
      // quadrant I
      diffAngle = Asteroids.Util.arcTanDegrees(deltaX, Math.abs(deltaY));
    } else if (deltaX > 0 && deltaY > 0) {
      // quadrant II
      diffAngle = Asteroids.Util.arcTanDegrees(deltaY,  deltaX) + 90;
    } else if (deltaX < 0 && deltaY > 0) {
      // quadrant III
      diffAngle = Asteroids.Util.arcTanDegrees(Math.abs(deltaX), deltaY) + 180;
    } else if (deltaX < 0 && deltaY < 0) {
      // quadrant IV
      diffAngle = Asteroids.Util.arcTanDegrees(Math.abs(deltaY), Math.abs(deltaX)) + 270;
    } else {
      diffAngle = 0;
    }
    return diffAngle;

  };

  Game.prototype.checkCollisions = function () {
    var num_objs = this.allObjects().length;
    for (var i = 0; i < num_objs - 1; i++) {
      for (var j = 0; j < num_objs - 1; j++) {
        if (i === j) {
          continue;
        } else {
          var obj1 = this.allObjects()[i];
          var obj2 = this.allObjects()[j];

          if (obj1.isCollidedWith(obj2)) {
            obj1.collideWith(obj2);
            num_objs = this.allObjects().length;
          }
        }
      }
    }
  };

  Game.prototype.draw = function () {

    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    var obj;
    for (var i = 0; i < this.allObjects().length; i++) {
      obj = this.allObjects()[i];
      obj.draw(this.ctx);
    }
    // NOTE: to show mouse attributes on screen - to remove later.
    this.ctx.font = '18pt Calibri';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(this.message, 10, 25);
  };

  Game.prototype.getMousePos = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };

  Game.prototype.isOutOfBounds = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if ((x > this.DIM_X || x < 0) || (y > this.DIM_Y || y < 0)) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.allObjects().length; i++) {

      this.allObjects()[i].move();
    }
  };

  Game.prototype.randomPosition = function () {
    randomX = this.DIM_X * Math.random();
    randomY = this.DIM_Y * Math.random();


    return [randomX, randomY];
  };

  Game.prototype.remove = function (obj) {
    var i;
    if (obj instanceof Asteroids.Asteroid) {
      i = this.asteroids.indexOf(obj);
      this.asteroids.splice(i, 1);
    } else {
      // bullet
      i = this.bullets.indexOf(obj);
      this.bullets.splice(i, 1);
    }
  };

  Game.prototype.drawScore = function (score) {
    this.$score.val(score);
  };

  Game.prototype.isWin = function () {
    // TODO: >>>>>>>
    if (this.asteroids.length === 0) {
      return true;
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    x = x % this.DIM_X;
    y = y % this.DIM_Y;

    if (x < 0) {
      x = this.DIM_X - x;
    }

    if (y < 0) {
      y = this.DIM_Y - y;
    }

    return [x, y];
  };

  Game.prototype.writeMessage = function (canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '8pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
  };
})();
