(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Snake = Nokia.Snake = function(pos){
    this.pos = pos;
    this.segments = [pos];
  }

  Snake.prototype.move = function(dir){
    var newFirst = this.segments.pop();

    switch (dir){
      case "N":
        newFirst[0] -= 1;
        break;
      case "E":
        newFirst[1] -= 1;
        break;
      case "S":
        newFirst[0] += 1;
        break;
      default:
        newFirst[1] += 1;
        break;
    };

    this.segments.unshift(newFirst);
  }
})()
