function Utahraptor(I) {
  I = I || {};

  var raptorAnimation = loadAnimation("images/enemies/dinofodder1_run.png", 8, 69, 34, 3);

  $.reverseMerge(I, {
    collideDamage: 0,
    health: 1,
    pointsWorth: 1000,
    radius: 20,
    shootLogic: $.noop,
    sprite: raptorAnimation,
    type: 'utahraptor',
    xVelocity: -0.5,
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
        I.xVelocity = I.xVelocity * 2.5;
      }
    },

    after: {
      update: function() {
        if (Math.random() < 0.5 && I.xVelocity > 0) {
          I.xVelocity += Math.random() * 0.1;
        }
        if (Math.random() < 0.01) {
          I.xVelocity = I.xVelocity * -1;
        }
        I.hFlip = I.xVelocity <= 0;

        if (Math.random() < 0.05 && I.onFire) {
          I.xVelocity = I.xVelocity * -1;
        }
      }
    }
  });

  return self;
}
