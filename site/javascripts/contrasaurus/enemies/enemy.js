function Enemy(I) {
  I = I || {};

  var soldierTile = loadImageTile("images/soldier.png");

  // TODO: make them not shoot into the ground
  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - soldierTile.height,
    width: 38,
    height: soldierTile.height,
    radius: 19,
    yVelocity: 0,
    health: 3,
    hFlip: Math.cos(theta) <= 0,
    color: "#F00",
    collideDamage: 1,
    collisionType: "enemy",
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        self.shoot(theta, {
          x: self.midpoint().x,
          y: self.midpoint().y,
          sprite: loadImageTile("images/effects/enemybullet1_small.png")
        });
      }
    },
    sprite: soldierTile
  });

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