if (typeof Nokia === undefined) {
  window.Nokia = {};
}

var Snake = Nokia.Snake = function(pos){
  this.pos = pos;
  this.segments = [pos];
}

Snake.prototype.move = function(dir){
  var first = this.segments.slice(0, 1)[0]

  switch (dir){
    case "N":
      first[1] += 1;
      break;
    case "E":
      first[0] += 1;
      break;
    case "S":
      first[1] -= 1;
      break;
    default:
      first[0] -= 1;
      break;
  };

  this.segments.unshift(first);
}
