function Flamethrower(I) {
  I = I || {};

  $.reverseMerge(I, {
    duration: 1000,
    exitPoints: [Point(110, -40)],
    power: 10,
    sprite: Sprite.EMPTY
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
