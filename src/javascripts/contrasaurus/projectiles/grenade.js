function Grenade(I) {
  I = I || {};

  var fuse = 45;

  $.reverseMerge(I, {
    collideDamage: 0,
    radius: 8,
    rotation: 0,
    rotationalVelocity: Math.PI / 32,
    speed: 5,
    sprite: Sprite.load("images/projectiles/grenade.png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        collideDamage: I.collideDamage,
        collisionType: I.collisionType,
        x: I.x,
        y: I.y - 50
      }));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.rotationGetTransform(I),

    land: function() {
      detonate();
    },

    hit: $.noop,

    after: {
      update: function() {
        I.rotation += I.rotationalVelocity;
        I.yVelocity += GRAVITY;

        if(I.age > fuse) {
          detonate();
        }
      }
    }
  });
  return self;
}
