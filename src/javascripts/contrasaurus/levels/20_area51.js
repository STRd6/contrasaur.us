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
        x: level.position().x + CANVAS_WIDTH + i*20,
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

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    at: 60,
    event: function() {
      dino.timeTravel(false);
    }
  }, {
    at: 2200,
    event: function(level) {
      level.complete();
    }
  }, {
    at: 800,
    event: function() {
      addCrate(Flamethrower);
    }
  }, {
    at: 1025,
    event: function() {
      generateMutants(level, 5);
    }
  }, {
    at: 100,
    event: function(level) {
      addCrate(MachineGun, function() {
        level.dialog(DialogBox("No weapon in the arsenals of the world is so formidable as a tyrannosaurus rex with a machine gun.", {
          avatar: reaganAvatar,
          avatarWidth: 100
        }), 150);

        level.after(180, function() {
          generateMutants(level, 3);
        });

        level.after(220, function() {
          level.dialog(DialogBox("Aim with the mouse. Left click to fire weapons"), 90);
        });
      });
    }
  }, {
    at: 1400,
    event: function() {
      addCrate(Chainsaw);
    }
  }, {
    at: 1650,
    event: function() {
      generateMutants(level, 5);
    }
  }, {
    at: 1655,
    event: function() {
      generateMutants(level, 5);
    }
  }, {
    at: 1660,
    event: function() {
      generateMutants(level, 5);
    }
  }, {
    at: 1665,
    event: function() {
      generateMutants(level, 5);
    }
  }];

  addCutscene("", "By the power of science!", 3000);

  var reaganAvatar = Sprite.load("images/avatars/reagan.png");

  var reaganFlamejaw = DialogBox("FLAMEJAW!", {
    avatar: reaganAvatar,
    avatarWidth: 100
  });

  var reaganChainsaw = DialogBox("Unleash the true power of Contrasaurus", {
    avatar: reaganAvatar,
    avatarWidth: 100
  });

  var reaganTest = DialogBox("Release the abominations!", {
    avatar: reaganAvatar,
    avatarWidth: 100
  });

  var level = addLevel({
    audio: "Lady Gaga - Paparazzi",
    description: "AD 1984: Area 51",
    objective: "Annihilate",
    objectiveImage: 'images/enemies/mutant/mutant_thumb.png',
    platforms: [floor],
    scene: scene,
    triggers: triggers
  });

  level.bind("afterStep", function(level) {
    if (level.age() > 800 && level.age() < 1000) {
      reaganFlamejaw.draw(canvas);
    }

    if (level.age() > 1400 && level.age() < 1600) {
      reaganChainsaw.draw(canvas);
    }

    if (level.age() > 1600 && level.age() < 1800) {
      reaganTest.draw(canvas);
    }
  });
});
