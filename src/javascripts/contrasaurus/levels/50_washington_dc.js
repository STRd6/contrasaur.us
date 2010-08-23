$(function(){
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
    }],
    []
  );

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

  var whiteHouse;
  var floor = Floor();

  var triggers = [{
      at: 1000,
      event: function(level) {
        whiteHouse = WhiteHouse({
          x: level.position().x + CANVAS_WIDTH + 100
        });

        dino.boss(whiteHouse);

        whiteHouse.bind('destroy', function() {
          var roboReagan = RoboReagan({
            x: level.position().x + 320
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
