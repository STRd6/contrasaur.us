function Bazooka(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    power: 10,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

console.log(I.dino);

  var self = Weapon(I).extend({

    shoot: function(midpoint, transform) {

      if (rand(100) < I.power) {
        addGameObject([
          //Missile(I.theta, { x: midpoint.x, y: midpoint.y }),
          HomingMissile(I.dino)
        ].rand());
      }
    },

    update: function() {
      I.theta += Math.PI / 48;
    }
  });
  return self;
}