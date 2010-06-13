function Bullet(theta, I) {
   $.reverseMerge(I, {
     speed: 10
   });

  $.reverseMerge(I, {
    collideDamage: 1,
    duration: -1,
    width: 4,
    height: 4,
    radius: 2,
    color: "#000",
    sprite: loadImageTile("images/projectiles/playerbullet4.png"),
    collisionType: "dinoBullet",
    xVelocity: Math.cos(theta)*I.speed,
    yVelocity: Math.sin(theta)*I.speed
  });

  var transform = rotationTransform(Math.atan2(I.yVelocity, I.xVelocity));

  var self = GameObject(I).extend({
    getTransform: function() {
      return transform;
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
