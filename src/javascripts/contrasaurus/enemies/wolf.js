function Wolf(I) {
  I = I || {};

  var bitInHalf = false;

  $.reverseMerge(I, {
    bitInHalf: false,
    shootLogic: $.noop,
    sprite: Sprite.load("images/enemies/patch_wolf.png"),
    type: 'wolf',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL,
    yVelocity: 0
  });

  var self = Enemy(I).extend({

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
    if(!bitInHalf) {
      Sound.play("die");
    }
  });

  self.extend(Biteable(I));

  return self;
}
