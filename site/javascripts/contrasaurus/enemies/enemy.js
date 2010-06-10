function Enemy(I) {
  I = I || {};

  var soldierTile = loadImageTile("images/soldier.png");

  $.reverseMerge(I, {
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - soldierTile.height,
    width: 38,
    height: soldierTile.height,
    radius: 19,
    yVelocity: 0,
    health: 3,
    hFlip: I.hFlip || false,
    theta: I.theta || 0,
    color: "#F00",
    collideDamage: 1,
    collisionType: "enemy",
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        self.shoot(I.theta, {
          x: self.position().x,
          y: self.position().y,
          sprite: loadImageTile("images/effects/enemybullet1_small.png")
        });
      }
    },
    sprite: soldierTile
  });

  if (Math.cos(I.theta <= 0) && !I.hFlip) {
    I.theta += Math.PI/2;
  }

  if (Math.cos(I.theta > 0) && I.hFlip) {
    I.theta -= Math.PI/2;
  }

  var checkBounds = GameObject.generateCheckBounds(I, 100);

  var self = GameObject(I).extend({
    land: function(h) { },

    shoot: function(angle, bulletData) {
      var bullet = Bullet(angle, $.extend(bulletData, {
        collisionType: "enemyBullet"
      }))
      addGameObject(bullet);
    },

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
        checkBounds.apply(self, arguments);
      }
    }
  });

  return self;
}