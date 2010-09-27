function State(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    allowedTransitions: null,
    complete: $.noop,
    duration: 1,
    hitCircles: [],
    model: null,
    shootLogic: $.noop,
    sprite: Sprite.EMPTY,
    update: $.noop
  });

  var self = {
    hitCircles: function() {
      return I.hitCircles;
    },
    model: I.model,
    shootLogic: function() {
      return I.shootLogic;
    },
    sprite: function(value) {
      if (value === undefined) {
        return I.sprite;
      } else {
        I.sprite = value;
        return self;
      }
    },
    update: function() {
      I.model.update();
      I.sprite = I.model.animation;
      I.hitCircles = I.model.hitFrame();

      I.update();
      I.age++;

      if (I.age == I.duration) {
        self.trigger("complete");
      }
    }
  };

  $.extend(self, Bindable());

  self.bind("complete", function() {
    I.complete();
    I.age = 0;
  });

  return self;
}
