function Mutant(I) {
  I = I || {};

  var bitInHalf = false;

  var walkModel = Model.loadJSONUrl("data/mutant/walk.model.json", function(model) {
    I.sprite = model.animation;
  });
  var deathModel = Model.loadJSONUrl("data/mutant/death.model.json");

  $.reverseMerge(I, {
    bitInHalf: false,
    checkBounds: $.noop,
    hitCircles: walkModel.hitFrames,
    health: 100,
    moneyFrequency: 0,
    nutrition: -20,
    pointsWorth: 5000,
    radius: 20,
    shootLogic: $.noop,
    sprite: walkModel.animation,
    type: 'mutant',
    xVelocity: -1*rand(2),
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({

    bulletHitEffect: Enemy.bloodSprayEffect,

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
      }
    },

    after: {
      update: function() {
        if (I.yVelocity > 0) {
          I.yVelocity += GRAVITY;
        }

        if (walkModel.hitFrame) {
          I.hitCircles = walkModel.hitFrame();
        }
      }
    }
  });

  self.bind('destroy', function(self) {
    var deathAnimation;

    Sound.play("die");
    deathAnimation = deathModel.animation;

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      //TODO: This -1 is probably symptomatic of a deeper error
      duration: deathAnimation.duration() - 1,
      hFlip: I.hFlip,
      sprite: deathAnimation,
      velocity: Point(0, 0),
      x: I.x
    }));

    addGameObject(effect);
  });

  self.extend(Biteable(I));

  return self;
}