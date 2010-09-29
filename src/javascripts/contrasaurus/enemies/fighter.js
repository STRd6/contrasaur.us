function Fighter(I) {
  I = I || {};

  var cooldown = 0;

  $.reverseMerge(I, {
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      } else {
        cooldown += 3;
        var shootAngle = Math.PI/5;
        if(I.xVelocity < 0) {
          shootAngle = Math.PI - shootAngle;
        }
        // Shoot
        addGameObject(Bullet($.extend(self.position(), {
          collisionType: "enemyBullet",
          sprite: Sprite.load("images/effects/enemybullet1_small.png"),
          theta: shootAngle
        })));
      }
    },
    type: 'fighter'
  });

  var self = Bomber(I).extend({

  });

  return self;
}
