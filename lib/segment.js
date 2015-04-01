(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Segment = Nokia.Segment = function (options) {
    this.pos = options.pos;
    this.dir = options.dir;
    this.snake = options.snake;
    this.index = options.index;
  };

  Segment.prototype.isLeader = function () {
	  return this.index === 0;
  };

  Segment.prototype.isLast = function () {
	  return this.index === this.snake.segments.length - 1;
  };

  Segment.prototype.classIfLeader = function () {
    return this.isLeader() ? ' first' : '';
  };

  Segment.prototype.leader = function () {
    return this.snake.segments[this.index - 1];
  };

  Segment.prototype.follower = function () {
    return this.snake.segments[this.index + 1];
  };

  Segment.prototype.render = function () {
	  this.$li().removeClass().addClass(this.liClasses());
  };

  Segment.prototype.$li = function () {
	  var liIndex = this.pos[0] * this.snake.board.DIM  + this.pos[1];
	  return $(this.snake.board.view.$el.children()[liIndex]);
  };

  Segment.prototype.liClasses = function () {
    var classes = 'snake ' +
                  this.dir +
                  this.classIfLeader();

    if (this.leader()) {
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
          (thisCorner.followerDirs.indexOf(this.dir) !== -1 ||
            (this.follower() &&
            thisCorner.followerDirs.indexOf(this.follower().dir) !== -1)
          );
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
