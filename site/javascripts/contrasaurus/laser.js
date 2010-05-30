function Laser(theta, I) {
  var speed = 7;

  $.reverseMerge(I, {
    color: '#500',
    width: 32,
    height: 4,
    collideDamage: 3,
    sprite: loadImageTile("images/laser.png"),
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = Bullet(theta, I).extend({
    hit: function(other) { },
    draw: function(canvas) {
      I.sprite.draw(canvas, I.x, I.y, {rotation: Math.atan2(I.yVelocity, I.xVelocity)});
    }
  });
  return self;
}