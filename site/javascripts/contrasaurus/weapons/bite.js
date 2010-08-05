function Bite(I) {
  I = I || {};

  $.reverseMerge(I, {
    attachment: "center",
    duration: -1,
    exitPoints: [Point(110, 60)],
    radius: 50,
    sprite: Sprite.EMPTY,
    theta: 0
  });

  var self = Weapon(I).extend({
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
