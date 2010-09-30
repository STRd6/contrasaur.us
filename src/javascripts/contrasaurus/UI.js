function ProgressBar(I) {
  function completeness() {
    return I.value / I.max;
  }

  function update() {
    I.element.css({
      'background-color': I.colorMap(completeness()),
      'width': Math.floor(completeness() * 100) + "%"
    });
  }

  // Init Defaults
  I = $.extend({
    colorMap: function() {
      return I.color;
    },
    vertical: false,
    element: $("#health")
  }, I);

  var self = {
    value: function(newValue) {
      if(newValue != undefined) {
        I.value = Math.min(newValue, I.max);
        update();
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
