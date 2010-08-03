var transform = Matrix.translation(320, 240);
var animation;
var animationJSON;
var currentFrame = 0;
var active = {};
var attachmentRadius = 5;
var attachmentColor = "rgba(0, 255, 0, 0.5)";
var activeColor = "rgba(255, 0, 255, 0.5)";
var circleColor = "rgba(255, 0, 0, 0.5)";
var frames;

$('#gameCanvas').powerCanvas({init: function(canvas) {
  var character = GameObject().extend({
    attachmentPoints: function() {
      var transform = this.getTransform();

      if(frames) {
        var attachmentPoints = {};
        $.each(frames[currentFrame].attachmentPoints, function(name, point) {
          var transformedPoint = transform.transformPoint(point);
          attachmentPoints[name] = {
            x: transformedPoint.x,
            y: transformedPoint.y,
            direction: point.direction,
            point: point
          };
        });
      }

      return attachmentPoints;
    },
    getCircles: function() {
      var transform = this.getTransform();

      if(frames) {
        return $.map(frames[currentFrame].circles, function(circle) {
          var point = transform.transformPoint(circle);
          return {
            x: point.x,
            y: point.y,
            radius: circle.radius,
            circle: circle
          };
        });
      } else {
        return [];
      }
    },

    getTransform: function() {
      return transform;
    },

    draw: function(canvas) {
      if(animation) {
        animation.frame(currentFrame);

        canvas.withTransform(this.getTransform(), function() {
          animation.draw(canvas,
            -animation.width / 2,
            -animation.height / 2
          );
        });
      }

      $.each(this.getCircles(), function(i, circle) {
        var color = (circle.circle == active["circles"] ? activeColor : circleColor);
        canvas.fillCircle(circle.x, circle.y, circle.radius, color);
      });

      $.each(this.attachmentPoints(), function(name, point) {
        var color = (point.point == active["attachmentPoints"] ? activeColor : attachmentColor)
        canvas.fillCircle(point.x, point.y, attachmentRadius, color);
        canvas.fillText(name, point.x, point.y - 10);
      });
    }
  });

  setInterval(function() {
    canvas.fill('#CCC');
    character.draw(canvas);
  }, 33);

  canvas.click(function(e) {
    var point = {
      x: event.offsetX,
      y: event.offsetY
    };

    var activeType = "circles";
    var activeComponent = undefined;
    var set = false;

    // Check which circle was hit
    $.each(character.getCircles(), function(i, circle) {
      if(set) {
        return;
      }

      var dx = point.x - circle.x;
      var dy = point.y - circle.y;
      var dist = circle.radius;

      if(dx * dx + dy * dy < dist * dist) {
        activeType = "circles";
        activeComponent = circle.circle;
        set = true;
      }

    });

    $.each(character.attachmentPoints(), function(name, attachmentPoint) {
      if(set) {
        return;
      }

      var dx = point.x - attachmentPoint.x;
      var dy = point.y - attachmentPoint.y;
      var dist = attachmentRadius;

      if(dx * dx + dy * dy < dist * dist) {
        activeType = "attachmentPoints"
        activeComponent = attachmentPoint.point;
        set = true;
      }
    });

    $.each(active, function(key, value) {
      active[key] = undefined;
    });

    active[activeType] = activeComponent;
  });

}});

function nextFrame() {
  active["circles"] = undefined;
  currentFrame++;

  if(currentFrame == animation.frameCount()) {
    currentFrame = 0;
  } else if(currentFrame >= frames.length) {
    // Copy first frame of hit circles
    var copy = frames[0].circles.slice(0).map(function(circle) {
      return {
        x: circle.x,
        y: circle.y,
        radius: circle.radius
      };
    });

    frames.push({ circles: copy });
  }
}

function previousFrame() {
  if(currentFrame > 0) {
    currentFrame--;
  }
}

