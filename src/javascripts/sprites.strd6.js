(function() {
  var spriteCache = {};
  var animImageCache = {};

  function LoaderProxy() {
    return {
      draw: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null
    };
  }

  var brokenImageWarning = function(url) {
    return function() {
      if(warning) {
        warning("Could not load: " + url);
      }
    }
  }

  // Asset Tracking for load progress
  var assetCount = 0;
  var loadedAssets = 0;
  function track(asset) {
    assetCount++;

    asset.load(function() {
      loadedAssets++;
    });
  }

  window["AssetTracker"] = {
    count: function() {
      return [loadedAssets, assetCount];
    }
  }

  var Sprite = function(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      update: $.noop,

      draw: function(canvas, x, y, sx, sy, swidth, sheight) {
        canvas.drawImage(image,
          sx || sourceX,
          sy || sourceY,
          swidth || width,
          sheight || height,
          x,
          y,
          swidth || width,
          sheight || height
        );
      },

      frame: function(newFrame) {
        if(newFrame !== undefined) {
          return this;
        } else {
          return 0;
        }
      },

      frameCount: function() {
        return 1;
      },

      width: width,
      height: height
    };
  };

  Sprite.load = function(url, loadedCallback) {
    if(spriteCache[url]) {
      setTimeout(loadedCallback, 0);
      return spriteCache[url]
    } else {
      var img = new Image();
      var proxy = LoaderProxy();

      spriteCache[url] = proxy;

      img.onload = function() {
        var tile = Sprite(this);

        $.extend(proxy, tile);

        if(loadedCallback) {
          loadedCallback(proxy);
        }
      };

      if(url) {
        track($(img));
      }
      img.onerror = brokenImageWarning(url);

      img.src = url;

      return proxy;
    }
  };

  Sprite.EMPTY = LoaderProxy();

  window["Sprite"] = Sprite;


  window["Composite"] = function(tileData) {
    var tileCount = tileData.length;

    var self = {
      update: function() {},

      draw: function(canvas, x, y, options) {
        var datum;

        for(var i = 0; i < tileCount; i++) {
          datum = tileData[i];

          canvas.withState(x, y, options, function() {
            datum.tile.draw(canvas, datum.x, datum.y, datum.options);
          });
        }
      }
    };

    return self;
  };

  var Animation = function(options) {
    var frameData = options.frameData;
    var delay = options.delay;
    var destinationOffset = options.destinationOffset || Point(0, 0);

    var count = 0;
    var currentFrame = 0;
    var frameCount = frameData.length;
    delay = delay || 1;

    return {
      draw: function(canvas, x, y, options) {
        frameData[currentFrame].draw(canvas,
          x + destinationOffset.x,
          y + destinationOffset.y,
          options
        );
      },

      duration: function() {
        return frameCount * delay;
      },

      frame: function(newFrame) {
        if(newFrame !== undefined) {
          currentFrame = newFrame % frameCount;
          return this;
        } else {
          return currentFrame;
        }
      },

      frameCount: function() {
        return frameCount;
      },

      update: function() {
        count++;

        if(count % delay == 0) {
          currentFrame = (currentFrame + 1) % frameCount;
          count = 0;
        }
      }
    };
  };

  Animation.load = function(options, proxy, callback) {
    var url = options.url;
    var frames = options.frames;
    var delay = options.delay;
    var width = options.width;
    var height = options.height;

    proxy = proxy || LoaderProxy();

    proxy.width = width;
    proxy.height = height;

    var process = function() {
      var frameData = [];
      var img = this;

      frames.times(function(i) {
        frameData[i] = Sprite(img, i * width, 0, width, height);
      });

      $.extend(proxy, Animation({
        delay: delay,
        destinationOffset: options.destinationOffset,
        frameData: frameData
      }));

      if(callback) {
        callback(proxy);
      }
    }

    var $img;
    if(animImageCache[url]) {
      $img = animImageCache[url];

      setTimeout(function() {
        process.apply($img.get(0))
      }, 0);
    } else {
      var img = new Image();
      $img = $(img);

      if(url) {
        track($img);
      }
      $img.error(brokenImageWarning(url));

      img.src = url;
      animImageCache[url] = $img;

      $img.load(process);
    }

    return proxy;
  };

  Animation.loadJSON = function(data, proxy, callback) {
    proxy = proxy || LoaderProxy();

    var animCallback = function(animation) {
      if(callback) {
        callback(animation, data);
      }
    };

    Animation.load(data, proxy, animCallback);

    return proxy;
  };

  Animation.loadJSONUrl = function(url, callback) {
    var proxy = LoaderProxy();

    $.getJSON(url, function(data, status) {
      Animation.loadJSON(data, proxy, callback);
    });

    return proxy;
  };

  window["Animation"] = Animation;

  window["Actor"] = function(states, defaultState, callbacks) {
    var state = defaultState || "default";

    return {
      update: function() {
        if(states[state]) {
          states[state].update();
        }
        callbacks.update.call(this, state);
      },

      draw: callbacks.draw,

      state: function(newState) {
        if(newState === undefined) {
          return state;
        } else {
          state = newState;
          return this;
        }
      }
    };
  };

  window["loadAnimation"] = function(url, frames, width, height, delay) {
    return Animation.load({
      url: url,
      frames: frames,
      width: width,
      height: height,
      delay: delay
    });
  };
})();
