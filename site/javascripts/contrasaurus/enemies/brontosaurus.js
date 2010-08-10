function Brontosaurus(I) {
  I = I || {};

  var brontoModel = Model.loadJSONUrl("javascripts/data/brontosaurus/brontosaurus.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    y: CANVAS_HEIGHT - Floor.LEVEL,
    health: 1000,
    hFlip: true,
    pointsWorth: 50000,
    radius: 90,
    hitCircles: brontoModel.hitFrames,
    nutrition: 25,
    sprite: brontoModel.animation,
    shootLogic: $.noop
  });

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    before: {
      update: function() {
        I.hitCircles = brontoModel.hitFrame();
      }
    }
  });

  return self;
}
