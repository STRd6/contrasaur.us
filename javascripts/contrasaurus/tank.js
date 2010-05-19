function Tank(I) {
  var gunAngle;
  var xVelocity;

  if (Math.random() < 0.5) {
    xVelocity = 0.5;
    gunAngle = - Math.PI / 12;
  } else {
    xVelocity = -0.5;
    gunAngle = 13 * Math.PI / 12;
  }

  $.reverseMerge(I, {
    y: 350,
    width: 30,
    height: 30,
    xVelocity: xVelocity,
    health: 10,
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