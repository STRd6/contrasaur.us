function Mortar(I) {
  I = I || {};
  var launchAngle = -Math.PI/2.5;

  $.reverseMerge(I, {
    color: "#880",
    width: 20,
    collisionDamage: 0
  });

  var self = Bullet(launchAngle, I).extend({
    after: {
      hit: function() {
        I.active = true;
      },
      update: function() {
        I.yVelocity += 0.3;
        bullets.push(Bullet(0, {
          x: 50,
          y: 50,
          color: "#F0F"
        }));

        // Deploy cluster bombs at top
        if (I.yVelocity >= 0) {
          I.active = false;
          (11).times(function(i) {
            var theta = ((i + 1) / 12) * Math.PI;
            shoot(Bullet(theta, {
              x: self.midpoint().x,
              y: self.midpoint().y,
              color: "#F0F"
            }));
          });
        }
      }
    }
  });

  return self;
}
