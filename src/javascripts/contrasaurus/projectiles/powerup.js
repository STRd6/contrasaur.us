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
    rotation: rand() * Math.PI
  });

  return GameObject(I).extend({
    getTransform: GameObject.rotationGetTransform(I),

    land: function(h) {
      I.yVelocity = -I.yVelocity/2;
      I.y += I.yVelocity;
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
