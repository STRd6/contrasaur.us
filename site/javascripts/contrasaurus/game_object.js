function GameObject(I) {
  I = I || {};

  $.reverseMerge(I, {
    active: true,
    age: 0,
    collideDamage: 0,
    collisionType: "none",
    color: "#880",
    duration: -1,
    eventCallbacks: {
      'destroy': $.noop
    },
    health: 1,
    height: 10,
    pointsWorth: 0,
    radius: 5,
    width: 10,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
  });

  function move() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
  }

  var self = {
    active: function(newActive) {
      if(newActive != undefined) {
        I.active = newActive;
        return this;
      } else {
        return I.active;
      }
    },

    bind: function(event, callback) {
      I.eventCallbacks[event] = callback;
    },

    collideDamage: function() { return I.collideDamage },

    collisionType: function() {
      return I.collisionType;
    },

    components: function() {
      return [];
    },

    destroy: function() {
      if (I.active == true) {
        I.active = false;
        self.trigger('destroy');
      }
    },

    draw: function(canvas) {
      canvas.withTransform(self.getTransform(), function() {
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

    getCircles: function() {
      var componentCircles = $.map(self.components(), function(component) {
        var transform = component.getTransform();
        return $.map(component.getCircles(), function(circle) {
          var point = transform.transformPoint(component.position());
          return {
            radius: circle.radius,
            x: point.x,
            y: point.y,
            component: component
          };
        });
      });

      var objectCircles;

      if(I.hitCircles) {
        objectCircles = I.hitCircles;
      } else {
        objectCircles = [{
          radius: I.radius,
          x: 0,
          y: 0,
          component: self
        }];
      }

      var circles = componentCircles.concat(objectCircles);

      var transform = self.getTransform();
        return $.map(circles, function(circle) {
          var point = transform.transformPoint(circle);
          return {
            x: point.x,
            y: point.y,
            radius: circle.radius,
            component: circle.component || self
          };
        });

      return circles;
    },

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    health: function(newHealth) {
      if(newHealth != undefined) {
        I.health = newHealth;
        return this;
      } else {
        return I.health;
      }
    },

    hit: function(other) {
      I.health = I.health - other.collideDamage();
      if (I.health <= 0) {
        self.destroy();
        addScore(I.pointsWorth);
      }
    },

    midpoint: function() {
      return {
        x: I.x,
        y: I.y
      }
    },

    // TODO: Encapsulate these better
    pointsWorth: function() { return I.pointsWorth },

    position: function() {
      return Point(I.x, I.y);
    },

    sprite: function(value) {
      if (value === undefined) {
        return I.sprite;
      } else {
        I.sprite = value;
        return self;
      }
    },

    trigger: function(event) {
      I.eventCallbacks[event](self);
    },

    update: function() {
      I.age++;
      move();

      if(I.sprite) {
        I.sprite.update();
      }

      if(I.duration != -1 && I.age > I.duration) {
        I.active = false;
      }
    },

    velocity: function() {
      return {
        x: I.xVelocity,
        y: I.yVelocity
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

GameObject.velocityGetTransform = function(I) {
  return function() {
    return Matrix.rotation(Math.atan2(I.yVelocity, I.xVelocity)).translate(I.x, I.y);
  };
};

GameObject.rotationGetTransform = function(I) {
  return function() {
    return Matrix.rotation(I.rotation).translate(I.x, I.y);
  };
};
