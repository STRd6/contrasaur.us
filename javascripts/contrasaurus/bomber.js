function Bomber(I) {
  I = I || {};
  var gunAngle = (5 / 6) * Math.PI;

  $.reverseMerge(I, {
    x: 600,
    y: 40,
    width: 50,
    height: 20,
    xVelocity: I.xVelocity || -5,
    yVelocity: 0,
    health: 5,
    color: "#088",
    pointsWorth: 3000,
    shootLogic: function() {
      // Shoot
      if (Math.random() < 0.05) {
        enemyShoot(Bomb(
          gunAngle, {
            x: self.midpoint().x,
            y: self.midpoint().y
          }
        ));
      }
    }
  });

  var self = GameObject(I).extend({
    after: {
      update: function() {
        I.shootLogic();
      }
    }
  });

  return self;
}