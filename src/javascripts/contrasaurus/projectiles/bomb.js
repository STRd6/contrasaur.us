function Bomb(I) {
  I = I || {};

  var bombTile = Sprite.load("images/projectiles/bomb.png");

  $.reverseMerge(I, {
    collideDamage: 0,
    radius: 8,
    sprite: bombTile,
    xVelocity: I.xVelocity,
    yAcceleration: GRAVITY,
    yVelocity: 0
  });

  function explode() {
    if(I.active) {
      I.active = false;

      addGameObject(Explosion({
        collideDamage: 2,
        x: I.x,
        y: I.y - 50
      }));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.velocityGetTransform(I),

    hit: $.noop,

    land: function() {
      explode();
    }
  });

  return self;
}
