function Shakeable(I) {
  I = I || {};

  $.reverseMerge(I, {
    maxShakeAmplitude: 100,
    shakeAmplitude: 0
  });

  return {
    before: {
      update: function() {
        if(I.shakeAmplitude > 0.1) {
          I.shakeAmplitude = I.shakeAmplitude * 0.7;
          I.x += Math.min(I.maxShakeAmplitude, I.shakeAmplitude) * Math.sin(I.age);
        } else {
          I.shakeAmplitude = 0;
        }
      }
    },

    after: {
      hit: function(other) {
        I.shakeAmplitude += other.collideDamage();
      }
    }
  };
}
