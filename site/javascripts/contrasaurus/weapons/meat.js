function Meat(I) {
  I = I || {};

  var healthPerUpdate = 3;

  $.reverseMerge(I, {
    duration: 50,
    exitPoints: []
  });

  var self = Weapon(I).extend({
    before: {
      update: function(dino) {
        dino.heal(healthPerUpdate);
      },
    },
    draw: $.noop
  });

  return self;
}
