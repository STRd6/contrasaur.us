function Jetpack(I) {

  I = I || {};

  var activeTile = Sprite.load("images/weapons/jetpack_active.png");
  var jetpackTile = Sprite.load("images/weapons/jetpack.png");
  var charge = false;
  var haywire = false;

  $.reverseMerge(I, {
    age: 0,
    duration: -1,
    engaged: false,
    eventCallbacks: {
      'engage': function() {
        if(!I.engaged) {
          if (Math.random() < 0.2) {
            charge = true;
            I.jetpackCounter = 60;
          } else if (Math.random() < 0.1) {
            haywire = true;
            I.jetpackCounter = 40;
          } else {
            I.engaged = true;
            I.yImpulse = -1;
            var dinoXVelocity = dino.xVelocity();
            dino.xVelocity(dinoXVelocity + 2);
            dino.yVelocity(-9);
            dino.airborne(true);
            I.jetpackCounter = 15;
          }
        }
      },
      'disengage': function() {
        if(I.engaged) {
          I.engaged = false;
          charge = false;
          haywire = false;
          I.yImpulse = 2;
          dino.yVelocity(I.yImpulse);
          dino.xVelocity(2);
          currentLevel.tiltAmount(2);
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
      } else {
        self.trigger('disengage');
      }

      if( !dino.parasailing()) {
        if (dino.airborne() && !charge) {
          dino.pitchAngle(I.pitchImpulse);
        }

        if (charge && !dino.boss()) {
          dino.lastDirection(1);
          I.engaged = true;
          dino.xVelocity(20);
          dino.yVelocity(-0.5);
          dino.airborne(true);
          currentLevel.tiltAmount(16);
        }

        if (haywire && !dino.boss()) {
          dino.lastDirection(1);
          I.engaged = true;
          dino.xVelocity(10 + rand(20));
          dino.yVelocity(-5 - rand(5));
          dino.airborne(true);
          currentLevel.tiltAmount((10));
          dino.pitchAngle(Math.PI/10);
        }
      }

      I.sprite = I.engaged ? activeTile : jetpackTile;
    }
  })
  return self;
}
