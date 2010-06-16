function Powerup(I) {
  $.reverseMerge(I, {
    callback: $.noop,
    color: "#F0F",
    radius: 20,
    width: 15,
    height: 15,
    pointsWorth: 1000,
    collisionType: "enemyBullet",
    rotationVelocity: Math.PI / 24,
    rotation: 0
  });

  return GameObject(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.rotation);
    },

    before: {
      update: function() {
        I.yVelocity += GRAVITY;
        I.rotation += I.rotationVelocity;
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
