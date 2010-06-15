function Powerup(I) {
  $.reverseMerge(I, {
    callback: $.noop,
    color: "#F0F",
    radius: 10,
    width: 15,
    height: 15,
    pointsWorth: 1000,
    collisionType: "enemyBullet"
  });

  return GameObject(I).extend({
    before: {
      update: function() {
        I.yVelocity += GRAVITY / 4;
      }
    },

    after: {
      hit: function(other) {
        I.callback(other);
      },

      update: GameObject.generateCheckBounds(I)
    }
  });
}
