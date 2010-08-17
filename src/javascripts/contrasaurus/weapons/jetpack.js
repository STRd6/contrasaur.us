function Jetpack(I) {

  I = I || {};

  var fireSprite = Animation.load("images/weapons/jetpack_fire.png", 4, 91, 89, 2);
  var jetpackSprite = Sprite.load("images/weapons/jetpack.png");

  $.reverseMerge(I, {
    attachment: "back",
    duration: -1,
    engaged: false,
    eventCallbacks: {
      engage: function() {
        if(!I.engaged ) {
          I.engaged = true;
          I.yImpulse = -1;
          dino.airborne(true);
        }
      },
      disengage: function() {
        if(I.engaged) {
          I.engaged = false;
          I.yImpulse = 0;
        }
      }
    },
    sprite: jetpackSprite,
    xImpulse: 0,
    yImpulse: 0
  });

  var self = Weapon(I).extend({
    draw: function(canvas) {
      canvas.withTransform(self.getTransform(), function() {
        jetpackSprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);

        if (I.engaged) {
          fireSprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);
        }
      });
    },

    engaged: function(value) {
      if (value !== undefined) {
        I.engaged = value;
      }
      return I.engaged;
    },

    shoot: $.noop,

    update: function() {
      dino.yVelocity(dino.yVelocity() + I.yImpulse);

      fireSprite.update();
    },

    yImpulse: function(newValue) {
      if(newValue !== undefined) {
        I.yImpulse = newValue;
        return self;
      } else {
        return I.yImpulse;
      }
    }
  })
  return self;
}
