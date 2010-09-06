function State(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    complete: $.noop,
    duration: 1,
    update: $.noop
  });

  var self = {
    update: function() {
      I.update();
      I.age++;

      if (I.age == I.duration) {
        debugger;
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
