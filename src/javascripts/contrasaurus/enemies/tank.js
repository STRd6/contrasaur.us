function Tank(I) {
  I = I || {};

  var gunAngle = 13 * Math.PI / 12;;
  var exitPoint = Point(60, -23);

  var tankModel = Model.loadJSONUrl("data/tank/tank.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    health: 10,
    hitCircles: tankModel.hitFrames,
    pointsWorth: 5000,
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
    sprite: tankModel.animation,
    type: 'tank',
    xVelocity: -0.5,
    y: CANVAS_HEIGHT - Floor.LEVEL
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    after: {
      update: function() {
        I.hitCircles = tankModel.hitFrame();
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(Grenade({
      collideDamage: 5,
      collisionType: "dinoBullet",
      sprite: Sprite.load([
        "images/effects/debris1.png",
        "images/effects/debris2.png",
        "images/effects/debris3.png",
        "images/effects/debris4.png"
      ].rand()),
      x: self.position().x,
      xVelocity: (Math.random() < 0.5) ? rand(10) : -1*rand(10),
      y: self.position().y - 50,
      yVelocity: -1*rand(10) - 5
    }));
  });

  return self;
}
