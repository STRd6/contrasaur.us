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
      repeat: true,
      width: 1280
    }
  ], generateForegroundScenary());

  function generateForegroundScenary() {
    var foregrounds = [];
    (7).times(function() {
      foregrounds.push({
        image: Sprite.load('images/levels/area51/stasis_chamber.png'),
        parallaxRate: 1,
        position: {
          x: rand(1920),
          y: 250
        },
        repeat: true,
        width: 1920
      });
    });

    return foregrounds;
  }

  function generateEnemies(level) {
    if (Math.random() < 0.01) {
      var scientist = Scientist({
        theta: - 5 * Math.PI / 6,
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: 0
      });

      var wolf = Wolf({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: 0
      });

      level.addGameObject([scientist, scientist, wolf].rand());
    }
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }, {
    at: 60,
    event: function() {
      dino.timeTravel(false);
    }
  }, {
    at: 2000,
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
  }];

  addCutscene("", "By the power of science!", 3000);

  var reaganAvatar = Sprite.load("images/avatars/reagan.png");
  var reaganMachineGun = DialogBox("With a machine gun the blood of his enemies will trickle down like the money of American oil tycoons.", {
    avatar: reaganAvatar
  });

  var reaganJetpack = DialogBox("A jetpack will enable him to soar like the majestic condor and rain fire down upon our enemies.", {
    avatar: reaganAvatar
  });

  var shootDialog = DialogBox("Aim with the mouse. Left click to fire weapons");

  var level = addLevel({
    audio: "Lady Gaga - Paparazzi",
    description: "AD 1984: Area 51",
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
  });
});
