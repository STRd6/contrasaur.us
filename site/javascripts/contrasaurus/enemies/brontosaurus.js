function Brontosaurus(I) {
  I = I || {};

  $.reverseMerge(I, {
    y: CANVAS_HEIGHT - Floor.LEVEL,
    xVelocity: 0,
    health: 3000,
    hFlip: true,
    pointsWorth: 50000,
    radius: 90,
    sprite: Sprite.load("images/enemies/brontosaurus.png"),
    shootLogic: $.noop
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    health: function() {
      return I.health;
    }
  });

  return self;
}
