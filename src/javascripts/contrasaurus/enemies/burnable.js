function Burnable(I) {

  return {
    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
        I.xVelocity = I.xVelocity * 2.5;
      }
    },
    flail: function() {
      if (Math.random() < 0.05) {
        I.xVelocity = I.xVelocity * -1;
      }
    }
  };
}
