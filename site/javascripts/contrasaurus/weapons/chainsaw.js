function Chainsaw(I) {
  I = I || {};

  $.reverseMerge(I, {
    duration: 1000,
    exitPoints: [Point(5, 10), Point(25, 10), Point(45, 10)],
    radius: 5,
    sprite: loadImageTile("images/weapons/chainsaw.png"),
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      return Matrix.rotation(I.theta, Point(-52, -12)).translate(57, 15);
    },

    generateProjectile: function(direction, position) {
      return Bullet(direction, {
        duration: 1,
        speed: 0,
        sprite: Tile.EMPTY,
        radius: 10,
        x: position.x,
        y: position.y
      });
    },

    after: {
      update: function() {
        I.theta = Math.sin(I.age / 4) * (Math.PI / 6);
      }
    }
  })
  return self;
}