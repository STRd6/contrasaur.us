function Bazooka(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    power: 0,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

  var self = Weapon(I).extend({
    shoot: function(midpoint, transform) {
      if (rand(100) < I.power) {
        addGameObject(HomingMissile(midpoint));
      }
    },

    update: function() {
      I.theta += Math.PI / 48;
    }
  });
  return self;
}