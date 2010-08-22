$(function() {
  var imgPath = "images/levels/parasail/";

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 1800
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 4650
    },
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 2200
    }
  ], [
    {
      image: Sprite.load(imgPath + "water_background.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      width: 2200
    },
    {
      image: Sprite.load(imgPath + "water_midground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      width: 2400
    },
    {
      image: Sprite.load(imgPath + "water_foreground.png"),
      parallaxRate: 4,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      width: 2600
    }
  ]);

  var floor = Floor({
    sprite: null,
    water: true
  });

  var triggers = [{
    at: 0,
    event: function(level) {
      dino.parasailing(true);

      var boat = Boat({
        x: 460,
        y: 285
      });

      level.addGameObject(boat);
    }
  }, {
    every: 1,
    event: function(level) {
      // Update dino speed and position based on boat and cord elasticity

      if(rand() < 0.01) {
        level.addGameObject(Ramp({
          x: level.position().x + CANVAS_WIDTH,
          y: CANVAS_HEIGHT - Floor.LEVEL
        }));
      }
    }
  }, {
    every: 30,
    event: function(level) {
      level.addGameObject(Soldier({
          xVelocity: 3,
          x: level.position().x + rand(CANVAS_WIDTH - CANVAS_WIDTH/2) + CANVAS_WIDTH/2,
          y: -20
        }));
    }
  }, {
    at: 2000,
    event: function(level) {
      level.complete();
      dino.parasailing(false);
    }
  }];

  addLevel({
    scene: scene,
    platforms: [floor],
    triggers: triggers,
    audio: "Lady Gaga - Alejandro"
  });
});
