function Bazooka() {
  var power = 0;
  var theta = 0;

  var self = {
    power: function(value) {
      if (value === undefined) {
        return power;
      } else {
        power += value;
        return self;
      }
    },

    shoot: function(theta, midpoint, transform) {

      if (rand(100) < power) {
        shoot(Missile(theta, {
          x: midpoint.x,
          y: midpoint.y
        }));
      }
    },

    update: $.noop
  }
  return self;
}
