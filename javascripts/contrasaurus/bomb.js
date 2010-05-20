function Bomb(launchAngle, I) {
  I = I || {};

  var bombTile = loadImageTile("images/bomb.png");

  $.reverseMerge(I, {
    color: "#000",
    width: 64,
    height: 23,
    collideDamage: 5
  });

  var self = Bullet(launchAngle, I).extend({
    draw: function(canvas) {
      bombTile.draw(canvas, I.x, I.y, {rotation: Math.atan2(I.yVelocity, I.xVelocity)});
    },

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