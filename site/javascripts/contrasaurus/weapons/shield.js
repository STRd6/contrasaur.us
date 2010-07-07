function Shield(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    collideDamage: 1,
    duration: -1,
    effectCount: 3,
    health: 50,
    hitCircles: [{x: 0, y: 0, radius: 140}],
    sprite: Sprite.load("images/weapons/shield.png")
  });

  var self = Weapon(I).extend({
    shoot: $.noop,
    addWeapon: function(weapon) {
      self.dino().addWeapon(weapon);
    },
    bulletHitEffect: Enemy.sparkSprayEffect,
    land: function(ground) {
      self.dino().land(ground);
    }
  });
  return self;
}
