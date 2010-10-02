function Core(I) {
  var __slice = Array.prototype.slice;
  I = I || {};

  var self = {
    attrAccessor: function() {
      var attrNames;
      attrNames = __slice.call(arguments, 0);

      attrNames.each(function(attrName) {
        (self[attrName] = function(newValue) {
          if (typeof newValue !== "undefined" && newValue !== null) {
            I[attrName] = newValue;
            return self;
          } else {
            return I[attrName];
          }
        });
      });
    },

    attrReader: function() {
      var attrNames;
      attrNames = __slice.call(arguments, 0);

      attrNames.each(function(attrName) {
        (self[attrName] = function() {
          return I[attrName];
        });
      });
    },

    extend: function(options) {
      var afterMethods = options.after;
      var beforeMethods = options.before;

      delete options.after;
      delete options.before;

      $.each(options, function(name, method) {
        self[name] = method;
      });

      if(beforeMethods) {
        $.each(beforeMethods, function(name, method) {
          self[name] = before(self[name], method);
        });
      }

      if(afterMethods) {
        $.each(afterMethods, function(name, method) {
          self[name] = after(self[name], method);
        });
      }

      return self;
    }
  };

  return self;
}
