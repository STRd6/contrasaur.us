function Bullet(I) {
  I = I || {}

   $.reverseMerge(I, {
     speed: 10,
     theta: 0
   });

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dinoBullet",
    damageType: "normal",
    dispersion: 0,
    effectCount: 1,
    radius: 2,
    sprite: Sprite.load("images/projectiles/playerbullet.png"),
    xVelocity: Math.cos(I.theta)*I.speed,
    yVelocity: Math.sin(I.theta)*I.speed
  });

  var self = GameObject(I).extend({
    damageType: function() {
      return I.damageType;
    },

    dispersion: function() {
      return I.dispersion;
    },

    effectCount: function() {
      return I.effectCount;
    },

    getTransform: GameObject.velocityGetTransform(I),

    hit: function(other) {
      I.health = I.health - other.collideDamage();

      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
      }
    },

    land: function() {
      I.active = false;
    },

    after: {
      hit: function(other) {
        if(other.bulletHitEffect) {
          other.bulletHitEffect(self);
        }
      },

      update: GameObject.generateCheckBounds(I)
    }
  });

  return self;
}
