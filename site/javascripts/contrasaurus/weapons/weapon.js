function Weapon(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    power: 0,
    radius: 5,
    theta: 0,
    x: 0,
    y: 0
  });

  var self = {
    extend: function(options) {
      var afterMethods = options.after;
      var beforeMethods = options.before;

      delete options.after;
      delete options.before;

      $.each(options, function(name, method) {
        self[name] = method;
      });

      if(beforeMethods) {
        $.each(beforeMethods, function(name, method) {
          self[name] = before(self[name], method);
        });
      }

      if(afterMethods) {
        $.each(afterMethods, function(name, method) {
          self[name] = after(self[name], method);
        });
      }

      return self;
    },

    power: function(value) {
      if (value === undefined) {
        return I.power;
      } else {
        I.power += value;
        return self;
      }
    },

    shoot: function(theta, position, transform) {
      if (rand(100) < I.power) {
        addGameObject(Bullet(theta, position));
      }
    }
  }

  return self;
}
