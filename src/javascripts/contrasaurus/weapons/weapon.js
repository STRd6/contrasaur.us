function Weapon(I) {
  I = I || {};

  $.reverseMerge(I, {
    autofire: false,
    cooldown: 0,
    delay: 0,
    exitMode: "all",
    exitPoints: [Point(0, 0)],
    hitCircles: [],
    theta: 0,
    throwable: false
  });

  I.sprite = I.sprite || Sprite.load("images/weapons/" + I.name + ".png");

  var lastPoint = -1;

  var self = Accessory(I).extend({
    dino: function(newDino) {
      if(newDino !== undefined) {
        I.dino = newDino;
        return self;
      } else {
        return I.dino;
      }
    },

    generateProjectile: function(direction, position) {
      return Bullet({ theta: direction, x: position.x, y: position.y });
    },

    shoot: function(position, transform) {
      if(I.ammo > 0) {
        I.ammo--;
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

          // TODO: Better direction specification
          // Assumes direction follows line from center of weapon to exit point
          var direction = Math.atan2(localPosition.y - center.y, localPosition.x - center.x);

          addGameObject(self.generateProjectile(direction, localPosition));
        });
      }
    },

    toss: function() {
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
    },

    before: {
      update: function() {
        if(I.ammo <= 0) {
          I.active = false;
        }
      }
    },

    after: {
      update: function(dino) {
        if(I.delay > 0) {
          I.delay--;
        }

        if((shooting || I.autofire) && (I.delay <= 0)) {
          self.shoot(dino.position(), dino.getTransform());
          I.delay += I.cooldown;
        }
      }
    }
  });

  return self;
}
