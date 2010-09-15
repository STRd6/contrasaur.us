function Brontosaurus(I) {
  I = I || {};

  var brontoModel = Model.loadJSONUrl("data/brontosaurus/brontosaurus.model.json", function(model) {
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

    before: {
      update: function() {
        I.hitCircles = brontoModel.hitFrame();
      }
    }
  });

  self.extend(Biteable(I));

  return self;
}
