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

  function generateForgroundScenary() {
    var foregrounds = [];
    (10).times(function() {
      foregrounds.push({
        image: Sprite.load('images/levels/jungle/tree.png'),
        parallaxRate: 1,
        position: {
          x: rand(CANVAS_WIDTH - rand(200)),
          y: 280
        },
        repeat: true,
        width: 640
      });
    });

    (10).times(function() {
      foregrounds.push({
        image: Sprite.load('images/levels/jungle/tree.png'),
        parallaxRate: 2,
        position: {
          x: rand(CANVAS_WIDTH - rand(400)),
          y: 330
        },
        repeat: true,
        width: 640
      });
    });

    console.log(foregrounds);

    return foregrounds;
  }

  var scene = Scene([
    {
      image: Sprite.load("images/levels/jungle/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 640
    },
    {
      image: Sprite.load("images/levels/jungle/midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 1280
    },
    {
      image: Sprite.load("images/levels/jungle/foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 1920
    }
  ], generateForgroundScenary());

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
