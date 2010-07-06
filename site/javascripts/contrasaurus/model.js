function Model(animation, hitFrames) {

  return {
    animation: animation,
    hitFrames: function() {
      return hitFrames[animation.frame()];
    },
    update: function() {
      animation.update();
    }
  }
}
