(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Board = Nokia.Board = function (view) {
    this.view = view;
    this.apples = [];
    this.DIM = 25;

    this.buildBoard();
    this.addApples();
	
    this.snake = new Nokia.Snake([15,15], this);
  };


  Board.prototype.render = function(){
	 this.view.$el.children().removeClass();

	 this.renderSnakeSegments();	  
	 this.renderApples();
	 
	 this.view.updateStats();
  };
  
  Board.prototype.renderApples = function () {
	  this.apples.forEach ( function (applePos) {
		  var index = this.convertPosToIndex(applePos);
		  $li = $(this.view.$el.children()[index]);
		  $li.addClass('apple')
	  }.bind(this));
  };
  
  Board.prototype.renderSnakeSegments = function () {
	  this.snake.segments.forEach( function (segment, index) {
		  segment.index = index;
		  segment.render();
	  });
  }
  
  Board.prototype.convertIndexToPos = function (idx) {
	  return [Math.floor(idx / this.DIM), Math.floor(idx % this.DIM)];
  };
  
  Board.prototype.convertPosToIndex = function (pos) {
	  return pos[0] * this.DIM + pos[1];
  }

  Board.prototype.isAnApple = function(coord) {
    var included = false;

    this.apples.forEach(function (el){
      if(_.isEqual(el, coord)){
        included = true;
      }
    });

    return included;
};

  Board.prototype.addApples = function(){
    var that = this;

    _(4).times(function(){
      var x = Math.floor(that.DIM*Math.random());
      var y = Math.floor(that.DIM*Math.random());
      that.apples.push([x, y]);
    });
  };

  Board.prototype.removeApple = function(apple){
    var that = this;

    this.apples.forEach(function (el, idx){
      if(_.isEqual(el, apple)){
        that.apples.splice(idx, 1);
      }
    });
  };

  Board.prototype.buildBoard = function(){
    _(Math.pow(this.DIM, 2)).times(function () {
    	this.view.$el.append($('<li>'));
    }.bind(this))
  };
})();
