function PowerupContainer(theta, I) {
  I = I || {};

  var initialYVelocity = 5;

  var startingX;
  var startingXVelocity;
  if (Math.random() < 0.5) {
    startingX = 20;
    startingXVelocity = 5;
  } else {
    startingX = 620;
    startingXVelocity = -5;
  }

  $.reverseMerge(I, {
    x: startingX,
    y: 60,
    width: 25,
    height: 15,
    xVelocity: startingXVelocity,
    yVelocity: 5,
    health: 7,
    color: "#808",
    pointsWorth: 100
  });

  var self = GameObject(I).extend({
    health: 7,

    land: function(h) {
      I.y = h - I.height;
      I.yVelocity = 0;
    },

    after: {
      hit: function() {
        I.active = false;
      },
      update: function() {
        I.yVelocity = initialYVelocity * Math.sin(theta);
        theta = theta + (Math.PI / 24 );
      }
    }
  });

  return self;
}