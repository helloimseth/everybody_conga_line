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
	 this.renderSnakeSegments();
	 this.renderApples();

	 this.view.updateStats();
  };

  Board.prototype.renderApples = function () {
	  this.apples.forEach ( function (apple) {
		  var index = this.convertPosToIndex(apple.pos);
		  $li = $(this.view.$el.children()[index]);
		  $li.addClass('apple ' + apple.dir );
	  }.bind(this));
  };

  Board.prototype.renderSnakeSegments = function () {
	  this.snake.segments.forEach( function (segment, index) {
		  segment.index = index;
		  segment.render();
	  });
  };

  Board.prototype.convertIndexToPos = function (idx) {
	  return [Math.floor(idx / this.DIM), Math.floor(idx % this.DIM)];
  };

  Board.prototype.convertPosToIndex = function (pos) {
	  return pos[0] * this.DIM + pos[1];
  };

  Board.prototype.isAnApple = function(coord) {
    var included = false;

    this.apples.forEach(function (apple){
      if(_.isEqual(apple.pos, coord)){
        included = true;
      }
    });

    return included;
};

  Board.prototype.addApples = function(){
    if (this.apples.length < 5) {
      _(25).times(function(){
        var x = Math.floor(this.DIM*Math.random());
        var y = Math.floor(this.DIM*Math.random());
        var dir = ['N', 'S', 'E', 'W'].splice(Math.floor(3*Math.random()), 1);

        this.apples.push({
          pos: [x, y],
          dir: dir
        });
      }.bind(this));
    }
  };

  Board.prototype.removeApple = function(applePos){
    this.apples.forEach(function (apple, idx){
      if(_.isEqual(apple.pos, applePos)){
        this.apples.splice(idx, 1);
      }
    }.bind(this));
  };

  Board.prototype.buildBoard = function(){
    _(Math.pow(this.DIM, 2)).times(function () {
    	this.view.$el.append($('<li>'));
    }.bind(this));
  };

})();
