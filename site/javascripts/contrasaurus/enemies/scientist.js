function Scientist(I) {
  I = I || {};

  var exitPoint = Point(-15, -20);
  //var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  $.reverseMerge(I, {
    shootLogic: function() {
      if (Math.random() < 0.035) {
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);
        //var d = transform.deltaTransformPoint(exitDirection);
        var theta = 2*(Math.PI)/3 //Math.atan2(d.y, -d.x);

        self.shoot(theta, {
          collisionType: "enemyBullet",
          x: p.x,
          y: p.y,
          radius: 2,
          sprite: Sprite.load("images/projectiles/test_tube.png"),
          theta: theta,
          yVelocity: Math.clamp(-1*rand(15), -15, -2)
        });
      }
    },
    sprite: Sprite.load("images/enemies/mad_scientist.png"),
    type: 'scientist',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({

    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
      }
    },

    shoot: function(angle, bulletData) {
      var poison = Poison(bulletData);

      addGameObject(poison);
    },

    after: {
      update: function() {
        if (I.xVelocity < 0) {
          I.hFlip = true;
        } else {
          I.hFlip = false;
        }
      }
    }
  });

  return self;
}
