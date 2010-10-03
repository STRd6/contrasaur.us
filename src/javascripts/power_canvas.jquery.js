(function($){
  $.fn.powerCanvas = function(options) {
    options = options || {};

    var canvas = this.get(0);

    if(!canvas) {
      return this;
    }

    var context;

    /**
     * @name PowerCanvas
     * @constructor
     */
    var $canvas = $(canvas).extend({
      drawLine: function(x1, y1, x2, y2, width) {
        width = width || 3;

        context.lineWidth = width;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
      },

      drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        try {
          context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        } catch(e) {
          debugger
        }

        return this;
      },

      /**
       * Passes this canvas to the block with the given matrix transformation
       * applied. All drawing methods called within the block will draw
       * into the canvas with the transformation applied. The transformation
       * is removed at the end of the block, even if the block throws an error.
       *
       * @name withTransform
       * @methodOf PowerCanvas#
       *
       * @param {Matrix} matrix
       * @param {Function} block
       * @returns this
       */
      withTransform: function(matrix, block) {
        context.save();

        context.transform(
          matrix.a,
          matrix.b,
          matrix.c,
          matrix.d,
          matrix.tx,
          matrix.ty
        );

        try {
          block(this);
        } finally {
          context.restore();
        }

        return this;
      },

      clear: function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        return this;
      },

      fill: function(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);

        return this;
      },

      fillCircle: function(x, y, radius, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

        return this;
      },

      fillRect: function(x, y, width, height) {
        context.fillRect(x, y, width, height);

        return this;
      },

      centerText: function(text, y) {
        var textWidth = $canvas.measureText(text);

        $canvas.fillText(text, (canvas.width - textWidth) / 2, y);
      },

      fillText: function(text, x, y) {
        context.fillText(text, x, y);

        return this;
      },

      fillWrappedText: function(text, x, y, width) {
        var tokens = text.split(" ");
        var tokens2 = text.split(" ");
        var lineHeight = 16;

        if ($canvas.measureText(text) > width) {
          if (tokens.length % 2 == 0) {
            tokens2 = tokens.splice(tokens.length / 2, (tokens.length / 2), "");
          } else {
            tokens2 = tokens.splice(tokens.length / 2 + 1, (tokens.length / 2) + 1, "");
          }
          context.fillText(tokens.join(" "), x, y);
          context.fillText(tokens2.join(" "), x, y + lineHeight);
        } else {
          context.fillText(tokens.join(" "), x, y + lineHeight);
        }
      },

      fillColor: function(color) {
        if(color) {
          context.fillStyle = color;
          return this;
        } else {
          return context.fillStyle;
        }
      },

      font: function(font) {
        context.font = font;
      },

      measureText: function(text) {
        return context.measureText(text).width;
      },

      putImageData: function(imageData, x, y) {
        context.putImageData(imageData, x, y);

        return this;
      },

      strokeColor: function(color) {
        if(color) {
          context.strokeStyle = color;
          return this;
        } else {
          return context.strokeStyle;
        }
      },

      textAlign: function(textAlign) {
        context.textAlign = textAlign;
        return this;
      },

      height: function() {
        return canvas.height;
      },

      width: function() {
        return canvas.width;
      }
    });

    if(canvas.getContext) {
      context = canvas.getContext('2d');

      if(options.init) {
        options.init($canvas);
      }

      return $canvas;
    } else {
      return false;
    }

  };
})(jQuery);
