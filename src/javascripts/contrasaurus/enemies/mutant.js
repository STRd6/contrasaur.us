function Mutant(I) {
  I = I || {};

  var bitInHalf = false;

  var mutantModel = Model.loadJSONUrl("data/mutant/walk.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    checkBounds: $.noop,
    health: 100,
    moneyFrequency: 0,
    nutrition: -20,
    pointsWorth: 5000,
    radius: 20,
    shootLogic: $.noop,
    sprite: mutantModel.animation,
    type: 'mutant',
    xVelocity: -1*rand(2),
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({
    bite: function() {
      bitInHalf = true;
    },

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

        if (mutantModel.hitFrame) {
          I.hitCircles = mutantModel.hitFrame();
        }
      }
    }
  });

  self.bind('destroy', function(self) {
    if(bitInHalf) {
      Sound.play("chomp");
    }
  });

  return self;
}