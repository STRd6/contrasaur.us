function Soldier(I) {
  I = I || {};

  var runModel = Model.loadJSONUrl("data/sandinista/run.model.json");
  var shootModel = Model.loadJSONUrl("data/sandinista/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/sandinista/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/sandinista/normal_death.model.json");
  var parasailModel = Model.loadJSONUrl("data/parasoldier/parasoldier.model.json");
  var burningAnimation = Animation.load("images/enemies/burning_man.png", 20, 57, 89, 3);

  var states = {
    parasail: State({
      model: parasailModel,
      shootLogic: $.noop
    }),
    shoot: State({
      complete: function() {
        I.currentState = states.run;
      },
      duration: 8,
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
      model: runModel,
      shootLogic: $.noop,
      update: function() {
        if(Math.random() < 0.01) {
          I.currentState = states.shoot;
        }
      }
    })
  };

  $.reverseMerge(I, {
    airborne: false,
    currentState: states.run,
    shootLogic: $.noop,
    nutrition: 50,
    type: 'sandinista',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({
    land: function(h) {
      if(I.airborne) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        I.xVelocity = -2;
        I.airborne = false;
        I.currentState = states.run;
      }
    },

    after: {
      update: function() {
        $.each(states, function(i, state) {
          state.update();
        });

        I.shootLogic = I.currentState.shootLogic();

        if (I.onFire) {
          self.flail();
        }

        if (I.airborne) {
          I.currentState = states.parasail;
        }
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

    if(I.currentState === states.parasail) {
      effect.extend({
        getTransform: GameObject.velocityGetTransform(effectI),
        before: {
          update: function() {
            if(effectI.y >= CANVAS_HEIGHT - Floor.LEVEL) {
              effectI.y = CANVAS_HEIGHT - Floor.LEVEL;
              effectI.yVelocity = 0;
            } else {
              effectI.yVelocity += GRAVITY / 2;
            }
          }
        }
      });
    }

    addGameObject(effect);
  });

  self.extend(Biteable(I));
  self.extend(Burnable(I));
  self.extend(Stateful(I));

  return self;
}
