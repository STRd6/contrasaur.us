function SecretService(I) {
  I = I || {};

  var standModel = Model.loadJSONUrl("data/secret_service/stand.model.json");
  var runModel = Model.loadJSONUrl("data/secret_service/run.model.json");
  var shootModel = Model.loadJSONUrl("data/secret_service/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/secret_service/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/secret_service/death.model.json");
  var burningAnimation = Animation.load({
    url: "images/enemies/burning_man.png",
    frames: 20,
    width: 57,
    height: 89,
    delay: 3
  });

  var states = {
    shoot: State({
      complete: function() {
        I.currentState = states.run;
      },
      duration: 24,
      model: shootModel,
      shootLogic: function() {
        var t = self.getTransform();

        var shootPoint = states.shoot.model.attachment("shot");
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
    }),
    run: State({
      complete: function() {
        I.currentState = states.shoot;
      },
      duration: 24,
      model: runModel,
      update: function() {
        if (Math.random() < 0.001) {
          I.currentState = states.stand;
        }
      }
    }),
    stand: State({
      complete: function() {
        I.currentState = states.run;
        I.xVelocity = -2;
        addGameObject([
          Tank({
            x: currentLevel.position().x + CANVAS_WIDTH + 40
          }),
          Fighter({
            xVelocity: -3,
            x: currentLevel.position().x + CANVAS_WIDTH + 40,
            y: 60,
          })
        ].rand());
      },
      duration: 60,
      model: standModel,
      shootLogic: $.noop,
      update: function() {
        I.xVelocity = 0;
      }
    })
  };

  $.reverseMerge(I, {
    currentState: states.run,
    nutrition: 25,
    shootLogic: $.noop,
    type: 'secret service',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({
    after: {
      update: function() {
        I.shootLogic = I.currentState.shootLogic();
      }
    }
  });

  self.bind('destroy', function(self) {
    var deathAnimation;
    var xOffset = 0;
    var yOffset = 0;

    if(I.onFire) {
      deathAnimation = burningAnimation;
      yOffset = -13;
      xOffset = 2;
    } else if(I.bitInHalf) {
      deathAnimation = bitInHalfModel.animation;
      xOffset = 20;
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
      x: I.x + xOffset,
      y: I.y + yOffset
    }));

    addGameObject(effect);
  });

  self.extend(Biteable(I));
  self.extend(Burnable(I));
  self.extend(Stateful(I));

  return self;
}
