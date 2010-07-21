function Boat(I) {
  I = I || {};

  $.reverseMerge(I, {
    collisionType: "dino",
    health: 10000,
    sprite: Sprite.load("images/levels/parasail/speed-boat.png")
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
      }
    }
  });

  var boatTarget = Point(I.x, I.y);

  return self;
}
