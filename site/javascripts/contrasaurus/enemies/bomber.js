function Bomber(I) {
  I = I || {};

  var bombs = 6;
  var cooldown = 0;

  function dropBomb() {
    cooldown += 10;
    bombs--;
    addGameObject(Bomb(
      I.xVelocity, 
      self.position()
    ));
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
    sprite: loadImageTile("images/bomber.png")
  });

  I.hFlip = I.xVelocity <= 0;

  var self = Enemy(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), 9, $.extend(bullet.position(), {
        sprite: loadAnimation("images/effects/sparkEffect2_16x16.png", 7, 16, 16)
      }));

      addGameObject(effect);
    }
  });

  return self;
}
