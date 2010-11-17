function MachineGun(I) {
  I = I || {};

  var jitter = Math.PI / 12;
  var dinoTransform = Matrix.IDENTITY;

  $.reverseMerge(I, {
    ammo: Infinity,
    cooldown: 3,
    exitPoints: [Point(50, 1)],
    name: "machineGun"
  });

  // Adjust machine gun angle
  function updateGunAngle(dino, levelPosition) {
    var t = dino.getTransform().concat(self.getTransform());
    var position = t.transformPoint(Point(0, 0));
    var displacement = 0;

    if(shooting) {
      displacement = rand() * jitter - jitter / 2;
    }

    I.rotation = Point.direction(position, target.add(levelPosition)) + displacement;
  }

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position, centerDirection) {
      Sound.play(I.name, 1);

      return Bullet({
        collideDamage: 4,
        theta: centerDirection,
        x: position.x,
        y: position.y
      });
    },

    getTransform: function() {
      var position = dinoTransform.transformPoint(self.position());

      return dinoTransform.inverse().concat(Matrix.rotation(I.rotation).translate(position.x, position.y));
    },

    before: {
      update: function(dino, levelPosition) {
        dinoTransform = dino.getTransform();

        updateGunAngle(dino, levelPosition);
      }
    }
  });
  return self;
}
