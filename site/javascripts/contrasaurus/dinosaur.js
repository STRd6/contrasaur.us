function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack = Jetpack();
  var bite = Bite();

  //using this to indicate the first time the jetpack goes off
  var jetpackFlag = false;
  var userControlled = false;

  var currentHealth = 0;
  var cryCounter = 0;

  var biteCounter = 0;

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [bite];
  var activeWeapons = [bite];

  var pitchAngle = 0;
  var leftBaseAngle = Math.PI;
  var rightBaseAngle = 0;

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

  var parasailTile = Sprite.load("images/levels/parasail/parasail.png");

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
    jetpack.jetpackCounter(50);
    pitchAngle = Math.clamp(pitchAngle, -Math.PI/3, Math.PI/24)
    I.yVelocity = Math.clamp(I.xVelocity * Math.tan(pitchAngle), -5, 0);
    userControlled = true;
  });

  $(document).bind('keydown', 'left', function() {
    if(airborne) {
      if (jetpack.engaged()) {
        pitchAngle = Math.clamp(pitchAngle - Math.PI/48, -Math.PI/3, Math.PI/24);
        I.yVelocity = Math.clamp(I.xVelocity * Math.tan(pitchAngle), -5, 0);
      }
    }

    if (I.xVelocity >= 0 && !airborne) {
      I.xVelocity = (-1*I.xVelocity);
    }
    
    userControlled = true;
  });

  $(document).bind('keydown', 'right', function() {
    if(airborne) {
      if (jetpack.engaged()) {
        pitchAngle = Math.clamp(pitchAngle + Math.PI/48, -Math.PI/3, Math.PI/24);
        I.yVelocity = Math.clamp(I.xVelocity * Math.tan(pitchAngle), -5, 0);
      }
    }
    
    if (I.xVelocity < 0 && !airborne) {
      I.xVelocity = (-1*I.xVelocity);
    }

    userControlled = true;
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

    airborne: function() {
      return airborne;
    },

    boss: function(value) {
      if (value !== undefined) {
        boss = value;
        if (boss) {
          I.xVelocity = 1;
        }
      } else {
        if (boss) {
          I.xVelocity = 1;
        }
      }
      return boss;
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
          parasailTile.draw(canvas, -100, -100);
        }

        I.sprite.draw(canvas,
          -I.sprite.width/2,
          -I.sprite.height/2
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
      if(I.yVelocity >= 0) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        I.xVelocity = (Math.abs(I.xVelocity) / I.xVelocity) * 5;
        airborne = false;
        pitchAngle = -Math.PI/24
        jetpackFlag = false;
        jetpack.engaged(false);
        userControlled = false;
      }
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

        jetpack.update();

        if(parasailing) {
          I.xVelocity = Math.sin(I.age);
          I.yVelocity = Math.cos(I.age/2);
        } else {
          if (jetpack.engaged()) {
            airborne = true;
            currentLevel.tiltAmount(6 * (I.xVelocity/Math.abs(I.xVelocity)));
            I.xVelocity = 7 * (I.xVelocity/Math.abs(I.xVelocity));
          } else {
            currentLevel.tiltAmount(2);
          }

          if (boss) {
            currentLevel.tiltAmount(0);
          }

          if (!(jetpack.engaged()) && airborne) {
            I.yVelocity += GRAVITY;
          }

          if (airborne) {
            setModel(flyModel);
            if (!userControlled) {
              pitchAngle += Math.PI / 24;
            }
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
