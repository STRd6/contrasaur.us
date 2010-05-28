function Missile(theta, I) {
  var speed = 5;

  $.reverseMerge(I, {
    color: '#500',
    width: 10,
    height: 5,
    collideDamage: 20,
    sprite: loadImageTile("images/missile.png"),
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = Bullet(theta, I).extend({
    after: {
      update: function() {
        I.xVelocity = I.xVelocity * 1.1;
        I.yVelocity = I.yVelocity * 1.1;
      }
    }
  });
  return self;
}