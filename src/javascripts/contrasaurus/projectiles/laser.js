function Laser(I) {
  I = I || {};

  $.reverseMerge(I, {
    speed: 15,
    theta: 0
  });

  $.reverseMerge(I, {
    amplitude: 10,
    collideDamage: 3,
    health: Infinity,
    hitCircles: [{"x": -15, "y": 0, "radius": 3}, {"x": 0, "y": 0, "radius": 3}, {"x": 15, "y": 0, "radius": 3}],
    radius: 2,
    sprite: Sprite.load("images/projectiles/laser.png")
  });

  var self = Bullet(I).extend({
    before: {
      update: function() {
        var point = Point(0, I.amplitude*Math.sin(I.age));
        self.position(self.getTransform().transformPoint(point));
      }
    }
  });

  return self;
}
