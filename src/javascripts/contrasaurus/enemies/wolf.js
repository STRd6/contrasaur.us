function Wolf(I) {
  I = I || {};

  var bitInHalf = false;

  $.reverseMerge(I, {
    shootLogic: $.noop,
    sprite: Sprite.load("images/enemies/patch_wolf.png"),
    type: 'wolf',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL,
    yVelocity: 0
  });

  var self = Enemy(I).extend({

    bite: function() {
      bitInHalf = true;
    },

    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
      }
    },

    after: {
      update: function() {
        if (I.xVelocity < 0) {
          I.hFlip = true;
        } else {
          I.hFlip = false;
        }
      }
    }
  });

  self.bind('destroy', function(self) {
    if(bitInHalf) {
      Sound.play("chomp");
    } else {
      Sound.play("die");
    }
  });

  return self;
}
