(function() {
  function generateStandingEnemies(level, count) {
    count.times(function() {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + count*20,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        })
      );
    });
  }

  function generateRunningEnemies(level, count) {
    level.addGameObject(
      Utahraptor({
        xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + count*20
      }
    ));
  }

  var scene = Scene([
    {
      image: Sprite.load("images/levels/jungle/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: Sprite.load("images/levels/jungle/midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: Sprite.load("images/levels/jungle/foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: Sprite.load("images/levels/clouds2.png"),
      parallaxRate: 1,
      rate: {x: -0.5},
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    }
  ], [
    {
      image: Sprite.load('images/levels/jungle/tree.png'),
      parallaxRate: 1,
      position: {
        x: rand(CANVAS_WIDTH - 116),
        y: 280
      }
    },
    {
      image: Sprite.load('images/levels/jungle/tree.png'),
      parallaxRate: 2,
      position: {
        x: rand(CANVAS_WIDTH - 116),
        y: 330
      }
    },
    {
      image: Sprite.load('images/levels/prehistoric/grass3.png'),
      parallaxRate: 1,
      position: {
        x: CANVAS_WIDTH + 90,
        y: 310
      }
    },
    {
      image: Sprite.load('images/levels/prehistoric/grass2.png'),
      parallaxRate: 1,
      position: {
        x: CANVAS_WIDTH + 120,
        y: 310
      }
    },
    {
      image: Sprite.load('images/levels/prehistoric/grass1.png'),
      parallaxRate: 1,
      position: {
        x: CANVAS_WIDTH + 160,
        y: 310
      }
    },
    {
      image: Sprite.load('images/levels/prehistoric/grass3.png'),
      parallaxRate: 1,
      position: {
        x: CANVAS_WIDTH + 540,
        y: 310
      }
    },
    {
      image: Sprite.load('images/levels/prehistoric/grass2.png'),
      parallaxRate: 1,
      position: {
        x: CANVAS_WIDTH + 570,
        y: 310
      }
    },
    {
      image: Sprite.load('images/levels/prehistoric/grass1.png'),
      parallaxRate: 1,
      position: {
        x: CANVAS_WIDTH + 545,
        y: 310
      }
    },
    {
      image: Sprite.load("images/levels/clouds1.png"),
      parallaxRate: 1,
      rate: {x: -1},
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    }
  ]);

  var floor = Floor();

  var triggers = [{
    every: 1,
    event: function(level) {
      var meteor = Meteor({
          x: level.position().x + rand(CANVAS_WIDTH)
        });
      meteor.bind('destroy', function() { 
        meteor.explode();
      });

      if (Math.random() < 0.03) {
        level.addGameObject(meteor);
      }
    }
  }, {
    every: 100,
    event: function(level) {
      if (Math.random() < 0.5) {
        level.addGameObject(GameObject({
          sprite: Sprite.load("images/levels/prehistoric/grass1.png"),
          x: level.position().x + rand(CANVAS_WIDTH) + CANVAS_WIDTH,
          y: 310
        }));
      }
      if (dino.boss()) {
        level.addGameObject(
        Utahraptor({
          xVelocity: -6, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      }
    }
  }, {
    at: 50,
    event: function(level) {
      generateStandingEnemies(level, 4);
    }
  }, {
    at: 150,
    event: function(level) {
      generateRunningEnemies(level, 5);
    }
  }, {
    at: 400,
    event: function(level) {
      generateStandingEnemies(level, 6);
    }
  }, {
    at: 700,
    event: function(level) {
      generateRunningEnemies(level, 3);
    }
  }, {
    at: 1200,
    event: function(level) {
      generateStandingEnemies(level, 3);
    }
  }, {
    at: 1500,
    event: function(level) {
      var brontosaurus = Brontosaurus({
        x: level.position().x + CANVAS_WIDTH + 100,
        y: 170
      });

      brontosaurus.bind('destroy', function() {
        currentLevel.complete();
        dino.boss(false);
      });

      level.addGameObject(brontosaurus);
    }
  }, {
    at: 1550,
    event: function() {
      dino.boss(true);
    }
  }];

  addCutscene("images/levels/cutscenes/triassic.png", "Thousands of years ago...", 3000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Bad Romance");
}());
