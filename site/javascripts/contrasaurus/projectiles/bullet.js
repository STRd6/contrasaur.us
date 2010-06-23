function Bullet(theta, I) {
   $.reverseMerge(I, {
     speed: 10
   });

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dinoBullet",
    duration: -1,
    effectCount: 1,
    radius: 2,
    sprite: Sprite.load("images/projectiles/playerbullet4.png"),
    xVelocity: Math.cos(theta)*I.speed,
    yVelocity: Math.sin(theta)*I.speed
  });

  var self = GameObject(I).extend({
    getTransform: GameObject.velocityGetTransform(I),
    land: function() {
      I.active = false;
    },
    after: {
      hit: function(other) {
        if(other.bulletHitEffect) {
          I.effectCount.times(function() {
            other.bulletHitEffect(self);
          });
        }
      },
      update: GameObject.generateCheckBounds(I)
    }
  });

  return self;
}
