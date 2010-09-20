function MissileLauncher(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: Infinity,
    attachment: "back",
    cooldown: 6,
    exitMode: "cycle",
    exitPoints: [Point(20, -36), Point(24, -26), Point(30, -37), Point(34, -28), Point(40, -29), Point(38, -37)],
    name: "missileLauncher",
    power: 10,
    secondaryFn: function(direction, localPosition, centerDirection) {
      addGameObject(self.generateSecondaryProjectile(direction, localPosition, centerDirection));
    },
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      $.extend(position, {
        theta: direction
      });

      return HomingMissile(position);
    },

    generateSecondaryProjectile: function(direction, position) {
      $.extend(position, {
        theta: direction
      });

      return Missile(position);
    }
  });
  return self;
}
