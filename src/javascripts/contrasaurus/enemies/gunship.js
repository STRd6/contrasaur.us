function Gunship(I) {
  I = I || {};

  $.reverseMerge(I, {
    components: [],
    health: 2000,
    hFlip: false,
    x: 550,
    xVelocity: 0,
    y: 240
  });

  var shipModel = Model.loadJSONUrl("data/gunship/hull.model.json");
  var lob1Model = Model.loadJSONUrl("data/gunship/lob1.model.json");
  var lob2Model = Model.loadJSONUrl("data/gunship/lob2.model.json");
  var bunkerModel = Model.loadJSONUrl("data/gunship/bunker.model.json");

  var states = {
    attack: State({
      duration: Infinity,
      model: shipModel,
      update: function() {
      }
    })
  };
  
  function ShipComponent(I) {
    I = I || {};
    
    var self = GameObject(I).extend({
      getCircles: function() {
        return I.model.hitFrame();
      },

      shoot: function(transform) {
        var netTransform = transform.concat(self.getTransform());

        var exitPoint = I.model.attachment('exit');
        if(exitPoint.x) {
          var levelPosition = netTransform.transformPoint(exitPoint);

          addGameObject(Bullet({
            collisionType: "enemyBullet",
            sprite: Sprite.load("images/effects/enemybullet1_small.png"),
            theta: exitPoint.direction,
            x: levelPosition.x,
            y: levelPosition.y
          }));
        }
      },

      before: {
        update: function() {
          I.sprite = I.model.animation;
        }
      }
    });
    
    return self;
  }

  I.components.push(ShipComponent({
    model: lob1Model
  }), ShipComponent({
    model: lob2Model
  }), ShipComponent({
    model: bunkerModel
  }));

  var boatTarget = Point(I.x - 25, I.y);
  I.currentState = states.attack;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    components: function() {
      return I.components;
    },

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    before: {
      update: function(position) {
        I.x = position.x + boatTarget.x + 20 * Math.sin(I.age/20);

        I.components.each(function(component) {
          component.update();
          //TODO: Shoot in a sequence, not constantly
          component.shoot(self.getTransform());
        });
      }
    }
  });

  self.extend(Stateful(I));

  self.extend({
    after: {
      draw: function(canvas) {
        canvas.withTransform(self.getTransform(), function() {
          $.each(I.components, function(i, component) {
            component.draw(canvas);
          });
        });
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(EffectGenerator($.extend(self.position(), {
      radius: 100
    })));

    var effectI = self.position();

    var effect = Effect($.extend(effectI, {
      duration: 150,
      rotation: Math.PI / 2.25,
      sprite: shipModel.animation,
      velocity: Point(0, 0)
    })).extend({
      getTransform: GameObject.rotationGetTransform(effectI)
    });

    addGameObject(effect);
  });

  return self;
}
