function LaserGun(I) {
  I = I || {};

  var monocle = Sprite.load("images/weapons/monocle.png");
  var monocleRed = Sprite.load("images/weapons/monocle_red.png");
  var redCount = 0;

  $.reverseMerge(I, {
    age: 0,
    attachment: "eye",
    duration: 3000,
    exitPoints: [Point(5, 2)],
    power: 10,
    radius: 5,
    sprite: monocle
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      return Bullet({
        speed: 13,
        collideDamage: 3,
        health: 5000,
        radius: 2,
        sprite: Sprite.load("images/projectiles/laser.png"),
        theta: direction,
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
