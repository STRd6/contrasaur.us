(function() {
  function generateStandingEnemies(level, count) {
    count.times(function() {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0,
          x: level.position().x + CANVAS_WIDTH + count*20,
          sprite: loadAnimation("images/enemies/dinofodder_eat.png", 2, 61, 33, 6)
        })
      );
      level.addGameObject(GameObject({
        sprite: Sprite.load([
          "images/levels/prehistoric/grass1.png",
          "images/levels/prehistoric/grass2.png",
          "images/levels/prehistoric/grass3.png"
        ].rand()),
        x: level.position().x + CANVAS_WIDTH + (count*20) - 40,
        y: 310
      }));
    });
  }

  function generateRunningEnemies(level, count) {
    level.addGameObject(
      Utahraptor({
        xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + count*20
      }
    ));
  }

  function generateForegroundScenary() {
    var foregrounds = [];
    (7).times(function() {
      foregrounds.push({
        image: Sprite.load('images/levels/prehistoric/rock.png'),
        parallaxRate: 2,
        position: {
          x: rand(1920),
          y: 325 + rand(150)
        },
        repeat: true,
        width: 1920
      });
    });

    return foregrounds;
  }

  var scene = Scene([
    {
      image: Sprite.load('images/levels/floor_background.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - 160
      },
      repeat: true,
      width: 1920
    },
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
      image: Sprite.load("images/levels/prehistoric/volcano_background.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 1600
    }
  ], generateForegroundScenary());

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
    every: 50,
    event: function(level) {
      if (Math.random() < 0.5) {
        level.addGameObject(GameObject({
          sprite: Sprite.load([
          "images/levels/prehistoric/grass1.png",
          "images/levels/prehistoric/grass2.png",
          "images/levels/prehistoric/grass3.png"
        ].rand()),
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
    every: 200,
    event: function(level) {
      generateStandingEnemies(level, rand(3));
    }
  },
  {
    at: 50,
    event: function(level) {
      generateStandingEnemies(level, rand(6));
    }
  }, {
    at: 150,
    event: function(level) {
      generateRunningEnemies(level, rand(6));
    }
  }, {
    at: 400,
    event: function(level) {
      generateStandingEnemies(level, rand(7));
    }
  }, {
    at: 700,
    event: function(level) {
      generateRunningEnemies(level, rand(5));
    }
  }, {
    at: 1200,
    event: function(level) {
      generateStandingEnemies(level, rand(5));
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
