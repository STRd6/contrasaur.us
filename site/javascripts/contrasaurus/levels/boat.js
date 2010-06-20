(function() {
  var scene = Scene([
    {
      image: loadImageTile("images/levels/parasail/coast.png"),
      parallaxRate: 0,
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
      image: loadImageTile("images/levels/clouds1.png"),
      parallaxRate: 1,
      rate: {x: -1},
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    },
    {
      image: loadImageTile("images/levels/parasail/speed-boat.png"),
      parallaxRate: 0,
      position: {
        x: 320,
        y: 285
      },
      repeat: true
    },
    {
      image: loadImageTile("images/levels/parasail/ocean.png"),
      parallaxRate: 1,
      rate: {x: -3},
      position: {
        x: 0,
        y: 320
      },
      repeat: true
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
    }
  },
  {
    at: 500,
    event: function(level) {
      level.complete();
      dino.parasailing(false);
    }
  }];

  addLevel(scene, [floor], triggers);
}());
