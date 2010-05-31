function LaserGun() {
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

    shoot: function(midpoint, transform) {
      if (rand(100) < power) {
        shoot(Laser(theta, {
          x: midpoint.x,
          y: midpoint.y
        }));
      }
    },

    update: function() {
      theta += Math.PI / 24;
    }
  }

  return self;
}