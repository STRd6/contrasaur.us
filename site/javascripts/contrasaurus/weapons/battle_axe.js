function BattleAxe(I) {
  I = I || {};

  var thrown = false;
  var xVelocity = 0;
  var yVelocity = 0;

  $.reverseMerge(I, {
    exitPoints: [Point(10, -30)],
    radius: 5,
    sprite: Sprite.load("images/weapons/battleAxe.png"),
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta, Point(60, 0)).concat(Matrix.translation(70, -50));
    },

    generateProjectile: function(direction, position) {
      //TODO: Throw Axe
      return Bullet(direction, {
        duration: 1,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 20,
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

        I.theta = Math.sin(I.age / 4) * (Math.PI / 2) + Math.PI / 4;
      }
    }
  });

  return self;
}
