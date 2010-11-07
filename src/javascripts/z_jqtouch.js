function handleTouch(e) {
  var $el = $(e.target);

  if (e) {
    var hoverTimeout = null,
        startX = event.changedTouches[0].clientX,
        startY = event.changedTouches[0].clientY,
        startTime = (new Date).getTime(),
        deltaX = 0,
        deltaY = 0,
        deltaT = 0;

    // Let's bind these after the fact, so we can keep some internal values
    $el.bind('touchmove', touchmove).bind('touchend', touchend);
  }

  // Private touch functions (TODO: insert dirty joke)
  function touchmove(e) {

    updateChanges();
    var absX = Math.abs(deltaX);
    var absY = Math.abs(deltaY);

    // Check for swipe
    if (absX > absY && (absX > 35) && deltaT < 1000) {
      $el.trigger('swipe', {direction: (deltaX < 0) ? 'left' : 'right', deltaX: deltaX, deltaY: deltaY }).unbind('touchmove',touchmove).unbind('touchend',touchend);
    }

    clearTimeout(hoverTimeout);
  }

  function touchend() {
    updateChanges();

    if (deltaY === 0 && deltaX === 0) {
      $el.trigger('tap');
    }

    $el.unbind('touchmove',touchmove).unbind('touchend',touchend);
    clearTimeout(hoverTimeout);
  }

  function updateChanges() {
    var first = event.changedTouches[0] || null;
    deltaX = first.pageX - startX;
    deltaY = first.pageY - startY;
    deltaT = (new Date).getTime() - startTime;

    if (deltaY < 10 && deltaX < 10) {
      $el.trigger('held');
    }
  }
}
