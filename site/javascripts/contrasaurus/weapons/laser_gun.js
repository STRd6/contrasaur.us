function LaserGun(I) {
  I = I || {};

  var monocle = loadImageTile("images/weapons/monocle.png");
  var monocleRed = loadImageTile("images/weapons/monocle_red.png");
  var redCount = 0;

  $.reverseMerge(I, {
    age: 0,
    exitPoints: [Point(10, 2)],
    power: 10,
    radius: 5,
    sprite: monocle,
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.translation(39, -12);
    },

    generateBulletData: function(globalPosition, localPosition) {
      return {
        speed: 13,
        collideDamage: 3,
        radius: 2,
        sprite: loadImageTile("images/laser.png"),
        x: localPosition.x + globalPosition.x,
        y: localPosition.y + globalPosition.y
      }
    },

    after: {
      shoot: function() {
        I.sprite = monocleRed;
      },

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
