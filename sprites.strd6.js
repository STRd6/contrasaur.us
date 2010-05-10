var Tile = function(image, sourceX, sourceY, width, height) {
  var self = {
    update: function() {},

    draw: function(canvas, x, y, options) {
      canvas.drawImage(image,
        sourceX,
        sourceY,
        width,
        height,
        x,
        y,
        width,
        height,
        options
      );
    }
  };
  return self;
};

var Composite = function(tileData) {
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
  self.tileData = tileData;
  return self;
};

var Animation = function(frameData) {
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

var Actor = function(states, defaultState, callbacks) {
  var state = defaultState || "default";
  var timedEvents = [];

  return {
    addTimedEvent: function(count, callback) {
      timedEvents.push({
        count: count,
        callback: callback
      })
    },
    
    update: function() {
      timedEvents.each(function(timedEvent){
        if (timedEvent.count == 0) {
          timedEvent.callback.call(this);
        }
        timedEvent.count--;
      });
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
