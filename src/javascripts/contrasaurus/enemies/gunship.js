function Gunship(I) {
  I = I || {};

  $.reverseMerge(I, {
    health: 2000,
    hFlip: false,
    x: 550,
    xVelocity: 0,
    y: 240
  });

  var shipModel = Model.loadJSONUrl("data/gunship/ship.model.json");

  var states = {
    attack: State({
      duration: Infinity,
      model: shipModel,
      update: function() {
      }
    })
  };

  var boatTarget = Point(I.x, I.y);
  I.currentState = states.attack;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    before: {
      update: function(position) {
        I.x = position.x + boatTarget.x + 20 * Math.sin(I.age/20);
      }
    }
  });

  self.extend(Stateful(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      duration: 150,
      rotation: Math.PI / 2.25,
      sprite: shipModel.animation,
      velocity: Point(0, 0)
    })).extend({
      getTransform: GameObject.rotationGetTransform(effectI)
    });

    addGameObject(effect);
  });

  return self;
}
