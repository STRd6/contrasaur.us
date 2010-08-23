function Laser(I) {
  I = I || {}

   $.reverseMerge(I, {
     speed: 20,
     theta: 0
   });

  $.reverseMerge(I, {
    collideDamage: 3,
    collisionType: "dinoBullet",
    effectCount: 1,
    health: 5000,
    hitCircles: [{"x": -15, "y": 0, "radius": 3}, {"x": 0, "y": 0, "radius": 3}, {"x": 15, "y": 0, "radius": 3}],
    radius: 2,
    sprite: Sprite.load("images/projectiles/laser.png"),
    x: dino.position().x,
    y: dino.position().y,
    yVelocity: 1
  });

  var self = Bullet(I).extend({
    effectCount: function() {
      return I.effectCount;
    },
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
        if (I.yVelocity < 0) {
          I.y -= 10*Math.sin(I.age);
        } else {
          I.y += 10*Math.sin(I.age);
        }
      }
    }
  });

  return self;
}
