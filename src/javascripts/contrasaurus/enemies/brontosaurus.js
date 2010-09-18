function Brontosaurus(I) {
  I = I || {};

  $.reverseMerge(I, {
    health: 500,
    nutrition: 0,
    pointsWorth: 50000,
    radius: 90,
    shootLogic: $.noop,
    xVelocity: 0,
    y: CANVAS_HEIGHT - Floor.LEVEL
  });

  var states = {
    walk: State({
      model: Model.loadJSONUrl("data/brontosaurus/walk.model.json")
    })
  };

  I.currentState = states.walk;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    }
  });

  self.extend(Biteable(I));
  self.extend(Stateful(I));

  var sadSprite = Sprite.load("images/enemies/brontosaurus/pain.png");

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
