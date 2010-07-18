function Brontosaurus(I) {
  I = I || {};

  $.reverseMerge(I, {
    y: CANVAS_HEIGHT - Floor.LEVEL,
    xVelocity: 0,
    health: 1000,
    hFlip: true,
    hitCircles: [{"x":84,"y":124,"radius":13},{"x":93,"y":59,"radius":20},{"x":97,"y":143,"radius":11},{"x":79,"y":90,"radius":21},{"x":6,"y":27,"radius":74},{"x":172,"y":-18,"radius":31},{"x":107,"y":159,"radius":10},{"x":209,"y":-64,"radius":28},{"x":123,"y":22,"radius":34}],
    pointsWorth: 50000,
    radius: 90,
    sprite: Sprite.load("images/enemies/brontosaurus.png"),
    shootLogic: $.noop,
    type: 'boss'
  });

  var self = Enemy(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    after: {
      draw: function(canvas) {
        if (GameObject.DEBUG_HIT) {
          self.drawHitCircles(canvas);
        }
      }
    }
  });

  return self;
}
