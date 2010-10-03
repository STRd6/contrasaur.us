$(function() {
  var imgPath = "images/levels/parasail/";
  var levelVelocity = Point(-6, 0);

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      velocity: levelVelocity
    }
  ], [
    {
      image: Sprite.load(imgPath + "water_background.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 320,
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "water_midground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      velocity: levelVelocity
    },
    {
      image: Sprite.load(imgPath + "water_foreground.png"),
      parallaxRate: 4,
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      velocity: levelVelocity
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
        x: 540,
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
        airborne: true,
        xVelocity: 0,
        x: level.position().x + CANVAS_WIDTH + 20,
        y: -20,
        yVelocity: 2
      }));
    }
  }, {
    every: 50,
    event: function(level) {
      level.addGameObject(Fighter({
        airborne: true,
        hFlip: true,
        xVelocity: -4,
        x: level.position().x + CANVAS_WIDTH + 20,
        y: rand(120) + 100,
      }));
    }
  }, {
    at: 20,
    event: function(level) {
      var gunship = Gunship();
      level.addGameObject(gunship);

      dino.boss(gunship);

      gunship.bind("destroy", function() {
        level.after(140, function() {
          level.fadeOut(10);
        });

        level.after(150, function() {
          level.complete();

          dino.boss(false);
          dino.parasailing(false);
        });
      });
    }
  }];

  addLevel({
    scene: scene,
    platforms: [floor],
    triggers: triggers,
    audio: "Lady Gaga - Alejandro"
  });
});
