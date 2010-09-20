function Flame(I) {
  I = I || {};

  $.reverseMerge(I, {
    theta: Math.PI/4
  });

  $.reverseMerge(I, {
    collideDamage: 0,
    damageType: "fire",
    duration: 20,
    sprite: Sprite.load("images/projectiles/flame.png"),
    radius: 18
  });

  var self = Bullet(I).extend({
    land: $.noop,

    hit: function(other) {
      if(other.burn) {
        other.burn(self);
      }
    }
  });

  return self;
}