function generateComponentMethods(component, creator) {
  function getter() {
    return frames[currentFrame][component];
  };

  return {
    add: function() {
      active[component] = creator();
      getter().push(active[component]);
    },

    grow: function(delta) {
      var c = active[component];
      if(c) {
        c.radius = Math.clamp(delta + c.radius, 1, 1000);
      }
    },

    next: function() {
      var index = getter().indexOf(active[component]);
      index = (index + 1) % getter().length;
      active[component] = getter()[index];
    },

    prev: function() {
      var index = getter().indexOf(active[component]);
      index = Math.mod(index - 1, getter().length);
      active[component] = getter()[index];
    },

    remove: function() {
      getter().remove(active[component]);
    }
  }
}

Circles = generateComponentMethods("circles", function() {
  return {
    x: 0,
    y: 0,
    radius: 50
  };
});

AttachmentPoints = generateComponentMethods("attachmentPoints", function() {
  return {
    x: 0,
    y: 0,
    radius: 5
  }
});

function move(x, y) {
  $.each(active, function(name, component) {
    if(component) {
      component.x += x;
      component.y += y;
    }
  });
}

keyEvents = {
  "+": function() {
    Circles.grow(1);
  },
  "-": function() {
    Circles.grow(-1);
  },
  "up": function() {
    move(0, -1);
  },
  "down": function() {
    move(0, 1);
  },
  "left": function() {
    move(-1, 0);
  },
  "right": function() {
    move(1, 0);
  },
  "shift+left": function() {
    move(-10, 0);
  },
  "shift+right": function() {
    move(10, 0);
  },
  "shift+up": function() {
    move(0, -10);
  },
  "shift+down": function() {
    move(0, 10);
  },
  "shift++": function() {
    Circles.grow(10);
  },
  "shift+-": function() {
    Circles.grow(-10);
  },
  "shift+tab": function() {
    Circles.prev();
    return false;
  },
  "tab": function() {
    Circles.next();
    return false;
  },
  "d": function() {
    Circles.remove();
  }
}

$.each(keyEvents, function(key, fn) {
  $(document).bind('keydown', key, fn);
});

function Button(text, callback) {
  return $("<input type='button' />").attr("value", text).click(callback);
}

$("#controls").append(Button("Increase", function() {
  Circles.grow(1);
}));

$("#controls").append(Button("Decrease", function() {
  Circles.grow(-1);
}));

$("#controls").append(Button("Increase+", function() {
  Circles.grow(5);
}));

$("#controls").append(Button("Decrease+", function() {
  Circles.grow(-5);
}));

$("<input type='button' value='Add Circle'/>").click(function() {
  Circles.add();
}).appendTo($("#controls"));

$("<input type='button' value='Add Attachment Point'/>").click(function() {
  AttachmentPoints.add();
}).appendTo($("#controls"));

$("<input type='button' value='Remove Circle' />").click(function() {
  Circles.remove();
}).appendTo($("#controls"));

$("<input type='button' value='Previous Frame' />").click(function() {
  previousFrame();
}).appendTo($("#controls"));

$("<input type='button' value='Next Frame'/>").click(function() {
  nextFrame();
}).appendTo($("#controls"));

function loadAnimationJSON(url) {
  Animation.loadJSONUrl(url, function(a, data) {
    animation = a;
    currentFrame = a.frame();
    animationJSON = data;
    frames = [];
  });
};

function loadModel(url) {
  Model.loadJSONUrl(url, function(model, animData) {
    if(model.frames) {
      frames = model.frames;
    } else {
      frames = $.map(model.hitFrames, function(circles) {
        return {
          attachmentPoints: {},
          circles: circles
        };
      });
    }
    animation = model.animation;
    animationJSON = animData;
  });
}

$("#loadImage").click(function() {
  loadAnimationJSON($(this).prev().val());
});

$("#loadModel").click(function() {
  loadModel($(this).prev().val());
}).click();

$("#export").click(function() {
  alert(JSON.stringify({
    animation: animationJSON,
    frames: frames
  }, null, 2));
});
