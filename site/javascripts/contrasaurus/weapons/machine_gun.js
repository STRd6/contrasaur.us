function MachineGun(I) {
  I = I || {};

  var gunTile = Sprite.load("images/weapons/machineGun.png");

  $.reverseMerge(I, {
    exitPoints: [Point(25, 4)],
    radius: 5,
    sprite: gunTile,
    theta: 0,
    thetaVelocity: Math.PI / 48
  });

  // Adjust machine gun angle
  function updateGunAngle(dino) {
    I.theta += I.thetaVelocity;

    // Change gun rotation direction
    if(Math.random() < 0.05) {
      I.thetaVelocity = I.thetaVelocity * -1;
    }

    // Flip target angle 180
    if(Math.random() < 0.05) {
      I.theta += Math.PI;
    }

    // Don't shoot machine gun into the ground
    if(Math.sin(-I.theta) < -0.3 && !dino.airborne()) {
      I.theta -= I.thetaVelocity * 2;
    }
  }

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta);
    },

    after: {
      update: updateGunAngle,
    }
  });
  return self;
}
