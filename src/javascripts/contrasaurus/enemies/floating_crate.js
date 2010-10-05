function FloatingCrate(I) {
  I = I || {};

  var normalSprite = Sprite.load("images/enemies/crate/normal.png");
  var damagedSprite = Sprite.load("images/enemies/crate/damaged.png");

  $.reverseMerge(I, {
    health: 25,
    theta: Math.PI / 4
  });

  var healthMax = I.health;

  var self = Crate(I).extend({
    before: {
      update: function() {
        I.y += Math.sin(I.age / 7);
      }
    },

    getTransform: function() {
      debugger;
      var transform;

      transform = Matrix.rotation(I.theta).concat(Matrix.IDENTITY);

      return transform.translate(I.x, I.y);
    },

    sink: $.noop
  });

  self.extend(Shakeable(I));

  self.bind("destroy", function() {
    if(I.weaponClass) {
      dino.addWeapon(I.weaponClass());
    }
  });

  return self;
}
