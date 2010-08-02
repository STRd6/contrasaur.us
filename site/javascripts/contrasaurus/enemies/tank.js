function Tank(I) {
  I = I || {};

  var gunAngle = 13 * Math.PI / 12;;
  var exitPoint = Point(60, -23);

  var tankModel = Model.loadJSONUrl("javascripts/data/tank/tank.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    y: CANVAS_HEIGHT - Floor.LEVEL,
    xVelocity: -0.5,
    health: 10,
    hFlip: true,
    pointsWorth: 5000,
    hitCircles: tankModel.hitFrames,
    sprite: tankModel.animation,
    shootLogic: function() {
      // Shoot
      if (Math.random() < 0.05) {
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);

        self.shoot(gunAngle, {
          x: p.x,
          y: p.y,
          sprite: Sprite.load("images/projectiles/blast_small.png"),
          collideDamage: 7
        });
      }
    },
    type: 'tank'
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    after: {
      update: function() {
        I.hitCircles = tankModel.hitFrame();
      }
    }
  });

  return self;
}
