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

  View.KEYCODEANDDIRS = {
    38: "N",
    40: "S",
    37: "W",
    39: "E"
  };

  View.prototype.handleKeyEvent = function(){
    if (event.keyCode === 32) {
      this.pauseGame();
      return;
    }


    this.$parentEl.keydown(function(event){
      console.log(event.keyCode);

      this.board.snake.turn(View.KEYCODEANDDIRS[event.keyCode]);

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

View.prototype.increaseDifficulty = function () {
  if (this.board.snake.segments.length % 10 === 0) {
    this.currentInterval -= 5;
    this.displaySpeed += 1;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.step.bind(this), this.currentInterval);
  }
};

  View.prototype.startGame = function () {
    this.handleKeyEvent();

    this.currentInterval = 150;

    this.intervalId = setInterval(
      this.step.bind(this),
      this.currentInterval
      );

    this.board.appleIntervalId = setInterval(
      this.board.addApples.bind(this.board),
      10000
      );

    this.displaySpeed = 1;

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
