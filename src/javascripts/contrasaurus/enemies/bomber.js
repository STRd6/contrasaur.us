function Bomber(I) {
  I = I || {};

  var bombs = 6;
  var cooldown = 0;

  var bomberModel = Model.loadJSONUrl("data/bomber/bomber.model.json", function(model) {
    I.sprite = model.animation;
  });

  function dropBomb() {
    cooldown += 10;
    bombs--;
    addGameObject(Bomb({
      xVelocity: I.xVelocity,
      x: self.position().x,
      y: self.position().y
      //position: self.position()
    }));
  }

  $.reverseMerge(I, {
    color: "#088",
    health: 20,
    height: 44,
    hitCircles: bomberModel.hitFrames,
    pointsWorth: 5000,
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      }
      // Shoot
      if (cooldown == 0 && I.age > 20 && bombs > 0) {
        dropBomb();
      }
    },
    sprite: bomberModel.animation,
    type: 'bomber',
    radius: 22,
    width: 71,
    xVelocity: -5,
    yVelocity: 0
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    after: {
      update: function() {
        I.hitCircles = bomberModel.hitFrame();
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(Grenade({
      collideDamage: 10,
      collisionType: "dinoBullet",
      hFlip: true,
      rotationalVelocity: -Math.PI / 60,
      sprite: I.sprite,
      x: I.x,
      xVelocity: I.xVelocity,
      y: I.y,
      yVelocity: 0
    }));
  });

  return self;
}
