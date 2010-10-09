function Cutscene(imageURL, text, duration, avatar, completedCallback) {
  var imageTile = Sprite.load(imageURL);
  var dialogBox = DialogBox({
    text: text,
    avatar: avatar
  });
  var stopped = true;
  var intervalId;

  var self = {
    complete: function() {
      if(!stopped) {
        self.stop();

        completedCallback();
      }
    },

    draw: function(canvas) {
      imageTile.draw(canvas, (canvas.width() - imageTile.width)/2, 0);
      dialogBox.update();
      dialogBox.draw(canvas);
    },

    start: function(canvas) {
      stopped = false;

      setTimeout(function() {
        self.complete();
      }, duration);

      $("#game_info").hide();

      intervalId = setInterval(function() {
        canvas.fill("#000");
        self.draw(canvas);
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      $("#game_info").show();

      clearInterval(intervalId);
      stopped = true;
    }
  };

  return self;
}
