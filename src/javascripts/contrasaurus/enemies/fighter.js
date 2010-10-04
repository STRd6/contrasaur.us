function Fighter(I) {
  I = I || {};

  var cooldown = 0;

  $.reverseMerge(I, {
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      } else {
        cooldown += 3;

        self.shootFrom("shot", {
          sprite: Sprite.load("images/projectiles/plane_bullet.png")
        });
      }
    },
    type: 'fighter'
  });

  var self = Bomber(I).extend({

  });

  return self;
}
