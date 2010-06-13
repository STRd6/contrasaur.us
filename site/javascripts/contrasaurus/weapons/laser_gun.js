function LaserGun(I) {
  I = I || {};

  var eyePoint = {
    x: 45,
    y: -11
  };

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
      var exitPoint = transformPoint(eyePoint, transform);
      if (rand(100) < I.power) {
        addGameObject(Laser(I.theta, {
          x: midpoint.x + exitPoint.x,
          y: midpoint.y + exitPoint.y
        }));
      }
    },

    update: function() {
      I.theta += Math.PI / 24;
    }
  });

  return self;
}