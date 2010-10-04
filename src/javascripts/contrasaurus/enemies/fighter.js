function Fighter(I) {
  I = I || {};

  var cooldown = 0;

  $.reverseMerge(I, {
    shootLogic: function() {
      if (cooldown > 0) {
        cooldown--;
      } else {
        cooldown += 3;

        var shootPoint = I.model.attachment("shot");

        if(shootPoint) {
          var t = self.getTransform();
          var direction = shootPoint.direction;

          var p = t.transformPoint(shootPoint);

          var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
          var theta = Point.direction(Point(0,0), tmpPoint);

          addGameObject(Bullet({
            collisionType: "enemyBullet",
            sprite: Sprite.load("images/projectiles/plane_bullet.png"),
            theta: theta,
            x: p.x,
            y: p.y
          }));
        }
      }
    },
    type: 'fighter'
  });

  var self = Bomber(I).extend({

  });

  return self;
}
