function rand(n) {
  return Math.floor(Math.random() * n);
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * Randomly select an element from the array.
 *
 * @return a random element from an array
 */
Array.prototype.rand = function() {
  return this[rand(this.length)];
};

/**
 * Returns a mod useful for array wrapping.
 *
 * @param {Number} n
 * @param {Number} base
 */
Math.mod = function(n, base) {
  var result = n % base;

  if(result < 0 && base > 0) {
    result += base;
  }

  return result;
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

function circleCollision(gameObject1, gameObject2) {
  var c1 = gameObject1.getCircle();
  var c2 = gameObject2.getCircle();

  var dx = c1.x - c2.x;
  var dy = c1.y - c2.y;
  var dist = c1.radius + c2.radius;

  if(dx * dx + dy * dy <= dist * dist) {
    gameObject1.hit(gameObject2);
    gameObject2.hit(gameObject1);
  }
}

function planeCollision(gameObject, plane) {
  var circle = gameObject.getCircle();

  if(circle.y + circle.radius >= plane.y) {
    gameObject.hit(plane);
    plane.hit(gameObject);
  }
}

function transformPoint(point, transformMatrix) {
  return {
    x: transformMatrix.a * point.x + transformMatrix.b * point.y,
    y: transformMatrix.c * point.x + transformMatrix.d * point.y
  }
}