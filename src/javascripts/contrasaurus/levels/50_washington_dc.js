$(function() {
  var imgPath = "images/levels/washington_dc/";

  function generateEnemies(level) {
    if (Math.random() < 0.03) {
      var secretService = SecretService({
        theta: - 5 * Math.PI / 6,
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: -2
      });

      level.addGameObject(secretService);
    }
  }

  function generateForegroundScenary() {
    foregrounds = [];

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
      image: Sprite.load('images/levels/ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      },
      repeat: true,
      width: 640
    }], generateForegroundScenary());

  var whiteHouse;
  var floor = Floor();

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

  addLevel({
    scene: scene,
    platforms: [floor],
    triggers: triggers,
    audio: "Dragonforce - My Spirit Will Go On"
  });

  addCutscene("images/levels/cutscenes/finale.png", "Everything is going according to plan...", 6000);
});
