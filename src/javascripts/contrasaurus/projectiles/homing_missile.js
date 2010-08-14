function HomingMissile(I) {
  I = I || {};

  var direction = 0;

  $.reverseMerge(I, {
    collideDamage: 5,
    collisionType: "dinoBullet",
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

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: I.collisionType,
        duration: 10, 
        sprite: loadAnimation("images/effects/explosion_46x46.png", 5, 46, 46, 2)
      }));
    }
  }

  var self = Bullet(I).extend({
    hit: function() {
      explode();
    },
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
  return self;
}
