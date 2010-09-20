function Utahraptor(I) {
  I = I || {};

  var raptorAnimation = loadAnimation("images/enemies/dinofodder_run.png", 8, 69, 34, 3);

  $.reverseMerge(I, {
    bitInHalf: false,
    collideDamage: 0,
    health: 1,
    nutrition: 10,
    radius: 18,
    sprite: raptorAnimation,
    type: 'utahraptor',
    xVelocity: -0.5,
    y: CANVAS_HEIGHT - Floor.LEVEL,
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    after: {
      update: function() {
        if (Math.random() < 0.5 && I.xVelocity > 0) {
          I.xVelocity += Math.random() * 0.1;
        }

        if (Math.random() < 0.01) {
          I.xVelocity = -I.xVelocity;
        }
      }
    }
  });

  self.extend(Biteable(I));

  return self;
}
