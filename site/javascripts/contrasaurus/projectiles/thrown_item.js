function ThrownItem(I) {
  I = I || {};

   $.reverseMerge(I, {
     speed: 10,
     theta: 0,
     weaponName: "battleAxe"
   });

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dinoBullet",
    dispersion: 0,
    duration: -1,
    effectCount: 1,
    radius: 30,
    sprite: Sprite.load("images/weapons/" + I.weaponName + ".png"),
    xVelocity: Math.cos(I.theta)*I.speed,
    yVelocity: Math.sin(I.theta)*I.speed
  });

  var self = Bullet(I).extend({
    getTransform: GameObject.velocityGetTransform(I),
    land: function() {
      I.active = false;
    },
    after: {
      hit: function(other) {
        if(other.bulletHitEffect) {
          other.bulletHitEffect(self);
        }
      },
      update: function() {
        GameObject.generateCheckBounds(I);
        I.yVelocity += GRAVITY;
      }
    }
  });

  return self;
}
