function Boat(I) {
  I = I || {};

  var boatModel = Model(
    Sprite.load("images/levels/parasail/parasailboat.png"),
    [
      [
        {"x": 92,"y": 17,"radius": 19},
        {"x": 115,"y": 5,"radius": 7},
        {"x": 50,"y": 24,"radius": 24},
        {"x": 5,"y": 28,"radius": 21},
        {"x": -34,"y": 32,"radius": 18},
        {"x": -68,"y": 34,"radius": 16},
        {"x": -99,"y": 35,"radius": 15},
        {"x": -120,"y": 28,"radius": 8},
        {"x": -120,"y": 41,"radius": 6},
        {"x": -61,"y": 3,"radius": 10}
      ]
    ]
  );

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dino",
    eventCallbacks: {
      'destroy': function() {
        addGameObject(Explosion({
          collisionType: "dinoBullet",
          duration: 10,
          eventCallbacks: {
            'complete': function() {
              addGameObject(Explosion({
                duration: 10,
                eventCallbacks: {
                  'complete': function() {
                    addGameObject(Explosion({
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
          collisionType: "dinoBullet",
          duration: 10,
          eventCallbacks: {
            'complete': function() {
              addGameObject(Explosion({
                duration: 10,
                eventCallbacks: {
                  'complete': function() {
                    addGameObject(Explosion({
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
    health: 100,
    hitCircles: boatModel.hitFrames,
    onFire: false,
    sprite: boatModel.animation
  });


  var maxHealth = I.health;
  var jumping = false;
  var jumpImpulse = -10;

  var self = GameObject(I).extend({
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
        } else {
          if(rand(100) == 0) {
            jumping = true;

            I.yVelocity = jumpImpulse;
          }
        }

        if(I.health < maxHealth / 2) {
          I.onFire = true;
        }

        if(I.onFire && rand(2)) {
          //Smoke/flame
          addGameObject(Effect($.extend(self.position().add(Circle(0, 0, 5).randomPoint()), {
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
