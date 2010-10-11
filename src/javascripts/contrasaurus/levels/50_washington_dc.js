$(function() {
  var imgPath = "images/levels/washington_dc/";

  var destroyedWhiteHouseSprite = Sprite.load('images/levels/washington_dc/whiteHouse_destroyed.png');

  var enemiesActive = true;

  function addParasoldier(x, y) {
    level.addGameObject(Soldier({
      airborne: true,
      xVelocity: 0,
      x: level.position().x + x,
      y: -20 + y,
      yVelocity: 3
    }));
  }

  function addParasoldierFormation(n, x) {
    (n).times(function(i) {
      addParasoldier(x + 45 * i, -15 * i);
    });
  }

  function addCrate(weaponClass) {
    var crate = Crate({
      weaponClass: weaponClass,
      x: level.position().x + rand(CANVAS_WIDTH) + 20,
      y: 320
    });

    addGameObject(crate);
  }

  function generateEnemies(level) {
    if (enemiesActive && rand() < 0.03) {
      var secretService = SecretService({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: -2
      });

      level.addGameObject(secretService);
    }
  }

  function generateForegroundScenary() {
    var foregrounds = [];

    (5).times(function(i) {
      foregrounds.push({
        image: Sprite.load([
          imgPath + "bush.png",
          imgPath + "hedge.png"
        ].rand()),
        parallaxRate: 1,
        position: {
          x: i * 150 + rand(50),
          y: 300 + rand(80)
        },
        every: 1000
      });
    });

    return foregrounds;
  }

  var scene = Scene(
    [{
      image: Sprite.load(imgPath + 'background.png'),
      parallaxRate: 0.25,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load(imgPath + 'midground.png'),
      parallaxRate: 0.5,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load(imgPath + 'foreground.png'),
      parallaxRate: 1,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load(imgPath + 'ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      }
    }], generateForegroundScenary());

  var floor = Floor({
    sprite: Sprite.EMPTY
  });

  var triggers = [{
    at: 1000,
    event: function(level) {
      var whiteHouse = WhiteHouse({
        x: level.position().x + CANVAS_WIDTH + 100
      });

      level.addGameObject(GameObject({
        sprite: Sprite.load(imgPath + "minitreebush.png"),
        x: dino.position().x + CANVAS_WIDTH + 25,
        y: 300
      }));

      level.addGameObject(GameObject({
        sprite: Sprite.load(imgPath + "minitreebush.png"),
        x: dino.position().x + CANVAS_WIDTH - 586 - 25,
        y: 300
      }));

      dino.boss(whiteHouse);

      whiteHouse.bind('destroy', function() {
        enemiesActive = false;

        var lockPosition = whiteHouse.position().x - CANVAS_WIDTH/2;
        level.lockCamera(lockPosition - 160, lockPosition + 160);

        level.prependGameObject(Effect($.extend(whiteHouse.position(), {
          duration: -1,
          sprite: destroyedWhiteHouseSprite,
          velocity: Point()
        })));

        level.after(60, function() {
          level.dialog(DialogBox({
            avatar: roboReaganAvatar,
            text: "Do you truly think you can defeat me? I made you what you are."
          }), 150);
        });

        var roboReagan = RoboReagan({
          x: whiteHouse.position().x
        });

        dino.boss(roboReagan);

        roboReagan.bind('beamComplete', function() {
          if(rand() < 0.5) {
            addParasoldierFormation(rand(4) + 1, 160);
          } else {
            addParasoldierFormation(rand(4) + 1, 480);
          }
        });

        roboReagan.bind('destroy', function() {
          dino.boss(false);

          level.dialog(DialogBox({
            avatar: roboReaganAvatar,
            text: "HA HA HA! This is only the beginning! You have seen but 1% of my True Power!"
          }), 150);

          level.after(130, function() {
            level.fadeOut(100);

            level.after(130, function() {
              level.complete();
            });
          });
        });

        level.addGameObject(roboReagan);
      });

      level.prependGameObject(whiteHouse);
    }
  }, {
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }, {
    every: 400,
    event: function(level) {
      if(level.age() > 0) {
        addCrate(Chainsaw);
      }
    }
  }];

  addCutscene(
    "images/levels/cutscenes/hero_ceremony.png",
    "To Contrasaur, the greatest of American heros, for his victory in Nicaragua",
    6000
  );

  addCutscene(
    "",
    "Later that night...",
    3000
  );

  addCutscene(
    "images/levels/cutscenes/lincoln_memorial.png",
    "Contrasaur! I know the terrible Truth behind Reagan's plan!",
    4000
  );

  addCutscene("images/levels/cutscenes/tyrannosaurus_rex.png", "?!", 1250);

  var roboReaganAvatar = Sprite.load("images/avatars/roboreagan.png");

  var level = addLevel({
    audio: "Dragonforce - My Spirit Will Go On",
    backgroundColor: "#00A800",
    description: "AD 1984: Washington D.C.",
    fadeWhite: true,
    objective: "Destroy",
    objectiveImage: 'images/levels/washington_dc/whiteHouse_thumb.png',
    platforms: [floor],
    scene: scene,
    triggers: triggers
  });

});
