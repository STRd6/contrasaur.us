(function() {
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
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 30,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 60,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      // to do add plant for them to be eating in the middle
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 90,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
    }
  }, {
    at: 150,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 30,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 45,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 60,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 70,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      // to do add plant for them to be eating in the middle
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 90,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
    }
  }, {
    at: 400,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 60
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 60
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 90
        }
      ));
    }
  }, {
    at: 700,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 60
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: rand(2) + 0.5, x: level.position().x + CANVAS_WIDTH + 60
        }
      ));
    }
  }, {
    at: 1200,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 30,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 45,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 60,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 70,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
      // to do add plant for them to be eating in the middle
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 90,
          sprite: Sprite.load("images/enemies/dinofodder2.png")
        }
      ));
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
