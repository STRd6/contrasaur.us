function Explosion(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    duration: 25,
    sprite: loadAnimation("images/effects/explosion.png", 25, 67, 171),
    radius: 20,
    width: 67,
    height: 171,
    collisionType: "enemyBullet"
  });

  return GameObject(I).extend({
    hit: $.noop,

    after: {
      update: function() {
        if(I.age > 6) {
          I.collideDamage = 0;
        }

        if(I.age > I.duration) {
          I.active = false;
        }
      }
    }
  });
}
