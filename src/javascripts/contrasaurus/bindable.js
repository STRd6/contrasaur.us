function Bindable() {

  var eventCallbacks = {};

  return {
    bind: function(event, callback) {
      eventCallbacks[event] = eventCallbacks[event] || [];

      eventCallbacks[event].push(callback);
    },

    trigger: function(event) {
      var callbacks = eventCallbacks[event];

      if(callbacks && callbacks.length) {
        var self = this;
        $.each(callbacks, function(i, callback) {
          callback(self);
        });
      }
    },
  };
}
