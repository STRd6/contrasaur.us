function Accessory(I) {
  I = I || {};

  $.reverseMerge(I, {
    attachment: "hand",
    direction: 0,
    rotation: 0
  });

  var self = GameObject(I).extend({
    attachment: function(model) {
      var attachmentPoint = model.attachment(I.attachment);

      self.position(attachmentPoint);
      I.direction = attachmentPoint.direction || 0;
    },

    getTransform: function() {
      return Matrix.rotation(I.rotation + I.direction).translate(I.x, I.y);
    }
  });

  return self;
}