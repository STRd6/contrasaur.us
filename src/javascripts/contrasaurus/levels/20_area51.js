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

  function generateMutants(level) {
    level.addGameObject(Mutant({
      hFlip: true,
      x: level.position().x + CANVAS_WIDTH + 20,
      y: 0,
      yVelocity: 1
    }));

    level.addGameObject(Mutant({
      hFlip: true,
      x: level.position().x + CANVAS_WIDTH + 60,
      y: 0,
      yVelocity: 1
    }));

    level.addGameObject(Mutant({
      hFlip: true,
      x: level.position().x + CANVAS_WIDTH - 20,
      y: 0,
      yVelocity: 1
    }));
    level.addGameObject(Mutant({
      hFlip: true,
      x: level.position().x + CANVAS_WIDTH + 100,
      y: 0,
      yVelocity: 1
    }));
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    at: 60,
    event: function() {
      dino.timeTravel(false);
    }
  }, {
    at: 3000,
    event: function(level) {
      level.complete();
    }
  }, {
    at: 800,
    event: function() {
      dino.addJetpack();
    }
  }, {
    at: 100,
    event: function() {
      dino.addWeapon(MachineGun());
      showStuff();
    }
  }, {
    at: 1250,
    event: function() {
      generateMutants(level);
    }
  }, {
    at: 1255,
    event: function() {
      generateMutants(level);
    }
  }, {
    at: 1260,
    event: function() {
      generateMutants(level);
    }
  }, {
    at: 1265,
    event: function() {
      generateMutants(level);
    }
  }];

  addCutscene("", "By the power of science!", 3000);

  var reaganAvatar = Sprite.load("images/avatars/reagan.png");
  var reaganMachineGun = DialogBox("With a machine gun the blood of his enemies will trickle down like the money of American oil tycoons.", {
    avatar: reaganAvatar
  });

  var reaganJetpack = DialogBox("A jetpack will enable him to soar like the majestic condor and rain fire down upon our enemies.", {
    avatar: reaganAvatar
  });

  var reaganTest = DialogBox("Commence test 1: Release the abominations!", {
    avatar: reaganAvatar
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
      reaganJetpack.draw(canvas);
    }

    if (level.age() > 1200 && level.age() < 1400) {
      reaganTest.draw(canvas);
    }
  });
});
