var shooting = false;
var secondaryShooting = false;

function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack;
  var jetpackOn = false;
  var jetpackAngle = 0;

  var currentHealth = 0;
  var cryCounter = 0;
  var biteCounter = 0;
  var idleCounter = 0;

  var x = CANVAS_WIDTH / 2;
  var y = 150;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [];
  var selectedWeapon;

  var keyDown = {};

  var modelPath = "data/dinosaur/";
  var extension = ".model.json";
  var standModel = Model.loadJSONUrl(modelPath + "stand" + extension);
  var walkModel = Model.loadJSONUrl(modelPath + "walk" + extension);
  var flyModel = Model.loadJSONUrl(modelPath + "fly" + extension);
  var biteModel = Model.loadJSONUrl(modelPath + "bite" + extension);
  var flyBiteModel = Model.loadJSONUrl(modelPath + "fly_bite" + extension);
  var cryModel = Model.loadJSONUrl(modelPath + "cry" + extension);
  var idle1Model = Model.loadJSONUrl(modelPath + "idle1" + extension);
  var idle2Model = Model.loadJSONUrl(modelPath + "idle2" + extension);

  var parasailTile = Sprite.load("images/levels/parasail/sail.png");

  var currentModel = standModel;

  var timeTravelling = false;
  var timeTravel = TimeTravel();

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

  var lastDirection = 0;
  var healthMax = I.health;

  function nextWeapon() {
    var selectedIndex = weapons.indexOf(selectedWeapon);

    var selectablesBefore = [];
    var selectablesAfter = [];

    $.each(weapons, function(index, weapon) {
      if(weapon.selectable()) {
        if(index < selectedIndex) {
          selectablesBefore.push(index);
        } else if(index > selectedIndex) {
          selectablesAfter.push(index);
        }
      }
    });

    if(selectablesAfter.length > 0) {
      selectedWeapon = weapons[Math.min.apply(null, selectablesAfter)];
    } else if(selectablesBefore.length > 0) {
      selectedWeapon = weapons[Math.min.apply(null, selectablesBefore)];
    }
  }

  function prevWeapon() {
    var selectedIndex = weapons.indexOf(selectedWeapon);

    var selectablesBefore = [];
    var selectablesAfter = [];

    $.each(weapons, function(index, weapon) {
      if(weapon.selectable()) {
        if(index < selectedIndex) {
          selectablesBefore.push(index);
        } else if(index > selectedIndex) {
          selectablesAfter.push(index);
        }
      }
    });

    if(selectablesBefore.length > 0) {
      selectedWeapon = weapons[Math.max.apply(null, selectablesBefore)];
    } else if(selectablesAfter.length > 0) {
      selectedWeapon = weapons[Math.max.apply(null, selectablesAfter)];
    }
  }

  function heal(amount) {
    I.health = (I.health + amount).clamp(0, healthMax);
  }

  function setModel(model) {
    currentModel = model;
    I.sprite = currentModel.animation;
  }

  function toss() {
    var tossed = false;
    secondaryShooting = false;

    $.each(weapons, function(i, weapon) {
      if(tossed) {
        return;
      }

      tossed = tossed || weapon.toss();
    });
  }

  function updateWeapons(levelPosition) {
    var activeWeapons = [];
    $.each(weapons, function(i, weapon) {
      if(!weapon.selectable() || weapon == selectedWeapon) {
        weapon.update(self, levelPosition);
      }

      if(weapon.active()) {
        activeWeapons.push(weapon);
      }
    });

    weapons = activeWeapons;
  }

  var self = GameObject(I).extend({
    addAccessory: function(accessory) {
      accessories.push(accessory);
    },

    addJetpack: function() {
      if(!jetpack) {
        jetpack = Jetpack({
          keyDown: keyDown
        });

        self.addWeapon(jetpack);
      }
    },

    addMoney: function(amount) {
      money += amount;
    },

    addWeapon: function(weapon) {
      weapons.push(weapon);

      if(weapon.selectable()) {
        selectedWeapon = weapon;
      }

      Sound.play("reload");
      shooting = false;
      secondaryShooting = false;
    },

    airborne: function(value) {
      if (value !== undefined) {
        airborne = value;
      } else {
        return airborne;
      }
    },

    bite: function() {
      if (biteCounter <= 0) {
        if(airborne) {
          biteCounter = 15;
        } else {
          biteCounter = 24;
        }

        biteModel.animation.frame(0);
        flyBiteModel.animation.frame(0);
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
        if (airborne) {
          transform = Matrix.rotation(jetpackAngle).concat(Matrix.IDENTITY);
        } else {
          transform = Matrix.IDENTITY;
        }
      } else {
        if (airborne) {
          transform = Matrix.rotation(jetpackAngle).concat(Matrix.HORIZONTAL_FLIP);
        } else {
          transform = Matrix.HORIZONTAL_FLIP;
        }
      }

      return transform.translate(I.x, I.y);
    },

    heal: heal,

    draw: function(canvas) {

      canvas.withTransform(self.getTransform(), function() {
        if(parasailing) {
          parasailTile.draw(canvas, -150, -170);
        }

        if(I.sprite) {
          I.sprite.draw(canvas,
            -I.sprite.width/2,
            -I.sprite.height/2
          );
        }

        if(timeTravelling) {
          canvas.withTransform(Matrix.scale(8, 8), function() {
            timeTravel.draw(canvas, -I.sprite.width/16 - 5, -I.sprite.height/16 - 10);
          });
        }

        $.each(accessories, function(i, accessory) {
          accessory.attachment(currentModel);
          accessory.draw(canvas);
        });

        $.each(weapons, function(i, weapon) {
          if(!weapon.selectable() || weapon == selectedWeapon) {
            weapon.attachment(currentModel);
            weapon.draw(canvas);
          }
        });
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    jetpackAngle: function(value) {
      if (value !== undefined) {
        jetpackAngle = value;
        return self;
      } else {
        return jetpackAngle;
      }
    },

    jetpackOn: function(value) {
      if (value !== undefined) {
        jetpackOn = value;
        return self;
      } else {
        return jetpackOn;
      }
    },

    land: function(h) {
      if(I.yVelocity >= 0) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        airborne = false;
        jetpackOn = false;
        jetpackAngle = 0;
      }
    },

    nextWeapon: nextWeapon,

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing == true) {
          I.x = (CANVAS_WIDTH - width) / 2 - 100;
          I.y = 200;
          airborne = true;
        }
        return self;
      } else {
        return parasailing;
      }
    },

    sink: $.noop,

    prevWeapon: prevWeapon,

    timeTravel: function(val) {
      timeTravelling = val;
    },

    toss: toss,

    weaponData: function() {
      return $.map(weapons, function(weapon) {
        return weapon.data();
      });
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
        if(timeTravelling) {
          timeTravel.update();
        }

        if(!airborne && (biteCounter > 0 || cryCounter > 0)) {
          I.xVelocity = 0;
        }

        if(I.xVelocity != 0) {
          lastDirection = I.xVelocity;
        }

        currentHealth = I.health;
      }
    },
    after: {
      hit: function(other) {
        if (I.health < currentHealth && !airborne && biteCounter <= 0) {
          // No stun for now, not fun yet
          //cryCounter += (currentHealth - I.health) / 2;
        }
      },
      update: function(levelPosition) {
        // Choose correct animation and hitFrames

        var t = self.getTransform();

        if(biteCounter > 0) {
          biteCounter--;

          var bitePoint = currentModel.attachment("bite");
          if(bitePoint.x != 0) {
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
            }).extend({
              before: {
                hit: function(other) {
                  if(other.bite) {
                    other.bite();
                  }

                  if(other.nutrify) {
                    other.nutrify(self);
                  }
                }
              }
            }));
          }
        }

        if(cryCounter > 0) {
          cryCounter--;
        }

        // Flight velocities
        if(parasailing) {
          var yDisplacement = CANVAS_HEIGHT/2 - I.y;

          I.xVelocity = 6;
          I.yVelocity = Math.cos(I.age/2) + 0.01*yDisplacement;
        } else if(airborne && !jetpackOn) {
          I.yVelocity += GRAVITY * 3;
        } else if(airborne && jetpackOn) {
          I.yVelocity += GRAVITY / 2;
        }

        // TODO: Big mess-o-models... Maybe a state machine?
        if (airborne) {
          if(biteCounter > 0) {
            setModel(flyBiteModel);
          } else {
            setModel(flyModel);
          }
        } else {
          if (biteCounter > 0) {
            setModel(biteModel);
            idleCounter = 0;
          } else if(cryCounter > 0) {
            setModel(cryModel);
            idleCounter = 0;
          } else if(I.xVelocity != 0) {
            setModel(walkModel);
            idleCounter = 0;
          } else {
            if(idleCounter == 0) {
              setModel(idle1Model);
            } else if(Math.floor(idleCounter / 128) % 2 == 1) {
              setModel(idle2Model);
            } else {
              setModel(idle1Model);
            }

            idleCounter++;
          }
        }

        I.y = I.y.clamp(0, CANVAS_HEIGHT);

        updateWeapons(levelPosition);

        // Stay in screen
        if (I.x < levelPosition.x + I.radius) {
          I.x = levelPosition.x + I.radius;
          I.xVelocity = Math.abs(I.xVelocity);
        } else if (I.x > levelPosition.x + CANVAS_WIDTH - I.radius) {
          I.x = levelPosition.x + CANVAS_WIDTH - I.radius;
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

  if(false) {
    self.addAccessory(tophat);
  }

  Control(self, keyDown);

  return self;
}
