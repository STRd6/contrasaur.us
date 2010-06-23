(function($){
  $.fn.powerCanvas = function(options) {
    options = options || {};

    var canvas = this.get(0);
    var context;

    function withState(x, y, options, block) {
      context.save();

      context.translate(x, y);

      if(options) {
        if(options.hFlip) {
          context.transform(-1, 0, 0, 1, 0, 0);
        }

        if(options.vFlip) {
          context.transform(1, 0, 0, -1, 0, 0);
        }

        if(options.rotation) {
          var theta = options.rotation;
          context.transform(
            Math.cos(theta), Math.sin(theta),
            -Math.sin(theta), Math.cos(theta),
            0, 0
          );
        }

        if(options.transform) {
          context.transform(
            options.transform.a,
            options.transform.b,
            options.transform.c,
            options.transform.d,
            options.transform.tx,
            options.transform.ty
          );
        }
      }

      try {
        block();
      } finally {
        context.restore();
      }
    }

    var $canvas = $(canvas).extend({
      withState: withState,

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
        context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        return this;
      },

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
          block();
        } finally {
          context.restore();
        }
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

      fillText: function(text, x, y, maxWidth) {
        context.fillText(text, x, y, maxWidth);

        return this;
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
