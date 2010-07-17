function Soldier(I) {
  I = I || {};

  var imageDir = "images/enemies/sandinista/";
  var runLegs = loadAnimation(imageDir + "run_legs.png", 8, 31, 25, 3);
  var runTorso = loadAnimation(imageDir + "run_torso.png", 8, 33, 34, 3);
  var shootTorso = loadAnimation(imageDir + "shoot_full.png", 6, 44, 34, 3);
  var bitLegs = loadAnimation(imageDir + "bit_in_half.png", 15, 435/15, 24, 3);

  var exitPoint = Point(15, -20);
  var exitDirection = Point(Math.sqrt(3) / 2, -0.5);

  var legs = runLegs;
  var torso = shootTorso;

  var composite = {
    width: 38,
    height: 52,
    update: function() {
      torso.update();
      legs.update();
    },
    draw: function(canvas, x, y, options) {
      torso.draw(canvas, x + 4, y - 2, options);
      legs.draw(canvas, x, y + 25, options);
    }
  };

  $.reverseMerge(I, {
    shootLogic: function() {
      if (Math.random() < 0.075) {
        var transform = self.getTransform();

        var p = transform.transformPoint(exitPoint);
        var d = transform.deltaTransformPoint(exitDirection);
        var theta = Math.atan2(d.y, d.x);

        self.shoot(theta, {
          x: p.x,
          y: p.y,
          sprite: Sprite.load("images/effects/enemybullet1_small.png")
        });
      }
    },
    sprite: composite,
    x: rand(CANVAS_WIDTH),
    y: CANVAS_HEIGHT - Floor.LEVEL - 20,
    yVelocity: 0
  });

  var self = Enemy(I).extend({

    burn: function(flame) {
      if (!I.onFire) {
        I.onFire = true;
        I.xVelocity = I.xVelocity * 2.5;
      }
    },

    after: {
      update: function() {
        if (Math.random() < 0.05 && I.onFire) {
          I.xVelocity = I.xVelocity * -1;
        }

        if (I.xVelocity < 0) {
          I.hFlip = true;
        } else {
          I.hFlip = false;
        }
      }
    }
  });

  // HACK: fix the soldier so that the position from
  // self.position() lines up with the effect
  self.bind('destroy', function(self) {
    var effect = Effect($.extend({ x: self.position().x - 2, y: self.position().y + 10 }, {
      duration: 35,
      hFlip: true,
      sprite: bitLegs,
      velocity: Point(0, 0)
    }));

    addGameObject(effect);
  });

  return self;
}
