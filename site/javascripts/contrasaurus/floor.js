function Floor() {
  var height = Floor.LEVEL; // Rule of thirds

  var I = {
    x: 0,
    y: CANVAS_HEIGHT - height,
    width: CANVAS_WIDTH,
    height: height,
    color: "#0F0",
    collideDamage: 0,
    collisionType: "platform",
    sprite: loadImageTile("images/floor_background.png")
  };

  return GameObject(I).extend({
    bulletHitEffect: function(bullet) {
      var effect = Effect(Point(), 8, $.extend(bullet.position(), {
        sprite: loadAnimation("images/effects/dirtEffect1_8x8.png", 8, 8, 8)
      }));

      addGameObject(effect);
    },
    draw: function(canvas) {
      I.sprite.draw(canvas, I.x, I.y);
    },
    hit: function(other) {
      if(other.land) {
        other.land(I.y);
      }
    },
    y: I.y
  });
}

Floor.LEVEL = 160;
