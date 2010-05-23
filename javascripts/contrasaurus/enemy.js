function Enemy(I) {
  I = I || {};

  var startingY;
  if (Math.random() < 0.5) {
    startingY = 0;
  } else {
    startingY = 340;
  }

  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(canvas.width()),
    y: startingY,
    width: 10,
    height: 40,
    yVelocity: 3,
    health: 3,
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
    sprite: loadImageTile("images/soldier.png")
  });

  var self = GameObject(I).extend({
    land: function(h) {
      I.y = h - I.height;
      I.yVelocity = 0;
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