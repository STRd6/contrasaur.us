function MachineGun(I) {
  I = I || {};

  $.reverseMerge(I, {
    exitPoints: [Point(50, 1)],
    name: "machineGun",
    radius: 5,
    theta: 0,
    thetaVelocity: Math.PI / 48,
    throwable: {
      shoot: function(I) {
        addGameObject(Bullet({ theta: I.rotation, x: I.x, y: I.y }))
      }
    }
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
      return Matrix.rotation(I.theta).translate(I.x, I.y);
    },

    before: {
      update: function() {
        updateGunAngle(dino);

        if(I.age >= I.duration || rand() < 0.005) {
          self.toss();
        }
      }
    }
  });
  return self;
}
