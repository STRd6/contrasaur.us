function control(character) {
  $.each({

    "w up": function() {
      character.keyDown().up = true;
    },

    "t": function() {
      character.keyDown().t = true;
      character.toss();
    },

    "left a": function() {
      character.keyDown().left = true;

      if (!character.airborne()) {
        character.xVelocity(-6);
      }
    },

    "right d": function() {
      character.keyDown().right = true;
      if (!character.airborne()) {
        character.xVelocity(6);
      }
    },

    "down s": function() {
      character.keyDown().down = true;
    },

    "space": function() {
      character.keyDown.space = true;
      character.bite();
    },

     "+": character.nextWeapon(),

     "-": character.prevWeapon()
  }, function(key, fn) {
    $(document).bind('keydown', key, function() {
      fn();
      return false;
    });
  });

  $(document).bind('keyup', 'w up', function() {
    character.keyDown().up = false;
  });

  $(document).bind('keyup', 'left a', function() {
    character.keyDown().left = false;

    if(!character.airborne()) {
      character.xVelocity(0);
    }
  });

  $(document).bind('keyup', 'right d', function() {
    character.keyDown().right = false;
    if(!character.airborne()) {
      character.xVelocity(0);
    }
  });

  $(document).bind('keyup', 'down s', function() {
    character.keyDown().down = false;
  });

  $("#gameCanvas").mousedown(function(event) {
       if(event.button == 0) {
         shooting = true;
       } else {
         secondaryShooting = true;
       }

     return false;
   }).mouseup(function() {
     if(event.button == 0) {
       shooting = false;
     } else {
       secondaryShooting = false;
     }
   }).bind("mousewheel", function(event, delta) {
     if(delta > 0) {
       character.nextWeapon();
     } else {
       character.prevWeapon();
     }
   });
}