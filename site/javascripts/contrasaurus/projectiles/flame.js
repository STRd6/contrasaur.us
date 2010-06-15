function Flame(direction, I) {
  var speed = 10;
  var theta = Math.PI/4;

  $.reverseMerge(I, {
    duration: 20,
    radius: 18,
    collideDamage: 20,
    sprite: loadImageTile("images/flame.png"),
    xVelocity: direction * 5,
    yVelocity: Math.sin(theta) * speed
  });

  var self = Bullet(theta, I).extend({
    land: $.noop,
    hit: $.noop,
    after: {
      update: function() {
        theta -= Math.PI/48;
        I.yVelocity = speed * Math.sin(theta);
      }
    }
  });
  return self;
}
