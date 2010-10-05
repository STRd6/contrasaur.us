function Gunship(I) {
  I = I || {};

  $.reverseMerge(I, {
    components: [],
    health: 2000,
    hFlip: false,
    hitCircles: [],
    x: 550,
    xVelocity: 0,
    y: 240
  });

  var damageTable = {
    fire: 0.05
  };

  var healthBar;
  var ship;
  var shipComponents;

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
  //var machineGunModel = Model.loadJSONUrl("data/gunship/machine_gun.model.json");
  //var machineGunDestroyed = Sprite.load("images/enemies/gunship/machine_gun_dead.png");

  var states = {
    attack: State({
      duration: Infinity,
      model: hullModel,
      update: function() {
      }
    })
  };

  function ShipComponent(I) {
    I = I || {};

    $.reverseMerge(I, {
      bulletData: {
        sprite: smallBulletSprite
      },
      cooldown: 0,
      fireRate: 3,
      health: 50,
      muzzleFlash: false,
      shot: {
        count: 1,
        dispersion: 0
      }
    });

    var self = GameObject(I).extend({
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

          I.shot.count.times(function(i) {
            self.shootFrom("exit", I.bulletData, transform, !i && I.muzzleFlash);
          });

          I.cooldown = 0;
        } else {
          I.cooldown += 1;
        }
      },

      before: {
        update: function() {
          I.sprite = I.model.animation;
        }
      }
    });

    self.bind("destroy", function() {
      console.log("destroyed!!!1");
      self.hit = $.noop;
      self.shoot = $.noop;
      self.update = $.noop;
      I.health = 0;
      I.sprite = I.destroyedSprite;

      componentsDestroyed += 1;
      if(componentsDestroyed == shipComponents.length) {
        ship.destroy();
      }
    });

    return self;
  }

  var cannonRotation = - 5/6 * Math.PI;

  var cannon = ShipComponent({
    bulletData: {

    },
    fireRate: 66,
    model: cannonModel,
    muzzleFlash: true,
    x: 60,
    y: -70
  }).extend({
    getTransform: function() {
      var position = cannon.position();
      
      var t = Matrix.rotation(cannonRotation, Point(-42, 0)).translate(position.x, position.y);

      return t;
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
  });

  I.components.push(ShipComponent({
    bulletData: {
      collideDamage: 5,
      speed: 10,
      sprite: bulletSprite,
      yAcceleration: GRAVITY / 2
    },
    destroyedSprite: lob1Destroyed,
    fireRate: 99,
    model: lob1Model,
    shot: {
      count: 10,
      dispersion: 8,
    }
  }), ShipComponent({
    bulletData: {
      collideDamage: 5,
      speed: 12,
      sprite: bulletSprite,
      yAcceleration: GRAVITY / 2
    },
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
  cannonBase
  );

  shipComponents = I.components;

  var boatTarget = Point(I.x - 25, I.y);
  I.currentState = states.attack;

  var self = ship = Boss(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    health: function() {
      var total = 0;

      I.components.each(function(component) {
        total += component.health();
      });

      if(I.age % 50 == 0) {
        console.log(total);
      }

      return total;
    },

    healthBar: function() {
      if(!healthBar) {
        healthBar = ProgressBar({
          colorMap: healthColorMap,
          element: $("#bossHealth"),
          max: self.health(),
          value: self.health()
        });
      }

      return healthBar;
    },

    before: {
      update: function(position) {
        I.x = position.x + boatTarget.x + 20 * Math.sin(I.age/20);

        I.components.each(function(component) {
          component.update();
          component.shoot(self.getTransform());
        });

        if(!cannonDead) {
          cannon.update();
          cannonRotation += Math.PI / 180;
          cannon.shoot(self.getTransform());
        }
      }
    },

    after: {
      update: function() {
        if(healthBar) {
          healthBar.value(self.health());
        }
      }
    }
  });

  self.attrReader('components');

  self.extend(Stateful(I));

  self.extend({
    getCircles: function() {
      var componentCircles = $.map(self.components(), function(component) {
        var transform = self.getTransform();
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

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      duration: 150,
      rotation: Math.PI / 2.25,
      sprite: hullModel.animation,
      velocity: Point(0, 0)
    })).extend({
      getTransform: GameObject.rotationGetTransform(effectI)
    });

    addGameObject(effect);
  });

  return self;
}
