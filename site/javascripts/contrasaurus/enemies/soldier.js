function Soldier(I) {
  I = I || {};

  var standSprite = loadImageTile("images/enemies/sandinista/stand.png");
  var runSprite = loadAnimation("images/enemies/sandinista/run.png", 8, 38, 52, 3);

  var exitPoint = Point(15, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  $.reverseMerge(I, {
    shootLogic: function() {
      var transform = self.getTransform();

      var p = transform.transformPoint(exitPoint);
      var d = transform.transformPoint(exitDirection);
      var theta = Math.atan2(d.y, d.x);

      if (Math.random() < 0.075) {
        self.shoot(theta, {
          x: self.position().x + p.x,
          y: self.position().y + p.y,
          sprite: loadImageTile("images/effects/enemybullet1_small.png")
        });
      }

//      var throwDirection = - Math.PI / 4
//      // throw grenades
//      if (rand() < 0.05) {
//        if (Math.cos(I.theta) < 0) {
//          throwDirection = - (3/4) * Math.PI;
//        }
//        var grenade = Grenade(throwDirection, self.position().add(Point(0, -20)));
//        addGameObject(grenade);
//      }
    },
    sprite: runSprite,
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({

  });

  return self;
}
