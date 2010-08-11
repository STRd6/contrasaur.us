$(function() {
  var scene = Scene([
    {
      image: Sprite.load('images/levels/ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      },
      repeat: true,
      width: 640
    }, {
      image: Sprite.load("images/levels/area51/test_tube_background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
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

  var floor = Floor();

  var triggers = [{
    every: 1,
    event: function(level) {
      generateEnemies(level);
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
  }];

  addCutscene("", "By the power of science!", 3000);

  var reaganAvatar = Sprite.load("images/avatars/reagan2.png");
  var reaganMachineGun = DialogBox("With a machine gun the blood of his enemies will trickle down like the money of American oil tycoons.", {
    avatar: reaganAvatar
  });

  var reaganJetpack = DialogBox("A jetpack will enable him to soar like the majestic condor and rain fire down upon our enemies.", {
    avatar: reaganAvatar
  });

  addLevel(scene, [floor], triggers, "Lady Gaga - Paparazzi", function(level) {
    if (level.age() > 200 && level.age() < 400) {
      reaganMachineGun.draw(canvas);
    }

    if (level.age() > 800 && level.age() < 1000) {
      reaganJetpack.draw(canvas);
    }
  });
});
