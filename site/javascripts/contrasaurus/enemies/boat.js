function Boat(I) {
  I = I || {};

  var boatModel = Model(
    Sprite.load("images/levels/parasail/parasailboat.png"),
    [
      [
        {"x": 92,"y": 17,"radius": 19},
        {"x": 115,"y": 5,"radius": 7},
        {"x": 50,"y": 24,"radius": 24},
        {"x": 5,"y": 28,"radius": 21},
        {"x": -34,"y": 32,"radius": 18},
        {"x": -68,"y": 34,"radius": 16},
        {"x": -99,"y": 35,"radius": 15},
        {"x": -120,"y": 28,"radius": 8},
        {"x": -120,"y": 41,"radius": 6},
        {"x": -61,"y": 3,"radius": 10}
      ]
    ]
  );

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "dino",
    health: 10000,
    hitCircles: boatModel.hitFrames,
    sprite: boatModel.animation
  });

  var jumping = false;
  var jumpImpulse = -10;

  var self = GameObject(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    getTransform: function() {
      var t;
      if(jumping) {
        t =  Matrix.rotation((Math.PI / 6) * I.yVelocity / -jumpImpulse);
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    },
    
    sink: $.noop,

    before: {
      update: function(position) {
        // Oscillate
        I.x = position.x + boatTarget.x + 20 * Math.sin(I.age/20);

        if(jumping) {
          I.yVelocity += GRAVITY / 2;

          if(I.y >= boatTarget.y) {
            I.y = boatTarget.y;
            I.yVelocity = 0;
            jumping = false;
          }
        } else {
          if(rand(100) == 0) {
            jumping = true;

            I.yVelocity = jumpImpulse;
          }
        }
        I.hitCircles = boatModel.hitFrame();
      }
    }
  });

  var boatTarget = Point(I.x, I.y);

  return self;
}
