function Chopable(I) {
  I = I || {};

  $.reverseMerge(I, {
    bitInHalf: false
  });

  return {
    chop: function() {
      I.bitInHalf = true;
    },
  };
}
