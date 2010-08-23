function RoboReagan(I) {
  I = I || {};

  var hoverModel = Model.loadJSONUrl("data/robo_reagan/hover.model.json", function(model) {
    I.sprite = model.animation;
  });

  var kneelAnimation = Animation.load("images/enemies/robo_reagan/reagan_knee_stand.png", 10, 42, 56, 3);
  var kneelFrame = 0;
  var kneelDuration = 100;
  var standDuration = 180;
  var shakeFist = false;
  var flying = false;

  var currentModel = hoverModel;

  function setModel(model) {
    currentModel = model;
    I.sprite = currentModel.animation;
  }

  $.reverseMerge(I, {
    collideDamage: 1,
    health: 9000,
    pointsWorth: 1000000,          
    radius: 40,
    shootLogic: function() {
      if(flying) {
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
      }
    },
    sprite: hoverModel.animation,
    x: rand(CANVAS_WIDTH),
    y: 60
  });

  var self = Boss(I).extend({
    after: {
      update: function() {
        if(flying) {
          // Move Around
          I.x = centralPoint.x + 100 * Math.sin(I.age / 11);
          I.y = centralPoint.y +  25 * Math.cos(I.age / 13);

          I.hitCircles = currentModel.hitFrame();
        } else {
          if(I.age < kneelDuration) {
            I.y = CANVAS_HEIGHT - Floor.LEVEL - 40;
            I.sprite = kneelAnimation;
            I.sprite.frame(kneelFrame);
          } else if(I.age < standDuration) {
            if(shakeFist) {
              I.sprite.frame((I.sprite.frame() % 2) + 8);
            } else {
              if(I.sprite.frame() > 8) {
                shakeFist = true;
              }
            }
          } else {
            I.sprite = hoverModel.animation;
            I.y -= 2;

            if(I.y < centralPoint.y) {
              flying = true;
              setModel(hoverModel);
            }
          }
        }
      }
    }
  });

  var centralPoint = self.position().add(Point());

  return self;
}
