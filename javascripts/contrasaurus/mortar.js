function Mortar(I) {
  I = I || {};
  var launchAngle = -Math.PI/4;

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
        I.yVelocity += 0.2;

        // Deploy cluster bombs at top
        if (I.yVelocity > 0) {
          console.log("Boom!");

          console.log(bullets.length);
          I.active = false;

          (12).times(function(i) {
            var theta = (i / 12) * Math.PI;
            bullets.push(Bullet(theta, {
              x: self.midpoint().x,
              y: self.midpoint().y,
              color: "#F0F"
            }));
          });


          console.log(bullets.length);
        }
      }
    }
  });

  return self;
}
