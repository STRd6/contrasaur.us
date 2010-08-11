function MachineGun(I) {
  I = I || {};

  var jitter = Math.PI / 12;
  var dinoTransform = Matrix.IDENTITY;
  var bullets = 1024;

  $.reverseMerge(I, {
    duration: -1,
    exitPoints: [Point(50, 1)],
    name: "machineGun",
    throwable: {
      shoot: function(I) {
        if(bullets > 0) {
          addGameObject(Bullet({ theta: I.rotation, x: I.x, y: I.y }));
          bullets--;
        }
      }
    }
  });

  // Adjust machine gun angle
  function updateGunAngle(dino, levelPosition) {
    var position = dino.position();
    var displacement = 0;

    if(bullets > 0) {
      displacement = rand() * jitter - jitter / 2;
    }

    I.rotation = Point.direction(position, target.add(levelPosition)) + displacement;
  }

  var self = Weapon(I).extend({
    getTransform: function() {
      var position = dinoTransform.transformPoint(self.position());

      return dinoTransform.inverse().concat(Matrix.rotation(I.rotation).translate(position.x, position.y));
    },

    before: {
      update: function(dino, levelPosition) {
        dinoTransform = dino.getTransform();

        updateGunAngle(dino, levelPosition);

        if(bullets == 0) {
          I.power = 0;
        }

        bullets--;
      }
    }
  });
  return self;
}
