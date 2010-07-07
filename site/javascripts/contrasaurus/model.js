/**
 * A Model is an animation and the list of hit circles that go with each frame.
 *
 * It includes a convenient update method to keep the hitFrame and current
 * animation frame in sync.
 */
function Model(animation, hitFrames) {

  return {
    animation: animation,
    /**
     * Returns the array of circles representing the current hit frame.
     */
    hitFrame: function() {
      return hitFrames[animation.frame()];
    },
    hitFrames: hitFrames,
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
    update: $.noop
  };

  var animCallback = function(animation, data) {
    if(callback) {
      callback(proxy, animation, data)
    }
  };

  $.getJSON(url, function(data) {
    var model = Model(Animation.loadJSON(data.animation, null, animCallback), data.hitFrames);

    $.extend(proxy, model);
  });

  return proxy;
};
