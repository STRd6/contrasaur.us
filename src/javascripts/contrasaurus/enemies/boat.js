function Boat(I) {
  I = I || {};

  var boatModel = Model.loadJSONUrl("data/boat/boat.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dino",
    health: 50,
    hitCircles: boatModel.hitFrames,
    onFire: false,
    sprite: boatModel.animation
  });

  var maxHealth = I.health;
  var jumping = false;
  var jumpImpulse = -10;

  var self = Enemy(I).extend({
    bounce: function (ramp) {
      if(I.yVelocity > 3) {
        ramp.crush();
      } else {
        jumping = true;

        I.yVelocity = jumpImpulse;
        I.y += I.yVelocity;
      }
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
        } else {
          I.y = position.y + boatTarget.y + 5 * Math.sin(I.age/13);
        }

        if((I.health < maxHealth / 2) && (Math.random() < 0.4)) {
          //Smoke/flame
          var smokePosition = Point(
            I.x - 80 - rand(20),
            I.y + 20
          );

          addGameObject(Effect($.extend(smokePosition.add(Circle(0, 0, 5).randomPoint()), {
            sprite: Sprite.load("images/effects/smoke.png"),
            velocity: Point(0, 0)
          })));
        }

        I.hitCircles = boatModel.hitFrame();
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
      rotation: - Math.PI / 2.25,
      sprite: boatModel.animation,
      velocity: Point(0, 0)
    })).extend({
      getTransform: GameObject.rotationGetTransform(effectI)
    });

    addGameObject(effect);
  });

  var boatTarget = Point(I.x, I.y);

  return self;
}
