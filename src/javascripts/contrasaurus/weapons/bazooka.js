function Bazooka(I) {
  I = I || {};

  $.reverseMerge(I, {
    power: 10,
    sprite: Sprite.EMPTY
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      return HomingMissile(position);
    }
  });
  return self;
}