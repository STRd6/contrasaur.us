function Poison(I) {
  I = I || {};

  var fuse = 45;

  $.reverseMerge(I, {
    collideDamage: 0,
    radius: 4,
    rotation: 0,
    rotationalVelocity: -Math.PI / 16,
    speed: 7,
    sprite: Sprite.load("images/projectiles/test_tube.png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        duration: 7,
        sprite: loadAnimation("images/effects/poison_explosion_32x32.png", 7, 32, 32),
        x: I.x,
        y: I.y
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
        console.log(I.rotation);
        I.yVelocity += GRAVITY;

        if(I.age > fuse) {
          detonate();
        }
      }
    }
  });
  return self;
}
