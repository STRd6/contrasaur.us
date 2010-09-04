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

function DialogBox(text, I) {
  I = I || {};

  $.reverseMerge(I, {
    avatarWidth: 72,
    height:  Math.ceil(CANVAS_HEIGHT / 3),
    lineHeight: 16,
    margin: 32,
    sprite: Sprite.load("images/dialogbox_75.png"),
    y: Math.floor((CANVAS_HEIGHT * 2) / 3) + 30,
    width: CANVAS_WIDTH
  });

  return {
    draw: function(canvas) {
      var textAlign = I.textAlign;
      var avatarMargin = I.margin;

      if (textAlign) {
        canvas.textAlign(textAlign);
      }

      I.sprite.draw(canvas, 0, 320);

      if(I.avatar) {
        I.avatar.draw(canvas, I.margin, I.y);
        avatarMargin = I.avatarWidth + 2*I.margin;
        canvas.fillColor("#FFF");
        canvas.fillWrappedText(text, avatarMargin, I.y + I.lineHeight, I.width - avatarMargin - I.margin - 30);
      } else {
        canvas.fillColor("#FFF");
        canvas.fillWrappedText(text, avatarMargin, I.y, I.width - avatarMargin - I.margin);
      }
    },

    update: $.noop
  }
}
