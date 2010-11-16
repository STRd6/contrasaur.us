function ProgressBar(I) {
  function completeness() {
    return I.value / I.max;
  }

  // Init Defaults
  I = $.extend({
    backgroundColor: "#000",
    borderColor: "#FFF",
    borderWidth: 2,
    color: "#0C0",
    colorMap: function() {
      return I.color;
    },
    value: 10,
    x: 200,
    y: 40
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
      canvas.fillRect(I.x, I.y, I.width * completeness(), I.height);
    },
    value: function(newValue) {
      if(newValue != undefined) {
        I.value = Math.min(newValue, I.max);
        return self;
      } else {
        return I.value;
      }
    },
    x: function(val) {
      if (val != undefined) {
        I.x = val;
        return self;
      } else {
        return I.x;
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

function healthColorMap(completeness) {
  var r = Math.floor((1.5 - 2 * completeness).clamp(0, 1) * 255).toString(16);
  if(r.length == 1) {
    r = "0" + r;
  }

  var g = Math.floor((completeness * 0.75).clamp(0, 1) * 255).toString(16);
  if(g.length == 1) {
    g = "0" + g;
  }

  return "#" + r + g + "00";
}
