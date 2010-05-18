function ProgressBar(I) {
  function completeness() {
    return I.value / I.max;
  }
  
  // Init Defaults
  I = $.extend({
    backgroundColor: "#000",
    color: "#0C0",
    colorMap: function() {
      return I.color;
    },
    borderColor: "#FFF",
    borderWidth: 2,
    vertical: false
  }, I);
  
  var self = {
    draw: function(canvas) {
      canvas.fillColor(I.borderColor);
      canvas.fillRect(
        I.x - I.borderWidth, 
        I.y - I.borderWidth, 
        I.width + 2 * I.borderWidth, 
        I.height + 2 * I.borderWidth
      );
      
      canvas.fillColor(I.backgroundColor);
      canvas.fillRect(I.x, I.y, I.width, I.height);
      
      canvas.fillColor(I.colorMap(completeness()));
      if(I.vertical) {
        canvas.fillRect(I.x, I.y - (1 - I.height * completeness()), I.width, I.height * completeness());
      } else {
        canvas.fillRect(I.x, I.y, I.width * completeness(), I.height);
      }
    },

    value: function(newValue) {
      if(newValue != undefined) {
        I.value = Math.min(newValue, I.max);
        return self;
      } else {
        return I.value;
      }
    }
  };
  
  return self;
}

function GameText(text, I) {
  I.y -= 30;
  I.width = 1;
  I.height = 1;

  return GameObject(I).extend({
    draw: function(canvas) {
      canvas.fillColor("#000");
      canvas.fillText(text, I.x, I.y);
    },

    after: {
      update: function() {
        if(I.age > 30) {
          I.active = false;
        }
      }
    }
  });
}

function Scene(backgrounds, foregrounds) {
  function drawLayersGenerator(layers) {
    return function(position, canvas) {
      $.each(layers, function(i, layer) {
        var xPosition = layer.position.x + position.x;
        var yPosition = layer.position.y + position.y;

        if(layer.repeat) {
          xPosition = Math.mod(xPosition, canvas.width());
          yPosition = Math.mod(yPosition, canvas.height());

          layer.image.draw(canvas,
            xPosition,
            yPosition
          );

          // X-repeat
          layer.image.draw(canvas,
            xPosition - canvas.width(),
            yPosition
          );

          // Y-repeat
          layer.image.draw(canvas,
            xPosition,
            yPosition - canvas.height()
          );

          // XY-repeat
          layer.image.draw(canvas,
            xPosition - canvas.width(),
            yPosition - canvas.height()
          );
        } else {
          layer.image.draw(canvas,
            xPosition,
            yPosition
          );
        }

        // TODO: Move to update
        if(layer.rate) {
          layer.position.x += layer.rate.x;
        }
      });
    }
  }

  return {
    drawBackgrounds: drawLayersGenerator(backgrounds),
    drawForegrounds: drawLayersGenerator(foregrounds)
  }
}

function healthColorMap(completeness) {
  var r = Math.floor(Math.clamp(1.5 - 2 * completeness, 0, 1) * 255).toString(16);
  if(r.length == 1) {
    r = "0" + r;
  }

  var g = Math.floor(Math.clamp(completeness * 0.75, 0, 1) * 255).toString(16);
  if(g.length == 1) {
    g = "0" + g;
  }

  return "#" + r + g + "00";
}

function DialogBox(text) {
  return {
    draw: function(canvas) {
      var yPosition = Math.floor((canvas.height() * 2) / 3);
      var height = Math.ceil(canvas.height() / 3);
      var lineHeight = 16;

      canvas.fillColor("rgba(0, 0, 0, 0.75)");
      canvas.fillRect(0, yPosition, canvas.width(), height);

      canvas.textAlign("middle");
      canvas.fillColor("#FFF");
      canvas.fillText(text, 0, yPosition + lineHeight, canvas.width());
    },

    update: function() {

    }
  }
}
