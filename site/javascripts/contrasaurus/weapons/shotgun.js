function Shotgun(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    power: 10,
    radius: 5,
    theta: 0,
    dino: I.dino,
    x: I.x || 0,
    y: I.y || 0
  });

  var self = Weapon(I).extend({

    shoot: function(position, transform) {

      if(rand(100) < I.power) {
        var target = currentLevel.nearestEnemy(position);
        var direction;

        if(target) {
          var targetMidpoint = target.midpoint();
          var targetDistance = distance(position, targetMidpoint);
          var targetVelocity = target.velocity();

          targetMidpoint.y += (targetDistance / 10) * targetVelocity.y;
          targetMidpoint.x += (targetDistance / 10) * targetVelocity.x;

          direction = Math.atan2(
            targetMidpoint.y - position.y,
            targetMidpoint.x - position.x
          );
        } else {
          direction = target ? Math.atan2(I.yVelocity, I.xVelocity) : 0;
        }

        (3 + rand(I.power)).times(function() {
          function fuzz() {
            return Math.random() * 20 - 10;
          }

          var x = position.x + fuzz();
          var y = position.y + fuzz() * 2;

          addGameObject(Bullet(direction, { x: x, y: y }));
        });
      }
    },

    update: $.noop
  });

  return self;
}