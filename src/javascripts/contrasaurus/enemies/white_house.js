function WhiteHouse(I) {
  I = I || {};

  var fullSprite = Sprite.load('images/levels/washington_dc/whiteHouse_full.png');
  var damagedSprite = Sprite.load('images/levels/washington_dc/whiteHouse_damaged.png');
  var destroyedSprite = Sprite.load('images/levels/washington_dc/whiteHouse_destroyed.png');

  $.reverseMerge(I, {
    health: 1000,
    hitCircles: [
      { "x": -132, "y": 32, "radius": 140 },
      { "x": 133, "y": 32, "radius": 139 },
      { "x": 0, "y": -98, "radius": 60 },
      { "x": 0, "y": 132, "radius": 40 },
      { "x": -238, "y": -80, "radius": 48 },
      { "x": 238, "y": -78, "radius": 48 },
      { "x": -239, "y": 145, "radius": 27 },
      { "x": 238, "y": 144, "radius": 28 }
    ],
    y: 190,
    shootLogic: $.noop,
    sprite: fullSprite
  });

  var healthMax = I.health;

  var self = Boss(I).extend({
    bulletHitEffect: Enemy.sparkSprayEffect,

    before: {
      update: function() {
        if(I.health < healthMax / 2) {
          I.sprite = damagedSprite;
        }
      }
    }
  });

  self.extend(Shakeable(I));

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
