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
      xVelocity: 1,
      y: 320
    });

    addGameObject(crate);
  }

  function addPlane(x, y) {
    level.addGameObject(Fighter({
      airborne: true,
      cooldown: 1,
      hFlip: true,
      type: "fighter2",
      xVelocity: -4,
      x: level.position().x + CANVAS_WIDTH + x,
      y: 160 + y,
    }));
  }

  function addFighterSquadron() {
    (6).times(function(i) {
      if(i) {
        var negative = i % 2 ? -1 : 1;
        var halfI = (i / 2).floor();
        addPlane(i * 20, negative * 40 * halfI);
      }
    });
  }

  function addParasoldier(x, y) {
    level.addGameObject(Soldier({
      airborne: true,
      xVelocity: 0,
      x: level.position().x + x,
      y: -20 + y,
      yVelocity: 3
    }));
  }

  function addParasoldierFormation() {
    (5).times(function(i) {
      addParasoldier(580 + 45 * i, -15 * i);
    });
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
          xVelocity: -2,
          y: CANVAS_HEIGHT - Floor.LEVEL
        }));
      }
    }
  }, {
    every: 120,
    event: function(level) {
      if(!bossBattle) {
        addParasoldierFormation();
      }
    }
  }, {
    every: 150,
    event: function(level) {
      if(level.age() > 0) {
        addFighterSquadron();
      }
    }
  }, {
    every: 200,
    event: function(level) {
      if (Math.random() < 0.5 && level.age() > 0) {
        addCrate(ThirdLaserEyeBlind);
      }
    }
  }, {
    at: 2000,
    event: function(level) {
      var gunship = Gunship();
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
