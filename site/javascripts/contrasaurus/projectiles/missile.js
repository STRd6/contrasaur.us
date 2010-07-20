function Missile(I) {
  var speed = 3;

  $.reverseMerge(I, {
    color: '#500',
    width: 35,
    height: 16,
    radius: 8,
    collideDamage: 20,
    sprite: Sprite.load("images/projectiles/missile.png")
  });

  var xVelocity = Math.cos(I.theta)*speed;
  var yVelocity = Math.sin(I.theta)*speed;

  var self = Bullet(I).extend({
    after: {
      update: function() {
        xVelocity = xVelocity * 1.1;
        yVelocity = yVelocity * 1.1;
      }
    }
  });
  return self;
}
