function Shield(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    attachment: "center",
    collideDamage: 1,
    duration: -1,
    effectCount: 3,
    health: 50,
    hitCircles: [{x: 0, y: 0, radius: 140}],
    sprite: Sprite.load("images/weapons/shield.png")
  });

  var self = Weapon(I).extend({
    data: $.noop,
    shoot: $.noop,
    addWeapon: function(weapon) {
      dino.addWeapon(weapon);
    },
    bulletHitEffect: Enemy.sparkSprayEffect,
    land: function(ground) {
      dino.land(ground);
    }
  });
  return self;
}
