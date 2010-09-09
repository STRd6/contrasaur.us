function RoboReagan(I) {
  I = I || {};

  var hoverModel = Model.loadJSONUrl("data/robo_reagan/hover.model.json");
  var kneelModel = Model.loadJSONUrl("data/robo_reagan/kneel.model.json");

  var states = {
    endBattle: State({
      update: function() {
        I.x = centralPoint.x + 175 * Math.sin(I.age / 11);
        I.y = centralPoint.y + 30 * Math.cos(I.age / 13);
        I.hitCircles = hoverModel.hitFrame();
      }
    }),
    battle: State({
      update: function() {
        I.x = centralPoint.x + 100 * Math.sin(I.age / 11);
        I.y = centralPoint.y + 25 * Math.cos(I.age / 13);
        I.hitCircles = hoverModel.hitFrame();
        if(I.health < 4500) { // TODO: make different events to transition states better
          currentState = states.endBattle;
          I.shootLogic = function() {
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
        }
      }
    }),
    takeOff: State({
      complete: function() {
        currentState = states.battle;
        I.shootLogic = function() {
          self.shoot(
            Math.random() * (Math.PI), {
              x: self.midpoint().x,
              y: self.midpoint().y,
              sprite: Sprite.load("images/effects/enemybullet1_small.png")
            }
          );
        }
      },
      duration: 80,
      update: function() {
        I.sprite = hoverModel.animation;
        I.y -= 2;
      }
    }),
    shakeFist: State({
      complete: function() {
        currentState = states.takeOff;
      },
      duration: 50,
      update: function() {
        I.sprite.frame((I.sprite.frame() % 2) + 8);
        I.hitCircles = kneelModel.hitFrame();
      }
    }),
    stand: State({
      complete: function() {
        currentState = states.shakeFist;
      },
      duration: 20,
      update: function() {
        I.hitCircles = kneelModel.hitFrame();
      }
    }),
    kneel: State({
      complete: function() {
        currentState = states.stand;
      },
      duration: 100,
      update: function() {
        I.y = CANVAS_HEIGHT - Floor.LEVEL - 40;
        I.sprite = kneelModel.animation;
        I.sprite.frame(0);
        I.hitCircles = kneelModel.hitFrame();
      }
    })
  };

  var currentState = states.kneel;

  $.reverseMerge(I, {
    collideDamage: 1,
    health: 9000,
    hitCircles: currentState.hitCircles,
    pointsWorth: 1000000,
    radius: 40,
    shootLogic: $.noop,
    sprite: currentState.sprite,
    x: rand(CANVAS_WIDTH),
    y: 60
  });

  var self = Boss(I).extend({
    after: {
      update: function() {
        currentState.update();
      }
    }
  });

  var centralPoint = self.position().add(Point());

  return self;
}
