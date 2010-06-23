function Bomb(xVelocity, I) {
  I = I || {};

  var bombTile = Sprite.load("images/projectiles/bomb.png");

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
      addGameObject(Explosion({x: I.x, y: I.y - 50}));
    }
  }

  var self = Bullet(null, I).extend({
    getTransform: GameObject.velocityGetTransform(I),

    hit: $.noop,

    after: {
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
