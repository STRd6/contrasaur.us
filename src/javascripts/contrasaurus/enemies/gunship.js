function Gunship(I) {
  I = I || {};

  $.reverseMerge(I, {
    components: [],
    health: 2000,
    hFlip: false,
    hitCircles: [],
    maxShakeAmplitude: 50,
    shakeAmplitude: 0,
    x: 550,
    xVelocity: 0,
    y: 240
  });

  var damageTable = {
    fire: 0.05
  };

  var sparkSprayEffect = function(bullet) {
    if(SPRAY_EFFECTS_ENABLED && !rand(3)) {
      Sound.play("ricochet" + (rand(4) + 2), 1);

      var effect = Effect($.extend(bullet.position(), {
        duration: 9,
        sprite: loadAnimation("images/effects/sparkEffect2_16x16.png", 7, 16, 16),
        velocity: bullet.velocity()
      }));

      addGameObject(effect);
    }
  };

  var healthBar;
  var ship;
  var shipComponents;
  var aggro = false;

  var cannonDead = false;
  var componentsDestroyed = 0;

  var smallBulletSprite = Sprite.load("images/effects/enemybullet1_small.png");
  var bulletSprite = Sprite.load("images/projectiles/plane_bullet.png");

  var hullModel = Model.loadJSONUrl("data/gunship/hull.model.json");
  var lob1Model = Model.loadJSONUrl("data/gunship/lob1.model.json");
  var lob1Destroyed = Sprite.load("images/enemies/gunship/lob1_dead.png");
  var lob2Model = Model.loadJSONUrl("data/gunship/lob2.model.json");
  var lob2Destroyed = Sprite.load("images/enemies/gunship/lob2_dead.png");
  var bunkerModel = Model.loadJSONUrl("data/gunship/bunker.model.json");
  var bunkerDestroyed = Sprite.load("images/enemies/gunship/bunker_dead.png");
  var cannonModel = Model.loadJSONUrl("data/gunship/cannon.model.json");
  var cannonBaseModel = Model.loadJSONUrl("data/gunship/cannon_base.model.json");
  var cannonBaseDestroyed = Sprite.load("images/enemies/gunship/cannon_base_dead.png");
  var machineGunModel = Model.loadJSONUrl("data/gunship/machine_gun.model.json");
  var machineGunDestroyed = Sprite.load("images/enemies/gunship/machine_gun_dead.png");

  var onPath = false;

  var states = {
    attack: State({
      duration: Infinity,
      model: hullModel,
      update: function(levelPosition) {
        var targetPosition = levelPosition.x + boatTarget.x + 20 * Math.sin(I.age/20);

        if(onPath) {
          I.x = targetPosition;
        } else {
          I.x = I.x.approach(targetPosition, 5);

          if(I.x == targetPosition) {
            onPath = true;
          }
        }

        I.components.each(function(component) {
          component.update();
          component.shoot(self.getTransform());
        });

        if(!cannonDead) {
          cannon.update();
          cannon.shoot(self.getTransform());
        }
      }
    }),
    enter: State({
      complete: function() {
        I.currentState = states.attack;
      },
      duration: 66,
      model: hullModel,
      update: function(levelPosition) {
        I.x = levelPosition.x + CANVAS_WIDTH + 120 - 4 * I.age;

        I.components.each(function(component) {
          component.setAnimation();
        });

        cannon.update();
      }
    })
  };

  function ShipComponent(I) {
    I = I || {};

    $.reverseMerge(I, {
      genBulletData: function() {
        return {
          sprite: smallBulletSprite
        };
      },
      collideDamage: 1,
      cooldown: 0,
      fireRate: 3,
      health: 500,
      muzzleFlash: false,
      shot: {
        count: 1,
        dispersion: 0
      },
      shotLocations: ["exit"]
    });

    var self = GameObject(I).extend({
      bulletHitEffect: sparkSprayEffect,

      getCircles: function() {
        var transform = self.getTransform();

        return $.map(I.model.hitFrame(), function(circle) {
          var point = transform.transformPoint(circle);
          return {
            x: point.x,
            y: point.y,
            radius: circle.radius,
            component: self
          };
        });
      },

      hit: function(other) {
        var damageFactor;

        if(other.damageType) {
          damageFactor = damageTable[other.damageType()]
        }

        if(damageFactor === undefined) {
          damageFactor = 1;
        }

        I.health = I.health - other.collideDamage() * damageFactor;

        if (I.health <= 0) {
          self.destroy();
        }
      },

      shootFrom: function (attachment, bulletData, transform, muzzleFlash) {
        var shootPoint = I.model.attachment(attachment);

        if(shootPoint) {
          var t = transform.concat(self.getTransform());
          var direction = shootPoint.direction;

          var p = t.transformPoint(shootPoint);

          var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
          var theta = Point.direction(Point(0,0), tmpPoint);

          var dispersion = Circle.randomPoint(I.shot.dispersion);

          var bullet = Bullet($.extend({
            collisionType: "enemyBullet",
            theta: theta,
            x: p.x + dispersion.x,
            y: p.y + dispersion.y
          }, bulletData));

          addGameObject(bullet);

          if(muzzleFlash) {
            addGameObject(Effect({
              duration: 26,
              sprite: Animation.load({
                url: "images/effects/cannon_blast.png",
                frames: 9,
                width: 177,
                height: 106,
                delay: 3
              }),
              velocity: bullet.velocity(),
              x: p.x,
              y: p.y
            }));
          }

          return bullet;
        } else {
          return undefined;
        }
      },

      shoot: function(transform) {
        if(I.cooldown >= I.fireRate) {

          var bulletData;

          if(aggro && I.genAggroBulletData) {
            bulletData = I.genAggroBulletData();
          } else {
            bulletData = I.genBulletData();
          }

          I.shot.count.times(function(i) {
            I.shotLocations.each(function(location) {
              self.shootFrom(location, bulletData, transform, !i && I.muzzleFlash);
            });
          });

          I.cooldown = 0;
        } else {
          if(aggro) {
            I.cooldown += 3;
          } else {
            I.cooldown += 1;
          }
        }
      },

      setAnimation: function() {
        I.sprite = I.model.animation;
      },

      before: {
        update: function() {
          self.setAnimation();
        }
      }
    });

    self.bind("destroy", function() {
      self.hit = $.noop;
      self.shoot = $.noop;
      self.update = $.noop;
      self.getCircles = function() {
        return [];
      };
      I.health = 0;
      I.sprite = I.destroyedSprite;

      componentsDestroyed += 1;

      if(componentsDestroyed == 3) {
        aggro = true;
        ship.shudder();
      }

      if(componentsDestroyed == shipComponents.length) {
        ship.destroy();
      }
    });

    return self;
  }

  var machineGunRotation = Math.PI;

  var machineGun = ShipComponent({
    destroyedSprite: machineGunDestroyed,
    fireRate: 2,
    model: machineGunModel,
    shotLocations: ["exit", "exit1"],
    x: 50,
    y: 16
  }).extend({
    getTransform: function() {
      var position = machineGun.position();
      
      var t = Matrix.rotation(machineGunRotation, Point(-25, 0)).translate(position.x, position.y);

      return t;
    },
    before: {
      update: function() {
        // Aim at dino
        machineGunRotation = Point.direction(ship.position().add(machineGun.position()), dino.position());
      }
    }
  });

  // Add some decoy circles to soak up floating homing missiles
  machineGun.bind("destroy", function() {
    machineGun.getCircles = function() {
      return [{x: 20, y: 16, radius: 20}];
    };
  });

  var cannonRotation = - 5/6 * Math.PI;

  var cannon = ShipComponent({
    fireRate: 66,
    genBulletData: (function() {
      return function() {
        return {
          collideDamage: 5,
          speed: 12,
          sprite: bulletSprite,
          yAcceleration: GRAVITY / 4
        };
      };
    }()),
    model: cannonModel,
    muzzleFlash: true,
    shot: {
      count: 4,
      dispersion: 6,
    },
    x: 60,
    y: -70
  }).extend({
    getTransform: function() {
      var position = cannon.position();
      
      var t = Matrix.rotation(cannonRotation, Point(-42, 0)).translate(position.x, position.y);

      return t;
    },

    before: {
      update: function() {
        cannonRotation = 2/3 * Math.PI * (1 + Math.abs(Math.sin(this.age() / 90)));
      }
    }
  });

  var cannonBase = ShipComponent({
    destroyedSprite: cannonBaseDestroyed,
    fireRate: Infinity,
    model: cannonBaseModel,
    shot: {
      count: 0
    }
  });

  cannonBase.bind("destroy", function() {
    cannonDead = true;

    var position = cannon.position().add(ship.position());

    addGameObject(Grenade($.extend(position, {
      contactTrigger: false,
      rotation: cannonRotation,
      rotationalVelocity: Math.PI / 12,
      speed: 15,
      sprite: cannonModel.animation,
      theta: -2/3 * Math.PI
    })));
  });

  I.components.push(
    ShipComponent({
      genBulletData: (function() {
        var count = 0;
        return function() {
          count += 1;
          return {
            collideDamage: 5,
            speed: 10 + 12 * (count % 2),
            sprite: bulletSprite,
            yAcceleration: GRAVITY / 2
          };
        };
      }()),
      destroyedSprite: lob1Destroyed,
      fireRate: 99,
      model: lob1Model,
      shot: {
        count: 10,
        dispersion: 8,
      }
    }), ShipComponent({
      genBulletData: (function() {
        var count = 0;
        return function() {
          if(count == 6) {
            count = 0;
          }
          count += 1;
          
          return {
            collideDamage: 5,
            speed: count * 2,
            sprite: bulletSprite,
            yAcceleration: GRAVITY / 2
          };
        }
      }()),
      destroyedSprite: lob2Destroyed,
      fireRate: 33,
      model: lob2Model,
      shot: {
        count: 10,
        dispersion: 15,
      }
    }), ShipComponent({
      destroyedSprite: bunkerDestroyed,
      fireRate: 0,
      model: bunkerModel,
      x: -70,
      y: -66
    }),
    cannonBase,
    machineGun
  );

  shipComponents = I.components;

  var boatTarget = Point(I.x - 25, I.y);
  I.currentState = states.enter;

  var self = ship = Boss(I).extend({
    bulletHitEffect: sparkSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    health: function() {
      var total = 0;

      I.components.each(function(component) {
        total += component.health();
      });

      return total;
    },

    healthBar: function() {
      if(!healthBar) {
        bossHealthBar = healthBar = ProgressBar({
          colorMap: healthColorMap,
          max: self.health(),
          value: self.health(),
          x: 262,
          y: 20,
          width: 240,
          height: 30
        });
      }

      return healthBar;
    },

    shudder: function() {
      I.shakeAmplitude = 300;
    },

    after: {
      update: function() {
        if(healthBar) {
          healthBar.value(self.health());
        }

        if(I.shakeAmplitude > 10) {
          I.shakeAmplitude = I.shakeAmplitude * 0.7;
          I.x += (Math.min(I.maxShakeAmplitude, I.shakeAmplitude) * Math.sin(I.age)).abs();
        } else {
          I.shakeAmplitude = 0;
        }
      }
    }
  });

  self.attrReader('components');

  self.extend(Stateful(I));

  self.extend({
    getCircles: function() {
      var transform = self.getTransform();

      var componentCircles = $.map(self.components(), function(component) {
        return $.map(component.getCircles(), function(circle) {
          var point = transform.transformPoint(circle);
          return {
            radius: circle.radius,
            x: point.x,
            y: point.y,
            component: component
          };
        });
      });

      return componentCircles;
    },

    after: {
      draw: function(canvas) {
        canvas.withTransform(self.getTransform(), function() {
          $.each(I.components, function(i, component) {
            component.draw(canvas);
          });

          if(!cannonDead) {
            cannon.draw(canvas);
          }
        });
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    I.active = true;
    I.rotation = Math.PI / 2.25;
    self.update = $.noop;
    self.getTransform = GameObject.rotationGetTransform(I);
  });

  self.healthBar();

  return self;
}
