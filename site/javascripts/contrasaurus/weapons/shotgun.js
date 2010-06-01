function Shotgun() {
  // TODO: fix the shotgun so that it
  // doesn't freak out when there are
  // no enemies on the screen
  var power = 0;

  var self = {
    power: function(value) {
      if (value === undefined) {
        return power;
      } else {
        power += value;
        return self;
      }
    },

    shoot: function(nearestEnemy, midpoint, transform) {

      if(rand(100) < power) {
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
          direction = Math.atan2(I.yVelocity, I.xVelocity);
        }

        (3 + rand(power)).times(function() {
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
  }
  return self;
}