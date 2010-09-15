function Shakeable(I) {
  I = I || {};

  $.reverseMerge(I, {
    maxShakeAmplitude: 100
  });

  var shakeAmplitude = 0;

  return {
    before: {
      update: function() {
        if(shakeAmplitude > 0.1) {
          shakeAmplitude = shakeAmplitude * 0.7;
          I.x += Math.min(I.maxShakeAmplitude, shakeAmplitude) * Math.sin(I.age);
        } else {
          shakeAmplitude = 0;
        }
      }
    },

    after: {
      hit: function(other) {
        shakeAmplitude += other.collideDamage();
      }
    }
  };
}
