function Enemy(I) {
  I = I || {};

  var soldierTile = loadImageTile("images/soldier.png");
  var height = 53;

  // TODO: make them not shoot into the ground
  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - height,
    width: 38,
    height: height,
    radius: 19,
    yVelocity: 0,
    health: 3,
    hFlip: Math.cos(theta) <= 0,
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

  var self = GameObject(I).extend({
    land: function(h) { },

    getTransform: function() {
      if(I.hFlip) {
        return HORIZONTAL_FLIP_MATRIX;
      } else {
        return IDENTITY_MATRIX;
      }
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