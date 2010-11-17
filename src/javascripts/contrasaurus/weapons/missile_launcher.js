function MissileLauncher(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: Infinity,
    attachment: "back",
    cooldown: 18,
    exitMode: "cycle",
    exitPoints: [Point(20, -36), Point(24, -26), Point(30, -37), Point(34, -28), Point(40, -29), Point(38, -37)],
    name: "missileLauncher",
    power: 10
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      $.extend(position, {
        explosionDamage: 3,
        theta: direction
      });

      return HomingMissile(position);
    }
  });
  return self;
}
