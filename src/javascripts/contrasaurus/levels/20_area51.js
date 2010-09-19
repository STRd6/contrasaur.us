$(function() {
  var scene = Scene([
    {
      image: Sprite.load('images/levels/area51/warehouse_floor.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      },
      width: 640
    }, {
      image: Sprite.load("images/levels/area51/warehouse.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    }
  ], []);

  function generateMutants(level, number, annihilationCallback) {
    var destroyedCount = 0;

    number.times(function(i) {
      var mutant = Mutant({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH / 2 + rand(CANVAS_WIDTH / 2),
        y: 0,
        yVelocity: 0.01
      });

      mutant.bind('destroy', function() {
        destroyedCount += 1;

        if(destroyedCount == number && annihilationCallback) {
          annihilationCallback();
        }
      });

      level.addGameObject(mutant);
    });
  }

  function addCrate(weaponClass, onDestroy) {
    var crate = Crate({
      weaponClass: weaponClass,
      x: level.position().x + CANVAS_WIDTH,
      y: 320
    });

    if(onDestroy) {
      crate.bind('destroy', onDestroy);
    }

    addGameObject(crate);
  }

  function machineGunTrial(level) {
    level.lockCamera(level.position().x, level.position().x + 250);

    level.after(180, function() {
      generateMutants(level, 3, function() {
        level.unlockCamera();

        level.after(300, flameThrowerTrial);
      });
    });

    addCrate(MachineGun, function() {
      level.dialog(DialogBox("No weapon in the arsenals of the world is so formidable as a tyrannosaurus rex with a machine gun.", {
        avatar: reaganAvatar,
        avatarWidth: 100
      }), 150);

      level.after(220, function() {
        level.dialog(DialogBox("Aim with the mouse. Left click to fire weapons"), 90);
      });
    });
  }

  function flameThrowerTrial(level) {
    level.lockCamera(level.position().x, level.position().x + 250);

    level.after(180, function() {
      generateMutants(level, 5, function() {
        level.unlockCamera();

        level.after(300, chainsawTrial);
      });
    });

    addCrate(Flamethrower, function() {
      level.dialog(DialogBox("FLAME JAW!", {
        avatar: reaganAvatar,
        avatarWidth: 100
      }), 150);
    });
  }

  function chainsawTrial(level) {
    level.dialog(DialogBox("Release the abominations!", {
      avatar: reaganAvatar,
      avatarWidth: 100
    }), 100);

    level.after(30, function() {
      level.lockCamera(level.position().x, level.position().x + 250);

      generateMutants(level, 20, function() {
        level.unlockCamera();

        level.after(30, function() {
          level.fadeOut(10);

          level.after(10, function() {
            level.complete();
          });
        });
      });
    });

    addCrate(Chainsaw, function() {
      level.dialog(DialogBox("CH-CH-CH-CH-CHAINSAW!", {
        avatar: reaganAvatar,
        avatarWidth: 100
      }), 150);
    });
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    at: 60,
    event: function() {
      dino.timeTravel(false);
    }
  }, {
    at: 100,
    event: machineGunTrial
  }];

  addCutscene("", "By the power of science!", 3000);

  var reaganAvatar = Sprite.load("images/avatars/reagan.png");

  var level = addLevel({
    audio: "Lady Gaga - Paparazzi",
    description: "AD 1984: Area 51",
    objective: "Annihilate",
    objectiveImage: 'images/enemies/mutant/mutant_thumb.png',
    platforms: [floor],
    scene: scene,
    triggers: triggers
  });
});
