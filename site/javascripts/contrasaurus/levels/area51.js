(function() {
  var scene = Scene([
    {
      image: loadImageTile("images/levels/area51/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    }
  ], []);

  var floor = Floor();

  var triggers = [{
    at: 200,
    event: function(level) {
      level.complete();
    }
  }];

  addCutscene("", "By the power of science!", 3000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Paparazzi");
}());
