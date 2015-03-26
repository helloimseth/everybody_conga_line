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

  Segment.prototype.isLeader = function () {
    return this.index === 0;
  };

  Segment.prototype.isTail = function () {
    return this.index === this.snake.segments.length - 1;
  };

  Segment.prototype.leader = function () {
    return this.snake.segments[this.index - 1];
  };

  Segment.prototype.follower = function () {
    return this.snake.segments[this.index + 1];
  };

  Segment.prototype.liClasses = function () {
    return 'snake ' + this.dir;
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
