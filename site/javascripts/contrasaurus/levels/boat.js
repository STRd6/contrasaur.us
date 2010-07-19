(function() {
  var boatTarget = Point(440, 285);
  var boatPosition =  boatTarget.add(Point());

  var scene = Scene([
    {
      image: Sprite.load("images/levels/parasail/coast.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    },
    {
      image: Sprite.load("images/levels/clouds2.png"),
      parallaxRate: 1,
      velocity: Point(-0.5, 0),
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 640
    }
  ], [
    {
      image: Sprite.load("images/levels/clouds1.png"),
      parallaxRate: 1,
      velocity: Point(-1, 0),
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 640
    },
    {
      image: Sprite.load("images/levels/parasail/speed-boat.png"),
      parallaxRate: 0,
      position: boatPosition
    },
    {
      image: Sprite.load("images/levels/parasail/ocean.png"),
      parallaxRate: 1,
      velocity: Point(-3, 0),
      position: {
        x: 0,
        y: 320
      },
      repeat: true,
      width: 640
    }
  ]);

  var floor = Floor({
    sprite: null,
    water: true
  });

  var counter = 0;

  var triggers = [{
    at: 0,
    event: function(level) {
      dino.parasailing(true);

      level.tiltAmount(5);
    }
  }, {
    every: 1,
    event: function(level) {
      counter++;

      // Oscilate Boat
      boatPosition.x = boatTarget.x + 20 * Math.sin(counter/20);

      // Update speed and position based on boat and cord elasticity

    }
  }, {
    every: 30,
    event: function(level) {
      level.addGameObject(Parasoldier({
          xVelocity: 0,
          x: level.position().x + rand(CANVAS_WIDTH - 40) + 20
        }));
    }
  }, {
    at: 2000,
    event: function(level) {
      level.complete();
      dino.parasailing(false);
    }
  }];

  addLevel(scene, [floor], triggers);
}());
