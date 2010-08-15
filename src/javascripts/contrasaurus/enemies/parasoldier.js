function Parasoldier(I) {
  I = I || {};

  var parasoldierModel = Model.loadJSONUrl("data/parasoldier/parasoldier.model.json", function(model) {
    I.sprite = model.animation;
  });
  
  var runModel = Model.loadJSONUrl("data/sandinista/run.model.json");
  var shootModel = Model.loadJSONUrl("data/sandinista/shoot.model.json");  
  
  var currentModel = parasoldierModel;

  $.reverseMerge(I, {
    x: rand(CANVAS_WIDTH),
    y: 45
  });

  var theta = Math.atan2(dino.position().y - I.y, dino.position().x - I.x);

  $.reverseMerge(I, {
    health: 3,
    radius: 40,
    yVelocity: 4,
    color: "#F00",
    collideDamage: 1,
    hitCircles: currentModel.hitFrames,
    nutrition: 50,
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        self.shoot(
          theta, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            sprite: Sprite.load("images/effects/enemybullet1_small.png")
          }
        );
      }
    },
    sprite: currentModel.animation,
    type: 'parasoldier'
  });
  
  function setModel(model) {
    currentModel = model;
    I.sprite = currentModel.animation;
  }  

  var self = Enemy(I).extend({
    land: function(h) {
      I.y = h - I.radius;
      I.yVelocity = 0;
      setModel(runModel);
      I.xVelocity = -2;
    },

    after: {
      hit: function(other) {
        if(other.bump) {
          other.bump();
        }
      },
      update: function() {
        I.hitCircles = currentModel.hitFrame();
      }
    }
  });

  I.hFlip = (I.x >= CANVAS_WIDTH / 2 ? true : false);

  if (I.hFlip && Math.cos(theta) > 0) {
    theta -= Math.PI;
  }

  if (!I.hFlip && Math.cos(theta) <= 0) {
    theta += Math.PI;
  }

  return self;
}