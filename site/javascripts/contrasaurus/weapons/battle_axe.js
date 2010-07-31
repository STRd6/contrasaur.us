function BattleAxe(I) {
  I = I || {};

  var thrown = false;

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
      if (thrown) {
        I.active = false;
        thrown = false;
        dino.lastDirection(1);
        var xVelocity = dino.xVelocity();
        dino.xVelocity(Math.abs(xVelocity));
        return ThrownItem({});
      } else {
        return Bullet({
          duration: 1,
          speed: 0,
          sprite: Sprite.EMPTY,
          radius: 20,
          theta: direction,
          x: position.x,
          y: position.y
        });
      }
    },

    after: {
      update: function() {
        if (Math.random() < 0.03) {
          thrown = true;
        }

        I.theta = Math.sin(I.age / 4) * (Math.PI / 2) + Math.PI / 4;
      }
    }
  });

  return self;
}
