function Floor() {
  var height = Floor.LEVEL; // Rule of thirds

  var I = {
    x: 0,
    y: canvas.height() - height,
    width: canvas.width(),
    height: height,
    color: "#0F0",
    collideDamage: 0
  };

  return GameObject(I).extend({
    draw: $.noop,
    hit: function(other) {
      other.land(I.y);
    }
  });
}

Floor.LEVEL = 160;
