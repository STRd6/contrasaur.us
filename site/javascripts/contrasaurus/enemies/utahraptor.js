function Utahraptor(I) {
  I = I || {};

  $.reverseMerge(I, {
    radius: 10,
    collideDamage: 0,
    health: 1,
    pointsWorth: 1000,
    radius: 20,
    shootLogic: $.noop,
    sprite: [
      loadImageTile("images/enemies/dinofodder1.png"),
      loadAnimation("images/enemies/dinofodder1_run.png", 8, 69, 34, 3),
      loadImageTile("images/enemies/dinofodder3.png")
    ].rand()
  });

  var self = Tank(I).extend({
    getTransform: function() {
      if(I.xVelocity < 0) {
        return HORIZONTAL_FLIP_MATRIX;
      } else {
        return IDENTITY_MATRIX;
      }
    }
  });

  return self;
}
