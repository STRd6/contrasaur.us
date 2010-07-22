function RoboReagan(I) {
  I = I || {};

  var hoverModel = Model.loadJSONUrl("javascripts/data/robo_reagan/hover.model.json", function(model) {
    I.sprite = model.animation;
  });

  var currentModel = hoverModel;

  $.reverseMerge(I, {
    health: 3000,
    radius: 40,
    collideDamage: 1,
    pointsWorth: 1000000,
    shootLogic: function() {
      self.shoot(
        Math.random() * (Math.PI), {
          x: self.midpoint().x,
          y: self.midpoint().y,
          sprite: Sprite.load("images/effects/enemybullet1_small.png")
        }
      );

      if(rand(20) == 0) {
        addGameObject(HomingMissile($.extend({
          collisionType: "enemyBullet"
        }, self.position())));
      }
    },
    sprite: hoverModel.animation,
    x: rand(CANVAS_WIDTH),
    y: 60
  });

  var self = Boss(I).extend({
    before: {
      update: function() {
        // Move Around
        I.x = centralPoint.x + 100 * Math.sin(I.age / 11);
        I.y = centralPoint.y +  25 * Math.cos(I.age / 13);

        I.hitCircles = currentModel.hitFrame();
      }
    }
  });

  var centralPoint = self.position().add(Point());

  return self;
}
