function Flamethrower() {
  var power = 20;

  var self = {
    power: function(value) {
      if (value === undefined) {
        return power;
      } else {
        power += value;
        return self;
      }
    },

    shoot: function(direction, midpoint, transform) {
      if (rand(100) < power) {
        shoot(Flame(direction, {
          x: midpoint.x,
          y: midpoint.y
        }));
      }
    },

    update: function() {

    }
  }
  return self;
}