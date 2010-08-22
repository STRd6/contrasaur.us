$(function() {
  var imgPath = "images/levels/jungle/";

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "ground.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      },
      repeat: true,
      width: 640
    },
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 2700
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 4670
    },
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 5600
    }
  ], []);

  var bombingRunActive = false;
  var bombingRunCount = 0;
  var maxPlanes = 10;
  var numPlanes = 1;
  var planeDelay = 15;

  function generateEnemies(level) {
    if (Math.random() < 0.03) {
      if (Math.random() < 0.5) {
        var soldier = Soldier({
          theta: - 5 * Math.PI / 6,
          hFlip: true,
          x: level.position().x + CANVAS_WIDTH + 20,
          xVelocity: -2
        });
        
        level.addGameObject(soldier);
      } else {
        level.addGameObject(Soldier({
          xVelocity: 0, 
          x: level.position().x + rand(CANVAS_WIDTH - 40) + 20,
          y: -100
        }));
      }
    }

    if (Math.random() < 0.01) {
      level.addGameObject(Tank(
        {xVelocity: -0.5, x: level.position().x + CANVAS_WIDTH + 20}
      ));
    }

    if (bombingRunActive) {
      if (bombingRunCount % planeDelay == 0) {
        level.addGameObject(Bomber({
          x: level.position().x + CANVAS_WIDTH + 100 - bombingRunCount,
          y: 40
        }));
      }
      bombingRunCount++;
      if (bombingRunCount >= planeDelay * numPlanes) {
        bombingRunActive = false;
        bombingRunCount = 0;
        if (numPlanes < maxPlanes) {
          numPlanes++;
        }
      }
    }
  }

  var floor = Floor({sprite: Sprite.EMPTY});

  var triggers = [{
    every: 500,
    event: function() {
      bombingRunActive = true;
    }
  }, {
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }, {
    at: 3000,
    event: function(level) {
      level.complete();
    }
  }];

  addCutscene("", "He will be a great asset to us in assisting the Contras...", 4000);
  addLevel({
    scene: scene,
    platforms: [floor],
    triggers: triggers,
    audio: "Lady Gaga - Telephone"
  });
});
