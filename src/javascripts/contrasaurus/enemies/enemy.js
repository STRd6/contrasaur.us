function Enemy(I) {
  I = I || {};

  $.reverseMerge(I, {
    checkBounds: GameObject.generateCheckBounds(I, 100),
    collideDamage: 1,
    collisionType: "enemy",
    drops: weapons,
    dropFrequency: 0.2,
    health: 3,
    hFlip: false,
    moneyFrequency: 0.2,
    nutrition: 0,
    onFire: false,
    pointsWorth: 1000,
    radius: 18,
    type: '',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  function dropPowerup(imgFile, callback) {
    addGameObject(Powerup({
      callback: callback,
      sprite: Sprite.load(imgFile),
      x: I.x + 50,
      y: I.y - 80,
      xVelocity: 2,
      yVelocity: -12
    }));
  }

  function dropMoney() {
    addGameObject(Powerup({
      callback: function(other) {
        if (other.addMoney) {
          other.addMoney(1000);
        }
      },
      sprite: Sprite.load([
        "images/accessories/coins.png",
        "images/accessories/money.png"
      ].rand()),
      x: I.x,
      y: I.y - 40 - rand(50),
      xVelocity: (Math.random() < 0.5 ? rand(6) : -1*rand(6)),
      yVelocity: -5*rand(4)
    }));
  }

  function dropWeaponPowerup(imgFile, weaponClass) {
    dropPowerup("images/weapons/" + imgFile + ".png", function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(weaponClass());
      }
    });
  }

  var self = GameObject(I).extend({
    burn: function(flame) {
      I.onFire = true;
    },

    bulletHitEffect: Enemy.bloodSprayEffect,

    land: $.noop,

    shoot: function(angle, bulletData) {
      var bullet = Bullet($.extend(bulletData, {
        collisionType: "enemyBullet",
        theta: angle
      }));

      addGameObject(bullet);
    },

    getTransform: function() {
      var t;
      if(I.hFlip) {
        t =  Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    },

    nutrify: function(other) {
      other.heal(I.nutrition);
    },

    after: {
      hit: function(other) {
        if(other.bump) {
          other.bump();
        }
      },
      update: function() {
        I.shootLogic();
        I.checkBounds.apply(self, arguments);

        if(I.onFire) {
          I.health--;

          if(Math.random() < 0.1) {
            //Smoke/flame
            addGameObject(Effect($.extend(self.position().add(Circle(0, 0, 5).randomPoint()), {
              sprite: Sprite.load("images/effects/smoke2.png"),
              velocity: Point(0, 0)
            })));
          }
        }
      }
    }
  });

  self.bind('destroy', function() {
    if(I.drops && Math.random() < I.dropFrequency) {
      var weapon = I.drops.rand();
      dropWeaponPowerup(weapon, weaponMap[weapon]);
    }

    if(Math.random() < I.moneyFrequency) {
      dropMoney();
      dropMoney();
      dropMoney();
    }

    if(I.type) {
      killCounter[I.type]++;
    }
  });

  return self;
}

Enemy.bloodSprayEffect = function(bullet) {
  bullet.effectCount().times(function() {
    var point = bullet.position();
    var offset = Circle(0, 0, bullet.dispersion()).randomPoint();

    if(offset) {
      point = point.add(offset);
    }

    var effect = Effect($.extend(point, {
      duration: 10,
      sprite: [
        loadAnimation("images/effects/bloodEffect3_16x16.png", 9, 16, 16),
        loadAnimation("images/effects/bloodEffect2_8x8.png", 10, 8, 8),
        loadAnimation("images/effects/bloodEffect1_8x8.png", 8, 8, 8),
        loadAnimation("images/effects/bloodEffect4_16x16.png", 10, 16, 16)
      ].rand(),
      velocity: bullet.velocity()
    }));

    addGameObject(effect);
  });
};

Enemy.sparkSprayEffect = function(bullet) {
  Sound.play("ricochet" + (rand(4) + 2));

  var effect = Effect($.extend(bullet.position(), {
    duration: 9,
    sprite: loadAnimation("images/effects/sparkEffect2_16x16.png", 7, 16, 16),
    velocity: bullet.velocity()
  }));

  addGameObject(effect);
};

Enemy.debrisSprayEffect = function(bullet) {
  var effect = Effect($.extend(bullet.position(), {
    duration: 9,
    sprite: loadAnimation("images/effects/vehicle_debris_32x32.png", 1, 32, 32),
    velocity: bullet.velocity()
  }));

  addGameObject(effect);
};