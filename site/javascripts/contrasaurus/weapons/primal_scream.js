function PrimalScream() {
  var power = 0;
  var theta = 0;

  var self = {
    power: function(value) {
      if (value === undefined) {
        return power;
      } else {
        power += value;
        return self;
      }
    },

    shoot: function(midpoint, transform) {

      if (rand(100) < power) {
        (24).times(function(i) {
          var theta = (i / 12) * Math.PI;
          shoot(Bullet(theta, {
            x: midpoint.x,
            y: midpoint.y
          }));
        }
      )}
    },

    update: $.noop
  }
  return self;
}


//    if (I.weapons.bombs && rand(100) < I.weapons.bombs) {
//      // Bomb Blast
//      (24).times(function(i) {
//        var theta = (i / 12) * Math.PI;
//        shoot(Bullet(theta, {
//          x: self.midpoint().x,
//          y: self.midpoint().y
//        }));
//      }
//    )};