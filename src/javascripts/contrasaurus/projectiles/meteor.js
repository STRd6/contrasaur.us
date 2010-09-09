function Meteor(I) {
  I = I || {};

  var meteorA = loadAnimation("images/levels/prehistoric/meteorA.png", 4, 50, 30);
  var meteorB = loadAnimation("images/levels/prehistoric/meteorB.png", 4, 50, 30);

  $.reverseMerge(I, {
    width: 50,
    health: 1,
    height: 30,
    radius: 15,
    collideDamage: 5,
    collisionType: "levelHazard",
    xVelocity: [
      3,
      -3
    ].rand(),
    yVelocity: 5,
    sprite: meteorA
  })

  var self = Bullet(I).extend({
    explode: function() {
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: "enemyBullet",
        duration: 10,
        sprite: loadAnimation("images/effects/explosion_46x46.png", 5, 46, 46, 2)
      }));
    },

    after: {
      hit: function(other) {
        self.trigger('destroy');
      },
      land: function() {
        self.trigger('destroy');
      },
      update: function() {
        I.sprite = I.xVelocity < 0 ? meteorA : meteorB;
        I.yVelocity += GRAVITY/2;
      }
    }
  });

  self.bind('destroy', function() {
    self.explode();
  });

  return self;
}
