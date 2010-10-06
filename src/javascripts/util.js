/**
 * Generate uniformly distributed random numbers.
 *
 * @param {Number} [n]
 * @returns A Random integers from [0, n) if n is given, otherwise a random float
 * between 0 and 1.
 * @type Number
 */
function rand(n) {
  if(n !== undefined) {
    return Math.floor(Math.random() * n);
  } else {
    return Math.random();
  }
}

function isNaN(x) {
  return typeof(x) === "number" && !(x <= 0) && !(x >= 0);
}

function warning(message) {
  if(console && console.warn) {
    console.warn(message);
  }
}

/**
 * Randomly select an element from the array. The array remains unmodified.
 *
 * @returns A random element from an array, or undefined if the array is empty.
 */
Array.prototype.rand = function() {
  return this[rand(this.length)];
};

/**
 * Remove the first occurance of the given object from the array if it is
 * present.
 *
 * @param {Object} object The object to remove from the array if present.
 * @returns The removed object if present otherwise undefined.
 */
Array.prototype.remove = function(object) {
  var index = this.indexOf(object);
  if(index >= 0) {
    return this.splice(index, 1)[0];
  } else {
    return undefined;
  }
};

/**
 * Call the given iterator once for each element in the array,
 * passing in the element as the first argument, the index of
 * the element as the second argument, and this array as the
 * third argument.
 *
 * @param {Function} iterator Function to be called once for
 * each element in the array.
 * @param {Object} [context] Optional context parameter to be
 * used as `this` when calling the iterator function.
 *
 * @returns `this` to enable method chaining.
 */
Array.prototype.each = function(iterator, context) {
  if(this.forEach) {
    this.forEach(iterator, context);
  } else {
    var len = this.length;
    for(var i = 0; i < len; i++) {
      iterator.call(context, this[i], i, this);
    }
  }

  return this;
};

/**
 * A mod method useful for array wrapping. The range of the function is
 * constrained to remain in bounds of array indices.
 *
 * <pre>
 * Example:
 * Math.mod(-1, 5) === 4
 * </pre>
 *
 * @param {Number} n
 * @param {Number} base
 * @returns An integer between 0 and (base - 1) if base is positive.
 * @type Number
 */
Math.mod = function(n, base) {
  var result = n % base;

  if(result < 0 && base > 0) {
    result += base;
  }

  return result;
};

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

/**
 * Calls iterator the specified number of times, passing in a number of the
 * current iteration as a parameter. The number will be 0 on first call, 1 on
 * second call, etc.
 *
 * @param {Function} iterator The iterator takes a single parameter, the number
 * of the current iteration.
 * @param {Object} [context] The optional context parameter specifies an object
 * to treat as <code>this</code> in the iterator block.
 *
 * @returns The number of times the iterator was called.
 */
Number.prototype.times = function(iterator, context) {
  for(var i = 0; i < this; i++) {
    iterator.call(context, i);
  }
  return i;
};

/**
 * @returns The sign of this number, 0 if the number is 0.
 */
Number.prototype.sign = function() {
  if(this > 0) {
    return 1;
  } else if (this < 0) {
    return -1;
  } else {
    return 0;
  }
};

Number.prototype.abs = function() {
  return Math.abs(this);
};

Number.prototype.approach = function(target, maxDelta) {
  return (target - this).clamp(-maxDelta, maxDelta) + this;
};

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

function circleCollision(gameObject1, gameObject2) {
  var hit = false;
  var component1;
  var component2;

  $.each(gameObject1.getCircles(), function(i, c1) {
    if(hit) {
      return;
    }

    $.each(gameObject2.getCircles(), function(i, c2) {
      if(hit) {
        return;
      }

      var dx = c1.x - c2.x;
      var dy = c1.y - c2.y;
      var dist = c1.radius + c2.radius;

      if(dx * dx + dy * dy <= dist * dist) {
        hit = true;
        component1 = c1.component;
        component2 = c2.component;
      }
    });
  });

  if(hit) {
    component1.hit(component2);
    component2.hit(component1);
  }

  return hit;
}

function planeCollision(gameObject, plane) {
  var circles = gameObject.getCircles();
  var hit = false;
  var component;

  $.each(circles, function(i, circle) {
    if(hit) {
      return;
    }

    if(circle.y + circle.radius >= plane.y) {
      hit = true;
      component = circle.component;
    }
  });

  if(hit) {
    component.hit(plane);
    plane.hit(component);
  }

  return hit;
}
