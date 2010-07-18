function Chainsaw(I) {
  I = I || {};

  var thrown = false;
  var xVelocity = 0;
  var yVelocity = 0;

  $.reverseMerge(I, {
    duration: 1000,
    exitPoints: [Point(5, 10), Point(25, 10), Point(45, 10)],
    radius: 5,
    sprite: Sprite.load("images/weapons/chainsaw.png"),
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta, Point(-52, -12)).translate(122, -5);
    },

    generateProjectile: function(direction, position) {
      return Bullet(direction, {
        dispersion: 30,
        duration: 1,
        effectCount: 13,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 10,
        x: position.x,
        y: position.y
      });
    },

    after: {
      update: function() {
        if (Math.random() < 0.4) {
          thrown = true;
        }

        if (thrown) {
          xVelocity += 5;
          yVelocity = -7;
        }

        I.theta = Math.sin(I.age / 4) * (Math.PI / 6) + (Math.PI / 12);
      }
    }
  });

  return self;
}
