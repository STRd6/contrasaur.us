function Tank(I) {
  I = I || {};

  var gunAngle;
  var tankTile = loadAnimation("images/enemies/tank_move.png", 4, 123, 55, 3);
  var exitPoint = Point(60, -23);

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
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);

        self.shoot(gunAngle, {
          x: p.x,
          y: p.y,
          sprite: Sprite.load("images/projectiles/blast_small.png"),
          collideDamage: 7
        });
      }
    },
    type: 'tank'
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
