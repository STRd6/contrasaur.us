function Bomber(I) {
  I = I || {};

  var bombs = 6;
  var cooldown = 0;

  function dropBomb() {
    cooldown += 10;
    bombs--;
    addGameObject(Bomb({
      xVelocity: I.xVelocity,
      x: self.position().x,
      y: self.position().y
    }));
  }

  $.reverseMerge(I, {
    checkBounds: GameObject.generateCheckBounds(I, 200),
    health: 20,
    height: 44,
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
    type: 'bomber',
    radius: 22,
    width: 71,
    xVelocity: 5,
    yVelocity: 0
  });

  I.model = Model.loadJSONUrl("data/planes/" + I.type + ".model.json", function(model) {
    I.sprite = model.animation;
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    after: {
      update: function() {
        I.hitCircles = I.model.hitFrame();
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(Grenade({
      collideDamage: 10,
      collisionType: "dinoBullet",
      hFlip: I.hFlip,
      rotationalVelocity: Math.random() * Math.PI / 12,
      sprite: I.sprite,
      x: I.x,
      xVelocity: I.xVelocity,
      y: I.y,
      yVelocity: 0
    }));
  });

  return self;
}
