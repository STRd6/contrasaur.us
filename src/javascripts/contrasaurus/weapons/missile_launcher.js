function MissileLauncher(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 200,
    attachment: "back",
    cooldown: 6,
    exitMode: "cycle",
    exitPoints: [Point(20, -36), Point(24, -26), Point(30, -37), Point(34, -28), Point(40, -29), Point(38, -37)],
    power: 10,
    sprite: Sprite.load("images/weapons/missileLauncher.png")
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      return HomingMissile(position);
    }
  });
  return self;
}
