var WALK_VELOCITY = 6;

var shooting = false;
var secondaryShooting = false;

function Dinosaur(I) {
  I = I || {};

  var width = 128;
  var height = 128;

  var jetpack;
  var jetpackOn = false;
  var jetpackAngle = 0;

  var currentHealth = 0;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [];
  var selectedWeapon;

  var keyDown = {};

  var modelPath = "data/dinosaur/";
  var extension = ".model.json";
  var walkModel = Model.loadJSONUrl(modelPath + "walk" + extension);
  var flyModel = Model.loadJSONUrl(modelPath + "fly" + extension);
  var biteModel = Model.loadJSONUrl(modelPath + "bite" + extension);
  var flyBiteModel = Model.loadJSONUrl(modelPath + "fly_bite" + extension);
  var cryModel = Model.loadJSONUrl(modelPath + "cry" + extension);
  var idle1Model = Model.loadJSONUrl(modelPath + "idle1" + extension);
  var idle2Model = Model.loadJSONUrl(modelPath + "idle2" + extension);

  var parasailTile = Sprite.load("images/levels/parasail/sail.png");

  var states = {
    bite: State({
      complete: function() {
        I.currentState = states.idle1;
      },
      duration: 24,
      model: biteModel,
      update: function() {
        var bitePoint = states.bite.model().attachment("bite");
        if(bitePoint) {
          var t = self.getTransform();
          var p = t.transformPoint(bitePoint);

          addGameObject(Bullet({
            collideDamage: 10,
            damageType: "bite",
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
    }),
    cry: State({
      complete: function() {
        I.currentState = states.idle1;
      },
      duration: 16,
      model: cryModel,
      update: function() {
        I.xVelocity = 0;
      }
    }),
    fly: State({
      model: flyModel
    }),
    flyBite: State({
      complete: function() {
        I.currentState = states.fly;
      },
      duration: 15,
      model: flyBiteModel,
      update: function() {
        var bitePoint = states.flyBite.model().attachment("bite");
        if(bitePoint) {
          var t = self.getTransform();
          var p = t.transformPoint(bitePoint);

          addGameObject(Bullet({
            collideDamage: 10,
            damageType: "bite",
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
    }),
    idle1: State({
      model: idle1Model,
      update: function() {
        if (Math.random() < 0.01) {
          I.currentState = states.idle2;
        }
      }
    }),
    idle2: State({
      complete: function() {
        I.currentState = states.idle1;
      },
      duration: 36,
      model: idle2Model
    }),
    walk: State({
      model: walkModel,
      update: function() {
        if (I.xVelocity > WALK_VELOCITY) {
          I.xVelocity = (I.xVelocity - 0.2).clamp(WALK_VELOCITY, I.xVelocity);
        }
      }
    })
  };

  states.bite.allowedTransitions = [states.idle1, states.walk, states.cry];
  states.fly.allowedTransitions = [states.flyBite, states.cry, states.idle1, states.walk];
  states.flyBite.allowedTransitions = [states.fly, states.idle1, states.walk];
  states.idle1.allowedTransitions = [states.bite, states.fly, states.idle1, states.idle2, states.walk];
  states.idle2.allowedTransitions = [states.bite, states.fly, states.idle1, states.walk];
  states.walk.allowedTransitions = [states.bite, states.fly, states.idle1];

  var timeTravelling = false;
  var timeTravel = TimeTravel();

  var healthMax = 500;

  $.reverseMerge(I, {
    collideDamage: 2,
    collisionType: "dino",
    currentState: states.idle1,
    health: healthMax,
    loadedWeapons: [],
    poisoned: false,
    radius: 72,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - Floor.LEVEL,
    xVelocity: 0,
    yVelocity: 6
  });

  var accessories = [];

  var lastDirection = 1;

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
        trackEvent("jetpack");
      }
    },

    addMoney: function(amount) {
      money += amount;
    },

    addWeapon: function(weapon) {
      if(weapon == "jetpack") {
        self.addJetpack();
      } else {
        weapons.push(weapon);

        if(weapon.selectable()) {
          selectedWeapon = weapon;
        }

        trackEvent("weapon", weapon);
      }

      Sound.play("reload");

      showCrosshair = true;
    },

    airborne: function(value) {
      if (value !== undefined) {
        airborne = value;
      } else {
        return airborne;
      }
    },

    bite: function() {
      if (airborne) {
        I.currentState = states.flyBite;
      } else {
        I.currentState = states.bite;
        I.xVelocity = 0;
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

    currentState: function() {
      return I.currentState;
    },

    getTransform: function() {
      var transform;

      if (parasailing || I.xVelocity > 0 || lastDirection > 0) {
        var rotationAngle = jetpackAngle;
        if(parasailing) {
          rotationAngle = rotationAngle + Math.PI / 24;
        }

        if (airborne) {
          transform = Matrix.rotation(rotationAngle).concat(Matrix.IDENTITY);
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

    hasJetpack: function() {
      return jetpack;
    },

    healthMax: function() {
      return healthMax;
    },

    hit: function(other) {
      I.health = I.health - other.collideDamage();

      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
        continueGame();
      }
    },

    heal: heal,

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
      if (airborne) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        airborne = false;
        jetpackOn = false;
        jetpackAngle = 0;
        if (I.xVelocity != 0 && (keyDown.left || keyDown.right)) {
          self.transition(states.walk);
        } else {
          I.xVelocity = 0;
          self.transition(states.idle1);
        }
      }
    },

    nextWeapon: nextWeapon,

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing) {
          I.x = (CANVAS_WIDTH - width) / 2 - 100;
          I.y = 200;
          airborne = true;
          I.currentState = states.fly;
        }
        return self;
      } else {
        return parasailing;
      }
    },

    skyBattle: function() {
      I.x = (CANVAS_WIDTH - width) / 2 - 100;
      I.y = 400;
      airborne = true;
      I.currentState = states.fly;

      I.yVelocity = -15;
      I.xVelocity = 5;

      self.addJetpack();
    },

    sink: $.noop,

    poison: function(amount) {
      self.transition(states.cry);
    },

    prevWeapon: prevWeapon,

    states: function() {
      return states;
    },

    timeTravel: function(val) {
      timeTravelling = val;
    },

    toss: toss,

    weaponNames: function() {
      return weapons.map(function(weapon) {
        return weapon.name();
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

        if(I.xVelocity != 0) {
          lastDirection = I.xVelocity;
        }

        currentHealth = I.health;
      }
    },
    after: {
      update: function(levelPosition) {
        // Keyboard aiming
        if(keyDown.aimClockwise) {
          targetAngle += Math.PI / 36;
        }
        if(keyDown.aimAntiClockwise) {
          targetAngle -= Math.PI / 36;
        }

        // Flight velocities
        if(parasailing) {
          I.yVelocity = 0;
          I.xVelocity = 4;

          if(keyDown.down) {
            I.y += 6;
          }
          if(keyDown.up) {
            I.y -= 6;
          }
          if(keyDown.left) {
            I.xVelocity = 0;
          }
          if(keyDown.right) {
            I.xVelocity = 10;
          }

        } else if(airborne && !jetpackOn) {
          I.yVelocity += GRAVITY * 3;
        } else if(airborne && jetpackOn) {
          I.yVelocity += GRAVITY / 2;
        }

        if (parasailing) {
          I.y = I.y.clamp(30, CANVAS_HEIGHT - Floor.LEVEL);
        } else {
          I.y = I.y.clamp(levelPosition.y + 30, levelPosition.y + CANVAS_HEIGHT);
        }

        updateWeapons(levelPosition);

        // Stay in screen
        if (I.x < levelPosition.x + I.radius) {
          I.x = levelPosition.x + I.radius;
          I.xVelocity = Math.abs(I.xVelocity);
        } else if (I.x > levelPosition.x + CANVAS_WIDTH - I.radius) {
          I.x = levelPosition.x + CANVAS_WIDTH - I.radius;
          I.xVelocity = -Math.abs(I.xVelocity);
        }
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

  I.loadedWeapons.each(function(weaponName) {
    self.addWeapon(weaponMap[weaponName]());
  });

  Control(self, keyDown);
  self.extend(Stateful(I));

  self.draw = function(canvas) {

    canvas.withTransform(self.getTransform(), function() {
      if(parasailing) {
        parasailTile.draw(canvas, -150, -170);
      }

      I.currentState.draw(canvas);

      if(timeTravelling) {
        canvas.withTransform(Matrix.scale(8, 8), function() {
          timeTravel.draw(canvas, -I.currentState.sprite().width/16 - 5, -I.currentState.sprite().height/16 - 10);
        });
      }

      $.each(accessories, function(i, accessory) {
        accessory.attachment(I.currentState.model());
        accessory.draw(canvas);
      });

      $.each(weapons, function(i, weapon) {
        if(!weapon.selectable() || weapon == selectedWeapon) {
          weapon.attachment(I.currentState.model());
          weapon.draw(canvas);
        }
      });
    });

    if (GameObject.DEBUG_HIT) {
      self.drawHitCircles(canvas);
    }
  };

  return self;
}
