function DialogBox(I) {
  I = I || {};

  $.reverseMerge(I, {
    avatar: null,
    backgroundColor: "#000",
    blinkRate: 8,
    cursor: true,
    cursorWidth: 10,
    height: 480,
    lineHeight: 20,
    paddingX: 36,
    paddingY: 32,
    sprite: Sprite.load("images/dialogbox_75.png"),
    text: "",
    textColor: "#FFF",
    width: 640,
    x: 0,
    y: 320
  });

  I.textWidth = I.width - 2*(I.paddingX) - (I.avatar ? I.avatar.width : 0);
  I.textHeight = I.height - 2*(I.paddingY);

  var blinkCount = 0;
  var cursorOn = true;

  var pageOffset = 0;
  var displayChars = 0;

  return {
    complete: function() {
      return displayChars >= I.text.length - 1;
    },

    draw: function(canvas) {
      //TODO: A lot of the logic in here should be moved into the
      // update method and pre-computed.
      var textStart = Point((I.avatar) ? I.paddingX + I.avatar.width : I.paddingX, I.paddingY + I.lineHeight);

      canvas.withTransform(Matrix.translation(I.x, I.y), function() {

        if (I.sprite) {
          I.sprite.draw(canvas, 0, 0);
        } else {
          canvas.fillColor(I.backgroundColor);
          canvas.fillRect(0, 0, I.width, I.height);
        }

        canvas.fillColor(I.textColor);

        var pageCharCount = 0;
        var displayText = I.text.substr(pageOffset, displayChars);

        var piecesRemaining = displayText.split(' ');
        var lineWidth = 0;
        var line = 0;

        while(piecesRemaining.length > 0) {
          var currentLine = piecesRemaining.shift();

          while((canvas.measureText(currentLine) <= I.textWidth) && (piecesRemaining.length > 0)) {
            var proposedLine = currentLine + " " + piecesRemaining[0];

            if(canvas.measureText(proposedLine) <= I.textWidth) {
              piecesRemaining.shift();
              currentLine = proposedLine;
            } else {
              break;
                ;//NOOP
            }
          }

          pageCharCount += currentLine.length;

          canvas.fillText(currentLine, textStart.x, textStart.y + line * I.lineHeight);
          lineWidth = canvas.measureText(currentLine);

          if(line * I.lineHeight < I.textHeight) {
            line += 1;
          } else {
            pageOffset += pageCharCount + line;
            line = 0;
            pageCharCount = 0;
            displayChars = 0;
            break;
              ;
          }
        }

        if(cursorOn && I.cursor) {
          canvas.fillRect(textStart.x + lineWidth, textStart.y + (line - 2) *I.lineHeight, I.cursorWidth, I.lineHeight);
        }
      });

      if (I.avatar) {
        I.avatar.draw(canvas, 0, I.y);
      }
    },

    flush: function() {
      displayChars = I.text.length;
    },

    setText: function(text) {
      pageOffset = 0;
      displayChars = 0;
      I.text = text;
    },

    update: function() {
      displayChars++;
      blinkCount++;

      if(blinkCount >= I.blinkRate) {
        blinkCount = 0;
        cursorOn = !cursorOn;
      }
    }
  };
}