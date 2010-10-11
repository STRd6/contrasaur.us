function Enemy(I) {
  I = I || {};

  $.reverseMerge(I, {
    checkBounds: GameObject.generateCheckBounds(I, 100),
    collideDamage: 1,
    collisionType: "enemy",
    damageTable: {},
    health: 3,
    nutrition: 0,
    onFire: false,
    pointsWorth: 1000,
    radius: 18,
    shootLogic: $.noop,
    type: '',
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
  });

  var self = GameObject(I).extend({
    bulletHitEffect: Enemy.bloodSprayEffect,

    currentModel: function() {
      return I.model;
    },

    hit: function(other) {
      var damageFactor;

      if(other.damageType) {
        damageFactor = I.damageTable[other.damageType()]
      }

      if(damageFactor === undefined) {
        damageFactor = 1;
      }

      I.health = I.health - other.collideDamage() * damageFactor;

      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
      }
    },

    land: $.noop,

    shoot: function(angle, bulletData) {
      var bullet = Bullet($.extend(bulletData, {
        collisionType: "enemyBullet",
        theta: angle
      }));

      addGameObject(bullet);
    },

    shootFrom: function (attachment, bulletData) {
      var shootPoint = self.currentModel().attachment(attachment);

      if(shootPoint) {
        var t = self.getTransform();
        var direction = shootPoint.direction;

        var p = t.transformPoint(shootPoint);

        var tmpPoint = t.deltaTransformPoint(Point(Math.cos(direction), Math.sin(direction)));
        var theta = Point.direction(Point(0,0), tmpPoint);

        addGameObject(Bullet($.extend({
          collisionType: "enemyBullet",
          theta: theta,
          x: p.x,
          y: p.y
        }, bulletData)));
      }
    },

    getTransform: function() {
      var t;
      if(I.xVelocity <= 0) {
        t = Matrix.HORIZONTAL_FLIP;
      } else {
        t = Matrix.IDENTITY;
      }
      return t.translate(I.x, I.y);
    },

    nutrify: function(other) {
      if (I.nutrition < 0) {
        other.poison();
      }
      other.heal(I.nutrition);
    },

    after: {
      update: function() {
        I.shootLogic();

        I.checkBounds.apply(self, arguments);
      }
    }
  });

  self.bind('destroy', function() {
    if(I.type) {
      killCounter[I.type]++;
    }
  });

  return self;
}

Enemy.bloodSprayEffect = function(bullet) {
  //Sound.play("bullet_hit_flesh", 1);

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
  Sound.play("ricochet" + (rand(4) + 2), 1);

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

Enemy.crateSmashEffect = function(bullet) {
  Sound.play("crate_smash", 1);
};