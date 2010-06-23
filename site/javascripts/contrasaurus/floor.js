function Floor(I) {
  I = I || {};
  var height = Floor.LEVEL; // Rule of thirds

  $.reverseMerge(I, {
    x: 0,
    y: CANVAS_HEIGHT - height,
    width: CANVAS_WIDTH,
    height: height,
    color: "#0F0",
    collideDamage: 0,
    collisionType: "platform",
    water: false,
    sprite: Sprite.load("images/levels/floor_background.png")
  });

  return GameObject(I).extend({
    bulletHitEffect: function(bullet) {
      if(!I.water) {
        var sprite;
        sprite = loadAnimation("images/effects/dirtEffect1_8x8.png", 8, 8, 8);
      
        var effect = Effect(Point(), $.extend(bullet.position(), {
          duration: 8,
          sprite: sprite
        }));

        addGameObject(effect);
      }
    },
    draw: function(canvas) {
      if (I.sprite) {
        I.sprite.draw(canvas, I.x, I.y);
      }
    },
    hit: function(other) {
      if(I.water) {
        var effect = Effect(Point(), $.extend(other.position(), {
          duration: 8,
          sprite: loadAnimation("images/effects/waterEffect_16x16.png", 12, 16, 16)
        }));

        addGameObject(effect);

        other.active(false);
      } else {
        if(other.land) {
          other.land(I.y);
        }
      }
    },
    y: I.y
  });
}

Floor.LEVEL = 160;
