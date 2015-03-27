(function(){
  if (typeof Nokia === "undefined") {
    window.Nokia = {};
  }

  var View = Nokia.View = function($el){
    this.$parentEl = $el;
    this.$el = $el.find('.game-board');

    this.board = new Nokia.Board(this);
    this.board.render();

    this.$parentEl
        .find('.pause-button')
        .click(this.handlePause.bind(this));
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

    this.$parentEl.keydown(function (event) {
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

    this.$el
        .empty()
        .addClass('game-over')
        .html('<h2>GAME OVER</h2>');

    this.$parentEl
        .find('.pause-button')
        .removeClass()
        .addClass('start-button')
        .off('click')
        .on("click", this.setStartView);
};

View.prototype.increaseDifficulty = function () {
  this.currentInterval -= 10;
  this.displaySpeed += 1;

  clearInterval(this.intervalId);
  this.intervalId = setInterval(this.step.bind(this), this.currentInterval);
};

  View.prototype.startGame = function () {
    this.displaySpeed = 1;
    this.paused = false;
    this.currentInterval = 150;

    this.handleKeyEvent();

    this.intervalId = setInterval(
      this.step.bind(this),
      this.currentInterval
    );

    this.board.appleIntervalId = setInterval(
      this.board.addApples.bind(this.board),
      10000
    );
  };

  View.prototype.handlePause = function (event) {
    if (this.paused) {
      $(this.$el.find('.pause-screen')).remove();

      this.startGame();
    } else {
      this.pauseGame();
    }
  };

  View.prototype.pauseGame = function (event) {
    clearInterval(this.intervalId);
    clearInterval(this.board.appleIntervalId);

    this.$parentEl
        .off();

    $('<section>').addClass('pause-screen')
                  .prependTo(this.$el);

    this.paused = true;
  };

  View.prototype.setStartView = function (event) {
    console.log("hello");
    $(event.currentTarget).toggleClass('start-button')
                          .toggleClass('pause-button')
                          .off('click');

    $('.game-board').empty()
                    .removeClass('game-over');

    new Nokia.View($('.game'));
  };

})();
