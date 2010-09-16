function Fighter(I) {
  I = I || {};

  var cooldown = 0;

  $.reverseMerge(I, {
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      } else {
        cooldown += 3;
        // Shoot
        addGameObject(Bullet($.extend(self.position(), {
          collisionType: "enemyBullet",
          sprite: Sprite.load("images/effects/enemybullet1_small.png"),
          theta: Math.PI/5
        })));
      }
    },
    type: 'fighter',
  });

  var self = Bomber(I).extend({

  });

  return self;
}
