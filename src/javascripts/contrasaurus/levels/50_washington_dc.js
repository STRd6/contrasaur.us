$(function() {
  var imgPath = "images/levels/washington_dc/";
  var destroyWhitehouseAge = 0;

  function generateEnemies(level) {
    if (Math.random() < 0.03) {
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
      image: Sprite.load('images/levels/washington_dc/background.png'),
      parallaxRate: 0.25,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load('images/levels/washington_dc/midground.png'),
      parallaxRate: 0.5,
      position: Point(0, 0),
      repeat: true
    }, {
      image: Sprite.load('images/levels/washington_dc/ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      }
    }], generateForegroundScenary());

  var whiteHouse;
  var floor = Floor({
    sprite: Sprite.EMPTY
  });

  var triggers = [{
      at: 1000,
      event: function(level) {
        whiteHouse = WhiteHouse({
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
          var roboReagan = RoboReagan({
            x: whiteHouse.position().x
          });

          destroyWhitehouseAge = level.age();
          dino.boss(roboReagan);

          roboReagan.bind('destroy', function() {
            level.complete();
            dino.boss(false);
          });
          level.addGameObject(roboReagan);
        });

        level.addGameObject(whiteHouse);
      }
    }, {
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }];

  addCutscene(
    "images/levels/cutscenes/lincoln_memorial.png",
    "Contrasaur! I know the terrible Truth behind Reagan's plan!",
    3000
  );

  addCutscene("images/levels/cutscenes/tyrannosaurus_rex.png", "?!", 1000);

  var roboreaganAvatar = Sprite.load("images/avatars/roboreagan.png");

  var roboreaganDialog = DialogBox("You have only seen 1% of my true power", {
    avatar: roboreaganAvatar,
    avatarWidth: 100
  });

  var level = addLevel({
    scene: scene,
    objective: "Destroy",
    objectiveImage: 'images/levels/washington_dc/whiteHouse_thumb.png',
    platforms: [floor],
    triggers: triggers,
    audio: "Dragonforce - My Spirit Will Go On"
  });

  addCutscene("images/levels/cutscenes/finale.png", "Everything is going according to plan...", 6000);

  level.bind("afterStep", function(level) {
    if (level.age() > destroyWhitehouseAge && (level.age() < destroyWhitehouseAge + 200) && destroyWhitehouseAge > 0) {
      roboreaganDialog.draw(canvas);
    }
  });
});
