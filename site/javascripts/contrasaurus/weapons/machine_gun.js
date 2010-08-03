function MachineGun(I) {
  I = I || {};

  var gunTile = Sprite.load("images/weapons/machineGun.png");

  var thrown = false;

  $.reverseMerge(I, {
    exitPoints: [Point(50, 1)],
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

    generateProjectile: function(direction, position) {
      if (thrown) {
        I.active = false;
        thrown = false;
        dino.lastDirection(1);
        var xVelocity = dino.xVelocity();
        dino.xVelocity(Math.abs(xVelocity));
        return ThrownItem({
          collideDamage: 20,
          explodeDamage: 20,
          shoot: function(I) {
            addGameObject(Bullet({ theta: I.rotation, x: I.x, y: I.y }))
          },
          weaponName: "machineGun",
          xVelocity: 8,
          yVelocity: -20,
          x: dino.position().x,
          y: dino.position().y
        });
      } else {
        return Bullet({ theta: direction, x: position.x, y: position.y });
      }
    },

    before: {
      update: function() {
        if(I.age >= I.duration || rand() < 0.005) {
          thrown = true;
        }
      }
    },

    after: {
      update: function() {
        updateGunAngle(dino);
      }
    }
  });
  return self;
}
