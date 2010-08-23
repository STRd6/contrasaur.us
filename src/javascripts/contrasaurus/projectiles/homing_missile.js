function HomingMissile(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 5,
    getDirection: function() {
      var direction;
      var target = currentLevel.nearestTarget(self.position(), I.collisionType);
      if(target) {
        var targetPosition = target.position();

        direction = Math.atan2(
          targetPosition.y - I.y,
          targetPosition.x - I.x
        );
      } else {
        direction = Math.atan2(I.yVelocity, I.xVelocity);
      }

      return direction;
    },
    radius: 5,
    speed: 5,
    sprite: Sprite.load("images/projectiles/homing_missile.png")
  });

  var self = Bullet(I).extend({
    after: {
      update: function() {
        var direction = I.getDirection();
        if(direction) {
          I.xVelocity = (I.xVelocity * 0.95) + Math.cos(direction);
          I.yVelocity = (I.yVelocity * 0.95) + Math.sin(direction);
        }
      }
    }
  });

  self.extend(Explodable(I));

  return self;
}
