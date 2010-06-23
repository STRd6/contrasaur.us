function Shield(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    collideDamage: 0,
    effectCount: 3,
    radius: 72,
    sprite: Sprite.load("images/weapons/shield.png")
  });

  var self = Weapon(I).extend({ });
  return self;
}