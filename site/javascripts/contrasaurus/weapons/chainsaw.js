function Chainsaw(I) {
  I = I || {};

  var thrown = false;

  $.reverseMerge(I, {
    duration: 1000,
    exitPoints: [Point(5, 10), Point(25, 10), Point(45, 10)],
    offset: Point(50, -5),
    radius: 5,
    rotation: 0,
    rotationPoint: Point(-52, -12),
    sprite: Sprite.load("images/weapons/chainsaw.png")
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      var p = self.position().add(I.offset);
      return Matrix.rotation(I.rotation + I.direction, I.rotationPoint).translate(p.x, p.y);
    },

    generateProjectile: function(direction, position) {
      if (thrown) {
        I.active = false;
        thrown = false;
        var xVelocity = dino.xVelocity();
        dino.xVelocity(Math.abs(xVelocity));
        return ThrownItem({
          collideDamage: 200,
          explodeDamage: 200,
          weaponName: "chainsaw",
          xVelocity: 8,
          yVelocity: -20,
          x: dino.position().x,
          y: dino.position().y
        });
      } else {
        return Bullet({
          dispersion: 30,
          duration: 1,
          effectCount: 13,
          speed: 0,
          sprite: Sprite.EMPTY,
          radius: 10,
          theta: direction,
          x: position.x,
          y: position.y
        });
      }
    },

    after: {
      update: function() {
        if (Math.random() < 0.001) {
          thrown = true;
        }

        I.rotation = Math.sin(I.age / 4) * (Math.PI / 6) + (Math.PI / 12);
      }
    }
  });

  return self;
}
