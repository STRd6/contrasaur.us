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