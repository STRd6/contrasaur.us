function Commando(I) {
  I = I || {};

  $.reverseMerge(I, {
    health: 500,
    nutrition: 1,
    pointsWorth: 100000,
    radius: 90,
    shootLogic: function() {
      if(I.currentState.age() % 3 == 0) {
        self.shootFrom("shot", {
          sprite: Sprite.load("images/effects/enemybullet1_small.png")
        });
      }
    },
    xVelocity: 0,
    y: CANVAS_HEIGHT - Floor.LEVEL - 20
  });

  var states = {
    grenade: State({
      complete: function() {
        I.currentState = states.idle;
      },
      duration: 21,
      model: Model.loadJSONUrl("data/commando/commando_grenade.model.json"),
      update: function() {
        I.xVelocity = 0;

        checkDistance();
      }
    }),
    idle: State({
      complete: function() {
        I.currentState = states.idle;
      },
      duration: 15,
      model: Model.loadJSONUrl("data/commando/commando_idle.model.json"),
      update: function() {
        I.xVelocity = 0;

        checkDistance();
      }
    }),
    run: State({
      complete: function() {
        I.currentState = states.idle;
      },
      duration: 36,
      model: Model.loadJSONUrl("data/commando/commando_run.model.json")
    }),
    shoot: State({
      complete: function() {
        if (Math.random() < 0.4) {
          I.currentState = states.grenade;

          I.shootLogic = function() {
            var grenadePoint = self.currentModel().attachment("grenade");

            if(I.currentState.age() % 3 == 0 && grenadePoint) {
              var t = self.getTransform();
              var direction = grenadePoint.direction;

              var p = t.transformPoint(grenadePoint);

              var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
              var theta = Point.direction(Point(0,0), tmpPoint);

              addGameObject(Grenade({
                collisionType: "enemyBullet",
                explosionDamage: 15,
                speed: 15,
                theta: theta,
                x: self.position().x,
                y: self.position().y - 30,
              }));
            }
          };
        } else {
          I.currentState = states.idle;
        }
      },
      duration: 33,
      model: Model.loadJSONUrl("data/commando/commando_shoot.model.json"),
      update: function() {
        I.xVelocity = 0;

        checkDistance();
      }
    })
  };

  I.currentState = states.idle;

  function checkDistance() {
    var targetDistance = self.position().x - dino.position().x

    if (targetDistance <= 0 && targetDistance > -180) {
      I.xVelocity = 13
      I.currentState = states.run;
    } else if (targetDistance > 0 && targetDistance < 180) {
      I.xVelocity = -13
      I.currentState = states.run;
    } else {
      if (I.currentState !== states.grenade) {
      I.currentState = states.shoot;
        I.shootLogic = function() {
          if(I.currentState.age() % 3 == 0) {
            self.shootFrom("shot", {
              sprite: Sprite.load("images/effects/enemybullet1_small.png")
            });
          }
        };
      }
    }
  }

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    getTransform: function() {
      var t;
      if(I.xVelocity <= 0) {
        t = Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }

      if (I.currentState === states.idle || I.currentState === states.shoot || I.currentState === states.grenade) {
        if(self.position().x - dino.position().x >= 0) {
          t = Matrix.HORIZONTAL_FLIP;
        } else {
          t = Matrix.IDENTITY;
        }
      }

      return t.translate(I.x, I.y);
    }
  });

  self.extend(Biteable(I));
  self.extend(Stateful(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 20
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: 100,
      rotation: 0,
      sprite: I.currentState.sprite(),
      velocity: Point(0, 0)
    })));
  });

  return self;
}
