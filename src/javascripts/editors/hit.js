var transform = Matrix.translation(320, 240);
var animation;
var animationJSON;
var currentFrame = 0;
var active = {};

var frames;

// Display properties
var showCircles = true;
var showAttachmentPoints = true;
var attachmentRadius = 5;
var attachmentColor = "rgba(0, 255, 0, 0.5)";
var activeColor = "rgba(255, 0, 255, 0.5)";
var circleColor = "rgba(255, 0, 0, 0.5)";

$('#editorCanvas').powerCanvas({init: function(canvas) {
  var character = GameObject().extend({
    attachmentPoints: function() {
      var attachmentPoints = {};
      var transform = this.getTransform();

      if(frames && frames[currentFrame]) {

        $.each(frames[currentFrame].attachmentPoints, function(name, point) {
          // Clean Point
          point.direction = point.direction || 0;
          delete point.radius;

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

      if(frames && frames[currentFrame]) {
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

      if(showCircles) {
        $.each(this.getCircles(), function(i, circle) {
          var color = (circle.circle == active["circles"] ? activeColor : circleColor);
          canvas.fillCircle(circle.x, circle.y, circle.radius, color);
        });
      }

      if(showAttachmentPoints) {
        $.each(this.attachmentPoints(), function(name, point) {
          var color = (point.point == active["attachmentPoints"] ? activeColor : attachmentColor)
          canvas.fillCircle(point.x, point.y, attachmentRadius, color);
          canvas.fillText(name, point.x, point.y - 10);

          var target_x = point.x + attachmentRadius * Math.cos(point.direction);
          var target_y = point.y + attachmentRadius * Math.sin(point.direction);
          canvas.strokeColor("black");
          canvas.drawLine(point.x, point.y, target_x, target_y, 1);
        });
      }
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

    if(showAttachmentPoints) {
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
    }

    if(showCircles) {
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
    }

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
    var circlesCopy = frames[0].circles.slice(0).map(function(circle) {
      return {
        x: circle.x,
        y: circle.y,
        radius: circle.radius
      };
    });

    var attachmentPointsCopy = {};
    $.each(frames[0].attachmentPoints, function(name, point) {
      attachmentPointsCopy[name] = $.extend({}, point);
    });

    frames.push({ circles: circlesCopy, attachmentPoints: attachmentPointsCopy });
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
  }

  return {
    add: function(param) {
      active[component] = creator();
      if(component === "circles") {
        getter().push(active[component]);
      } else {
        frames[currentFrame][component][param] = active[component];
      }
    },

    grow: function(delta) {
      var c = active[component];
      if(c) {
        c.radius = (delta + c.radius).clamp(1, 1000);
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
    direction: 0
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
  },
  "tab": function() {
    Circles.next();
  },
  "d": function() {
    Circles.remove();
  }
}

$.each(keyEvents, function(key, fn) {
  $(document).bind('keydown', key, function() {
    fn();
    return false;
  });
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

$("#controls").append(Button("Add Attachment Point", function() {
  var name = prompt("Attachment point name:", '');

  if(name) {
    AttachmentPoints.add(name);
  }
}));

$("#controls").append(Button("Add Circle", function() {
  Circles.add();
}));

$("#controls").append(Button("Remove Circle", function() {
  Circles.remove();
}));

$("#controls").append(Button("Previous Frame", function() {
  previousFrame();
}));

$("#controls").append(Button("Next Frame", function() {
  nextFrame();
}));

$("#controls").append(Button("Set Attachment Direction", function() {
  if(active.attachmentPoints) {
    var direction = eval(prompt("Direction:", ''));
    active.attachmentPoints.direction = direction;
  } else {
    alert("No point selected");
  }
}));

$("#controls").append(Button("Toggle Show Circles", function() {
  showCircles = !showCircles;
}));

function loadAnimationJSON(url) {
  Animation.loadJSONUrl(url, function(a, data) {
    animation = a;
    currentFrame = a.frame();
    animationJSON = data;
    frames = [{attachmentPoints: {}, circles: []}];
  });
}

function loadImage(url) {
  Sprite.load(url, function(sprite) {
    animation = sprite;
    currentFrame = animation.frame();
    //TODO: Animation JSON or a switch to export only the circles
    frames = [{attachmentPoints: {}, circles: []}];
  });
}

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
  loadImage($(this).prev().val());
});

$("#loadAnimation").click(function() {
  loadAnimationJSON($(this).prev().val());
});

$("#loadModel").click(function() {
  loadModel($(this).prev().val());
}).click();

$("#export").click(function() {
  $("#output").text(JSON.stringify({
    animation: animationJSON,
    frames: frames
  }, null, 2));
});
