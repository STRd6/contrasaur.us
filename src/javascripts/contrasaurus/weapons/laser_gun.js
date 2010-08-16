function LaserGun(I) {
  I = I || {};

  var monocle = Animation.load("images/weapons/laser_eye.png", 4, 28, 26, 4);
  var targetPosition = 0;
  var lastFrame = 0;

  $.reverseMerge(I, {
    ammo: 256,
    attachment: "eye",
    cooldown: 12,
    exitPoints: [Point(5, 2)],
    power: 0,
    radius: 5,
    sprite: monocle
  });

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position) {
      return Bullet({
        speed: 13,
        collideDamage: 3,
        health: 5000,
        hitCircles: [{"x": -15, "y": 0, "radius": 3}, {"x": 0, "y": 0, "radius": 3}, {"x": 15, "y": 0, "radius": 3}],
        sprite: Sprite.load("images/projectiles/laser.png"),
        theta: Point.direction(position, targetPosition),
        x: position.x,
        y: position.y
      });
    },

    after: {
      update: function(dino, levelPosition) {
        targetPosition = target.add(levelPosition);

        if(monocle.frame() == 3 && lastFrame != 3) {
          I.power = 100;
        } else {
          I.power = 0;
        }

        lastFrame = monocle.frame();
      }
    }
  });

  return self;
}
