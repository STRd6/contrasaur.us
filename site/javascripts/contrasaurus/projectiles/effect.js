function Effect(velocity, I) {
  $.reverseMerge(I, {
    width: 8,
    height: 8,
    radius: 4,
    color: "#000",
    duration: 33,
    xVelocity: 1,
    yVelocity: 0
  });

  var self = GameObject(I).extend({
    getTransform: GameObject.velocityGetTransform(I)
  });

  return self;
}
