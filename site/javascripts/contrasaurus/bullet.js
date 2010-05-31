function Bullet(theta, I) {
  var speed = 10;
  var yMax = canvas.height() - Floor.LEVEL;
  var xMax = canvas.width();

  $.reverseMerge(I, {
    collideDamage: 1,
    width: 4,
    height: 4,
    radius: 2,
    color: "#000",
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = GameObject(I).extend({
    draw: function(canvas) {
      if (I.sprite) {
        I.sprite.draw(canvas, I.x - I.radius, I.y - I.radius);
      } else {
        canvas.fillCircle(I.x, I.y, I.radius, I.color);
      }
    },
    after: {
      update: function() {
        // Check Bounds
        if (I.x < -I.radius || 
          I.x > xMax + I.radius || 
          I.y < -I.radius ||
          I.y > yMax + I.radius
        ) {
          I.active = false;
        }

        return I.active;
      }
    }
  });

  return self;
}