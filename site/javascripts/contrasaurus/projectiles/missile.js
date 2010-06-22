function Missile(theta, I) {
  var speed = 3;

  $.reverseMerge(I, {
    color: '#500',
    width: 35,
    height: 16,
    radius: 8,
    collideDamage: 20,
    sprite: loadImageTile("images/projectiles/missile.png"),
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
