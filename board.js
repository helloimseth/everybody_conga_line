(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var Board = Nokia.Board = function (view) {
    this.view = view;
    this.snake = new Nokia.Snake([15,15], this);
    this.apples = [];
    this.DIM = 25;

    this.buildBoard();
    this.addApples();
  }

  Board.prototype.render = function(){
    this.view.$el.children().each(function (idx, li) {
      var $li = $(li);
      var pos = [];
      pos.push(parseInt($li.data("pos-x")));
      pos.push(parseInt($li.data("pos-y")));

      $li.removeClass();

      if (this.snake.isASegment(pos)) {
        $li.addClass('snake ' + this.snake.dir);
      } else if (this.isAnApple(pos)){
        $li.addClass('apple');
      } else {
        $li.addClass('empty');
      }

      if (this.snake.isFirstSegment(pos)) {
        $li.addClass('first');
      }

      this.view.$parentEl.find('.score-num').text(this.snake.score);
    }.bind(this));
  };

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
    for(var i = 0; i < this.DIM; i++) {
      for(var j = 0; j < this.DIM; j++) {
        $li = $('<li>').data("pos-x", i)
                       .data("pos-y", j);
        this.view.$el.append($li);
      }
    }

  };
})();
