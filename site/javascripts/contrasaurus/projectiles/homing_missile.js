function HomingMissile(I) {
  I = I || {};

  var direction = 0;

  $.reverseMerge(I, {
    color: '#500',
    width: 24,
    height: 19,
    radius: 4.5,
    collideDamage: 5,
    speed: 5,
    sprite: loadImageTile("images/projectiles/homing_missile.png")
  });

  function getDirection() {
    var direction;
    var target = currentLevel.nearestEnemy(self.position());
    if(target) {
      var targetPosition = target.position();

      direction = Math.atan2(
        targetPosition.y - I.y,
        targetPosition.x - I.x
      );
    } else {
      direction = Math.atan2(I.yVelocity, I.xVelocity);
    }

    if(isNaN(direction)) {
      debugger;
    }

    return direction;
  }

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: "dinoBullet",
        duration: 10, 
        sprite: loadAnimation("images/effects/explosion_46x46.png", 5, 46, 46, 2)
      }));
    }
  }

  var self = Bullet(direction, I).extend({
    getTransform: function() {
      return rotationTransform(Math.atan2(I.yVelocity, I.xVelocity));
    },
    hit: function() {
      explode();
    },
    after: {
      update: function() {
        var direction = getDirection();
        if(direction) {
          I.xVelocity = (I.xVelocity * 0.95) + Math.cos(direction);
          I.yVelocity = (I.yVelocity * 0.95) + Math.sin(direction);
        }
      }
    }
  });
  return self;
}