function SecretService(I) {
  I = I || {};

  var exitPoint = Point(10, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  var runModel = Model.loadJSONUrl("data/secret_service/run.model.json");
  var shootModel = Model.loadJSONUrl("data/secret_service/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/secret_service/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/secret_service/death.model.json");
  var burningAnimation = Animation.load("images/enemies/burning_man.png", 20, 57, 89, 3);

  var states = {
    shoot: State({
      complete: function() {
        currentState = states.run;
        I.sprite = runModel.animation;
        I.hitCircles = runModel.hitFrame();
        I.shootLogic = $.noop;
      },
      duration: 8,
      update: function() {
        I.hitCircles = shootModel.hitFrame();
      }
    }),
    run: State({
      update: function() {
        I.sprite = runModel.animation;
        I.hitCircles = runModel.hitFrame();
        if(Math.random() < 0.01) {
          currentState = states.shoot;
          I.sprite = shootModel.animation;
          I.hitCircles = shootModel.hitFrame();
          I.shootLogic = function() {
            var t = self.getTransform();

            var shootPoint = shootModel.attachment("shot");
            var direction = shootPoint.direction;

            var p = t.transformPoint(shootPoint);

            var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
            var theta = Point.direction(Point(0,0), tmpPoint);

            if(shootPoint.x != 0) {
              addGameObject(Bullet({
                collisionType: "enemyBullet",
                sprite: Sprite.load("images/effects/enemybullet1_small.png"),
                theta: theta,
                x: p.x,
                y: p.y
              }));
            }
          }
        }
      }
    })
  };

  var currentState = states.run

  $.reverseMerge(I, {
    shootLogic: $.noop,
    hitCircles: runModel.hitFrames,
    nutrition: 25,
    sprite: runModel.animation,
    type: 'secret service',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({

    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
        I.xVelocity = I.xVelocity * 2.5;
      }
    },

    after: {
      update: function() {
        currentState.update();

        if (Math.random() < 0.05 && I.onFire) {
          I.xVelocity = I.xVelocity * -1;
        }

        if (I.xVelocity < 0) {
          I.hFlip = true;
        } else {
          I.hFlip = false;
        }
      }
    }
  });

  self.bind('destroy', function(self) {
    var deathAnimation;
    var offset = 0;

    if(I.onFire) {
      deathAnimation = burningAnimation;
    } else if(I.bitInHalf) {
      deathAnimation = bitInHalfModel.animation;
      offset = 20;
    } else {
      Sound.play("die");
      deathAnimation = deathModel.animation;
    }

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      //TODO: This -1 is probably symptomatic of a deeper error
      duration: deathAnimation.duration() - 1,
      hFlip: I.hFlip,
      sprite: deathAnimation,
      velocity: Point(0, 0),
      x: I.x + offset
    }));

    addGameObject(effect);
  });

  self.extend(Biteable(I));

  return self;
}
