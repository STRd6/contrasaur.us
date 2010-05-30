function Tank(I) {
  var gunAngle;
  var xVelocity;
  var height = 30;

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
    xVelocity: xVelocity,
    health: 10,
    hFlip: xVelocity <= 0,
    color: "#FF7",
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

  var self = Enemy(I);

  return self;
}
