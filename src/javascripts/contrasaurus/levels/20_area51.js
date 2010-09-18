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

  function generateMutants(level, number) {
    if (number) {
      (number).times(function(i) {
        level.addGameObject(Mutant({
          hFlip: true,
          x: level.position().x + CANVAS_WIDTH + i*20,
          y: 0,
          yVelocity: 1
        }));
      });
    } else {
      level.addGameObject(Mutant({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        y: 0,
        yVelocity: 1
      }));
    }
  }

  function addCrate(weaponClass) {
    addGameObject(Crate({
      weaponClass: weaponClass,
      x: level.position().x + CANVAS_WIDTH,
      y: 320
    }));
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    at: 60,
    event: function() {
      dino.timeTravel(false);
    }
  }, {
    at: 350,
    event: function(level) {
      generateMutants(level, 3);
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
    event: function() {
      addCrate(MachineGun);
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
  var reaganMachineGun = DialogBox("With a machine gun the blood of his enemies will trickle down like the money of American oil tycoons", {
    avatar: reaganAvatar,
    avatarWidth: 100
  });

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

  var shootDialog = DialogBox("Aim with the mouse. Left click to fire weapons");

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
    if (level.age() > 100 && level.age() < 300) {
      reaganMachineGun.draw(canvas);
    }

    if (level.age() > 450 && level.age() < 650) {
      shootDialog.draw(canvas);
    }

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
