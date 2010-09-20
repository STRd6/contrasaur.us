/**
 * A Model is an animation and the list of hit circles that go with each frame.
 *
 * It includes a convenient update method to keep the hitFrame and current
 * animation frame in sync.
 */
function Model(animation, frames, hitFrames) {

  return {
    animation: animation,
    frames: frames,
    /**
     * Returns the array of circles representing the current hit frame.
     */
    hitFrame: function() {
      var curFrame = frames[animation.frame()];

      if(curFrame) {
        return curFrame.circles;
      } else {
        return [];
      }
    },

    hitFrames: hitFrames,

    attachment: function(name) {
      var currentFrame = frames[animation.frame()];
      if(currentFrame.attachmentPoints) {
        if(currentFrame.attachmentPoints[name]) {
          return currentFrame.attachmentPoints[name];
        } else {
          //warning("no attachment point for " + name + " in " + this.url);
          return {
            x: 0,
            y: 0,
            direction: 0
          };
        }
      } else {
        //warning("no attachment points for " + this.url);
        return {
          x: 0,
          y: 0,
          direction: 0
        };
      }

    },

    update: function() {
      animation.update();
    }
  }
}

/**
 * Loads a model from the JSON data at a specified URL.
 */
Model.loadJSONUrl = function(url, callback) {
  var proxy = {
    hitFrames: $.noop,
    update: $.noop,
    url: url
  };

  var animCallback = function(animation, animationData) {
    if(callback) {
      callback(proxy, animationData)
    }
  };

  $.getJSON(url, function(data) {
    var model = Model(Animation.loadJSON(data.animation, null, animCallback), data.frames, data.hitFrames);

    $.extend(proxy, model);

    if(data.animation.destinationOffset) {
      $.each(proxy.frames, function(i, frame) {
        $.each(frame.circles, function(j, circle) {
          circle.x += data.animation.destinationOffset.x;
          circle.y += data.animation.destinationOffset.y;
        });
      });
    }
  });

  return proxy;
};
