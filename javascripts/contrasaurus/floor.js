function Floor() {
  var height = 100;

  var I = {
    x: 0,
    y: canvas.height() - height,
    width: canvas.width(),
    height: height,
    color: "#0F0",
    collideDamage: 0
  };

  return GameObject(I).extend({

    hit: function(other) {
      other.land(I.y);
    }
  });
}