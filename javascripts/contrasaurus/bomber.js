function Bomber(I) {
  I = I || {};

  $.reverseMerge(I, {
    x: 600,
    y: 40,
    width: 50,
    height: 20,
    hFlip: false,
    xVelocity: I.xVelocity || -5,
    yVelocity: 0,
    health: 5,
    color: "#088",
    pointsWorth: 3000,
    shootLogic: function() {
      // Shoot
      if (I.age % 20 == 0) {
        enemyShoot(Bomb(
          I.xVelocity, {
            x: self.midpoint().x,
            y: self.midpoint().y
          }
        ));
      }
    },
    sprite: loadImageTile("images/bomber.png")
  });

  I.hFlip = I.xVelocity <= 0;

  var self = GameObject(I).extend({
    draw: function(canvas) {

      I.sprite.draw(canvas,
        I.x,
        I.y,
        { hFlip: true }
      );
    },

    after: {
      update: function() {
        I.shootLogic();
      }
    }
  });

  return self;
}