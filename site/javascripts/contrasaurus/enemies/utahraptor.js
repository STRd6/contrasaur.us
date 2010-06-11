function Utahraptor(I) {
  I = I || {};
  
  var xVelocity;

  if (Math.random() < 0.5) {
    xVelocity = 2;
  } else {
    xVelocity = -2;
  }

  $.reverseMerge(I, {
    radius: 10,
    collideDamage: 0,
    health: 1,
    pointsWorth: 1000,
    shootLogic: $.noop,
    sprite: [
      loadImageTile("images/enemies/dinofodder1.png"),
      loadAnimation("images/enemies/dinofodder1_run.png", 8, 69, 34, 3),
      loadImageTile("images/enemies/dinofodder3.png")
    ].rand(),
    xVelocity: xVelocity
  });

  return Tank(I).extend({
    getTransform: function() {
      if(I.xVelocity < 0) {
        return HORIZONTAL_FLIP_MATRIX;
      } else {
        return IDENTITY_MATRIX;
      }
    }
  });
}
