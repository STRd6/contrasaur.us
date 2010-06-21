function Meteor(I) {
  I = I || {};

  var meteor1Tile = loadImageTile("images/levels/prehistoric/meteor1.png");
  var meteor2Tile = loadImageTile("images/levels/prehistoric/meteor2.png");

  $.reverseMerge(I, {
    width: 42,
    height: 36,
    radius: 12,
    collideDamage: 10,
    xVelocity: [
      3,
      -3
    ].rand(),
    yVelocity: 5,
    sprite: meteor1Tile
  });

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: "enemyBullet",
        duration: 10,
        sprite: loadAnimation("images/effects/explosion_46x46.png", 5, 46, 46, 2)
      }));
    }
  }

  var self = Bullet(null, I).extend({

    hit: function() {
      explode();
    },
    after: {
      update: function() {
        I.sprite = I.xVelocity < 0 ? meteor1Tile: meteor2Tile;
        I.yVelocity += GRAVITY;
      }
    }
  });
  return self;
}
