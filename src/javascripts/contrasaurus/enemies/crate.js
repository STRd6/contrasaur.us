function Crate(I) {
  I = I || {};

  var normalSprite = Sprite.load("images/enemies/crate/normal.png");
  var damagedSprite = Sprite.load("images/enemies/crate/damaged.png");

  $.reverseMerge(I, {
    collideDamage: 0,
    health: 100,
    maxShakeAmplitude: 7,
    radius: 34,
    shootLogic: $.noop,
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
      addGameObject(Powerup({
        weaponClass: I.weaponClass,
        x: I.x,
        y: I.y
      }));
    }
  });

  return self;
}
