function MachineGun(I) {
  I = I || {};

  var gunWidth = 0;
  var gunTile = loadImageTile("images/machine_gun.png", function(tile) {
    gunWidth = tile.width;
  });
  var gunDelta = {x: 25, y: 4};
  var power = 0;

  $.reverseMerge(I, {
    age: 0,
    power: 0,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

  var self = Weapon(I).extend({
    shoot: function(theta, berserk, midpoint, transform) {
      if (I.power > 0) {
        var berserkTheta = theta - Math.PI / 24;

        shoot(Bullet(theta, {
          x: midpoint.x + gunDelta.x + Math.cos(theta) * gunWidth/2,
          y: midpoint.y + gunDelta.y + Math.sin(theta) * gunWidth/2
        }));

        if (berserk) {
          shoot(Bullet(berserkTheta, {
            x: midpoint.x + gunDelta.x + Math.cos(berserkTheta) * gunWidth/2,
            y: midpoint.y + gunDelta.y + Math.sin(berserkTheta) * gunWidth/2
          }));
        }
      }
    },

    update: $.noop
  });
  return self;
}

