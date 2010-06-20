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
    sprite: monocle
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.translation(39, -12);
    },

    generateProjectile: function(direction, position) {
      return Bullet(direction, {
        speed: 13,
        collideDamage: 3,
        radius: 2,
        sprite: loadImageTile("images/projectiles/laser.png"),
        x: position.x,
        y: position.y
      });
    },

    after: {
      shoot: function() {
        I.sprite = monocleRed;
        redCount = 3;
      }
    },

    before: {
      update: function() {
        redCount--;

        if (redCount < 0) {
          I.sprite = monocle;
        }
      }
    }
  });

  return self;
}
