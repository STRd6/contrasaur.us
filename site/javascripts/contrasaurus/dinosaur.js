function Dinosaur() {
  var width = 128;
  var height = 128;
  var jetpackCounter = 0;
  var jetpackCharge = 0;
  var laserGun = LaserGun();
  var flamethrower = Flamethrower();
  var bazooka = Bazooka();
  var primalScream = PrimalScream();
  var shotgun = Shotgun();
  var machineGun = MachineGun();
  var jetpack = Jetpack();

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 0;

  var airborne = true;
  var berserk = false;

  var getTransform = function() {
    if (lastDirection <= 0) {
      return {
        a: -1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0
      };
    } else {
      return {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0
      };
    }
  }

  var dinoTile = loadImageTile("images/dino1.png");
  
  var I = {
    x: x,
    y: y,
    width: width,
    height: height,
    color: "#00F",
    health: 500,
    radius: 64,
    weapons: {
      bombs: 0,
      machineGun: 0,
      shotgun: 0,
      bazooka: 0,
      jetpack: 0,
      laser: 0,
      flamethrower: 0
    },
    xVelocity: 1,
    yVelocity: 6,
    collideDamage: 2
  };

  var lastDirection = I.xVelocity;

  var healthMax = I.health;

  function fireWeapons() {
    // TODO change this over to a generic shoot call on each weapon
    machineGun.shoot(self.midpoint(), getTransform());
    laserGun.shoot(self.midpoint(), getTransform());
    flamethrower.shoot(self.midpoint(), getTransform());
    bazooka.shoot(self.midpoint(), getTransform());
    primalScream.shoot(self.midpoint(), getTransform());
    shotgun.shoot(self.midpoint(), getTransform());
  }

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  function nearestEnemy() {
    var nearest;
    var nearestDistance;

    $.each(currentLevel.enemies(), function(i, enemy) {
      var enemyDistance = distance(self.midpoint(), enemy.midpoint());
      if(nearest) {
        if(nearestDistance > enemyDistance) {
          nearest = enemy;
          nearestDistance = enemyDistance;
        }
      } else {
        nearest = enemy;
        nearestDistance = enemyDistance
      }
    });

    return nearest;
  }

  function nearestEnemy2() {
    var enemyDistance = [];

    enemyDistance = $.map(enemyDistance, function(enemy, i) {
      return {
        enemy: enemy,
        distance: distance(self.midpoint(), enemy.midpoint())
    }})

    return enemyDistance;
  }

  var self = GameObject(I).extend({

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

    getWeapons: function() {
      return I.weapons;
    },

    getTheta: function() {
      return theta;
    },

    jetpack: function() {
      return jetpack;
    },

    bump: function() {
      I.xVelocity = -I.xVelocity;
    },

    draw: function(canvas) {

      canvas.withState(I.x, I.y, { transform: getTransform() }, function() {

        dinoTile.draw(canvas,
          -dinoTile.width/2,
          -dinoTile.height/2
        );

        jetpack.draw(canvas);
      });

      // TO DO call draw on each weapon
      machineGun.draw(canvas, self.midpoint());

      if (GameObject.DEBUG_HIT) {
        var circle = self.getCircle();
        canvas.fillCircle(circle.x, circle.y, circle.radius, "rgba(255, 0, 0, 0.5)");
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
          I.weapons[weapon] += powerup.weapon[weapon];
        }
      }
    },
    
    after: {
      update: function(position, velocity) {
        jetpack.update();

        if (jetpack.active()) {
          airborne = true;
        } 

        if (airborne && jetpack.active()) {
          I.yVelocity = -1;
        }

        if (!(jetpack.active()) && airborne) {
          I.yVelocity = 6;
        }

        I.x += velocity.x;

        if (!airborne) {
          lastDirection = I.xVelocity;
        }

        if(I.health < healthMax / 2) {
          berserk = true;
        } else {
          berserk = false;
        }

        fireWeapons();

        laserGun.update();
        bazooka.update();
        flamethrower.Direction(lastDirection);
        machineGun.getBerserk(berserk);
        machineGun.getAirborne(airborne);
        machineGun.update();
        shotgun.nearestEnemy(nearestEnemy());

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

  return self;
}