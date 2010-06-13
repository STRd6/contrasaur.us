function LaserGun(I) {
  I = I || {};

  var eyePoint = {
    x: 39,
    y: -12
  };

  $.reverseMerge(I, {
    age: 0,
    power: 10,
    radius: 5,
    sprite: loadImageTile("images/weapons/monocle.png"),
    theta: 0,
    x: 39,
    y: -12
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