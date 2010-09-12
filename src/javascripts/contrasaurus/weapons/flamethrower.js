function Flamethrower(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 128,
    attachment: "jaw",
    cooldown: 6,
    exitPoints: [Point(25, 0)],
    name: "flamethrower",
    sprite: Animation.load("images/weapons/flame_jaw.png", 2, 58, 31, 3)
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      Sound.play("flame");
      return Flame({ theta: direction, x: position.x, y: position.y });
    }
  });
  return self;
}
