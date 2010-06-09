function Effect(velocity, maxAge, I) {
  $.reverseMerge(I, {
    width: 8,
    height: 8,
    radius: 4,
    color: "#000",
    xVelocity: 1,
    yVelocity: 0
  });

  var transform = rotationTransform(Math.atan2(velocity.y, velocity.x));

  var self = GameObject(I).extend({
    getTransform: function() {
      return transform;
    },
    after: {
      update: function() {
        if(I.age > maxAge) {
          I.active = false;
        }
      }
    }
  });

  return self;
}
