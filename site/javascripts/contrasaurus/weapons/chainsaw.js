function Chainsaw(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    collideDamage: 7,
    effectCount: 3,
    exitPoints: [Point(60, 20), Point(90, 20)],
    radius: 5.5,
    sprite: loadImageTile("images/weapons/chainsaw.png"),
    theta: 0
  });

  var self = Weapon(I).extend({
    getTransform: function() {
      //TODO: Clean up this rotation business
      return Matrix.translation(57, 15).concat(Matrix.translation(-52, -15)).concat(Matrix.rotation(I.theta)).concat(Matrix.translation(52, 15));
    },

    generateBulletData: function(globalPosition, localPosition) {
      return {
        duration: 1,
        speed: 0,
        sprite: Tile.EMPTY,
        radius: 10,
        x: localPosition.x + globalPosition.x,
        y: localPosition.y + globalPosition.y
      };
    },

    after: {
      update: function() {
        I.theta = Math.sin(I.age / 4) * (Math.PI / 6);
      }
    }
  })
  return self;
}