
// Need to test patched jQuery more

//Object.prototype.each = function(iterator) {
//  for(var key in this) {
//    if(this.hasOwnProperty(key)) {
//      iterator(key, this[key]);
//    }
//  }
//
//  return this;
//};
//
//Object.prototype.merge = function(source) {
//  for(var key in source) {
//    if(source.hasOwnProperty(key)) {
//      this[key] = source[key];
//    }
//  }
//
//  return this;
//};
//
//Object.prototype.reverseMerge = function(source) {
//  for(var key in source) {
//    if(source.hasOwnProperty(key) && !(key in this)) {
//      this[key] = source[key];
//    }
//  }
//
//  return this;
//};
