function Soldier(I) {
  I = I || {};

  var runModel = Model.loadJSONUrl("data/sandinista/run.model.json");
  var shootModel = Model.loadJSONUrl("data/sandinista/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/sandinista/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/sandinista/normal_death.model.json");
  var parachuteFallModel = Model.loadJSONUrl("data/sandinista/parasoldier_fall.model.json");
  var parachuteShootModel = Model.loadJSONUrl("data/sandinista/parasoldier_shoot.model.json");

  var parachuteSprite = Animation.load({
    url: "images/enemies/soldier_parachute.png",
    frames: 4,
    width: 76,
    height: 41,
    delay: 3
  });

  var burningAnimation = Animation.load({
    url: "images/enemies/burning_man.png",
    frames: 20,
    width: 57,
    height: 89,
    delay: 3
  });

  var states = {
    parachuteFall: State({
      model: parachuteFallModel,
      update: function() {
        if (Math.random() < 0.015) {
          I.currentState = states.parachuteShoot;
        }
      }
    }),
    parachuteShoot: State({
      complete: function() {
        I.currentState = states.parachuteFall;
      },
      duration: 12,
      model: parachuteShootModel,
      shootLogic: function() {
        if(I.currentState.age() % 3 == 0) {
          self.shootFrom("shot", {
            sprite: Sprite.load("images/effects/enemybullet1_small.png")
          });
        }
      }
    }),
    shoot: State({
      complete: function() {
        I.currentState = states.run;
      },
      duration: 24,
      model: shootModel,
      shootLogic: function() {
        if(I.currentState.age() % 3 == 0) {
          self.shootFrom("shot", {
            sprite: Sprite.load("images/effects/enemybullet1_small.png")
          });
        }
      }
    }),
    run: State({
      complete: function() {
        if (Math.random() < 0.15) {
          I.currentState = states.shoot;
        }
      },
      duration: 24,
      model: runModel,
    })
  };

  $.reverseMerge(I, {
    airborne: false,
    currentState: states.run,
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
        I.shootLogic = I.currentState.shootLogic();
        parachuteSprite.update();

        if (I.airborne && I.currentState !== states.parachuteShoot) {
          I.currentState = states.parachuteFall;
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

    if(I.airborne) {
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
  self.extend(Chopable(I));
  self.extend(Stateful(I));

  self.draw = function(canvas) {
    var self = this;

    canvas.withTransform(self.getTransform(), function() {
      I.currentState.draw(canvas);

      if (I.airborne) {
        parachuteSprite.draw(canvas, -40, -56);
      }
    });

    if (GameObject.DEBUG_HIT) {
      self.drawHitCircles(canvas);
    }
  }

  return self;
}
