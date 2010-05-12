Math.clamp = function(val, min, max) {
  return Math.min(Math.max(val, min), max);
};

Number.prototype.times = function(iterator, context) {
  for(var i = 0; i < this; i++) {
    iterator.call(context, i);
  }
  return i;
}
