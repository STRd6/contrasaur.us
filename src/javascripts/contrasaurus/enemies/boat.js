function Boat(I) {
  I = I || {};

  var boatModel = Model.loadJSONUrl("data/boat/boat.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dino",
    eventCallbacks: {
      'destroy': function() {
        addGameObject(Explosion({
          collisionDamage: 20,
          collisionType: "dinoBullet",
          duration: 10,
          eventCallbacks: {
            'complete': function() {
              addGameObject(Explosion({
                collisionDamage: 20,
                collisionType: "dinoBullet",
                duration: 10,
                eventCallbacks: {
                  'complete': function() {
                    addGameObject(Explosion({
                      collisionDamage: 5,
                      collisionType: "dinoBullet",
                      x: I.x + 70,
                      y: I.y
                    }));
                  }
                },
                x: I.x + 50,
                y: I.y
              }));
            }
          },
          x: I.x + 30,
          y: I.y
        }));

        addGameObject(Explosion({
          collisionDamage: 20,
          collisionType: "dinoBullet",
          duration: 10,
          eventCallbacks: {
            'complete': function() {
              addGameObject(Explosion({
                collisionDamage: 20,
                collisionType: "dinoBullet",
                duration: 10,
                eventCallbacks: {
                  'complete': function() {
                    addGameObject(Explosion({
                      collisionDamage: 5,
                      collisionType: "dinoBullet",
                      x: I.x - 70,
                      y: I.y
                    }));
                  }
                },
                x: I.x - 50,
                y: I.y
              }));
            }
          },
          x: I.x - 30,
          y: I.y
        }));
      }
    },
    health: 50,
    hitCircles: boatModel.hitFrames,
    onFire: false,
    sprite: boatModel.animation
  });


  var maxHealth = I.health;
  var jumping = false;
  var jumpImpulse = -10;

  var self = GameObject(I).extend({
    bounce: function () {
      jumping = true;

      I.yVelocity = jumpImpulse;
      I.y += I.yVelocity;
    },

    bulletHitEffect: Enemy.sparkSprayEffect,

    getTransform: function() {
      var t;
      if(jumping) {
        t =  Matrix.rotation((Math.PI / 6) * I.yVelocity / -jumpImpulse);
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    },
    
    sink: $.noop,

    before: {
      update: function(position) {
        // Oscillate
        I.x = position.x + boatTarget.x + 20 * Math.sin(I.age/20);

        if(jumping) {
          I.yVelocity += GRAVITY / 2;

          if(I.y >= boatTarget.y) {
            I.y = boatTarget.y;
            I.yVelocity = 0;
            jumping = false;
          }
        }

        if(I.health < maxHealth / 2) {
          I.onFire = true;
        }

        if(I.onFire && Math.random() < 0.4) {
          //Smoke/flame
          var smokePosition = Point(
            self.position().x - 80 - rand(20),
            self.position().y + 20
          );

          addGameObject(Effect($.extend(smokePosition.add(Circle(-400, 0, 5).randomPoint()), {
            sprite: Sprite.load("images/effects/smoke2.png"),
            velocity: Point(0, 0)
          })));
        }

        I.hitCircles = boatModel.hitFrame();
      }
    }
  });

  var boatTarget = Point(I.x, I.y);

  return self;
}
