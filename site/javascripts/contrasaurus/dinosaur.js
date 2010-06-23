function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack = Jetpack();

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var airborne = true;

  var weapons = [Bazooka()];
  var activeWeapons = [];

  var pitchAngle = 0;

  var dinoTile = Sprite.load("images/levels/dino1.png");
  var parasailTile = Sprite.load("images/levels/parasail/parasail.png");
  
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

  var accessories = [];

  var lastDirection = I.xVelocity;

  var healthMax = I.health;

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  var self = GameObject(I).extend({
    addAccessory: function(accessory) {
      accessories.push(accessory);
    },

    addWeapon: function(weapon) {
      weapons.push(weapon);
    },

    airborne: function() {
      return airborne;
    },

    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), $.extend(bullet.position(), {
        duration: 10,
        sprite: [
          loadAnimation("images/effects/bloodEffect3_16x16_flip.png", 9, 16, 16),
          loadAnimation("images/effects/bloodEffect2_8x8.png", 10, 8, 8),
          loadAnimation("images/effects/bloodEffect1_8x8.png", 8, 8, 8),
          loadAnimation("images/effects/bloodEffect4_16x16_flip.png", 10, 16, 16)
        ].rand()
      }));

      addGameObject(effect);
    },

    getTransform: function () {
      var transform;

      if (lastDirection <= 0 && !parasailing) {
        transform = Matrix.HORIZONTAL_FLIP;
      } else {
        transform = Matrix.IDENTITY;
      }
      
      if(airborne) {
        transform = transform.concat(Matrix.rotation(pitchAngle));
      }

      return transform.translate(I.x, I.y);
    },

    heal: heal,

    bump: function() {
      I.xVelocity = -I.xVelocity;
    },

    draw: function(canvas) {

      canvas.withTransform(self.getTransform(), function() {
        if(parasailing) {
          parasailTile.draw(canvas, -100, -100);
        }

        dinoTile.draw(canvas,
          -dinoTile.width/2,
          -dinoTile.height/2
        );

        $.each(accessories, function(i, accessory) {
          accessory.draw(canvas);
        });

        if(!parasailing) {
          jetpack.draw(canvas);
        }

        $.each(weapons, function(i, weapon) {
          weapon.draw(canvas);
        });
      });

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

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing == true) {
          I.x = (CANVAS_WIDTH - width) / 2;
          I.y = 150;
          pitchAngle = 0;
          airborne = true;
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
            currentLevel.tiltAmount(6);
            I.xVelocity = 7;
          } else {
            currentLevel.tiltAmount(1);
          }

          if (airborne && jetpack.engaged()) {
            I.yVelocity = -1;
          }

          if (!(jetpack.engaged()) && airborne) {
            I.yVelocity = 6;
          }

          if (!airborne) {
            lastDirection = I.xVelocity;
          } else {
            pitchAngle += Math.PI / 24;
          }
        }

        $.each(weapons, function(i, weapon) {
          weapon.update(self);

          if(weapon.active()) {
            activeWeapons.push(weapon);
          }
        });

        weapons = activeWeapons;
        activeWeapons = [];

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
