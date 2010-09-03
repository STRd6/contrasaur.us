function SecretService(I) {
  I = I || {};

  var exitPoint = Point(10, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  var shootModelCounter = 0;

  var runModel = Model.loadJSONUrl("data/secret_service/run.model.json");
  var shootModel = Model.loadJSONUrl("data/secret_service/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/secret_service/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/secret_service/death.model.json");
  var burningAnimation = Animation.load("images/enemies/burning_man.png", 20, 57, 89, 3);

  var currentModel = runModel;

  $.reverseMerge(I, {
    bitInHalf: false,
    shootLogic: function() {
      if (shootModelCounter > 0) {
        shootModelCounter--;
        var t = self.getTransform();

        var shootPoint = currentModel.attachment("shot");
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
    },
    hitCircles: currentModel.hitFrames,
    nutrition: 25,
    sprite: currentModel.animation,
    type: 'secret service',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  function setModel(model) {
    currentModel = model;
    I.sprite = currentModel.animation;
  }

  var self = Enemy(I).extend({

    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
        I.xVelocity = I.xVelocity * 2.5;
      }
    },

    before: {
      update: function() {
        if (shootModelCounter <= 0 && Math.random() < 0.01) {
          setModel(shootModel);
          shootModelCounter = 8;
        }

        if (shootModelCounter > 0) {
          setModel(shootModel);
        } else {
          setModel(runModel);
        }
      }
    },

    after: {
      update: function() {
        if (Math.random() < 0.05 && I.onFire) {
          I.xVelocity = I.xVelocity * -1;
        }

        if (I.xVelocity < 0) {
          I.hFlip = true;
        } else {
          I.hFlip = false;
        }

        // TODO: check proxy
        if (currentModel.hitFrame) {
          I.hitCircles = currentModel.hitFrame();
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
