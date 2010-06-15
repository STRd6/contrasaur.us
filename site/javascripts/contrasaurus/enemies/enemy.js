function Enemy(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemy",
    color: "#F00",
    health: 3,
    height: 51,
    hFlip: I.hFlip || false,
    pointsWorth: 1000,
    radius: 18,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        self.shoot(I.theta, {
          x: self.position().x,
          y: self.position().y,
          sprite: loadImageTile("images/effects/enemybullet1_small.png")
        });
      }

      // throw grenades
      if (rand() < 0.05) {
        var throwDirection = - Math.PI / 4;
        var grenade = Grenade(throwDirection, self.position().add(Point(0, -20)));
        addGameObject(grenade);
      }
    },
    sprite: loadImageTile("images/enemies/sandinista_stand.png"),
    theta: I.theta || 0,
    width: 33,
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  if (Math.cos(I.theta <= 0) && !I.hFlip) {
    I.theta += Math.PI/2;
  }

  if (Math.cos(I.theta > 0) && I.hFlip) {
    I.theta -= Math.PI/2;
  }

  var checkBounds = GameObject.generateCheckBounds(I, 100);

  var self = GameObject(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(bullet.velocity(), $.extend(bullet.position(), {
        duration: 10,
        sprite: [
          loadAnimation("images/effects/bloodEffect3_16x16.png", 9, 16, 16),
          loadAnimation("images/effects/bloodEffect2_8x8.png", 10, 8, 8),
          loadAnimation("images/effects/bloodEffect1_8x8.png", 8, 8, 8),
          loadAnimation("images/effects/bloodEffect4_16x16.png", 10, 16, 16)
        ].rand()
      }));

      addGameObject(effect);
    },

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