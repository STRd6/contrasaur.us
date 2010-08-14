function SecretService(I) {
  I = I || {};

  var exitPoint = Point(10, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  var shootModelCounter = 0;

  var runModel = Model.loadJSONUrl("data/secret_service/run.model.json", function(model) {
    I.sprite = model.animation;
  });

  var shootModel = Model.loadJSONUrl("data/secret_service/shoot.model.json");

  var deathModel = Model.loadJSONUrl("data/secret_service/death.model.json");

  var currentModel = runModel;

  $.reverseMerge(I, {
    shootLogic: function() {
      if (Math.random() < 0.075) {
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);
        var d = transform.deltaTransformPoint(exitDirection);
        var theta = Math.atan2(d.y, d.x);

        self.shoot(theta, {
          x: p.x,
          y: p.y,
          sprite: Sprite.load("images/effects/enemybullet1_small.png")
        });

        I.hitCircles = shootModel.hitFrames;
        I.sprite = shootModel.animation;
        shootModelCounter = 8;
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

    after: {
      update: function() {
        if (shootModelCounter < 0) {
          setModel(runModel);
        }

        shootModelCounter--;

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
    var effect = Effect($.extend({ x: self.position().x, y: self.position().y }, {
      duration: 35,
      hFlip: true,
      hitCircles: deathModel.hitFrames,
      sprite: deathModel.animation,
      velocity: Point(0, 0)
    }));

    addGameObject(effect);
  });

  return self;
}
