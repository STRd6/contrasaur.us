function Flamethrower() {
  var power = 0;
  var mouthPoint = {
    x: 45,
    y: 20
  };

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
        var exitPoint = transformPoint(mouthPoint, transform);
        shoot(Flame(direction, {
          x: midpoint.x + exitPoint.x,
          y: midpoint.y + exitPoint.y
        }));
      }
    },

    update: function() {

    }
  }
  return self;
}