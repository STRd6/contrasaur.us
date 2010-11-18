$(function() {
  var imgPath = "images/levels/jungle/";

  var bossActive = false;

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "mobile.png"),
      parallaxRate: 0.5,
      position: Point(0, 0),
      repeat: true
    }
  ], []);

  var bombingRunActive = false;
  var bombingRunCount = 0;
  var maxPlanes = 2;
  var numPlanes = 1;
  var planeDelay = 15;

  function generateEnemies(level) {
    if (!bossActive) {
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
    every: 110,
    event: function(level) {
      if(!bossActive) {
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
  }, {
    every: 400,
    event: function(level) {
      if(!bossActive) {
        level.addGameObject(Tank({
          x: level.position().x + CANVAS_WIDTH + 20
        }));
      }
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
    audio: "3",
    scene: scene,
    objective: "Defeat",
    objectiveImage: "images/enemies/commando/commando_thumb.png",
    platforms: [floor],
    triggers: triggers
  });
});
