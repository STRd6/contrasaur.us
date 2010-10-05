function FloatingCrate(I) {
  I = I || {};

  $.reverseMerge(I, {
    health: 25,
    theta: Math.PI / 4
  });

  var self = Crate(I).extend({
    before: {
      update: function() {
        I.y += Math.sin(I.age / 7);
      }
    },

    getTransform: function() {
      var transform;

      transform = Matrix.rotation(I.theta).concat(Matrix.IDENTITY);

      return transform.translate(I.x, I.y);
    },

    sink: $.noop
  });

  return self;
}
