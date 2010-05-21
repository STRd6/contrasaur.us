function Cutscene(imageURL, text, duration, completedCallback) {
  var imageTile = loadImageTile(imageURL);
  var dialogBox = DialogBox(text);

  var self = {
    draw: function(canvas) {
      imageTile.draw(canvas, (canvas.width() - imageTile.width)/2, 0);
      dialogBox.draw(canvas);
    },

    start: function(canvas) {
      setTimeout(function() {
        clearInterval(intervalId);
        completedCallback();
      }, duration);

      var intervalId = setInterval(function() {
        canvas.fill("#000");
        self.draw(canvas);
      }, MILLISECONDS_PER_FRAME);
    }
  };

  return self;
}
