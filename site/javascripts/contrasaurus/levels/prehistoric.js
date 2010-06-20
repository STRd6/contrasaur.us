(function() {
  var scene = Scene([
    {
      image: loadImageTile("images/levels/jungle/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: loadImageTile("images/levels/jungle/midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: loadImageTile("images/levels/jungle/foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: loadImageTile("images/levels/clouds2.png"),
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
      image: loadImageTile('images/levels/jungle/tree.png'),
      parallaxRate: 1,
      position: {
        x: rand(CANVAS_WIDTH - 116),
        y: 280
      }
    },
    {
      image: loadImageTile('images/levels/jungle/tree.png'),
      parallaxRate: 2,
      position: {
        x: rand(CANVAS_WIDTH - 116),
        y: 330
      }
    },
    {
      image: loadImageTile("images/levels/clouds1.png"),
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
    at: 2000,
    event: function(level) {
      level.complete();
    }
//  }, {
//    every: 100,
//    event: function(level) {
//      if (Math.random() < 0.05) {
//        level.addGameObject(Utahraptor([
//          {xVelocity: -3, x: level.position().x + CANVAS_WIDTH + 20},
//          {xVelocity: 3, x: level.position().x - 20}
//        ].rand()));
//      }
//    }
  }, {
    at: 50,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 30,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 60,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
      // to do add plant for them to be eating in the middle
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 90,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
    }
  }, {
    at: 150,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 30,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 45,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 60,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 70,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
      // to do add plant for them to be eating in the middle
      level.addGameObject(
        Utahraptor({
          xVelocity: 0, x: level.position().x + CANVAS_WIDTH + 90,
          sprite: loadImageTile("images/enemies/dinofodder2.png")
        }
      ));
    }
  }, {
    at: 400,
    event: function(level) {
      level.addGameObject(
        Utahraptor({
          xVelocity: 2, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 2.1, x: level.position().x + CANVAS_WIDTH + 30
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 1.6, x: level.position().x + CANVAS_WIDTH + 60
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 1.7, x: level.position().x + CANVAS_WIDTH + 60
        }
      ));
      level.addGameObject(
        Utahraptor({
          xVelocity: 1.3, x: level.position().x + CANVAS_WIDTH + 90
        }
      ));
    }
  }];

  addCutscene("images/levels/cutscenes/triassic.png", "Thousands of years ago...", 3000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Bad Romance");
}());
