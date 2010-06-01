function Cutscene(imageURL, text, duration, completedCallback) {
  var imageTile = loadImageTile(imageURL);
  var dialogBox = DialogBox(text);
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
      dialogBox.draw(canvas);
    },

    start: function(canvas) {
      stopped = false;

      setTimeout(function() {
        self.complete();
      }, duration);

      intervalId = setInterval(function() {
        canvas.fill("#000");
        self.draw(canvas);
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      clearInterval(intervalId);
      stopped = true;
    }
  };

  return self;
}
