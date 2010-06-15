function Grenade(theta, I) {
  I = I || {};

  var fuse = 45;
  var rotationSpeed = Math.PI / 32;
  var rotation = 0;

  $.reverseMerge(I, {
    color: '#500',
    width: 35,
    height: 16,
    radius: 8,
    speed: 5,
    collideDamage: 0,
    sprite: loadImageTile("images/projectiles/grenade.png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y - 50
      }));
    }
  }

  var self = Bullet(theta, I).extend({
    getTransform: function() {
      return rotationTransform(rotation);
    },

    land: function() {
      detonate();
    },

    hit: $.noop,

    after: {
      update: function() {
        rotation += rotationSpeed;
        I.yVelocity += GRAVITY;

        if(I.age > fuse) {
          detonate();
        }
      }
    }
  });
  return self;
}
