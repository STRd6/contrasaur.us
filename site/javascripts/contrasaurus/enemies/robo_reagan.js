function RoboReagan(I) {
  I = I || {};

  var hoverModel = Model.loadJSONUrl("javascripts/data/robo_reagan/hover.model.json", function(model) {
    I.sprite = model.animation;
  });

  $.reverseMerge(I, {
    health: 3000,
    hitCircles: [{"x":-1,"y":36,"radius":13},{"x":-1,"y":10,"radius":14}],
    radius: 40,
    collideDamage: 1,
    pointsWorth: 1000000,
    shootLogic: function() {
      self.shoot(
        Math.random() * (2 * Math.PI), {
          x: self.midpoint().x,
          y: self.midpoint().y,
          sprite: Sprite.load("images/effects/enemybullet1_small.png")
        }
      );
    },
    sprite: hoverModel.animation,
    x: rand(CANVAS_WIDTH),
    y: 45
  });

  var self = Enemy(I).extend({
    before: {
      update: function() {
        // TODO: Move Around
      }
    }
  });

  return self;
}