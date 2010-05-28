function Enemy(I) {
  I = I || {};

  var soldierTile = loadImageTile("images/soldier.png");

  // TODO: make them not shoot into the ground
  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(canvas.width()),
    y: 340,
    width: 10,
    height: 40,
    yVelocity: 0,
    health: 3,
    hFlip: false,
    color: "#F00",
    collideDamage: 1,
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        enemyShoot(Bullet(
          theta, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            color: '#C00'
          }
        ));
      }
    },
    sprite: soldierTile
  });

  I.hFlip = Math.cos(theta) <= 0;

  var self = GameObject(I).extend({
    land: function(h) { },

    draw: function(canvas) {

      I.sprite.draw(canvas,
        I.x,
        I.y,
        { hFlip: I.hFlip }
      );
    },

    after: {
      hit: function(other) {
        if(other.bump) {
          other.bump();
        }
      },
      update: function() {
        I.shootLogic();
      }
    }
  });

  return self;
}