$(function() {
  var imgPath = "images/levels/jungle/";

  var bossActive = false;

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
    if (!bossActive) {
      if (Math.random() < 0.03) {
        if (Math.random() < 0.5) {
          var soldier = Soldier({
            hFlip: true,
            x: level.position().x + CANVAS_WIDTH + 20,
            xVelocity: -2
          });

          level.addGameObject(soldier);
        } else {
          level.addGameObject(Soldier({
            airborne: true,
            hFlip: true,
            xVelocity: 0,
            x: level.position().x + rand(CANVAS_WIDTH - 40) + 20,
            y: -100,
            yVelocity: 2
          }));
        }
      }

      if (Math.random() < 0.01) {
        level.addGameObject(Tank({
          x: level.position().x + CANVAS_WIDTH + 20
        }));
      }

      if (bombingRunActive) {
        var PlaneClass = (numPlanes % 2) ? Fighter : Bomber;

        if (bombingRunCount % planeDelay == 0) {
          level.addGameObject(PlaneClass({
            x: level.position().x - 50 - bombingRunCount,
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
    at: 1000,
    event: function(level) {
      var jetPackCrate = Crate({
        weaponClass: function() {return "jetpack";},
        x: level.position().x + CANVAS_WIDTH,
        y: 320
      });

      jetPackCrate.bind('destroy', function() {
        level.unlockCamera();

        level.dialog(DialogBox({
          text: "With the jetpack you can take to the skies! Press up to fly!"
        }), 200);
      });

      addGameObject(jetPackCrate);

      level.lockCamera(level.position().x, level.position().x + 250);
    }
  }, {
    at: 2000,
    event: function(level) {
      addGameObject(Crate({
        weaponClass: MissileLauncher,
        x: level.position().x + CANVAS_WIDTH,
        y: 320
      }));
    }
  }, {
    at: 3000,
    event: function(level) {
      var commando = Commando({
        x: level.position().x + CANVAS_WIDTH + 40
      });

      commando.bind('destroy', function() {
        dino.boss(false);

        level.after(140, function() {
          level.fadeOut(10);
        });

        level.after(150, function() {
          level.complete();
        });
      });

      bossActive = true;
      dino.boss(commando);

      level.addGameObject(commando);
      level.lockCamera(level.position().x, level.position().x + 160);
    }
  }];

  addCutscene(
    "images/levels/cutscenes/south_america.png",
    "He will be a great asset to us in assisting the Contras...",
    5000
  );

  addLevel({
    audio: "Lady Gaga - Telephone",
    scene: scene,
    objective: "Defeat",
    objectiveImage: "images/enemies/commando/commando_thumb.png",
    platforms: [floor],
    triggers: triggers
  });
});
