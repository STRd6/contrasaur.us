function Flamethrower(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 128,
    attachment: "jaw",
    cooldown: 6,
    exitPoints: [Point(25, 0)],
    sprite: Animation.load("images/weapons/flame_jaw.png", 2, 58, 31, 3)
  });

  var self = Weapon(I).extend({
    generateProjectile: function(unused, position) {
      return Flame({ theta: I.direction, x: position.x, y: position.y });
    },

    before: {
      update: function(dino) {
        I.direction = dino.velocity().x / Math.abs(dino.velocity().x);
      }
    }
  });
  return self;
}
