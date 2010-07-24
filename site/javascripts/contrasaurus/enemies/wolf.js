function Wolf(I) {
  I = I || {};

  $.reverseMerge(I, {
    shootLogic: $.noop,
    sprite: Sprite.load("images/enemies/patch_wolf.png"),
    type: 'wolf',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
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

  return self;
}
