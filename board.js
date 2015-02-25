(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }


  var Board = Nokia.Board = function () {
    this.snake = new Nokia.Snake([4,4])
    this.area = this.createArea();
  }

  Board.prototype.render = function(){
    // var that = this;
    var string = ""

    for(var i = 0; i < 10; i++) {
      for(var j = 0; j < 10; j++) {
        if (this.isASegment([i, j])) {
          string += " S ";
        } else {
          string += " . ";
        }
      };
      string += "\n"
    };

    console.log("\n" + string);
  }

  Board.prototype.isASegment = function (coord){
    var included = false;

    this.snake.segments.forEach(function (el){
      if(_.isEqual(el, coord)){
        included = true
      }
    })

    return included;
  }

  Board.prototype.createArea = function(){
    var area = []

    for(var i = 0; i < 10; i++) {
      area.unshift([]);

      for(var i = 0; i < 10; i++) {
        area[0].push([]);
      }
    }

    return area;
  }
})()
