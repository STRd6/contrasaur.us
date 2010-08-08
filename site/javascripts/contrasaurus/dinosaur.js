function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack = Jetpack();

  var currentHealth = 0;
  var cryCounter = 0;
  var biteCounter = 0;

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [jetpack];
  var activeWeapons = [];

  var pitchAngle = 0;

  var standModel = Model.loadJSONUrl("javascripts/data/dinosaur/stand.model.json");
  var walkModel = Model.loadJSONUrl("javascripts/data/dinosaur/walk.model.json");
  var flyModel = Model.loadJSONUrl("javascripts/data/dinosaur/fly.model.json");
  var biteModel = Model.loadJSONUrl("javascripts/data/dinosaur/bite.model.json");
  var cryModel = Model.loadJSONUrl("javascripts/data/dinosaur/cry.model.json");

  var parasailTile = Sprite.load("images/levels/parasail/sail.png");

  var currentModel = standModel;

  var I = {
    collideDamage: 2,
    collisionType: "dino",
    hitCircles: currentModel.hitFrames,
    health: 500,
    radius: 72,
    sprite: currentModel.animation,
    x: x,
    y: y,
    xVelocity: 0,
    yVelocity: 6
  };

  var accessories = [];

  var lastDirection = 1;
  var healthMax = I.health;

  $(document).bind('keydown', 'space', function() {
    if(!airborne) {
      jetpack.trigger('engage');
    }
  });

  $(document).bind('keydown', 'left', function() {
    if (!parasailing) {
      I.xVelocity = -6;
    }
  });

  $(document).bind('keyup', 'left', function() {
    if (!parasailing) {
      I.xVelocity = 0;
    }
  });

  $(document).bind('keydown', 'right', function() {
    if (!parasailing) {
      I.xVelocity = 6;
    }
  });

  $(document).bind('keyup', 'right', function() {
    if (!parasailing) {
      I.xVelocity = 0;
    }
  });

  $(document).bind('keydown', 'down', function() {
    if (!parasailing) {
      if (biteCounter <= 0) {
        biteCounter = 24;
        biteModel.animation.frame(0);
      }
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

      if (parasailing || I.xVelocity > 0 || lastDirection > 0) {
        transform = Matrix.IDENTITY;
      } else {
        transform = Matrix.HORIZONTAL_FLIP;
      }
      
      if(airborne) {
        transform = transform.concat(Matrix.rotation(pitchAngle));
      }

      return transform.translate(I.x, I.y);
    },

    heal: heal,

    draw: function(canvas) {

      canvas.withTransform(self.getTransform(), function() {
        if(parasailing) {
          parasailTile.draw(canvas, -150, -170);
        }

        I.sprite.draw(canvas,
          -I.sprite.width/2,
          -I.sprite.height/2
        );

        $.each(accessories, function(i, accessory) {
          accessory.attachment(currentModel);
          accessory.draw(canvas);
        });

        $.each(weapons, function(i, weapon) {
          weapon.attachment(currentModel);
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
        airborne = false;
        pitchAngle = 0;
        jetpack.engaged(false);
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
      update: function() {
        if(!airborne && (biteCounter > 0 || cryCounter > 0)) {
          I.xVelocity = 0;
        }

        currentHealth = I.health;
      },
    },
    after: {
      hit: function(other) {
        if (I.health < currentHealth && !airborne && biteCounter <= 0) {
          cryCounter += (currentHealth - I.health) / 2;
        }
      },
      update: function(position) {
        // Choose correct animation and hitFrames
        if(I.xVelocity != 0) {
          lastDirection = I.xVelocity;
        }

        if(biteCounter > 0) {
          biteCounter--;

          var bitePoint = currentModel.attachment("bite");
          if(bitePoint.x != 0) {
            var t = self.getTransform();
            var p = t.transformPoint(bitePoint);

            addGameObject(Bullet({
              collideDamage: 20,
              dispersion: 30,
              effectCount: 5,
              duration: 1,
              radius: 30,
              speed: 0,
              sprite: Sprite.EMPTY,
              x: p.x,
              y: p.y
            }));
          }
        }

        if(cryCounter > 0) {
          cryCounter--;
        }

        if(parasailing) {
          I.xVelocity = Math.sin(I.age) + 7;
          I.yVelocity = Math.cos(I.age/2);

          setModel(flyModel);
        } else {
          if (airborne) {
            if(!jetpack.engaged()) {
              I.yVelocity += GRAVITY;
            }

            setModel(flyModel);
          } else {
            // TODO: Maybe a state machine?
            if (biteCounter > 0) {
              setModel(biteModel);
            } else if(cryCounter > 0) {
              setModel(cryModel);
            } else if(I.xVelocity != 0) {
              setModel(walkModel);
            } else {
              setModel(standModel);
            }
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

        I.hitCircles = currentModel.hitFrame();
      }
    }
  });

  var tophat = Accessory({
    attachment: "hat",
    sprite: Sprite.load("images/accessories/tophat.png")
  });

  if(rand() < 1) {
    self.addAccessory(tophat);
  }

  return self;
}
