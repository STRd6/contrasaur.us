$(function() {
  var imgPath = "images/levels/parasail/";
  var levelVelocity = Point(-6, 0);

  var bossBattle = false;
  var bossDefeated = false;

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

  function addPlane(x, y, options) {
    options || (options = {
      hFlip: true,
      xVelocity: -4
    });

    level.addGameObject(Fighter($.extend({
      cooldown: 5,
      type: "fighter2",
      x: level.position().x + x,
      y: 160 + y,
    }, options)));
  }

  function addFrontFighterWave(n) {
    (n + 1).times(function(i) {
      if(i) {
        var negative = i % 2 ? -1 : 1;
        var halfI = (i / 2).floor();
        addPlane(i * 20 + CANVAS_WIDTH, negative * 40 * halfI);
      }
    });
  }

  function addRearFighterWave(n) {
    (n + 1).times(function(i) {
      if(i) {
        var negative = i % 2 ? -1 : 1;
        var halfI = (i / 2).floor();
        addPlane(-i * 20, negative * 40 * halfI, {xVelocity: 8});
      }
    });
  }

  function addFighterSquadron(n) {
    addFrontFighterWave(Math.min(n, 7));
    addRearFighterWave(Math.max(0, n - 7));
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

  function addParasoldierFormation(n) {
    (n).times(function(i) {
      addParasoldier(580 + 45 * i, -15 * i);
    });
  }

  var boat;
  var fighterCount = 0;

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
      if(level.age() < 2300) {
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
      if(!bossDefeated) {
        if(bossBattle) {
          addParasoldierFormation(2);
        } else {
          addParasoldierFormation(1 + rand(3));
        }
      }
    }
  }, {
    every: 150,
    event: function(level) {
      if(level.age() > 0 && !bossDefeated && level.age() != 2400) {
        if(bossBattle) {
          addFighterSquadron(1);
        } else {
          addFighterSquadron(2);
        }
      }
    }
  }, {
    every: 200,
    event: function(level) {
      if (Math.random() < 0.5 && level.age() > 0 && !bossDefeated) {
        addCrate(ThirdLaserEyeBlind);
      }
    }
  }, {
    at: 2400,
    event: function(level) {
      var gunship = Gunship();
      level.prependGameObject(gunship);

      dino.boss(gunship);
      bossBattle = true;

      level.after(20, function() {
        boat.destroy();
      });

      gunship.bind("destroy", function() {
        bossDefeated = true;

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

  addCutscene(
    null,
    "Contrasaur, we've located your final objective. Procede to Lake Xolotlán and destroy the Floating Fortress.",
    6000
  );

  var level = addLevel({
    description: "AD 1984: Lake Xolotlán",
    scene: scene,
    objective: "Parasail",
    objectiveImage: "images/levels/parasail/sail_thumb.png",
    platforms: [floor],
    triggers: triggers,
    audio: "Lady Gaga - Alejandro"
  });
});
