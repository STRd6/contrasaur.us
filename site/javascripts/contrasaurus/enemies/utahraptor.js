function Utahraptor(I) {
  I = I || {};

  $.reverseMerge(I, {
    radius: 10,
    collideDamage: 0,
    health: 1,
    pointsWorth: 1000,
    radius: 20,
    shootLogic: $.noop,
    sprite: loadAnimation("images/enemies/dinofodder1_run.png", 8, 69, 34, 3)
  });

  var self = Tank(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), $.extend(bullet.position(), {
        duration: 10,
        sprite: [
          loadAnimation("images/effects/bloodEffect3_16x16.png", 9, 16, 16),
          loadAnimation("images/effects/bloodEffect4_16x16.png", 10, 16, 16)
        ].rand()
      }));

      addGameObject(effect);
    },

    getTransform: function() {
      if(I.xVelocity < 0) {
        return HORIZONTAL_FLIP_MATRIX;
      } else {
        return IDENTITY_MATRIX;
      }
    }
  });

  return self;
}
