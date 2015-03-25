(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var View = Nokia.View = function($el){
    this.$parentEl = $el;
    this.$el = $el.find('.game-board');

    this.board = new Nokia.Board(this);
    this.board.render();

    this.startGame();


  };

  View.prototype.handleKeyEvent = function(){
    if (event.keyCode === 32) {
      this.pauseGame();
      return;
    }

    this.$parentEl.keydown(function(event){
      switch(event.keyCode){
        case 38:
          this.board.snake.turn("N");
          break;
        case 40:
          this.board.snake.turn("S");
          break;
        case 37:
          this.board.snake.turn("W");
          break;
        case 39:
          this.board.snake.turn("E");
          break;
        default:
          break; }
      }.bind(this));
    };


  View.prototype.step = function(){
    if(this.board.snake.alive){
      this.board.snake.move();
      this.board.render();
    } else {
      this.endGame();
    }
  };

  View.prototype.endGame = function () {
    clearInterval(this.intervalId);
    this.$el.empty()
        .addClass('game-over');

    var setStart = function(event){
      $(event.currentTarget).toggleClass('start-button')
                            .toggleClass('pause-button')
                            .off('click');

      $('.game-board').removeClass('game-over');
      new Nokia.View($('.game'));
    };

    this.$parentEl.find('.pause-button')
                  .removeClass()
                  .addClass('start-button')
                  .off('click')
                  .on("click", setStart);
};

  View.prototype.startGame = function () {
    this.handleKeyEvent();

    this.intervalId = setInterval(this.step.bind(this), 150);
    this.board.appleIntervalId = setInterval(this.board.addApples.bind(this.board), 10000);

    this.paused = false;

    this.$parentEl.find('.pause-button').click(this.pauseGame.bind(this));
  };


  View.prototype.pauseGame = function (event) {
    if (this.paused) {
      $(this.$el.find('.pause-screen')).remove();

      this.startGame();
    } else {
      clearInterval(this.intervalId);
      clearInterval(this.board.appleIntervalId);

      this.$parentEl.off();

      $section = $('<section>').addClass('pause-screen');
      this.$el.prepend($section);

      this.paused = true;
    }
  };

})();
