function Powerup(kind, I) {
  if(kind == "meat") {
    I.sprite = loadImageTile("images/meat.png", function(tile) {
      I.width = tile.width;
      I.height = tile.height;
    });
  } else if (kind == "bomb") {
    I.sprite = loadImageTile("images/powerup_bomb.png", function(tile) {
      I.width = tile.width;
      I.height = tile.height;
    });
  } else {
    // Mystery
  }

  $.reverseMerge(I, {
    color: "#F0F",
    symbol: "?",
    width: 15,
    height: 15,
    pointsWorth: 1000
  });

  return GameObject(I).extend({

    before: {
      update: function() {
        if(kind == "mystery") {
          I.xVelocity = Math.sin(I.age/10);
        } else if(kind == "meat") {
          I.yVelocity += GRAVITY;
        } else if (kind == "bomb") {
          I.xVelocity = Math.sin(I.age/10);
        }
      }
    },

    after: {
      draw: function(canvas) {
        if(kind == "mystery") {
          canvas.fillColor("#FFF");
          canvas.fillText(I.symbol, I.x + I.width/2 - 2, I.y + 12);
        }
      },

      hit: function(other) {
        if(other.powerup) {
          if(kind == "mystery") {
            other.powerup([
              {health: 10},
              {weapon: {shotgun: 2}},
              {weapon: {bombs: 1}},
              {weapon: {bazooka: 1}}
            ].rand());
          } else if(kind == "meat") {
            other.powerup({health: 50});
          } else if(kind == "bomb") {
            other.powerup({weapon: {bombs: 1}})
          }

          else {
            console.error("Unknown powerup: " + kind);
          }
        }
      },

      update: function() {
        // Check Bounds
        if (I.x >= 0 && I.x < canvas.width() &&
          I.y >= 0 && I.y < 380) {
          I.active = I.active && true;
        } else {
          I.active = false;
        }
      }
    }
  });
}
