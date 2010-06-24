function Effect(velocity, I) {
  $.reverseMerge(I, {
    duration: 33,
    rotation: Math.atan2(velocity.y, velocity.x)
  });

  var self = GameObject(I).extend({
    getTransform: function() {
      var t;
      if(I.hFlip) {
        t =  Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    }
  });

  return self;
}
