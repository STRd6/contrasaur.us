function Effect(velocity, I) {
  $.reverseMerge(I, {
    duration: 33,
    rotation: Math.atan2(velocity.y, velocity.x)
  });

  var self = GameObject(I).extend({
    getTransform: GameObject.rotationGetTransform(I)
  });

  return self;
}
