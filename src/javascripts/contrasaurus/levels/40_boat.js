$(function() {
  var imgPath = "images/levels/parasail/";
  var levelVelocity = Point(-6, 0);

  var bossBattle = false;

  ThirdLaserEyeBlind = (function() {
    var count = 0;
    return function() {
      count += 1;

      if(count == 3) {
        return LaserGun();
      } else {
        return BattleAxe();
      }
    }
  }());

  function addCrate(weaponClass) {
    var crate = FloatingCrate({
      weaponClass: weaponClass,
      x: level.position().x + CANVAS_WIDTH,
      y: 320
    });

    addGameObject(crate);
  }

  var boat;

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

      boat = Boat({
        x: 540,
        y: 285
      });

      level.addGameObject(boat);
    }
  }, {
    every: 100,
    event: function(level) {
      if(!bossBattle) {
        level.addGameObject(Ramp({
          x: level.position().x + CANVAS_WIDTH,
          y: CANVAS_HEIGHT - Floor.LEVEL
        }));
      }
    }
  }, {
    every: 30,
    event: function(level) {
      if(!bossBattle) {
        level.addGameObject(Soldier({
          airborne: true,
          xVelocity: 0,
          x: level.position().x + CANVAS_WIDTH + 20,
          y: -20,
          yVelocity: 2
        }));
      }
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
    every: 80,
    event: function(level) {
      if (Math.random() < 0.5 && level.age() > 0) {
        addCrate(ThirdLaserEyeBlind);
      }
    }
  }, {
    at: 100,
    event: function(level) {
      gunship = Gunship();
      level.prependGameObject(gunship);

      dino.boss(gunship);
      bossBattle = true;

      level.after(20, function() {
        boat.destroy();
      });

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

  var level = addLevel({
    scene: scene,
    platforms: [floor],
    triggers: triggers,
    audio: "Lady Gaga - Alejandro"
  });
});
