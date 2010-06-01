function MachineGun() {
  var gunWidth = 0;
  var gunTile = loadImageTile("images/machine_gun.png", function(tile) {
    gunWidth = tile.width;
  });
  var gunDelta = {x: 25, y: 4};

  var self = {
    power: function(value) {
      if (value === undefined) {
        return power;
      } else {
        power += value;
        return self;
      }
    },

    shoot: function(theta, berserk, midpoint, transform) {
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
    },

    update: $.noop
  }
  return self;
}


