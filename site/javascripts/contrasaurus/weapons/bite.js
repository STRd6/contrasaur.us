function Bite(I) {
  I = I || {};

  $.reverseMerge(I, {
    duration: -1,
    exitPoints: [Point(50, 60)],
    radius: 50,
    sprite: Sprite.EMPTY,
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta, Point(-52, -12)).translate(122, -5);
    },

    generateProjectile: function(direction, position) {
      return Bullet({
        collideDamage: 0,
        collisionType: "biteTrigger",
        duration: 1,
        effectCount: 0,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 10,
        theta: direction,
        x: position.x,
        y: position.y
      });
    }
  });

  return self;
}
