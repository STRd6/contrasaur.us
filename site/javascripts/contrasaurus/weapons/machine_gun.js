function MachineGun(I) {
  I = I || {};

  var gunWidth = 0;
  var gunTile = loadImageTile("images/machine_gun.png", function(tile) {
    gunWidth = tile.width;
  });
  var gunDelta = {x: 25, y: 4};

  $.reverseMerge(I, {
    airborne: true,
    age: 0,
    berserk: 0,
    power: 0,
    radius: 5,
    theta: 0,
    thetaVelocity: Math.PI / 48,
    x: 0,
    y: 0
  });

  // Adjust machine gun angle
  function updateGunAngle() {
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
    if(Math.sin(-I.theta) < -0.3 && !I.airborne) {
      I.theta -= I.thetaVelocity * 2;
    }
  }

  var self = Weapon(I).extend({
    getAirborne: function(value) {
      I.airborne = value;
    },

    getBerserk: function(value) {
      I.berserk = value;
    },

    shoot: function(midpoint, transform) {
      if (I.power > 0) {
        var berserkTheta = I.theta - Math.PI / 24;

        addGameObject(Bullet(I.theta, {
          x: midpoint.x + gunDelta.x + Math.cos(I.theta) * gunWidth/2,
          y: midpoint.y + gunDelta.y + Math.sin(I.theta) * gunWidth/2
        }));

        if (I.berserk) {
          addGameObject(Bullet(berserkTheta, {
            x: midpoint.x + gunDelta.x + Math.cos(berserkTheta) * gunWidth/2,
            y: midpoint.y + gunDelta.y + Math.sin(berserkTheta) * gunWidth/2
          }));
        }
      }
    },

    update: function() {
      I.theta += I.thetaVelocity;
      updateGunAngle();
    },

    draw: function(canvas, midpoint) {
      // Draw Machine Gun
      canvas.withState(
        midpoint.x,
        midpoint.y,
        {rotation: I.theta},
        function() {
          gunTile.draw(canvas, -gunTile.registrationPoint.x, -gunTile.registrationPoint.y);
        }
      );
    }
  });
  return self;
}