function Flame(I) {
  var speed = 15;

  $.reverseMerge(I, {
    theta: Math.PI/4
  });

  $.reverseMerge(I, {
    collideDamage: 0,
    duration: 20,
    hFlip: true,
    sprite: Sprite.load("images/projectiles/flame.png"),
    radius: 18,
    xVelocity: I.theta * 10,
    yVelocity: Math.sin(I.theta) * speed
  });

  var self = Bullet(I).extend({
    land: $.noop,

    hit: function(other) {
      if(other.burn) {
        other.burn(self);
      }
    },

    after: {
      update: function() {
        if(I.hFlip) {
          I.theta = -5*Math.PI/4
        }
        I.theta -= Math.PI/48;
        I.yVelocity = speed * Math.sin(I.theta);
      }
    }
  });
  return self;
}
