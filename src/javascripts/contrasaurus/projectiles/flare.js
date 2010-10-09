function Flare(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 0,
    collisionType: "enemy",
    contactTrigger: false,
    explosionDamage: 10,
    fuse: 20,
    rotation: 0,
    rotationalVelocity: Math.PI / 32,
    speed: 15,
    sprite: Sprite.load("images/projectiles/grenade.png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(FlareExplosion({
        x: I.x,
        y: I.y - 50
      }));
    }
  }

  var self = Bullet(I).extend({
    land: $.noop,

    hit: $.noop,

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
