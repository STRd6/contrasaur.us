function Floor() {
  var height = Floor.LEVEL; // Rule of thirds

  var I = {
    x: 0,
    y: CANVAS_HEIGHT - height,
    width: CANVAS_WIDTH,
    height: height,
    color: "#0F0",
    collideDamage: 0,
    sprite: loadImageTile("images/floor_background.png")
  };

  return GameObject(I).extend({
    draw: function(canvas) {
      I.sprite.draw(canvas, I.x, I.y);
    },
    hit: function(other) {
      other.land(I.y);
    },
    y: I.y
  });
}

Floor.LEVEL = 160;
