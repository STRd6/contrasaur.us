function Tank(I) {
  I = I || {};

  var gunAngle;
  var xVelocity;
  var tankTile = loadImageTile("images/tank.png")

  var height = tankTile.height;

  if (Math.random() < 0.5) {
    xVelocity = 0.5;
    gunAngle = - Math.PI / 12;
  } else {
    xVelocity = -0.5;
    gunAngle = 13 * Math.PI / 12;
  }

  $.reverseMerge(I, {
    y: canvas.height() - Floor.LEVEL - height,
    width: 30,
    height: height,
    radius: 25,
    xVelocity: xVelocity,
    health: 10,
    hFlip: xVelocity <= 0,
    color: "#FF7",
    sprite: tankTile,
    shootLogic: function() {
      // Shoot
      if (Math.random() < 0.05) {
        enemyShoot(Bullet(
          gunAngle, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            sprite: loadImageTile("images/blast_small.png"),
            collideDamage: 7
          }
        ));
      }
    }
  });

  var self = Enemy(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), 9, $.extend(bullet.getCircle(), {
        sprite: loadAnimation("images/effects/sparkEffect2_16x16.png", 7, 16, 16)
      }));

      addEffect(effect);
    }
  });

  return self;
}
