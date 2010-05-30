function Floor() {
  var height = Floor.LEVEL; // Rule of thirds

  var I = {
    x: 0,
    y: canvas.height() - height,
    width: canvas.width(),
    height: height,
    color: "#0F0",
    collideDamage: 0,
    sprite: loadImageTile("images/floor_background.png")
  };

  return GameObject(I).extend({
    hit: function(other) {
      other.land(I.y);
    }
  });
}

Floor.LEVEL = 160;
