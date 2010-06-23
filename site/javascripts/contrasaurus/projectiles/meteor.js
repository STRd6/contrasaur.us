function Meteor(I) {
  I = I || {};

  var meteor1Tile = Sprite.load("images/levels/prehistoric/meteor1.png");
  var meteor2Tile = Sprite.load("images/levels/prehistoric/meteor2.png");

  $.reverseMerge(I, {
    width: 42,
    health: 1,
    height: 36,
    radius: 12,
    collideDamage: 10,
    collisionType: "enemyBullet",
    xVelocity: [
      3,
      -3
    ].rand(),
    yVelocity: 5,
    sprite: meteor1Tile
  })

  var self = Bullet(null, I).extend({
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
        I.sprite = I.xVelocity < 0 ? meteor1Tile: meteor2Tile;
        I.yVelocity += GRAVITY;
      }
    }
  });
  return self;
}
