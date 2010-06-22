function Enemy(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemy",
    health: 3,
    hFlip: false,
    pointsWorth: 1000,
    radius: 18,
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

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

    land: $.noop,

    shoot: function(angle, bulletData) {
      var bullet = Bullet(angle, $.extend(bulletData, {
        collisionType: "enemyBullet"
      }))
      addGameObject(bullet);
    },

    getTransform: function() {
      var t;
      if(I.hFlip) {
        t =  Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
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