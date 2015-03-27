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

  Segment.prototype.liClasses = function () {
    var classes = 'snake ' +
                  this.dir +
                  this.classIfLeader();

    if (this.follower() && this.leader()) {
      classes += this.cornerClasses();
    }

    return classes;
  };

  Segment.prototype.cornerClasses = function () {
    var classes = '';

    ['TL', 'TR', 'BL', 'BR'].forEach(function (corner) {
      if (this._isACornerAt(corner)) {
        classes += Nokia.Snake.CORNERS[corner].class;
      }
    }.bind(this));

    return classes;
  };

  Segment.prototype._isACornerAt = function (corner) {
    var thisCorner = Nokia.Snake.CORNERS[corner];

    return thisCorner.leaderDirs.indexOf(this.leader().dir) !== -1 &&
          (thisCorner.followerDirs.indexOf(this.follower().dir) !== -1 ||
           thisCorner.followerDirs.indexOf(this.dir) !== -1);
  };

  Segment.prototype.dup = function () {
    return new Nokia.Segment ({
      pos: this.pos.slice(),
      dir: this.dir,
      index: this.index,
      snake: this.snake
    });
  };
})();
