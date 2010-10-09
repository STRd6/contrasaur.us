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
    sprite: Sprite.load("images/levels/ground.png")
  });

  var self = GameObject(I).extend({
    bulletHitEffect: function(bullet) {
      if(!I.water) {
        Sound.play("bullet_hit_dirt", 1);

        var sprite;
        sprite = loadAnimation("images/effects/dirtEffect1_8x8.png", 8, 8, 8);

        var effect = Effect($.extend(bullet.position(), {
          duration: 8,
          sprite: sprite,
          velocity: Point()
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
        if(other.sink) {
          other.sink(self);
        }
      } else {
        if(other.land) {
          other.land(I.y);
        }
      }
    },
    y: I.y
  });

  return self;
}

Floor.LEVEL = 160;
