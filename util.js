function rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * Randomly select an element from the array.
 *
 * @return a random element from an array
 */
Array.prototype.rand = function() {
  return this[rand(this.length)];
};

Math.clamp = function(val, min, max) {
  return Math.min(Math.max(val, min), max);
};

Number.prototype.times = function(iterator, context) {
  for(var i = 0; i < this; i++) {
    iterator.call(context, i);
  }
  return i;
}

function before(method, interception) {
  return function() {
    interception.apply(this, arguments);
    return method.apply(this, arguments);
  };
}

function after(method, interception) {
  return function() {
    var returnValue = method.apply(this, arguments);
    interception.apply(this, arguments);
    return returnValue;
  };
}

/**
 * Merges properties from objects into target without overiding.
 * First come, first served.
 * @return target
 */
jQuery.extend({
  reverseMerge: function(target) {
    var i = 1, length = arguments.length;
    
    for( ; i < length; i++) {
      var object = arguments[i];

      for(var name in object) {
        if(!target.hasOwnProperty(name)) {
          target[name] = object[name];
        }
      }
    }
    
    return target;
  }
});
