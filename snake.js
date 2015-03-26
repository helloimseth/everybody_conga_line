(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Snake = Nokia.Snake = function(pos, board){
    this.dir = "N";
    this.inputtedDir = "N";

    this.pos = pos;
    this.segments = [pos];
    this.alive = true;

    this.board = board;

    this.score = 0;
    this.modifier = 1;
  };

  Snake.DIRSANDDELTAS = {
    'N': [-1, 0],
    'E': [0, 1],
    'S': [1, 0],
    'W': [0, -1]
    };

  Snake.prototype.move = function(){
    this.dir = this.inputtedDir;

    var newFirst = this.getNewFirstSegment();

    this.checkIfAlive(newFirst);

    this.segments.unshift(newFirst);

    this.eatIfApple(newFirst);
  };

  Snake.prototype.checkIfAlive = function (pos) {
    if(this.isASegment(pos) || this.isOutOfBounds(pos)) {
      this.alive = false;
    }
  };

  Snake.prototype.turn = function(dir) {
    this.inputtedDir = this.isOppositeDir(dir) ? this.dir : dir;
  };

  Snake.prototype.isASegment = function (coord){
    var included = false;

    this.segments.forEach(function (el){
      if(_.isEqual(el, coord)){
        included = true;
      }
    });

    return included;
  };

  Snake.prototype.isFirstSegment = function (pos) {
    if (_.isEqual(pos, this.segments[0])) {
      return true;
    }

    return false;
  };

  Snake.prototype.updateModifierAndDifficulty = function () {
    if (this.segments.length % 10 === 0) {
      this.modifier++;
      this.board.view.increaseDifficulty();
    }
  };

  Snake.prototype.isOutOfBounds = function (pos) {
    return pos[0] === -1 ||
           pos[1] === -1 ||
           pos[0] === this.board.DIM ||
           pos[1] === this.board.DIM;
  };

  Snake.prototype.eatIfApple = function (pos) {
    if(this.board.isAnApple(pos)){
      this.score += 1 * this.modifier;

      this.updateModifierAndDifficulty();

      this.board.removeApple(pos);
    } else {
      this.segments.pop();
    }
  };

  Snake.prototype.isOppositeDir = function (dir) {
    var currentDelta = Snake.DIRSANDDELTAS[this.dir];
    var newDelta = Snake.DIRSANDDELTAS[dir];

    var summedDeltas = [currentDelta[0] + newDelta[0],
                        currentDelta[1] + newDelta[1]];

    var isOpposite = _.isEqual(summedDeltas, [0,0]) ? true : false;

    return isOpposite;
  };

  Snake.prototype.getNewFirstSegment = function () {
    var newFirst = _.first(this.segments).slice();

    newFirst[0] += Snake.DIRSANDDELTAS[this.dir][0];
    newFirst[1] += Snake.DIRSANDDELTAS[this.dir][1];

    return newFirst;
  };

})();
