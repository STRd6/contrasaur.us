function Missile(theta, I) {
  var speed = 5;

  $.reverseMerge(I, {
    color: '#500',
    width: 35,
    height: 16,
    collideDamage: 20,
    sprite: loadImageTile("images/missile.png"),
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = Bullet(theta, I).extend({
    draw: function(canvas) {
      I.sprite.draw(canvas, I.x, I.y, {rotation: Math.atan2(I.yVelocity, I.xVelocity)});
    },
    after: {
      update: function() {
        I.xVelocity = I.xVelocity * 1.1;
        I.yVelocity = I.yVelocity * 1.1;
      }
    }
  });
  return self;
}