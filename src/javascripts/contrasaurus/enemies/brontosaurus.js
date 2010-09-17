function Brontosaurus(I) {
  I = I || {};

  var sadSprite = Sprite.load("images/enemies/brontosaurus/pain.png");

  var brontoModel = Model.loadJSONUrl("data/brontosaurus/walk.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    health: 500,
    hitCircles: brontoModel.hitFrames,
    nutrition: 0,
    pointsWorth: 50000,
    radius: 90,
    shootLogic: $.noop,
    sprite: brontoModel.animation,
    xVelocity: 0,
    y: CANVAS_HEIGHT - Floor.LEVEL
  });

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    before: {
      update: function() {
        I.hitCircles = brontoModel.hitFrame();
      }
    }
  });

  self.extend(Biteable(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: 100,
      rotation: 0,
      sprite: sadSprite,
      velocity: Point(0, 0)
    })));
  });

  return self;
}
