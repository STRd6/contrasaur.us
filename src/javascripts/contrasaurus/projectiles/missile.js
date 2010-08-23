function Missile(I) {
  var speed = 3;

  $.reverseMerge(I, {
    radius: 8,
    collideDamage: 40,
    sprite: Sprite.load("images/projectiles/missile.png")
  });

  var self = Bullet(I).extend({
    after: {
      update: function() {
        I.xVelocity = I.xVelocity * 1.1;
        I.yVelocity = I.yVelocity * 1.1;
      }
    }
  });

  self.extend(Explodable(I));

  return self;
}
