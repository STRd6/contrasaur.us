function Control(character, keyDown) {

  function getRelativePoint(htmlElement, touchEvent) {
    var offset = htmlElement.offset();
    var localX = touchEvent.pageX - offset.left;
    var localY = touchEvent.pageY - offset.top;

    return Point(localX, localY);
  }

  function pressingDpad(localPoint) {
    var keyPushed;

    if ((localPoint.x > 0 && localPoint.x < 80) && (localPoint.y > 52.5 && localPoint.y < 160)) {
      keyPushed = "left";
    } else if ((localPoint.x > 0 && localPoint.x < 52.5) && (localPoint.y > 0 && localPoint.y < 52.5)) {
      keyPushed = "up-left";
    } else if ((localPoint.x >= 80 && localPoint.x <= 160) && (localPoint.y > 52.5 && localPoint.y < 160)) {
      keyPushed = "right";
    } else if ((localPoint.x >= 107.5 && localPoint.x < 160) && (localPoint.y > 0 && localPoint.y < 52.5)) {
      keyPushed = "up-right";
    } else if ((localPoint.x >= 52.5 && localPoint.x < 107.5) && (localPoint.y > 0 && localPoint.y < 52.5)) {
      keyPushed = "up";
    }

    return keyPushed;
  }

  function walkLeft() {
    if (!character.airborne() && (character.currentState() !== character.states().bite)) {
      character.xVelocity(-WALK_VELOCITY);
      character.transition(character.states().walk);
    } else {
      if (!character.states().flyBite) {
        character.transition(character.state().fly);
      }
    }
  }

  function walkRight() {
    if (!character.airborne() && (character.currentState() !== character.states().bite)) {
      character.xVelocity(WALK_VELOCITY);
      character.transition(character.states().walk);
    } else {
      if (!character.states().flyBite) {
        character.transition(character.state().fly);
      }
    }
  }

  function land() {
    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  }

  $.each({

    "w up": function() {
      keyDown.up = true;

      if (character.hasJetpack() && (character.currentState() !== character.states().bite)) {
        character.transition(character.states().fly);
      }
    },

    "t": function() {
      keyDown.t = true;
      character.toss();
    },

    "left a": function() {
      keyDown.left = true;
      walkLeft();
    },

    "right d": function() {
      keyDown.right = true;
      walkRight();
    },

    "down s": function() {
      keyDown.down = true;
    },

    "space": function() {
      keyDown.space = true;
      character.bite();
    }
  }, function(key, fn) {
    $(document).bind('keydown', key, function() {
      fn();
      return false;
    });
  });

  // Prevent default scrolling behavior
  $('body').bind('touchmove', function(e){
    e.preventDefault();
  });

  $('.touch').bind('touchstart', handleTouch);

  $('#button').bind('touchstart', function(e){
    keyDown.space = true;

    character.bite();
  });

  $('#control').bind('touchmove touchstart', function(e) {
    e.preventDefault();
    var el = $(this);

    $.each(event.changedTouches, function(i, touch) {
      var point = getRelativePoint(el, touch);

      if (pressingDpad(point) == "left") {
        keyDown.left = true;
        keyDown.right = false;
        keyDown.up = false;

        walkLeft();
      }

      if (pressingDpad(point) == "up-left") {
        keyDown.left = true;
        keyDown.up = true;
        keyDown.right = false;
      }

      if (pressingDpad(point) == "right") {
        keyDown.right = true;
        keyDown.left = false;
        keyDown.up = false;

        walkRight();
      }

      if (pressingDpad(point) == "up-right") {
        keyDown.right = true;
        keyDown.up = true;
        keyDown.left = false;
      }

      if (pressingDpad(point) == "up") {
        keyDown.up = true;

        if (character.hasJetpack() && (character.currentState() !== character.states().bite)) {
          character.transition(character.states().fly);
        }
      }
    });
  });

  $('#control').bind('touchend', function() {
    keyDown.up = false;
    keyDown.left = false;
    keyDown.right = false;
    keyDown.space = false;
    land();
  });

  $(document).bind('keyup', 'w up', function() {
    keyDown.up = false;
  }).bind('keyup', 'left a', function() {
    keyDown.left = false;
    land();
  }).bind('keyup', 'right d', function() {
    keyDown.right = false;
    land();
  }).bind('keyup', 'down s', function() {
    keyDown.down = false;
  });

  $("#game_container").mousedown(function(event) {
    if(event.button == 0) {
      shooting = true;
    } else {
      secondaryShooting = true;
    }
    return false;
  }).mouseup(function(event) {
    if(event.button == 0) {
      shooting = false;
    } else {
      secondaryShooting = false;
    }
  }).bind('touchstart', function(e) {
    e.preventDefault();
    var el = $(this);

    $.each(event.changedTouches, function(i, touch) {

      if (touch.pageY < 320) {
        target = getRelativePoint(el, touch);
        shooting = true;
      }
    });
  }).bind('swipe', function(e) {
    e.preventDefault();
    shooting = false;
  });
}
