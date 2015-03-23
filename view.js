(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var View = Nokia.View = function($el){
    this.$el = $el;
    this.board = new Nokia.Board(this);
    this.$el.text(this.board.render());
    this.handleKeyEvent();
    setInterval(this.step.bind(this), 150);
  }

  View.prototype.handleKeyEvent = function(){
    var that = this;

    $(document).keydown(function(){
      switch(event.keyCode){
        case 38:
          that.board.snake.turn("N");
          break;
        case 40:
          that.board.snake.turn("S");
          break;
        case 37:
          that.board.snake.turn("W");
          break;
        default:
          that.board.snake.turn("E");
          break; }
      })
    };


  View.prototype.step = function(){
    if(this.board.snake.alive){
      this.board.snake.move();
      this.board.render()
    } else {
      this.$el.text("SORRRRRRRRY")
    }
  }


})()
