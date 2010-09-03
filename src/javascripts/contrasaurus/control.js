function Control(character, keyDown) {
  $.each({

    "w up": function() {
      keyDown.up = true;
    },

    "t": function() {
      keyDown.t = true;
      character.toss();
    },

    "left a": function() {
      keyDown.left = true;

      if (!character.airborne()) {
        character.xVelocity(-6);
      }
    },

    "right d": function() {
      keyDown.right = true;
      if (!character.airborne()) {
        character.xVelocity(6);
      }
    },

    "down s": function() {
      keyDown.down = true;
    },

    "space": function() {
      keyDown.space = true;
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
    keyDown.up = false;
  });

  $(document).bind('keyup', 'left a', function() {
    keyDown.left = false;

    if(!character.airborne()) {
      character.xVelocity(0);
    }
  });

  $(document).bind('keyup', 'right d', function() {
    keyDown.right = false;
    if(!character.airborne()) {
      character.xVelocity(0);
    }
  });

  $(document).bind('keyup', 'down s', function() {
    keyDown.down = false;
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