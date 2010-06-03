function Bullet(theta, I) {
  var speed = 10;

  $.reverseMerge(I, {
    collideDamage: 1,
    width: 4,
    height: 4,
    radius: 2,
    color: "#000",
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = GameObject(I).extend({
    after: {
      update: GameObject.generateCheckBounds(I)
    }
  });

  return self;
}
