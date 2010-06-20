function Parasoldier(I) {
  I = I || {};

  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(CANVAS_WIDTH),
    y: 45,
    width: 38,
    height: 90,
    radius: 19,
    yVelocity: 4,
    health: 3,
    color: "#F00",
    collideDamage: 1,
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        self.shoot(
          theta, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            sprite: loadImageTile("images/effects/enemybullet1_small.png")
          }
        );
      }
    },
    sprite: loadImageTile("images/enemies/parasoldier.png")
  });

  var self = Enemy(I).extend({
    land: function(h) {
      I.y = h - I.radius;
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

  I.hFlip = (I.x >= CANVAS_WIDTH / 2 ? true : false);

  if (I.hFlip && Math.cos(theta) > 0) {
    theta -= Math.PI;
  }

  if (!I.hFlip && Math.cos(theta) <= 0) {
    theta += Math.PI;
  }

  return self;
}