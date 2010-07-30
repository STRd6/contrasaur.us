function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack = Jetpack();
  var bite = Bite();

  var currentHealth = 0;
  var cryCounter = 0;

  var biteCounter = 0;

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [bite, jetpack];
  var activeWeapons = [];

  var pitchAngle = 0;

  var walkModel = Model.loadJSONUrl("javascripts/data/dinosaur/walk.model.json");

  var flyModel = Model(
    Sprite.load("images/contrasaurus/fly.png"),
    [
      [{"x":88,"y":-49,"radius":30},{"x":16,"y":-12,"radius":36},{"x":117,"y":-45,"radius":24},{"x":51,"y":-36,"radius":20},{"x":-62,"y":1,"radius":19},{"x":-28,"y":-6,"radius":30},{"x":-86,"y":8,"radius":18},{"x":-114,"y":24,"radius":25},{"x":-135,"y":9,"radius":6}]
    ]
  );
  var biteModel = Model.loadJSONUrl("javascripts/data/dinosaur/bite.model.json");

  var cryModel = Model(
    Sprite.load("images/contrasaurus/cry.png"),
    [
      [{"x":87,"y":-52,"radius":27},{"x":13,"y":-10,"radius":37},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-27,"y":-12,"radius":25},{"x":-60,"y":-2,"radius":18},{"x":-89,"y":5,"radius":14},{"x":-113,"y":10,"radius":12},{"x":-2,"y":35,"radius":20},{"x":0,"y":64,"radius":18},{"x":24,"y":72,"radius":10},{"x":39,"y":73,"radius":8},{"x":-130,"y":11,"radius":8}]
    ]
  );

  var parasailTile = Sprite.load("images/levels/parasail/sail.png");

  var currentModel = walkModel;

  var I = {
    collideDamage: 2,
    collisionType: "dino",
    hitCircles: currentModel.hitFrames,
    health: 500,
    radius: 72,
    sprite: currentModel.animation,
    x: x,
    y: y,
    xVelocity: 1,
    yVelocity: 6
  };

  var accessories = [];

  var lastDirection = I.xVelocity;

  var healthMax = I.health;

  $(document).bind('keydown', 'space', function() {
    if(!airborne) {
      jetpack.trigger('engage');
    }
  });

  $(document).bind('keydown', 'left', function() {
    if (I.xVelocity >= 0 && !airborne) {
      I.xVelocity = (-1*I.xVelocity);
    }
  });

  $(document).bind('keydown', 'right', function() {    
    if (I.xVelocity < 0 && !airborne) {
      I.xVelocity = (-1*I.xVelocity);
    }
  });

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  function setModel(model) {
    currentModel = model;
    I.sprite = currentModel.animation;
  }

  var self = GameObject(I).extend({
    addAccessory: function(accessory) {
      accessories.push(accessory);
    },

    addWeapon: function(weapon) {
      weapons.push(weapon.dino(self));
    },

    airborne: function(value) {
      if (value !== undefined) {
        airborne = value;
      } else {
        return airborne;
      }
    },

    boss: function(value) {
      if (value !== undefined) {
        boss = value;

        if (boss) {
          I.xVelocity = 1;

          boss.healthBar()
          $("#boss").show();
        } else {
          $("#boss").hide();
        }
        return self;
      } else {
        return boss;
      }
    },

    bulletHitEffect: Enemy.bloodSprayEffect,

    components: function() {
      return weapons;
    },

    getTransform: function() {
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
      if (biteCounter <= 0) {
        biteCounter = 24;
        biteModel.animation.frame(0);
      }

      if (!airborne && biteCounter > 0) {
        setModel(biteModel);
      }
    },

    draw: function(canvas) {

      canvas.withTransform(self.getTransform(), function() {
        if(parasailing) {
          parasailTile.draw(canvas, -150, -170);
          setModel(flyModel);
        }

        I.sprite.draw(canvas,
          -I.sprite.width/2,
          -I.sprite.height/2
        );

        $.each(accessories, function(i, accessory) {
          accessory.draw(canvas);
        });

        $.each(weapons, function(i, weapon) {
          weapon.draw(canvas);
        });
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    land: function(h) {
      if(I.yVelocity >= 0) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        I.xVelocity = (Math.abs(I.xVelocity) / I.xVelocity) * 5;
        airborne = false;
        pitchAngle = 0;
        jetpack.engaged(false);
      }
    },

    lastDirection: function(value) {
      if (value !== undefined) {
        lastDirection = value;
        return lastDirection;
      } else {
        return lastDirection;
      }
    },

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing == true) {
          I.x = (CANVAS_WIDTH - width) / 2 - 100;
          I.y = 200;
          pitchAngle = 0;
          airborne = true;
        }
        return self;
      } else {
        return parasailing;
      }
    },

    pitchAngle: function(value) {
      if(value !== undefined) {
        pitchAngle += value;
        return pitchAngle;
      } else {
        return pitchAngle;
      }
    },

    xVelocity: function(value) {
      if(value !== undefined) {
        I.xVelocity = value;
        return I.xVelocity;
      } else {
        return I.xVelocity;
      }
    },

    yVelocity: function(value) {
      if(value !== undefined) {
        I.yVelocity = value;
        return I.yVelocity;
      } else {
        return I.yVelocity;
      }
    },
    before: {
      // HAX: to make sure walking on the floor
      // doesn't trigger the cry model
      hit: function(other) {
        currentHealth = I.health;
        cryCounter = 30;
      }
    },
    after: {
      hit: function(other) {
        if (I.health < currentHealth && !airborne && biteCounter <= 0 && cryCounter > 0) {
          setModel(cryModel);
          cryCounter--;
        }
      },
      update: function(position) {
        // Choose correct animation and hitFrames

        biteCounter--;

        if(parasailing) {
          I.xVelocity = Math.sin(I.age) + currentLevel.tiltAmount();
          I.yVelocity = Math.cos(I.age/2);
        } else {
          currentLevel.tiltAmount(2);

          if (boss) {
            currentLevel.tiltAmount(0);
          }

          if ((!jetpack.engaged()) && airborne) {
            I.yVelocity += GRAVITY;
          }

          if (airborne) {
            setModel(flyModel);
          } else {
            if (biteCounter <= 0) {
              setModel(walkModel);
            }
            lastDirection = I.xVelocity;
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

        I.hitCircles = currentModel.hitFrame();
      }
    }
  });

  return self;
}
