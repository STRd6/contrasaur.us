function MachineGun(I) {
  I = I || {};

  var jitter = Math.PI / 12;
  var dinoTransform = Matrix.IDENTITY;

  $.reverseMerge(I, {
    ammo: 1024,
    exitPoints: [Point(50, 1)],
    name: "machineGun",
    throwable: {
      shoot: function(I) {
        if(I.ammo > 0) {
          addGameObject(Bullet({ theta: I.rotation, x: I.x, y: I.y }));
          I.ammo--;
        }
      }
    }
  });

  // Adjust machine gun angle
  function updateGunAngle(dino, levelPosition) {
    var position = dino.position();
    var displacement = 0;

    if(shooting) {
      if(I.ammo > 0) {
        displacement = rand() * jitter - jitter / 2;
      } else {
        Sound.play("no_ammo");
      }
    }

    I.rotation = Point.direction(position, target.add(levelPosition)) + displacement;
  }

  var self = Weapon(I).extend({
    generateProjectile: function(direction, position, centerDirection) {
      Sound.play(I.name);

      return Bullet({
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
