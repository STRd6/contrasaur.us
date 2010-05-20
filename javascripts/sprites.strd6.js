(function(){
  function LoaderProxy() {
    return {
      draw: function() {},
      update: function(){},
      width: null,
      height: null
    };
  }

  window["Tile"] = function(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      update: function() {},

      draw: function(canvas, x, y, options) {
        var registrationPoint = this.registrationPoint;

        canvas.withState(x + registrationPoint.x, y + registrationPoint.y, options, function() {
            canvas.drawImage(image,
            sourceX,
            sourceY,
            width,
            height,
            -registrationPoint.x,
            -registrationPoint.y,
            width,
            height
          );
        });
      },
      registrationPoint: {
        x: width/2,
        y: height/2
      },
      width: width,
      height: height
    };
  };

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

  window["Animation"] = function(frameData) {
    var currentFrame = 0;
    var frameCount = frameData.length;

    return {
      update: function() {
        currentFrame = (currentFrame + 1) % frameCount;
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

    img.src = url;

    return proxy;
  };
})();