function Flamethrower(I) {
  I = I || {};

  $.reverseMerge(I, {
    exitPoints: [Point(45, 20)],
    power: 10,
    sprite: Tile.EMPTY
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      return Flame(I.direction, position);
    },

    before: {
      update: function(dino) {
        I.direction = dino.velocity().x / Math.abs(dino.velocity().x);
      }
    }
  });
  return self;
}
