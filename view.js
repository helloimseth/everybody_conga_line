(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var View = Nokia.View = function($el){
    this.board = new Nokia.Board();
    this.$el = $el;
    this.$el.text(this.board.render());
    this.handleKeyEvent();
    setInterval(this.step.bind(this), 150);
  }

  View.prototype.handleKeyEvent = function(){
    var that = this;

    $(document).keydown(function(){
      console.log("received keydown");

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
    this.board.snake.move();
    if(this.board.snake.alive){
      this.$el.text(this.board.render());
    } else {
      this.$el.text("SORRRRRRRRY")
    }
  }


})()
