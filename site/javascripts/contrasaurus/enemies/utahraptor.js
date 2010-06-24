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
    bulletHitEffect: Enemy.bloodSprayEffect,
    after: {
      update: function() {
        if (Math.random() < 0.5 && I.xVelocity > 0) {
          I.xVelocity += Math.random() * 0.1;
        }
      }
    }
  });

  return self;
}
