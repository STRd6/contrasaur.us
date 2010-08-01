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
      return frames[animation.frame()].circles;
    },
    hitFrames: hitFrames,
    attachment: function(name) {
      if(animation.frame().attachmentPoints) {
        if(animation.frame().attachmentPoints[name]) {
          return animation.frame().attachmentPoints[name];
        } else {
          warning("no attachment point for " + name + " in " + this.url);
          return {
            x: 0,
            y: 0,
            direction: 0
          };
        }
      } else {
        warning("no attachment points for " + this.url);
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
  });

  return proxy;
};
