function Flame(direction, I) {
  var speed = 10;
  var theta = Math.PI/4;

  $.reverseMerge(I, {
    collideDamage: 0,
    duration: 20,
    sprite: Sprite.load("images/projectiles/flame.png"),
    radius: 18,
    xVelocity: direction * 5,
    yVelocity: Math.sin(theta) * speed
  });

  var self = Bullet(theta, I).extend({
    land: $.noop,
    hit: function(other) {
      if(other.burn) {
        other.burn(self);
      }
    },
    after: {
      update: function() {
        theta -= Math.PI/48;
        I.yVelocity = speed * Math.sin(theta);
      }
    }
  });
  return self;
}
