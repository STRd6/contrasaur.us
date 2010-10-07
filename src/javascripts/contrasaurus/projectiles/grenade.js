function Grenade(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 0,
    contactTrigger: true,
    explosionDamage: 10,
    fuse: 45,
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
        collideDamage: I.explosionDamage,
        collisionType: I.collisionType,
        sprite: loadAnimation("images/effects/large_explosion.png", 27, 124, 98, 3),
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

    hit: function() {
      if(I.contactTrigger) {
        detonate();
      }
    },

    after: {
      update: function() {
        I.rotation += I.rotationalVelocity;
        I.yVelocity += GRAVITY;

        if(I.age > I.fuse) {
          detonate();
        }
      }
    }
  });
  return self;
}
