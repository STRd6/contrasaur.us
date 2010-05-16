function Missile(theta, I) {
  var speed = 5;

  $.reverseMerge(I, {
    color: '#500',
    width: 10,
    height: 5,
    collideDamage: 20,
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = Bullet(theta, I).extend({
    draw: function(canvas) {
      canvas.fillColor(I.color);
      var midpoint = self.midpoint();
      canvas.fillColor(I.color);
      canvas.fillRect(midpoint.x, midpoint.y, I.width, I.height);
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