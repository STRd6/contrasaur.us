function Bomb(launchAngle, I) {
  I = I || {};

  $.reverseMerge(I, {
    color: "#000",
    width: 10,
    collideDamage: 1
  });

  var self = Bullet(launchAngle, I).extend({
    after: {
      hit: function() {
        I.active = false;
      },

      update: function() {
        I.yVelocity += 0.4;
      }
    }
  });
  return self;
}