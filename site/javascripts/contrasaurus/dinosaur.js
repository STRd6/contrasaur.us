function Dinosaur() {
  var width = 128;
  var height = 128;
  var laserGun = LaserGun();
  var flamethrower = Flamethrower();
  var primalScream = PrimalScream();
  var machineGun = MachineGun();
  var chainsaw = Chainsaw();
  var jetpack = Jetpack();

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var airborne = true;
  var berserk = false;

  var dinoTile = loadImageTile("images/dino1.png");
  var parasailTile = loadImageTile("images/parasail.png");
  
  var I = {
    x: x,
    y: y,
    width: width,
    height: height,
    color: "#00F",
    health: 500,
    radius: 64,
    xVelocity: 1,
    yVelocity: 6,
    collideDamage: 2,
    collisionType: "dino",
    hitCircles: [{"x":-37,"y":3,"radius":14},{"x":45,"y":-4,"radius":13},{"x":-4,"y":58,"radius":5},{"x":29,"y":-9,"radius":17},{"x":-10,"y":12,"radius":28},{"x":-11,"y":40,"radius":9},{"x":-13,"y":54,"radius":7},{"x":24,"y":14,"radius":9},{"x":-50,"y":-3,"radius":9}]
  };

  var lastDirection = I.xVelocity;

  var healthMax = I.health;

  function fireWeapons() {
    // TODO change this over to a generic shoot call on each weapon
    $.each(weaponsArray, function(i, weapon) {
      weapon.shoot(self.position(), self.getTransform());
    });
  }

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  var self = GameObject(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), 10, $.extend(bullet.position(), {
        sprite: [
          loadAnimation("images/effects/bloodEffect3_16x16 flip.png", 9, 16, 16),
          loadAnimation("images/effects/bloodEffect2_8x8.png", 10, 8, 8),
          loadAnimation("images/effects/bloodEffect1_8x8.png", 8, 8, 8),
          loadAnimation("images/effects/bloodEffect4_16x16.png", 10, 16, 16)
        ].rand()
      }));

      addGameObject(effect);
    },

    powerupWeapons: function(weaponName) {
      if (weaponName == "bazooka") {
        bazooka.power(2);
      } else if (weaponName == "flamethrower") {
        flamethrower.power(4);
      } else if (weaponName == "lasergun") {
        laserGun.power(2);
      } else if (weaponName == "primalscream") {
        primalScream.power(2);
      } else if (weaponName == "shotgun") {
        shotgun.power(3);
      } else if (weaponName == "machineGun") {
        machineGun.power(1);
      }
    },

    yVelocity: function(value) {
      if (value === undefined) {
        return I.yVelocity;
      } else {
        I.yVelocity = value;
        return self;
      }
    },

    getTransform: function () {
      if (lastDirection <= 0 && !parasailing) {
        return Matrix.HORIZONTAL_FLIP;
      } else {
        return Matrix.IDENTITY;
      }
    },

    jetpack: function() {
      return jetpack;
    },

    bump: function() {
      I.xVelocity = -I.xVelocity;
    },

    draw: function(canvas) {

      canvas.withState(I.x, I.y, { transform: self.getTransform() }, function() {
        if(parasailing) {
          parasailTile.draw(canvas, -100, -100);
        }

        dinoTile.draw(canvas,
          -dinoTile.width/2,
          -dinoTile.height/2
        );

        if(!parasailing) {
          jetpack.draw(canvas);
        }

        chainsaw.draw(canvas);
      });

      // TO DO call draw on each weapon
      machineGun.draw(canvas, self.position());

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },
    land: function(h) {
      I.y = h - (I.radius + 1);
      I.yVelocity = 0;
      I.xVelocity = (Math.abs(I.xVelocity) / I.xVelocity) * 5;
      airborne = false;
    },
    powerup: function(powerup) {
      if(powerup.health) {
        display("FOOD!");
        heal(powerup.health);
      }

      if(powerup.weapon) {
        for(var weapon in powerup.weapon) {
          display(weapon + "!");
        }
      }
    },

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing == true) {
          I.x = (CANVAS_WIDTH - width) / 2;
          I.y = 150;
        }
        return self;
      } else {
        return parasailing;
      }
    },
    
    after: {
      update: function(position) {
        jetpack.update();

        if(parasailing) {
          I.xVelocity = Math.sin(I.age);
          I.yVelocity = Math.cos(I.age/2);
        } else {
          if (jetpack.engaged()) {
            airborne = true;
          }

          if (airborne && jetpack.engaged()) {
            I.yVelocity = -1;
          }

          if (!(jetpack.engaged()) && airborne) {
            I.yVelocity = 6;
          }

          if (!airborne) {
            lastDirection = I.xVelocity;
          }
        }

        if(I.health < healthMax / 2) {
          berserk = true;
        } else {
          berserk = false;
        }

        fireWeapons();

        flamethrower.Direction(lastDirection);
        machineGun.getBerserk(berserk);
        machineGun.getAirborne(airborne);

        $.each(weaponsArray, function(i, weapon) {
          weapon.update();
        });

        // Stay in screen
        if (I.x < position.x + I.radius) {
          I.x = position.x + I.radius;
          I.xVelocity = Math.abs(I.xVelocity);
        } else if (I.x > position.x + CANVAS_WIDTH - I.radius) {
          I.x = position.x + CANVAS_WIDTH - I.radius;
          I.xVelocity = -Math.abs(I.xVelocity);
        }

        // Wiggle in the air
        if (airborne) {
          I.xVelocity += (Math.random() - 0.5) * 3;
          I.xVelocity = I.xVelocity * 0.9;
        }
      }
    }
  });
  var shotgun = Shotgun(self);
  var bazooka = Bazooka();
  var weaponsArray = [];
  weaponsArray.push(chainsaw, laserGun, flamethrower, bazooka, primalScream, shotgun, machineGun, jetpack);


  return self;
}