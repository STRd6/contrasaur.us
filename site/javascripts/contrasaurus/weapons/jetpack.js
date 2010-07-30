function Jetpack(I) {

  I = I || {};

  var activeTile = Sprite.load("images/weapons/jetpack_active.png");
  var jetpackTile = Sprite.load("images/weapons/jetpack.png");

  $.reverseMerge(I, {
    age: 0,
    duration: -1,
    engaged: false,
    eventCallbacks: {
      'engage': function() {
        if(!I.engaged) {
          I.engaged = true;
          I.yImpulse = -1;
          var dinoXVelocity = dino.xVelocity();
          dino.xVelocity(dinoXVelocity + 2);
          dino.yVelocity(-9);
          dino.airborne(true);
          I.jetpackCounter = 15;
        }
      },
      'disengage': function() {
        if(I.engaged) {
          I.engaged = false;
          I.yImpulse = 2;
          dino.yVelocity(I.yImpulse);
        }
      }
    },
    jetpackCounter: 0,
    sprite: Sprite.load("images/weapons/jetpack.png"),
    xImpulse: 0,
    yImpulse: 0
  });

  $.reverseMerge(I, {
    pitchImpulse: Math.PI/16
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
      if (I.jetpackCounter > 0) {
        I.jetpackCounter--;
        self.trigger('engage');
      } else {
        self.trigger('disengage');
      }

      if (dino.airborne()) {
        dino.pitchAngle(I.pitchImpulse);
      }

      I.sprite = I.engaged ? activeTile : jetpackTile;
    }
  })
  return self;
}
