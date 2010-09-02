function Soldier(I) {
  I = I || {};

  var shootModelCounter = 0;

  var runModel = Model.loadJSONUrl("data/sandinista/run.model.json");
  var shootModel = Model.loadJSONUrl("data/sandinista/shoot.model.json");
  var bitInHalfModel = Model.loadJSONUrl("data/sandinista/bit_in_half.model.json");
  var deathModel = Model.loadJSONUrl("data/sandinista/normal_death.model.json");
  var parasoldierModel = Model.loadJSONUrl("data/parasoldier/parasoldier.model.json");
  var burningAnimation = Animation.load("images/enemies/burning_man.png", 20, 57, 89, 3);

  var currentModel = runModel;

  $.reverseMerge(I, {
    airborne: false,
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
    nutrition: 50,
    sprite: currentModel.animation,
    type: 'sandinista',
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

    land: function(h) {
      if(I.yVelocity >= 0) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        I.xVelocity = -2;
        I.airborne = false;
      }
    },

    before: {
      update: function() {
        if (currentModel !== parasoldierModel && shootModelCounter <= 0 && Math.random() < 0.005) {
          setModel(shootModel);
          shootModelCounter = 24;
        }

        if(I.airborne) {
          setModel(parasoldierModel);
        } else if (shootModelCounter > 0) {
          setModel(shootModel);
        } else {
          setModel(runModel);
        }

        if (Math.random() < 0.05 && I.onFire) {
          I.xVelocity = I.xVelocity * -1;
        }

        if (I.xVelocity < 0) {
          I.hFlip = true;
        } else {
          I.hFlip = false;
        }

        I.hitCircles = currentModel.hitFrame();
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

    if(currentModel === parasoldierModel) {
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

  return self;
}
