(function(){
  function LoaderProxy() {
    return {
      draw: $.noop,
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

  var Tile = function(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      update: function() {},

      draw: function(canvas, x, y, options) {
        canvas.withState(x, y, options, function() {
          canvas.drawImage(image,
            sourceX,
            sourceY,
            width,
            height,
            0,
            0,
            width,
            height
          );
        });
      },
      width: width,
      height: height
    };
  };

  window["Tile"] = Tile;
  Tile.EMPTY = LoaderProxy();

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

  window["Animation"] = function(frameData, delay) {
    var count = 0;
    var currentFrame = 0;
    var frameCount = frameData.length;
    delay = delay || 1;

    return {
      update: function() {
        count++;

        if(count % delay == 0) {
          currentFrame = (currentFrame + 1) % frameCount;
          count = 0;
        }
      },

      draw: function(canvas, x, y, options) {
        frameData[currentFrame].draw(canvas, x, y, options);
      }
    };
  };

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
    var img = new Image();
    var proxy = LoaderProxy();

    proxy.width = width;
    proxy.height = height;

    img.onload = function() {
      var frameData = [];

      frames.times(function(i) {
        frameData[i] = Tile(img, i * width, 0, width, height);
      });

      $.extend(proxy, Animation(frameData, delay));
    };

    img.onerror = brokenImageWarning(url);

    img.src = url;

    return proxy;
  };

  window["loadImageTile"] = function(url, loadedCallback) {
    var img = new Image();
    var proxy = LoaderProxy();

    img.onload = function() {
      var tile = Tile(this);

      $.extend(proxy, tile);

      if(loadedCallback) {
        loadedCallback(proxy);
      }
    };

    img.onerror = brokenImageWarning(url);

    img.src = url;

    return proxy;
  };
})();