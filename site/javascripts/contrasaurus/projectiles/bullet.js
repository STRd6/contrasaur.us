function Bullet(theta, I) {
  var speed = 10;

  $.reverseMerge(I, {
    collideDamage: 1,
    width: 4,
    height: 4,
    radius: 2,
    color: "#000",
    sprite: loadImageTile("images/projectiles/playerbullet4.png"),
    collisionType: "dinoBullet",
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var transform = rotationTransform(Math.atan2(I.yVelocity, I.xVelocity));

  var self = GameObject(I).extend({
    getTransform: function() {
      return transform;
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
