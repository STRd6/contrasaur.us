function Tank(I) {
  I = I || {};

  var gunAngle;
  var tankTile = Sprite.load("images/enemies/tank.png")

  $.reverseMerge(I, {
    y: CANVAS_HEIGHT - Floor.LEVEL,
    radius: 25,
    xVelocity: 0.5,
    health: 10,
    hFlip: I.xVelocity <= 0,
    color: "#FF7",
    pointsWorth: 5000,
    sprite: tankTile,
    shootLogic: function() {
      // Shoot
      if (Math.random() < 0.05) {
        self.shoot(
          gunAngle, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            sprite: Sprite.load("images/projectiles/blast_small.png"),
            collideDamage: 7
          }
        );
      }
    }
  });

  if (I.xVelocity == 0.5) {
    gunAngle = - Math.PI / 12;
  } else {
    gunAngle = 13 * Math.PI / 12;
  }

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect
  });

  return self;
}
