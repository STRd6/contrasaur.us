function PrimalScream(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    power: 10,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

  var self = Weapon(I).extend({

    shoot: function(midpoint, transform) {

      if (rand(100) < I.power) {
        (24).times(function(i) {
          var theta = (i / 12) * Math.PI;
          addGameObject(Bullet(theta, {
            x: midpoint.x,
            y: midpoint.y
          }));
        }
      )}
    },

    update: $.noop
  });
  return self;
}