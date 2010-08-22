function Meat(I) {
  I = I || {};

  var healthPerUpdate = 3;

  $.reverseMerge(I, {
    duration: 50,
    exitPoints: [],
    name: "meat",
    sprite: Sprite.EMPTY
  });

  var self = Weapon(I).extend({
    before: {
      update: function(dino) {
        dino.heal(healthPerUpdate);
      },
    },
    data: $.noop,
    draw: $.noop
  });

  return self;
}
