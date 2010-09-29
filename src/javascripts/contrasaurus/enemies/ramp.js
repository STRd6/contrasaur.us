function Ramp(I) {
  I = I || {};

  $.reverseMerge(I, {
    collisionType: "enemyBullet",
    health: 10,
    hitCircles: [{"x": 28, "y": 6, "radius": 20}],
    sprite: Sprite.load("images/enemies/ramp.png")
  });

  var checkBounds = GameObject.generateCheckBounds(I, 100);

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    crush: function() {
      I.active = false;
      //TODO Debris
    },

    getTransform: function() {
      var t = Matrix.IDENTITY;

      return t.translate(I.x, I.y);
    },

    sink: $.noop,

    after: {
      hit: function(other) {
        if(other.bounce) {
          other.bounce(self);
        }
      },

      update: function() {
        checkBounds.apply(self, arguments);
      }
    }
  });

  return self;
}
