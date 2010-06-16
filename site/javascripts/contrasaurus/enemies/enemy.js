function Enemy(I) {
  I = I || {};

  var standSprite = loadImageTile("images/enemies/sandinista/stand.png");
  var runSprite = loadAnimation("images/enemies/sandinista/run.png", 8, 38, 52, 3);

  var exitPoint = Point(15, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemy",
    health: 3,
    hFlip: false,
    pointsWorth: 1000,
    radius: 18,
    shootLogic: function() {
      var transform = self.getTransform();

      var p = transform.transformPoint(exitPoint);
      var d = transform.transformPoint(exitDirection);
      var theta = Math.atan2(d.y, d.x);

      if (Math.random() < 0.075) {
        self.shoot(theta, {
          x: self.position().x + p.x,
          y: self.position().y + p.y,
          sprite: loadImageTile("images/effects/enemybullet1_small.png")
        });
      }

//      var throwDirection = - Math.PI / 4
//      // throw grenades
//      if (rand() < 0.05) {
//        if (Math.cos(I.theta) < 0) {
//          throwDirection = - (3/4) * Math.PI;
//        }
//        var grenade = Grenade(throwDirection, self.position().add(Point(0, -20)));
//        addGameObject(grenade);
//      }
    },
    sprite: runSprite,
    theta: 0,
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
      if(I.hFlip) {
        return Matrix.HORIZONTAL_FLIP;
      } else {
        return Matrix.IDENTITY;
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