function Soldier(I) {
  I = I || {};

  var runLegs = loadAnimation("images/enemies/sandinista/run_legs.png", 8, 31, 25, 3);
  var runTorso = loadAnimation("images/enemies/sandinista/run_torso.png", 8, 33, 34, 3);
  var shootTorso = loadAnimation("images/enemies/sandinista/shoot_full.png", 6, 44, 34, 3);

  var exitPoint = Point(15, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  var legs = runLegs;
  var torso = shootTorso;

  var composite = {
    width: 38,
    height: 52,
    update: function() {
      torso.update();
      legs.update();
    },
    draw: function(canvas, x, y, options) {
      torso.draw(canvas, x + 4, y - 2, options);
      legs.draw(canvas, x, y + 25, options);
    }
  };

  $.reverseMerge(I, {
    shootLogic: function() {
      if (Math.random() < 0.075) {
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);
        var d = transform.transformPoint(exitDirection);
        var theta = Math.atan2(d.y, d.x);

        self.shoot(theta, {
          x: self.position().x + p.x,
          y: self.position().y + p.y,
          sprite: loadImageTile("images/effects/enemybullet1_small.png")
        });
      }
    },
    sprite: composite,
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({ });

  return self;
}
