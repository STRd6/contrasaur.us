function Weapon(I) {
  I = I || {};

  $.reverseMerge(I, {
    autofire: false,
    cooldown: 0,
    delay: 0,
    exitMode: "all",
    exitPoints: [Point(0, 0)],
    primaryFn: function(direction, localPosition, centerDirection) {
      addGameObject(self.generateProjectile(direction, localPosition, centerDirection));
    },
    primaryShotCost: 1,
    secondaryFn: toss,
    secondaryShotCost: 3,
    selectable: false,
    theta: 0,
    throwable: false
  });

  I.sprite = I.sprite || Sprite.load("images/weapons/" + I.name + ".png");
  var ammoSprite = Sprite.load("images/ammo/" + I.name + ".png");

  var lastPoint = -1;
  var targetPosition = 0;

  function toss() {
    if(I.throwable) {
      I.active = false;

      var position = dino.position();
      // TODO: Targeted throws

      addGameObject(ThrownItem($.extend({
        weaponName: I.name,
        x: position.x,
        y: position.y
      }, I.throwable)));

      return true;
    } else {
      return false;
    }
  }

  var self = Accessory(I).extend({
    generateProjectile: function(direction, position) {
      return Bullet({ theta: direction, x: position.x, y: position.y });
    },

    data: function() {
      return {
        sprite: ammoSprite,
        ammo: I.ammo
      }
    },

    shoot: function(position, transform, mode) {
      if(I.ammo > 0) {
        lastPoint++;

        var points;
        var t = transform.concat(self.getTransform());
        var center = t.transformPoint(Point(0, 0));

        if(I.exitMode == "cycle") {
          lastPoint = Math.mod(lastPoint, I.exitPoints.length);
          points = [I.exitPoints[lastPoint]];
        } else {
          points = I.exitPoints;
        }

        $.each(points, function(i, exitPoint) {
          var localPosition = t.transformPoint(exitPoint);
          var direction = Point.direction(localPosition, targetPosition);
          var centerDirection = Point.direction(center, localPosition);

          if (mode == 'primary') {
            I.primaryFn(direction, localPosition, centerDirection);
            I.ammo -= I.primaryShotCost;
          } else if (mode == 'secondary') {
            I.secondaryFn(direction, localPosition, centerDirection);
            I.ammo -= I.secondaryShotCost;
          }
        });
      }
    },

    selectable: function() {
      return I.selectable;
    },

    toss: toss,

    before: {
      update: function(dino, levelPosition) {
        targetPosition = target.add(levelPosition);

        if(I.ammo <= 0 && I.name != "machineGun") {
          I.active = false;
        }
      }
    },

    after: {
      update: function(dino) {
        if(I.delay > 0) {
          I.delay--;
        }

        if (I.delay <= 0) {
          if(shooting || I.autofire) {
            self.shoot(dino.position(), dino.getTransform(), 'primary');
          }

          if(secondaryShooting) {
            self.shoot(dino.position(), dino.getTransform(), 'secondary');
          }

          I.delay += I.cooldown;
        }
      }
    }
  });

  return self;
}
