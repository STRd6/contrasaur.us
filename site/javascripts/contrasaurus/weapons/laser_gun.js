function LaserGun(I) {
  I = I || {};

  var monocle = loadImageTile("images/weapons/monocle.png");
  var monocleRed = loadImageTile("images/weapons/monocle_red.png");
  var redCount = 0;

  $.reverseMerge(I, {
    age: 0,
    exitPoints: [Point(0, 0)],
    power: 10,
    radius: 5,
    sprite: monocle,
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.translation(39, -12);
    },

    after: {
      update: function() {
        I.theta += Math.PI / 24;
        redCount--;

        if (redCount < 0) {
          I.sprite = monocle;
        }
      }
    }
  });

  return self;
}
