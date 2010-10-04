function Bomb(I) {
  I = I || {};

  var bombTile = Sprite.load("images/projectiles/bomb.png");

  $.reverseMerge(I, {
    color: "#000",
    width: 64,
    height: 23,
    radius: 8,
    collideDamage: 0,
    xVelocity: I.xVelocity,
    yVelocity: 0,
    sprite: bombTile
  });

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({x: I.x, y: I.y - 50}));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.velocityGetTransform(I),

    hit: $.noop,

    land: function() {
      explode();
    },

    after: {
      update: function() {
        I.yVelocity += GRAVITY;
      }
    }
  });
  return self;
}
