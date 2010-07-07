function Jetpack(I) {

  I = I || {};

  var activeTile = Sprite.load("images/weapons/jetpack_active.png");
  var jetpackTile = Sprite.load("images/weapons/jetpack.png");

  $.reverseMerge(I, {
    age: 0,
    engaged: false,
    eventCallbacks: {
      'engage': function() {
        if(!I.engaged) {
          I.engaged = true;
          I.yImpulse = -1;
          I.xImpulse = dino.xVelocity() + 1;
          dino.xVelocity(I.xImpulse);
          dino.yVelocity(-1 + I.yImpulse);
        }
      },
      'disengage': function() {
        if(I.engaged) {
          I.engaged = false;
          I.yImpulse = 0;
          I.xImpulse = dino.xVelocity() + 1;
          dino.xVelocity(I.xImpulse);
          dino.yVelocity(0 + I.yImpulse);
        }
      }
    },
    jetpackCounter: 0,
    sprite: Sprite.load("images/weapons/jetpack.png"),
    xImpulse: 0,
    yImpulse: 0
  });

  var self = Weapon(I).extend({

    draw: function(canvas) {
      I.sprite.draw(canvas, -45, -55);
    },

    engaged: function(value) {
      if (value === undefined) {
        return I.engaged;
      } else {
        I.engaged = value;
        return self;
      }
    },

    impulse: function() {
      return {
        x: I.xImpulse,
        y: I.yImpulse
      }
    },

    jetpackCounter: function(value) {
      if(value === undefined) {
        return I.jetpackCounter;
      } else {
        I.jetpackCounter += value;
        return self;
      }
    },

    shoot: $.noop,

    update: function() {
      if(Math.random() < 0.01 && I.jetpackCounter <= 0) {
        I.jetpackCounter = 50 + rand(50);
      }

      if (I.jetpackCounter > 0) {
        I.jetpackCounter--;
        self.trigger('engage');
      } else {
        self.trigger('disengage');
      }

      I.sprite = I.engaged ? activeTile : jetpackTile;
    }
  })
  return self;
}
