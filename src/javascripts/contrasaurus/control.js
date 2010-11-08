function Control(character, keyDown) {

  function getRelativePoint(htmlElement, touchEvent) {
    var offset = htmlElement.offset();
    var localX = touchEvent.pageX - offset.left;
    var localY = touchEvent.pageY - offset.top;

    return Point(localX, localY);
  }

  function pressingDpad(localPoint) {
    var directionPushed;

    if ((localPoint.x > 0 && localPoint.x < 80) && (localPoint.y > 52.5 && localPoint.y < 160)) {
      directionPushed = "left";
    } else if ((localPoint.x > 0 && localPoint.x < 52.5) && (localPoint.y > 0 && localPoint.y < 52.5)) {
      directionPushed = "up-left";
    } else if ((localPoint.x >= 80 && localPoint.x <= 160) && (localPoint.y > 52.5 && localPoint.y < 160)) {
      directionPushed = "right";
    } else if ((localPoint.x >= 107.5 && localPoint.x < 160) && (localPoint.y > 0 && localPoint.y < 52.5)) {
      directionPushed = "up-right";
    } else if ((target.x >= 52.5 && target.x < 107.5) && (target.y > 0 && target.y < 52.5)) {
      directionPushed = "up";
    }

    return directionPushed;
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
    event.preventDefault();
  });

  $('body').bind('touchstart', function(e){
    e.preventDefault();
    event.preventDefault();
  });

  $('.touch').bind('touchstart', handleTouch);

  $('.touch').bind('tap', function(e) {
    keyDown.space = true;

    return false;
  });

  $('#button').bind('touchstart', function(e){
    keyDown.space = true;

    character.bite();

    return false;
  });

  $('#gameCanvas').bind('touchstart', function(e) {
    e.preventDefault();
    var el = $(this);

    $.each(event.changedTouches, function(i, touch) {

      target = getRelativePoint(el, touch);

      if ((target.x > 480 && target.x < 640) && (target.y > 320 && target.y < 480)) {
        keyDown.space = true;

        character.bite();
      }
    });
  });

  $('#control').bind('touchmove', function(e) {
    e.preventDefault();
    var el = $(this);

    $.each(event.changedTouches, function(i, touch) {
      target = getRelativePoint(el, touch);

      if (pressingDpad(target) == "left") {
        keyDown.left = true;
        keyDown.right = false;

        walkLeft();
      }

      if (pressingDpad(target) == "up-left") {
        keyDown.left = true;
        keyDown.up = true;
        keyDown.right = false;
      }

      if (pressingDpad(target) == "right") {
        keyDown.right = true;
        keyDown.left = false;

        walkRight();
      }

      if (pressingDpad(target) == "up-right") {
        keyDown.right = true;
        keyDown.up = true;
        keyDown.left = false;
      }

      if (pressingDpad(target) == "up") {
        keyDown.up = true;

        if (character.hasJetpack() && (character.currentState() !== character.states().bite)) {
          character.transition(character.states().fly);
        }
      }
    });

    return false;
  });

  $('.touch').bind('touchend', function(e) {
    keyDown.up = false;
    keyDown.left = false;
    keyDown.right = false;
    keyDown.space = false;
  });

  $(document).bind('keyup', 'w up', function() {
    keyDown.up = false;
  });

  $(document).bind('keyup', 'left a', function() {
    keyDown.left = false;
    land();
  });

  $(document).bind('keyup', 'right d', function() {
    keyDown.right = false;
    land();
  });

  $(document).bind('keyup', 'down s', function() {
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
  }).bind('touchstart', function() {
    shooting = true;
  }).bind('swipe', function() {
    shooting = false;
  });
}
