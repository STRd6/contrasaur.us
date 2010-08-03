(function() {
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
      width: 10000
    }
  ], [
    {
      image: Sprite.load("images/levels/parasail/ocean.png"),
      parallaxRate: 1,
      velocity: Point(-3, 0),
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      width: 640
    }
  ]);

  var floor = Floor({
    sprite: null,
    water: true
  });

  var counter = 0;

  var triggers = [{
    at: 0,
    event: function(level) {
      dino.parasailing(true);

      var boat = Boat({
        x: 460,
        y: 285
      });

      level.addGameObject(boat);

      level.tiltAmount(7);
    }
  }, {
    every: 1,
    event: function(level) {
      // Update dino speed and position based on boat and cord elasticity

      if(rand() < 0.01) {
        level.addGameObject(Ramp({
          hitCircles: [{"x": 30, "y": 0, "radius": 20}],
          x: level.position().x + CANVAS_WIDTH,
          y: CANVAS_HEIGHT - Floor.LEVEL
        }));
      }
    }
  }, {
    every: 30,
    event: function(level) {
      level.addGameObject(Parasoldier({
          xVelocity: 0,
          x: level.position().x + rand(CANVAS_WIDTH - CANVAS_WIDTH/2) + CANVAS_WIDTH/2
        }));
    }
  }, {
    at: 2000,
    event: function(level) {
      level.complete();
      dino.parasailing(false);
    }
  }];

  addLevel(scene, [floor], triggers, "Lady Gaga - Alejandro");
}());
