function Biteable(I) {

  return {
    bite: function() {
      I.bitInHalf = true;
      Sound.play("chomp");
    },
  };
}
