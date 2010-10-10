function FinalReagan(I) {
  I = I || {};

  var chargeModel = Model.loadJSONUrl("data/robo_reagan/charge.model.json");
  var energyBeamModel = Model.loadJSONUrl("data/robo_reagan/energy_beam.model.json");
  var hoverModel = Model.loadJSONUrl("data/robo_reagan/hover.model.json");

  var beamSprite = Sprite.load('images/projectiles/beam.png');
  var missileSprite = Sprite.load("images/projectiles/homing_missile_red.png");

  var xAmplitude = 100;
  var yAmplitude = 25;

  var maxDisplacementScale = 1;
  var displacementScale = 0;
  var displacementDelta = 0.025;

  var missileFrequency = 0;
  var missilePos = 0;
  var stateChooser = 0;

  var ragingShootLogic = function() {
    self.shoot(
      Math.random() * (Math.PI), {
        speed: 25,
        sprite: beamSprite,
        x: self.midpoint().x,
        y: self.midpoint().y
      }
    );
  };

  var states = {
    battle: State({
      model: hoverModel,
      update: function(position) {
        I.rotation = 0;
        var relativePoint = centralPoint.add(position);

        if(displacementScale >= 2 && displacementDelta > 0) {
          displacementDelta = -displacementDelta;
        } else if(displacementScale <= 0 && displacementDelta < 0){
          displacementDelta = -displacementDelta;

          stateChooser = !stateChooser;

          if(stateChooser) {
            I.currentState = states.charge;
          } else {
            I.currentState = states.missileCharge;
          }
          I.shootLogic = $.noop;
        }

        displacementScale += displacementDelta;

        var currentScale = Math.min(maxDisplacementScale, displacementScale);

        I.x = I.x.approach(relativePoint.x + currentScale * xAmplitude * Math.sin(I.age / 11), 10);
        I.y = I.y.approach(relativePoint.y + currentScale * yAmplitude * Math.cos(I.age / 13), 6);

        maxDisplacementScale = Math.min((6000 - I.health) / 1000, 2);
      }
    }),
    charge: State({
      complete: function() {
        I.currentState = states.energyBeam;
      },
      duration: 40,
      model: chargeModel,
      update: function() {
        I.rotation = I.rotation.approach(Point.direction(self.position(), dino.position()) - Math.PI/2, Math.PI/24);
      }
    }),
    energyBeam: State({
      complete: function() {
        I.currentState = states.battle;
        I.shootLogic = ragingShootLogic;
        self.trigger("beamComplete");
      },
      duration: 40,
      model: energyBeamModel,
      update: function() {
        self.shoot(I.rotation + Math.PI/2, $.extend(self.position(), {
          collisionType: 'enemyBullet',
          health: Infinity,
          radius: 8,
          speed: 14,
          sprite: Sprite.load('images/projectiles/beam.png'),
        }));
      }
    }),
    missileBarrage: State({
      complete: function() {
        I.currentState = states.battle;
      },
      duration: 12,
      model: energyBeamModel,
      update: function() {
        addGameObject(HomingMissile($.extend({
          collisionType: "enemyBullet",
          sprite: missileSprite,
          theta: (missilePos++) * Math.PI / 6
        }, self.position())));
      }
    }),
    missileCharge: State({
      complete: function() {
        I.currentState = states.missileBarrage;
      },
      duration: 40,
      model: chargeModel
    }),
  };

  $.reverseMerge(I, {
    collideDamage: 1,
    health: 5000,
    pointsWorth: 1000000,
    radius: 40,
    rotation: 0,
    x: CANVAS_WIDTH/2,
    y: 100
  });

  I.currentState = states.battle;

  var self = Boss(I).extend({
    getTransform: GameObject.rotationGetTransform(I)
  });

  self.extend(Stateful(I));

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      duration: Infinity,
      radius: 50
    })));

    addGameObject(Effect($.extend(self.position(), {
      duration: Infinity,
      rotation: 0,
      sprite: chargeModel.animation,
      velocity: Point(0, 0)
    })));
  });

  var centralPoint = self.position().add(Point());

  return self;
}
