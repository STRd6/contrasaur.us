function EnergyBeam(I) {
  I = I || {};

  $.reverseMerge(I, {
    collisionType: 'enemyBullet',
    health: Infinity,
    radius: 8,
    speed: 14,
    sprite: Sprite.load('images/projectiles/beam.png'),
    theta: Math.PI / 2
  });

  var self = Bullet(I).extend({

  });

  return self;
}
