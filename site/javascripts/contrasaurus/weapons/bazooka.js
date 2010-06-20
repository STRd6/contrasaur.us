function Bazooka(I) {
  I = I || {};

  $.reverseMerge(I, {
    power: 0,
    sprite: Tile.EMPTY
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      return HomingMissile(position);
    }
  });
  return self;
}