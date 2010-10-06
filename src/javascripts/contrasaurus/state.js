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

  var self = Core(I).extend({
    draw: function(canvas) {
      I.model.draw(canvas);
    },
    frame: function(newFrame) {
      return I.model.animation.frame(newFrame);
    },
    reset: function() {
      I.age = 0;
      I.model.animation.frame(0);
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
  });

  self.attrAccessor('age', 'sprite');
  self.attrReader('hitCircles', 'model', 'shootLogic');

  self.extend(Bindable());

  self.bind("complete", function() {
    I.complete();
    I.age = 0;
  });

  return self;
}
