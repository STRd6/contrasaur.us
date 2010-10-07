function RoboReagan(I) {
  I = I || {};

  var chargeModel = Model.loadJSONUrl("data/robo_reagan/charge.model.json");
  var energyBeamModel = Model.loadJSONUrl("data/robo_reagan/energy_beam.model.json");
  var hoverModel = Model.loadJSONUrl("data/robo_reagan/hover.model.json");
  var kneelModel = Model.loadJSONUrl("data/robo_reagan/kneel.model.json");

  var xAmplitude = 100;
  var yAmplitude = 25;

  var maxDisplacementScale = 1;
  var displacementScale = 0;
  var displacementDelta = 0.025;

  var states = {
    endBattle: State({
      model: hoverModel,
      update: function() {
        I.x = centralPoint.x + displacementScale * xAmplitude * Math.sin(I.age / 11);
        I.y = centralPoint.y + displacementScale * yAmplitude * Math.cos(I.age / 13);
      }
    }),
    battle: State({
      model: hoverModel,
      update: function() {
        if(displacementScale >= 2 && displacementDelta > 0) {
          displacementDelta = -displacementDelta;
        } else if(displacementScale <= 0 && displacementDelta < 0){
          displacementDelta = -displacementDelta;
          I.currentState = states.charge;
        }

        displacementScale += displacementDelta;

        var currentScale = Math.min(maxDisplacementScale, displacementScale);

        I.x = centralPoint.x + currentScale * xAmplitude * Math.sin(I.age / 11);
        I.y = centralPoint.y + currentScale * yAmplitude * Math.cos(I.age / 13);

        if(I.health < 4500) { // TODO: make different events to transition states better
          I.currentState = states.endBattle;
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
                collisionType: "enemyBullet",
                sprite: Sprite.load("images/projectiles/homing_missile_red.png")
              }, self.position())));
            }
          }
        }
      }
    }),
    charge: State({
      complete: function() {
        I.currentState = states.energyBeam;
      },
      duration: 40,
      model: chargeModel
    }),
    energyBeam: State({
      complete: function() {
        I.currentState = states.battle;
      },
      duration: 40,
      model: energyBeamModel
    }),
    takeOff: State({
      complete: function() {
        I.currentState = states.battle;
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
      model: hoverModel,
      update: function() {
        I.y -= 2;
      }
    }),
    shakeFist: State({
      complete: function() {
        I.currentState = states.takeOff;
      },
      duration: 50,
      model: kneelModel,
      update: function() {
        I.currentState.frame((I.currentState.frame() % 2) + 8);
      }
    }),
    stand: State({
      complete: function() {
        I.currentState = states.shakeFist;
      },
      duration: 20,
      model: kneelModel,
      update: function() {

      }
    }),
    kneel: State({
      complete: function() {
        I.currentState = states.stand;
      },
      duration: 100,
      model: kneelModel,
      update: function() {
        I.y = CANVAS_HEIGHT - Floor.LEVEL - 40;

        I.currentState.frame(0);
      }
    })
  };

  $.reverseMerge(I, {
    collideDamage: 1,
    health: 5000,
    pointsWorth: 1000000,
    radius: 40,
    sprite: kneelModel.animation,
    x: rand(CANVAS_WIDTH),
    y: 60
  });

  I.currentState = states.kneel;

  var self = Boss(I).extend({});

  self.extend(Stateful(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 50
    })));
  });

  var centralPoint = self.position().add(Point());

  return self;
}
