function Mutant(I) {
  I = I || {};

  var walkModel = Model.loadJSONUrl("data/mutant/walk.model.json", function(model) {
    I.sprite = model.animation;
  });
  var deathModel = Model.loadJSONUrl("data/mutant/death.model.json");

  $.reverseMerge(I, {
    checkBounds: function(position) {
      if (I.x < position.x + I.radius) {
        I.x = position.x + I.radius;
        I.xVelocity = Math.abs(I.xVelocity);
      } else if (I.x > position.x + CANVAS_WIDTH - I.radius) {
        I.x = position.x + CANVAS_WIDTH - I.radius;
        I.xVelocity = -Math.abs(I.xVelocity);
      }
    },
    hitCircles: walkModel.hitFrames,
    health: 50,
    nutrition: -20,
    pointsWorth: 5000,
    radius: 20,
    sprite: walkModel.animation,
    type: 'mutant',
    xVelocity: -(rand(11) + 1) / 4,
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({

    bulletHitEffect: Enemy.bloodSprayEffect,

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
  self.extend(Burnable(I));

  return self;
}
