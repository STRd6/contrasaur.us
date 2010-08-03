function Weapon(I) {
  I = I || {};

  $.reverseMerge(I, {
    duration: 400,
    exitPoints: [Point(0, 0)],
    hitCircles: [],
    power: 100,
    theta: 0
  });

  var self = GameObject(I).extend({
    dino: function(newDino) {
      if(newDino !== undefined) {
        I.dino = newDino;
        return self;
      } else {
        return I.dino;
      }
    },

    getTransform: function() {
      return Matrix.IDENTITY;
    },

    generateProjectile: function(direction, position) {
      return Bullet({ theta: direction, x: position.x, y: position.y });
    },

    power: function(value) {
      if (value === undefined) {
        return I.power;
      } else {
        I.power += value;
        return self;
      }
    },

    shoot: function(position, transform) {
      var t = transform.concat(self.getTransform());
      var center = t.transformPoint(Point(0, 0));

      $.each(I.exitPoints, function(i, exitPoint) {
        var localPosition = t.transformPoint(exitPoint);

        // TODO: Better direction specification
        // Assumes direction follows line from center of weapon to exit point
        var direction = Math.atan2(localPosition.y - center.y, localPosition.x - center.x);

        addGameObject(self.generateProjectile(direction, localPosition));
      });
    },

    after: {
      update: function(dino) {
        // TODO: Figure out a better way to manage weapon shooting frequency
        if(rand(100) < I.power) {
          self.shoot(dino.position(), dino.getTransform());
        }
      }
    }
  });
  return self;
}
