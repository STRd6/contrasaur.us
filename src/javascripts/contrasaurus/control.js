function Control(character, keyDown) {
  var tapCounter = 0;

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

      if (!character.airborne() && (character.currentState() !== character.states().bite)) {
        character.xVelocity(-WALK_VELOCITY);
        character.transition(character.states().walk);
      } else {
        if (!character.states().flyBite) {
          character.transition(character.state().fly);
        }
      }
    },

    "right d": function() {
      keyDown.right = true;

      if (!character.airborne() && (character.currentState() !== character.states().bite)) {
        character.xVelocity(WALK_VELOCITY);
        character.transition(character.states().walk);
      } else {
        if (!character.states().flyBite) {
          character.transition(character.state().fly);
        }
      }
    },

    "down s": function() {
      keyDown.down = true;
    },

    "space": function() {
      keyDown.space = true;
      character.bite();

      character.transition(character.states().bite);
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

    return false;
  });

  $('.touch').bind('touchstart', handleTouch);

  $('.touch').bind('tap', function(e) {
    keyDown.space = true;

    return false;
  });

  $('#button').bind('touchstart', function(e){
    keyDown.space = true;

    character.bite();

    character.transition(character.states().bite);

    return false;
  });

  $('#game_container').bind('touchstart', function(e) {
    var el = $(this);

    e.preventDefault();

    $.each(event.changedTouches, function(i, touch) {
      var offset = el.offset();

      var localY = touch.pageY - offset.top;
      var localX = touch.pageX - offset.left;

      target = Point(localX, localY);

      debugText = "X: " + localX + ", Y: " + localY;

      target = Point(localX, localY);

      if ((target.x > 480 && target.x < 640) && (target.y > 320 && target.y < 480)) {
        keyDown.space = true;

        character.bite();

        character.transition(character.states().bite);
      }
    });
  });

  $('#control').bind('touchmove', function(e) {
    var el = $(this);

    e.preventDefault();

    $.each(event.changedTouches, function(i, touch) {
      var offset = el.offset();

      var localY = touch.pageY - offset.top;
      var localX = touch.pageX - offset.left;

      target = Point(localX, localY);

      debugText = "X: " + localX + ", Y: " + localY;

      if ((target.x > 0 && target.x < 80) && (target.y > 52.5 && target.y < 160)) {
        keyDown.left = true;
        keyDown.right = false;

        if (!character.airborne() && (character.currentState() !== character.states().bite)) {
          character.xVelocity(-WALK_VELOCITY);
          character.transition(character.states().walk);
        } else {
          if (!character.states().flyBite) {
            character.transition(character.state().fly);
          }
        }
      }

      if ((target.x > 0 && target.x < 52.5) && (target.y > 0 && target.y < 52.5)) {
        keyDown.left = true;
        keyDown.up = true;
        keyDown.right = false;
      }

      if ((target.x >= 80 && target.x <= 160) && (target.y > 52.5 && target.y < 160)) {
        keyDown.right = true;
        keyDown.left = false;

        if (!character.airborne() && (character.currentState() !== character.states().bite)) {
          character.xVelocity(WALK_VELOCITY);
          character.transition(character.states().walk);
        } else {
          if (!character.states().flyBite) {
            character.transition(character.state().fly);
          }
        }
      }

      //up-right
      if ((target.x >= 107.5 && target.x < 160) && (target.y > 0 && target.y < 52.5)) {
        keyDown.right = true;
        keyDown.up = true;
        keyDown.left = false;
      }

      //up
      if ((target.x >= 52.5 && target.x < 107.5) && (target.y > 0 && target.y < 52.5)) {
        keyDown.up = true;

        if (character.hasJetpack() && (character.currentState() !== character.states().bite)) {
          character.transition(character.states().fly);
        }
      }
    });
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

    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  });

  $(document).bind('keyup', 'right d', function() {
    keyDown.right = false;
    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  });

  $(document).bind('keyup', 'down s', function() {
    keyDown.down = false;
  });

  $("#game_container").bind('touchstart', function() {
    console.log(tapCounter++);
    shooting = true;
  });

  $("#game_container").bind('swipe', function() {
    shooting = false;
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
  });
}
