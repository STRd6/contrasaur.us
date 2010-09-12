function Biteable(I) {
  I = I || {};

  $.reverseMerge(I, {
    bitInHalf: false
  });

  return {
    bite: function() {
      I.bitInHalf = true;
      Sound.play("chomp");
    },
  };
}
