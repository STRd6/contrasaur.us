function GameObject(I) {
  I = I || {};

  $.reverseMerge(I, {
    active: true,
    age: 0,
    collideDamage: 0,
    collisionType: "none",
    color: "#880",
    duration: -1,
    health: 1,
    height: 10,
    pointsWorth: 0,
    radius: 5,
    type: '',
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

  var self = Core(I).extend({
    active: function(newActive) {
      if(newActive != undefined) {
        I.active = newActive;
        return this;
      } else {
        return I.active;
      }
    },

    collideDamage: function() { return I.collideDamage },

    collisionType: function() {
      return I.collisionType;
    },

    components: function() {
      return [];
    },

    destroy: function() {
      if (I.active) {
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
        canvas.fillCircle(circle.x, circle.y, circle.radius, GameObject.circleColor(I.collisionType));
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
    },

    getTransform: function() {
      return Matrix.translation(I.x, I.y);
    },

    hit: $.noop,

    midpoint: function() {
      return {
        x: I.x,
        y: I.y
      }
    },

    // TODO: Encapsulate these better
    pointsWorth: function() { return I.pointsWorth },

    position: function(newPoint) {
      if (newPoint !== undefined) {
        I.x = newPoint.x;
        I.y = newPoint.y;
        return self;
      } else {
        return Point(I.x, I.y);
      }
    },

    sink: function(water) {
      self.active(false);

      var effect = Effect($.extend(self.position(), {
        duration: 8,
        sprite: loadAnimation("images/effects/waterEffect_16x16.png", 12, 16, 16),
        velocity: Point()
      }));

      addGameObject(effect);
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
    }
  });

  self.attrAccessor('health', 'sprite');

  self.extend(Bindable());

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
      I.y + buffer + 100 < -I.radius ||
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
    var t = Matrix.rotation(I.rotation).translate(I.x, I.y);

    if(I.hFlip) {
      t = t.concat(Matrix.HORIZONTAL_FLIP);
    }

    return t;
  };
};

GameObject.circleColor = function(collisionType) {
  if(collisionType == "enemy" || collisionType == "dino") {
    return "rgba(255, 0, 0, 0.5)";
  } else if(collisionType == "enemyBullet" || collisionType == "dinoBullet") {
    return "rgba(0, 255, 0, 0.5)";
  } else {
    return "rgba(255, 255, 0, 0.5)";
  }
}
