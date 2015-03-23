(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Snake = Nokia.Snake = function(pos, board){
    this.dir = "N";
    this.pos = pos;
    this.segments = [pos];
    this.board = board;
    this.alive = true;

    this.score = 0;
    this.modifier = 1;
  }

  Snake.prototype.move = function(){
    var newFirst = _.first(this.segments).slice();

    switch (this.dir){
      case "N":
        newFirst[0] -= 1;
        break;
      case "E":
        newFirst[1] += 1;
        break;
      case "S":
        newFirst[0] += 1;
        break;
      default:
        newFirst[1] -= 1;
        break;
    };

    this.checkIfAlive(newFirst);

    this.segments.unshift(newFirst);

    if(!this.board.isAnApple(newFirst)){
      this.segments.pop()
    } else {
      this.score += 1 * this.modifier
      console.log(this.score);
      this.updateModifier();
      this.board.removeApple(newFirst)
    }


  }

  Snake.prototype.checkIfAlive = function (pos) {
    if(this.isASegment(pos)){
      this.alive = false;
    } else if (pos[0] === 0 || pos[1] === 0 ||
               pos[1] === this.board.DIM || pos[0] === this.board.DIM) {
      this.alive = false;
    }
  }

  Snake.prototype.turn = function(dir){

    switch (this.dir){
      case "N":
        this.dir = dir === "S" ? this.dir : dir
        break;
      case "E":
        this.dir = dir === "W" ? this.dir : dir
        break;
      case "S":
        this.dir = dir === "N" ? this.dir : dir
        break;
      default:
        this.dir = dir === "E" ? this.dir : dir
        break;
    };
  }

  Snake.prototype.isASegment = function (coord){
    var included = false;

    this.segments.forEach(function (el){
      if(_.isEqual(el, coord)){
        included = true
      }
    })

    return included;
  }

  Snake.prototype.isFirstSegment = function (pos) {
    if (_.isEqual(pos, this.segments[0])) {
      return true;
    }

    return false;
  }

  Snake.prototype.updateModifier = function () {
    if (this.segments.length % 10 === 0 && this.score > 1) {
      this.modifier++;
    }
  }
})()
