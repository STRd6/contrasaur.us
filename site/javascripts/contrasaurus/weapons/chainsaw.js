function Chainsaw(I) {
  I = I || {};

  var thrown = false;

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
      if (thrown) {
        I.active = false;
        thrown = false;
        dino.lastDirection(1);
        var xVelocity = dino.xVelocity();
        dino.xVelocity(Math.abs(xVelocity));
        return ThrownItem({
          collideDamage: 200,
          explodeDamage: 200,
          weaponName: "chainsaw",
          xVelocity: 8,
          yVelocity: -20
        });
      } else {
        return Bullet({
          dispersion: 30,
          duration: 1,
          effectCount: 13,
          speed: 0,
          sprite: Sprite.EMPTY,
          radius: 10,
          theta: direction,
          x: position.x,
          y: position.y
        });
      }
    },

    after: {
      update: function() {
        if (Math.random() < 0.001) {
          thrown = true;
        }

        I.theta = Math.sin(I.age / 4) * (Math.PI / 6) + (Math.PI / 12);
      }
    }
  });

  return self;
}
