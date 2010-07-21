function SecretService(I) {
  I = I || {};

  var exitPoint = Point(10, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  var shootModelCounter = 0;

  var runModel = Model.loadJSONUrl("javascripts/data/secret_service/run.model.json", function(model) {
    I.sprite = model.animation;
  });

  var shootModel = Model.loadJSONUrl("javascripts/data/secret_service/shoot.model.json");

  var deathModel = Model.loadJSONUrl("javascripts/data/secret_service/death.model.json");

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

        I.sprite = shootModel.animation;
        shootModelCounter = 8;
      }
    },
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
        if (shootModelCounter < 0) {
          I.sprite = runModel.animation;
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
      }
    }
  });

  self.bind('destroy', function(self) {
    var effect = Effect($.extend({ x: self.position().x, y: self.position().y }, {
      duration: 35,
      hFlip: true,
      sprite: deathModel.animation,
      velocity: Point(0, 0)
    }));

    addGameObject(effect);
  });

  return self;
}
