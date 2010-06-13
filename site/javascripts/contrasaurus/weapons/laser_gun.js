function LaserGun(I) {
  I = I || {};

  var monocle = loadImageTile("images/weapons/monocle.png");
  var monocleRed = loadImageTile("images/weapons/monocle_red.png");
  var redCount = 0;

  var eyePoint = {
    x: 39,
    y: -12
  };

  $.reverseMerge(I, {
    age: 0,
    power: 10,
    radius: 5,
    sprite: monocle,
    theta: 0,
    x: 39,
    y: -12
  });

  var self = Weapon(I).extend({
    shoot: function(midpoint, transform) {
      var exitPoint = transformPoint(eyePoint, transform);

      if (rand(100) < I.power) {
        I.sprite = monocleRed;
        redCount = 4;

        addGameObject(Laser(I.theta, {
          x: midpoint.x + exitPoint.x,
          y: midpoint.y + exitPoint.y
        }));
      }
    },

    update: function() {
      I.theta += Math.PI / 24;
      redCount--;

      if (redCount < 0) {
        I.sprite = monocle;
      }
    }
  });

  return self;
}