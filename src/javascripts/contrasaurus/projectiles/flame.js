function Flame(I) {
  var speed = 15;

  $.reverseMerge(I, {
    theta: Math.PI/4
  });

  $.reverseMerge(I, {
    collideDamage: 0,
    duration: 20,
    sprite: Sprite.load("images/projectiles/flame2.png"),
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
