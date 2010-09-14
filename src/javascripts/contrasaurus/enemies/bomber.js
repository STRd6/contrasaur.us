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
    x: 650,
    y: 40,
    width: 71,
    hitCircles: bomberModel.hitFrames,
    height: 44,
    radius: 22,
    hFlip: true,
    xVelocity: I.xVelocity || -5,
    yVelocity: 0,
    health: 20,
    color: "#088",
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
    type: 'bomber'
  });

  I.hFlip = I.xVelocity <= 0;

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
      hFlip: I.hFlip,
      rotationalVelocity: -Math.PI / 32,
      sprite: I.sprite,
      x: I.x,
      xVelocity: I.xVelocity,
      y: I.y,
      yVelocity: 0
    }));
  });

  return self;
}
