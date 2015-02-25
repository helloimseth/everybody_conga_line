(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Board = Nokia.Board = function () {
    this.snake = new Nokia.Snake([15,15], this);
    this.apples = [];
    this.addApples();
    window.setInterval(this.addApples.bind(this), 10000)
  }

  Board.DIM = 25;

  Board.prototype.render = function(){
    // var that = this;
    var string = ""

    for(var i = 0; i < Board.DIM; i++) {
      for(var j = 0; j < Board.DIM; j++) {
        if (this.snake.isASegment([i, j])) {
          string += " S ";
        } else if (this.isAnApple([i,j])){
          string += " A "
        } else {
          string += " . ";
        }
      };
      string += "\n"
    };

    return string;
  }

  Board.prototype.isAnApple = function(coord) {
    var included = false;

    this.apples.forEach(function (el){
      if(_.isEqual(el, coord)){
        included = true
      }
    })

    return included;
}


  Board.prototype.addApples = function(){
    var that = this;

    _(4).times(function(){
      var x = Math.floor(Board.DIM*Math.random());
      var y = Math.floor(Board.DIM*Math.random());
      that.apples.push([x, y])
    })
  }

  Board.prototype.removeApple = function(apple){
    var that = this;

    this.apples.forEach(function (el, idx){
      if(_.isEqual(el, apple)){
        that.apples.splice(idx, 1);
      }
    })
  }
})()
