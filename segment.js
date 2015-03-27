(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Segment = Nokia.Segment = function (options) {
    this.pos = options.pos;
    this.dir = options.dir;
    this.index = options.index;
    this.snake = options.snake;
  };

  Segment.prototype.classIfLeader = function () {
    return this.index === 0 ? ' first' : '';
  };

  Segment.prototype.leader = function () {
    return this.snake.segments[this.index - 1];
  };

  Segment.prototype.follower = function () {
    return this.snake.segments[this.index + 1];
  };

  Segment.prototype.classIfTopLeftCorner = function () {
    return this._isTopLeftCorner() ? ' top-left-corner' : '';
  };

  Segment.prototype.classIfTopRightCorner = function () {
    return this._isTopRightCorner() ? ' top-right-corner' : '';
  };

  Segment.prototype.classIfBottomLeftCorner = function () {
    return this._isBottomLeftCorner() ? ' bottom-left-corner' : '';
  };

  Segment.prototype.classIfBottomRightCorner = function () {
    return this._isBottomRightCorner() ? ' bottom-right-corner' : '';
  };

  Segment.prototype.liClasses = function () {
    var classes = 'snake ' +
                  this.dir +
                  this.classIfLeader();

    if (this.follower() && this.leader()) {
      classes += this.classIfTopLeftCorner() +
                 this.classIfTopRightCorner() +
                 this.classIfBottomLeftCorner() +
                 this.classIfBottomRightCorner();
    }

    return classes;
  };

  Segment.prototype.dup = function () {
    return new Nokia.Segment ({
      pos: this.pos.slice(),
      dir: this.dir,
      index: this.index,
      snake: this.snake
    });
  };

  Segment.prototype._isTopLeftCorner = function () {
    return (
      Nokia.Snake.CORNERS.TL.follower.indexOf(this.follower().dir) !== -1 &&
      Nokia.Snake.CORNERS.TL.leader.indexOf(this.leader().dir) !== -1
    ) || (
      this.follower().dir === this.leader().dir &&
      Nokia.Snake.CORNERS.TL.leader.indexOf(this.leader().dir) !== -1 &&
      Nokia.Snake.CORNERS.TL.follower.indexOf(this.dir) !== -1
    );
  };

  Segment.prototype._isTopRightCorner = function () {
    return (this.follower().dir === 'N' && this.leader().dir === 'W') ||
           (this.follower().dir === 'E' && this.leader().dir === 'S') ||
           (this.follower().dir === 'E' && this.leader().dir === 'W') ||
           (this.follower().dir === 'N' && this.leader().dir === 'S') ||
           (this.follower().dir === 'W' && this.leader().dir === 'W' &&
            this.dir === 'N')                                         ||
           (this.follower().dir === 'S' && this.leader().dir === 'S' &&
            this.dir === 'E');
  };

  Segment.prototype._isBottomLeftCorner = function () {
    return (this.follower().dir === 'S' && this.leader().dir === 'E') ||
           (this.follower().dir === 'W' && this.leader().dir === 'N') ||
           (this.follower().dir === 'W' && this.leader().dir === 'E') ||
           (this.follower().dir === 'S' && this.leader().dir === 'N') ||
           (this.follower().dir === 'E' && this.leader().dir === 'E' &&
            this.dir === 'S')                                         ||
           (this.follower().dir === 'N' && this.leader().dir === 'N' &&
            this.dir === 'W');
  };

  Segment.prototype._isBottomRightCorner = function () {
    return (this.follower().dir === 'S' && this.leader().dir === 'W') ||
           (this.follower().dir === 'E' && this.leader().dir === 'N') ||
           (this.follower().dir === 'E' && this.leader().dir === 'W') ||
           (this.follower().dir === 'S' && this.leader().dir === 'N') ||
           (this.follower().dir === 'W' && this.leader().dir === 'W' &&
            this.dir === 'S')                                         ||
           (this.follower().dir === 'N' && this.leader().dir === 'N' &&
            this.dir === 'E');
  };

})();
