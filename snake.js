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

    if(this.isASegment(newFirst)){
      alert("You Lose");
      this.alive = false;
    }

    this.segments.unshift(newFirst);

    if(!this.board.isAnApple(newFirst)){
      this.segments.pop()
    } else {
      this.board.removeApple(newFirst)
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
})()
