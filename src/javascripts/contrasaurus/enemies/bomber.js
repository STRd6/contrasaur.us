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
      //position: self.position()
    }));
  }

  $.reverseMerge(I, {
    x: 650,
    y: 40,
    width: 71,
    height: 44,
    radius: 22,
    hFlip: true,
    xVelocity: I.xVelocity || -5,
    yVelocity: 0,
    health: 5,
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
    sprite: Sprite.load("images/enemies/bomber.png"),
    type: 'bomber'
  });

  I.hFlip = I.xVelocity <= 0;

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect
  });

  return self;
}
