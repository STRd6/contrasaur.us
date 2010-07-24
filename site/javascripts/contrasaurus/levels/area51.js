(function() {
  var scene = Scene([
    {
      image: Sprite.load("images/levels/area51/test_tube_background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    }
  ], []);

  function generateEnemies(level) {
    if (Math.random() < 0.01) {
      var scientist = Scientist({
        theta: - 5 * Math.PI / 6,
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: 0
      });

      var wolf = Wolf({
        hFlip: true,
        x: level.position().x + CANVAS_WIDTH + 20,
        xVelocity: 0
      });

      level.addGameObject([scientist, wolf].rand());
    }
  }

  var floor = Floor();

  var triggers = [{
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
    },{
    at: 2000,
    event: function(level) {
      level.complete();
    }
  }];

  addCutscene("", "By the power of science!", 3000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Paparazzi");
}());
