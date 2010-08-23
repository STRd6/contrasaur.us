function WhiteHouse(I) {
  I = I || {};

  var fullSprite = Sprite.load('images/levels/washington_dc/whiteHouse_full.png');
  var damagedSprite = Sprite.load('images/levels/washington_dc/whiteHouse_damaged.png');
  var destroyedSprite = Sprite.load('images/levels/washington_dc/whiteHouse_destroyed.png');

  $.reverseMerge(I, {
    health: 1000,
    hitCircles: [
      {"x":-156,"y":34,"radius":62},{"x":3,"y":0,"radius":117},{"x":247,"y":-55,"radius":38},{"x":240,"y":29,"radius":43},{"x":-174,"y":-43,"radius":55},{"x":-242,"y":16,"radius":44},{"x":-242,"y":-13,"radius":43},{"x":238,"y":-17,"radius":45},{"x":140,"y":4,"radius":74},{"x":224,"y":-66,"radius":32},{"x":179,"y":-37,"radius":58},{"x":-239,"y":-50,"radius":49}
    ],
    y: 190,
    shootLogic: $.noop,
    sprite: fullSprite
  });

  var shakeAmplitude = 0;
  var healthMax = I.health;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    before: {
      update: function() {
        if(shakeAmplitude > 0.1) {
          shakeAmplitude = shakeAmplitude * 0.7;
        } else {
          shakeAmplitude = 0;
        }

        I.x += shakeAmplitude * Math.sin(I.age);

        if(I.health < healthMax / 2) {
          I.sprite = damagedSprite;
        }
      }
    },

    after: {
      hit: function(other) {
        shakeAmplitude += other.collideDamage();
      }
    }
  });

  self.bind('destroy', function() {
    addGameObject(Effect({
      duration: -1,
      sprite: destroyedSprite,
      velocity: Point(),
      x: I.x,
      y: I.y
    }));
  });

  return self;
}
