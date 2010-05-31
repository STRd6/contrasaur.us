function GameObject(I) {
  I = I || {};

  $.reverseMerge(I, {
    active: true,
    age: 0,
    color: "#880",
    health: 1,
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    xVelocity: 0,
    yVelocity: 0,
    collideDamage: 1,
    pointsWorth: 1000
  });

  var getTransform = function() {
    return {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0
    };
  }

  function move() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
  }

  var self = {

    getTransform: getTransform,

    midpoint: function() {
      return {
        x: I.x + I.width/2,
        y: I.y + I.height/2
      }
    },

    boundingBox: function() {
      if (I.sprite) {
        return { x: I.x - I.sprite.registrationPoint.x, y: I.y - I.sprite.registrationPoint.y, width: I.sprite.width, height: I.sprite.height };
      } else {
        return { x: I.x, y: I.y, width: I.width, height: I.height };
      }
    },

    getCircle: function() {
      return {x: I.x, y: I.y, radius: I.radius};
    },

    // TODO: Encapsulate these better
    collideDamage: function() { return I.collideDamage },
    pointsWorth: function() { return I.pointsWorth },

    active: function(newActive) {
      if(newActive != undefined) {
        I.active = newActive;
        return this;
      } else {
        return I.active;
      }
    },

    health: function(newHealth) {
      if(newHealth != undefined) {
        I.health = newHealth;
        return this;
      } else {
        return I.health;
      }
    },

    velocity: function() {
      return {
        x: I.xVelocity,
        y: I.yVelocity
      }
    },

    hit: function(other) {
      I.health = I.health - other.collideDamage();
      if (I.health <= 0) {
        I.active = false;
      }
    },

    draw: function(canvas) {
      var midpoint = self.midpoint();

      canvas.withState(midpoint.x, midpoint.y, { transform: getTransform() }, function() {
        if (I.sprite) {
          I.sprite.draw(canvas, 0, 0);
        } else {
          canvas.fillColor(I.color);
          canvas.fillRect(0, 0, I.width, I.height);
        }
      });
    },

    update: function() {
      I.age++;
      move();
    },

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
    }
  };

  return self;
}