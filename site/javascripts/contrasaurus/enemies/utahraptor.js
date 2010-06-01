function Utahraptor(I) {
  I = I || {};
  
  var xVelocity;

  if (Math.random() < 0.5) {
    xVelocity = 3;
  } else {
    xVelocity = -3;
  }

  $.reverseMerge(I, {
    radius: 10,
    collideDamage: 0,
    health: 1,
    shootLogic: $.noop,
    sprite: loadImageTile("images/enemies/utahraptor.png"),
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
