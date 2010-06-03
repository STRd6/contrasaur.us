function Shotgun(I) {
  I = I || {};

  var nearestEnemy;

  $.reverseMerge(I, {
    age: 0,
    power: 0,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

  var self = Weapon(I).extend({

    nearestEnemy: function(value) {
      nearestEnemy = value;
    },

    shoot: function(midpoint, transform) {

      if(rand(100) < I.power) {
        var target = nearestEnemy;
        var direction;

        if(target) {
          var targetMidpoint = target.midpoint();
          var targetDistance = distance(midpoint, targetMidpoint);
          var targetVelocity = target.velocity();

          targetMidpoint.y += (targetDistance / 10) * targetVelocity.y;
          targetMidpoint.x += (targetDistance / 10) * targetVelocity.x;

          direction = Math.atan2(
            targetMidpoint.y - midpoint.y,
            targetMidpoint.x - midpoint.x
          );
        } else {
          direction = target ? Math.atan2(I.yVelocity, I.xVelocity) : 0;
        }

        (3 + rand(I.power)).times(function() {
          function fuzz() {
            return Math.random() * 20 - 10;
          }

          var x = midpoint.x + fuzz();
          var y = midpoint.y + fuzz() * 2;

          shoot(Bullet(direction, { x: x, y: y }));
        });
      }
    },

    update: $.noop
  });

  return self;
}