function Shotgun(I) {
  I = I || {};

  var gunTile = Sprite.load("images/weapons/shotgun.png");

  $.reverseMerge(I, {
    exitPoints: [Point(25, 4)],
    power: 10,
    radius: 5,
    sprite: gunTile
  });

  var target, direction;
  var dinoTransform = Matrix.IDENTITY;
  var dinoPosition = Point(0, 0);

  var self = Weapon(I).extend({

    generateProjectile: function(unused, position) {
      return Bullet({ theta: direction, x: position.x, y: position.y });
    },

    getTransform: function() {
      return dinoTransform.inverse().concat(Matrix.rotation(direction).translate(dinoPosition.x, dinoPosition.y));
    },

    before: {
      update: function (dino) {
        dinoPosition = dino.position();
        dinoTransform = dino.getTransform();

        if(target && target.active()) {
          var targetMidpoint = target.midpoint();
          var targetDistance = Point.distance(dinoPosition, targetMidpoint);
          var targetVelocity = target.velocity();

          targetMidpoint.y += (targetDistance / 10) * targetVelocity.y;
          targetMidpoint.x += (targetDistance / 10) * targetVelocity.x;

          var directionTowardsTarget = Math.atan2(
            targetMidpoint.y - dinoPosition.y,
            targetMidpoint.x - dinoPosition.x
          );

          // TODO: Apply the inverse transform of the dino's matrix so that the
          // gun points in the correct direction when the dino is spinning/flipped.
          direction = directionTowardsTarget;
        } else {
          target = currentLevel.nearestEnemy(dinoPosition);
        }
      }
    }

  });

  return self;
}