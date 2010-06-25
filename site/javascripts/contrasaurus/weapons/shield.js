function Shield(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    collideDamage: 0,
    duration: -1,
    effectCount: 3,
    health: 50,
    radius: 72,
    sprite: Sprite.load("images/weapons/shield.png")
  });

  var self = Weapon(I).extend({
    shoot: $.noop
  });
  return self;
}