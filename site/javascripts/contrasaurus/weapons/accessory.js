function Accessory(I) {
  I = I || {};

  $.reverseMerge(I, {
    attachment: "hand"
  });

  var self = GameObject(I).extend({
    attachment: function() {
      return I.attachment;
    }
  });

  return self;
}