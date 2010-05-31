function Laser(theta, I) {
  var speed = 7;

  $.reverseMerge(I, {
    color: '#500',
    width: 32,
    height: 4,
    collideDamage: 3,
    radius: 2,
    sprite: loadImageTile("images/laser.png"),
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = Bullet(theta, I).extend({
    hit: $.noop,
    getTransform: function() {
      return rotationTransform(Math.atan2(I.yVelocity, I.xVelocity));
    }
  });
  return self;
}
