function Brontosaurus(I) {
  I = I || {};

  $.reverseMerge(I, {
    y: CANVAS_HEIGHT - Floor.LEVEL,
    radius: 25,
    xVelocity: 0,
    health: 5000,
    hFlip: true,
    pointsWorth: 50000,
    radius: 90,
    sprite: Sprite.load("images/enemies/brontosaurus.png"),
    shootLogic: $.noop
  });

  var self = Enemy(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), $.extend(bullet.position(), {
        duration: 10,
        sprite: [
          loadAnimation("images/effects/bloodEffect3_16x16.png", 9, 16, 16),
          loadAnimation("images/effects/bloodEffect2_8x8.png", 10, 8, 8),
          loadAnimation("images/effects/bloodEffect1_8x8.png", 8, 8, 8),
          loadAnimation("images/effects/bloodEffect4_16x16.png", 10, 16, 16)
        ].rand()
      }));

      addGameObject(effect);
    }
  });

  return self;
}
