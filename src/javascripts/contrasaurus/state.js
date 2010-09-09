function State(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    complete: $.noop,
    duration: 1,
    model: Model.loadJSONUrl("data/robo_reagan/kneel.model.json"),
    update: $.noop
  });

  var self = {
    model: I.model,
    sprite: I.sprite,
    update: function() {
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
  });

  return self;
}
