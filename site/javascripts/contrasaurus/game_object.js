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
    radius: 5,
    xVelocity: 0,
    yVelocity: 0,
    collideDamage: 0,
    collisionType: "none",
    pointsWorth: 0
  });

  function move() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
  }

  var self = {
    getTransform: function() {
      return Matrix.IDENTITY;
    },

    midpoint: function() {
      return {
        x: I.x,
        y: I.y
      }
    },

    position: function() {
      return {
        x: I.x,
        y: I.y
      }
    },

    getCircles: function() {
      if(I.hitCircles) {
        var position = self.position();
        return $.map(I.hitCircles, function(circle) {
          var point = self.getTransform().transformPoint(circle);
          return {
            x: point.x + position.x,
            y: point.y + position.y,
            radius: circle.radius
          };
        });
      } else {
        return [{x: I.x, y: I.y, radius: I.radius}];
      }
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

    collisionType: function() {
      return I.collisionType;
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
        addScore(I.pointsWorth);
      }
    },

    draw: function(canvas) {
      canvas.withState(I.x, I.y, { transform: self.getTransform() }, function() {
        if (I.sprite) {
          I.sprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);
        } else {
          canvas.fillColor(I.color);
          canvas.fillRect(-I.width/2, -I.height/2, I.width, I.height);
        }
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    drawHitCircles: function(canvas) {
      $.each(self.getCircles(), function(i, circle) {
        canvas.fillCircle(circle.x, circle.y, circle.radius, "rgba(255, 0, 0, 0.5)");
      });
    },

    update: function() {
      I.age++;
      move();

      if(I.sprite) {
        I.sprite.update();
      }
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

GameObject.DEBUG_HIT = false;
GameObject.generateCheckBounds = function(I, buffer) {
  buffer = buffer || 0;
  var yMax = CANVAS_HEIGHT - Floor.LEVEL;
  return function(position) {
    var xMax = position.x + CANVAS_WIDTH;
    // Check Bounds
    if (I.x + buffer < position.x - I.radius ||
      I.x - buffer > xMax + I.radius ||
      I.y + buffer < -I.radius ||
      I.y - buffer > yMax + I.radius
    ) {
      I.active = false;
    }

    return I.active;
  };
};
