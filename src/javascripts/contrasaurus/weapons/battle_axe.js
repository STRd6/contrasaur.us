function BattleAxe(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 600,
    autofire: true,
    exitPoints: [Point(10, -30)],
    name: "battleAxe",
    radius: 5,
    theta: 0,
    throwable: {}
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta, Point(60, 0)).concat(Matrix.translation(70, -50));
    },

    generateProjectile: function(direction, position) {
      return Bullet({
        duration: 1,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 20,
        theta: direction,
        x: position.x,
        y: position.y
      });
    },

    before: {
      update: function() {
        if(I.ammo <= 0) {
          self.toss();
        }

        I.theta = Math.sin(I.age / 4) * (Math.PI / 2) + Math.PI / 4;
      }
    }
  });

  return self;
}
