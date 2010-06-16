(function() {
  var scene = Scene([
    {
      image: loadImageTile("images/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: loadImageTile("images/midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: loadImageTile("images/foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: loadImageTile("images/clouds2.png"),
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
      image: loadImageTile('images/jungleTree.png'),
      parallaxRate: 1,
      position: {
        x: rand(CANVAS_WIDTH - 116),
        y: 280
      }
    },
    {
      image: loadImageTile('images/jungleTree.png'),
      parallaxRate: 2,
      position: {
        x: rand(CANVAS_WIDTH - 116),
        y: 330
      }
    },
    {
      image: loadImageTile("images/clouds1.png"),
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
    at: 500,
    event: function(level) {
      level.complete();
    }
  }, {
    every: 1,
    event: function(level) {
      if (Math.random() < 0.05) {
        level.addGameObject(Utahraptor([
          {xVelocity: -3, x: level.position().x + CANVAS_WIDTH + 20},
          {xVelocity: 3, x: level.position().x - 20}
        ].rand()));
      }
    }
  }];

  addCutscene("images/triassic.png", "Thousands of years ago...", 3000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Bad Romance");
}());
