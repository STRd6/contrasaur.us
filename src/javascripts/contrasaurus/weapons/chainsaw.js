function Chainsaw(I) {
  I = I || {};

  $.reverseMerge(I, {
    ammo: 2100,
    autofire: true,
    duration: 1000,
    exitPoints: [Point(5, 10), Point(25, 10), Point(45, 10)],
    name: "chainsaw",
    offset: Point(50, -5),
    radius: 5,
    rotation: 0,
    rotationPoint: Point(-52, -12),
    throwable: {
      explodeDamage: 200
    }
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      var p = self.position().add(I.offset);
      return Matrix.rotation(I.rotation + I.direction, I.rotationPoint).translate(p.x, p.y);
    },

    generateProjectile: function(direction, position) {
      return Bullet({
        collideDamage: 3,
        dispersion: 30,
        duration: 1,
        effectCount: 7,
        speed: 0,
        sprite: Sprite.EMPTY,
        radius: 10,
        theta: direction,
        x: position.x,
        y: position.y
      }).extend({
        before: {
          hit: function(other) {
            if(other.bite) {
              other.bite();
            }
          }
        }
      });
    },

    before: {
      update: function() {
        if(I.ammo <= 0) {
          self.toss();
        }

        I.rotation = Math.sin(I.age / 4) * (Math.PI / 6) + (Math.PI / 12);
      }
    }
  });

  return self;
}
