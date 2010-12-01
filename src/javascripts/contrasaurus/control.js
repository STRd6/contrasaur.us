function Control(character, keyDown) {
  $.each({
    "return": function() {
      shooting = !shooting;
    },

    "w up ,": function() {
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

    "right d e": function() {
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

    "down s o": function() {
      keyDown.down = true;
    },

    "space": function() {
      keyDown.space = true;
      character.bite();
    },
    "'": function() {
      keyDown.aimAntiClockwise = true;
    },
    ".": function() {
      keyDown.aimClockwise = true;
    }
  }, function(key, fn) {
    $(document).bind('keydown', key, function() {
      fn();
      return false;
    });
  });

  $.each({
    "w up ,": function() {
      keyDown.up = false;
    },
    "down s o": function() {
      keyDown.down = false;
    },
    "'": function() {
      keyboardAiming = true;
      keyDown.aimAntiClockwise = false;
    },
    ".": function() {
      keyboardAiming = true;
      keyDown.aimClockwise = false;
    }
  }, function(key, fn) {
    $(document).bind('keyup', key, function(event) {
      event.preventDefault();

      fn();
    });
  });

  $(document).bind('keyup', 'left a', function() {
    keyDown.left = false;

    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  });

  $(document).bind('keyup', 'right d e', function() {
    keyDown.right = false;
    if(!character.airborne()) {
      character.xVelocity(0);
      character.transition(character.states().idle1);
    }
  });

  $(document).mousedown(function(event) {
    event.preventDefault();

    if(event.button != 0) {
      character.bite();
    }
  });

  $("#game_container").mousedown(function(event) {
    event.preventDefault();

    if(event.button == 0) {
      shooting = true;
    }
  }).mouseup(function(event) {
    event.preventDefault();

    if(event.button == 0) {
      shooting = false;
    }
  }).bind("mousewheel", function(event, delta) {
    if(delta > 0) {
      character.nextWeapon();
    } else {
      character.prevWeapon();
    }
  });
}
