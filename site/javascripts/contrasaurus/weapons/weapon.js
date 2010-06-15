function Weapon(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    duration: 200,
    power: 0,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

  var self = GameObject(I).extend({
    generateBulletData: function(globalPosition, localPosition) {
      return {
        x: localPosition.x + globalPosition.x,
        y: localPosition.y + globalPosition.y
      };
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
      $.each(I.exitPoints, function(i, exitPoint) {
        var localPosition = transform.concat(self.getTransform()).transformPoint(exitPoint);
        // Assumes direction follows line from center of dino to exit point
        var direction = Math.atan2(localPosition.y, localPosition.x);

        addGameObject(Bullet(direction, self.generateBulletData(position, localPosition)));
      });
    }
  });
  return self;
}
