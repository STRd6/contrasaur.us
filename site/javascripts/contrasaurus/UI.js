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

function DialogBox(text, I) {
  I = I || {};

  $.reverseMerge(I, {
    height:  Math.ceil(CANVAS_HEIGHT / 3),
    lineHeight: 16,
    margin: 16,
    y: Math.floor((CANVAS_HEIGHT * 2) / 3),
    width: CANVAS_WIDTH
  });

  return {
    draw: function(canvas) {
      var textAlign = I.textAlign;
      var avatarMargin = I.margin;
      
      if (textAlign) {
        canvas.textAlign(textAlign);
      }
      canvas.fillColor("rgba(0, 0, 0, 0.75)");
      canvas.fillRect(0, I.y, I.width, I.height);

      if(I.avatar) {
        I.avatar.draw(canvas, I.margin, I.y);
        avatarMargin = 72 + 2*I.margin;
        canvas.fillColor("#FFF");
        canvas.fillWrappedText(text, avatarMargin, I.y + I.lineHeight, I.width - avatarMargin - I.margin);
      } else {
        canvas.fillColor("#FFF");
        canvas.fillWrappedText(text, avatarMargin, I.y, I.width - avatarMargin - I.margin);
      }
    },

    update: $.noop
  }
}
