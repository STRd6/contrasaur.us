function HomingMissile(I) {
  I = I || {};

  var speed = 2;
  var direction = 0;

  $.reverseMerge(I, {
    color: '#500',
    width: 35,
    height: 16,
    radius: 8,
    collideDamage: 5,
    sprite: loadImageTile("images/projectiles/homing_missile.png"),
    xVelocity: Math.cos(direction)*speed,
    yVelocity: Math.sin(direction)*speed
  });

//  var target = currentLevel.nearestEnemy(I.dino.position());
//  var midpoint = I.dino.midpoint();
//
//  function getDirection() {
//    target = currentLevel.nearestEnemy(I.dino.position());
//    midpoint = I.dino.midpoint();
//
//    if(target) {
//      var targetMidpoint = target.midpoint();
//      var targetDistance = distance(midpoint, targetMidpoint);
//      var targetVelocity = target.velocity();
//
//      targetMidpoint.y += (targetDistance / 10) * targetVelocity.y;
//      targetMidpoint.x += (targetDistance / 10) * targetVelocity.x;
//
//      direction = Math.atan2(
//        targetMidpoint.y - midpoint.y,
//        targetMidpoint.x - midpoint.x
//      );
//    } else {
//      direction = target ? Math.atan2(I.yVelocity, I.xVelocity) : 0;
//    }
//
//    return direction;
//  }

  var self = Bullet(direction, I).extend({
    getTransform: function() {
      return rotationTransform(Math.atan2(I.yVelocity, I.xVelocity));
    },
    after: {
      update: function() {
//        getDirection();
      }
    }
  });
  return self;
}
