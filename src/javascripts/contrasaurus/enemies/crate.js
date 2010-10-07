function Crate(I) {
  I = I || {};

  var normalSprite = Sprite.load("images/enemies/crate/normal.png");
  var damagedSprite = Sprite.load("images/enemies/crate/damaged.png");

  $.reverseMerge(I, {
    checkBounds: $.noop,
    collideDamage: 0,
    damageTable: {
      fire: 0.25,
      boat: 0
    },
    health: 100,
    maxShakeAmplitude: 7,
    pointsWorth: 5000,
    radius: 34,
    sprite: normalSprite,
    type: 'crate',
    weaponClass: MissileLauncher,
    y: CANVAS_HEIGHT - Floor.LEVEL
  });

  var healthMax = I.health;

  var self = Enemy(I).extend({
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

  self.bind("destroy", function() {
    if(I.weaponClass) {
      dino.addWeapon(I.weaponClass());
    }
  });

  return self;
}
