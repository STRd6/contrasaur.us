function Powerup(I) {
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
        I.xVelocity = Math.sin(I.age/10);
      }
    },
    after: {
      draw: function(canvas) {
        canvas.fillColor("#FFF");
        canvas.fillText(I.symbol, I.x + I.width/2 - 2, I.y + 12);
      },
      hit: function(other) {
        if(other.powerup) {
          other.powerup([
            {health: 10},
            {weapon: {shotgun: 2}},
            {weapon: {bombs: 1}},
            {weapon: {bazooka: 1}}
          ].rand());
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