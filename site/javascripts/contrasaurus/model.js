function Model(animation, hitFrames) {

  return {
    animation: animation,
    hitFrames: function() {
      return hitFrames[animation.frame()];
    },
    update: function() {
      animation.update();
    }
  }
}

Model.loadJSONUrl = function(url, callback) {
  var proxy = {
    hitFrames: $.noop,
    update: $.noop
  };

  $.getJSON(url, function(data) {
    var model = Model(Animation.loadJSON(data.animation, null, callback), data.hitFrames);

    $.extend(proxy, model);

    if(callback) {
      callback(proxy);
    }
  });

  return proxy;
};
