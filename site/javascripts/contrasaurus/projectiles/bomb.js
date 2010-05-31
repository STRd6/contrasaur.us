function Bomb(xVelocity, I) {
  I = I || {};

  var bombTile = loadImageTile("images/bomb.png");

  $.reverseMerge(I, {
    color: "#000",
    width: 64,
    height: 23,
    radius: 12,
    collideDamage: 0,
    xVelocity: xVelocity,
    yVelocity: 0,
    sprite: bombTile
  });

  function explode() {
    if(I.active) {
      I.active = false;
      enemyShoot(BombExplosion({x: I.x, y: I.y - 100}));
    }
  }

  var self = Bullet(null, I).extend({
    getTransform: function() {
      return rotationTransform(Math.atan2(I.yVelocity, I.xVelocity));
    },

    after: {
      hit: $.noop,

      update: function() {
        I.yVelocity += GRAVITY;

        if(I.y > 300) {
          explode();
        }
      }
    }
  });
  return self;
}