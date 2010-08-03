function Ramp(I) {
  I = I || {};

  $.reverseMerge(I, {
    collisionType: "enemy",
    health: 10,
    hitCircles: [{"x": 28, "y": 6, "radius": 20}],
    sprite: Sprite.load("images/enemies/ramp.png")
  });

  var checkBounds = GameObject.generateCheckBounds(I, 100);

  var self = GameObject(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    sink: $.noop,

    after: {
      hit: function(other) {
        if(other.bounce) {
          other.bounce();
        }
      },

      update: function() {
        checkBounds.apply(self, arguments);
      }
    }
  });

  return self;
}
