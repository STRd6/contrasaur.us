/*

Postmaster wraps the `postMessage` API with promises.
 */
var Postmaster = (function () {
var Postmaster, ackTimeout, defaultReceiver,
  slice = [].slice;

defaultReceiver = self;

ackTimeout = 1000;

Postmaster = function(self) {
  var dominant, pendingResponses, remoteId, send;
  if (self == null) {
    self = {};
  }
  send = function(data) {
    var target;
    target = self.remoteTarget();
    if ((typeof Worker === "undefined" || Worker === null) || target instanceof Worker) {
      return target.postMessage(data);
    } else {
      return target.postMessage(data, "*");
    }
  };
  dominant = Postmaster.dominant();
  if (self.remoteTarget == null) {
    self.remoteTarget = function() {
      return dominant;
    };
  }
  if (self.receiver == null) {
    self.receiver = function() {
      return defaultReceiver;
    };
  }
  if (self.ackTimeout == null) {
    self.ackTimeout = function() {
      return ackTimeout;
    };
  }
  self.receiver().addEventListener("message", function(event) {
    var data, id, method, params, ref, type;
    if (event.source === self.remoteTarget() || !event.source) {
      data = event.data;
      type = data.type, method = data.method, params = data.params, id = data.id;
      switch (type) {
        case "ack":
          return (ref = pendingResponses[id]) != null ? ref.ack = true : void 0;
        case "response":
          return pendingResponses[id].resolve(data.result);
        case "error":
          return pendingResponses[id].reject(data.error);
        case "message":
          send({
            type: "ack",
            id: id
          });
          return Promise.resolve().then(function() {
            if (typeof self[method] === "function") {
              return self[method].apply(self, params);
            } else {
              throw new Error("`" + method + "` is not a function");
            }
          }).then(function(result) {
            return send({
              type: "response",
              id: id,
              result: result
            });
          })["catch"](function(error) {
            var message;
            if (typeof error === "string") {
              message = error;
            } else {
              message = error.message;
            }
            return send({
              type: "error",
              id: id,
              error: {
                message: message,
                stack: error.stack
              }
            });
          });
      }
    }
  });
  pendingResponses = {};
  remoteId = 0;
  self.invokeRemote = function() {
    var id, method, params;
    method = arguments[0], params = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    id = remoteId++;
    send({
      type: "message",
      method: method,
      params: params,
      id: id
    });
    return new Promise(function(resolve, reject) {
      var ackWait, clear, timeout;
      clear = function() {
        clearTimeout(pendingResponses[id].timeout);
        return delete pendingResponses[id];
      };
      ackWait = self.ackTimeout();
      timeout = setTimeout(function() {
        var pendingResponse;
        pendingResponse = pendingResponses[id];
        if (pendingResponse && !pendingResponse.ack) {
          clear();
          return reject(new Error("No ack received within " + ackWait));
        }
      }, ackWait);
      return pendingResponses[id] = {
        timeout: timeout,
        resolve: function(result) {
          clear();
          return resolve(result);
        },
        reject: function(error) {
          clear();
          return reject(error);
        }
      };
    });
  };
  return self;
};

Postmaster.dominant = function() {
  if (typeof window !== "undefined" && window !== null) {
    return opener || ((parent !== window) && parent) || void 0;
  } else {
    return self;
  }
};

return Postmaster;
}());
