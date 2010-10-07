function Fighter(I) {
  I = I || {};

  var cooldown = 0;

  $.reverseMerge(I, {
    cooldown: 3,
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      } else {
        cooldown += I.cooldown;

        self.shootFrom("shot", {
          speed: 15,
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
