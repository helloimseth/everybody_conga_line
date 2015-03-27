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
    if((this.follower().dir === 'N' && this.leader().dir === 'E') ||
       (this.follower().dir === 'W' && this.leader().dir === 'S') ||
       (this.follower().dir === 'W' && this.leader().dir === 'E') ||
       (this.follower().dir === 'N' && this.leader().dir === 'S')) {
      return ' top-left-corner';
    }
    return '';
  };

  Segment.prototype.classIfTopRightCorner = function () {
    if((this.follower().dir === 'N' && this.leader().dir === 'W') ||
       (this.follower().dir === 'E' && this.leader().dir === 'S') ||
       (this.follower().dir === 'E' && this.leader().dir === 'W') ||
       (this.follower().dir === 'N' && this.leader().dir === 'S')) {
      return ' top-right-corner';
    }
    return '';
  };

  Segment.prototype.classIfBottomLeftCorner = function () {
    if((this.follower().dir === 'S' && this.leader().dir === 'E') ||
       (this.follower().dir === 'W' && this.leader().dir === 'N') ||
       (this.follower().dir === 'W' && this.leader().dir === 'E') ||
       (this.follower().dir === 'S' && this.leader().dir === 'N')) {
      return ' bottom-left-corner';
    }
    return '';
  };

  Segment.prototype.classIfBottomRightCorner = function () {
    if((this.follower().dir === 'S' && this.leader().dir === 'W') ||
       (this.follower().dir === 'E' && this.leader().dir === 'N') ||
       (this.follower().dir === 'E' && this.leader().dir === 'W') ||
       (this.follower().dir === 'S' && this.leader().dir === 'N')) {
      return ' bottom-right-corner';
    }
    return '';
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

})();
