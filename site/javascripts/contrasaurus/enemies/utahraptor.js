function Utahraptor(I) {
  I = I || {};

  $.reverseMerge(I, {
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
    }
  });

  return self;
}
