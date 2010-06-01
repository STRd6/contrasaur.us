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

  var bombingRunActive = false;
  var bombingRunCount = 0;
  var maxPlanes = 10;
  var numPlanes = 1;
  var planeDelay = 15;
  function generateEnemies(level) {
    var enemies = level.enemies();
    if (Math.random() < 0.005) {
      var p = PowerupContainer(Math.PI / 2);
      p.addListener(Powerup("laser", {
          x: rand(CANVAS_WIDTH),
          yVelocity: 2
        }));
      enemies.push(p);
    }

    if (Math.random() < 0.03) {
      if (Math.random() < 0.5) {
        enemies.push(Enemy());
      } else {
        enemies.push(Parasoldier());
      }
    }

    if (Math.random() < 0.01) {
      enemies.push(Tank());
    }

    if (bombingRunActive) {
      if (bombingRunCount % planeDelay == 0) {
        enemies.push(Bomber({
          x: CANVAS_WIDTH + 100 - bombingRunCount,
          y: 40
        }));
      }
      bombingRunCount++;
      if (bombingRunCount >= planeDelay * numPlanes) {
        bombingRunActive = false;
        bombingRunCount = 0;
        if (numPlanes < maxPlanes) {
          numPlanes++;
        }
      }
    }

    if (Math.random() < 0.01) {
      // HAX: Putting this in enemy bullets so it will collide with dino.
      if(Math.random() < 0.5) {
        if (Math.random() < 0.5) {
          enemyShoot(Powerup("bomb", {
            x: rand(CANVAS_WIDTH),
            yVelocity: 2
          }));
        }

        if (Math.random() < 0.4) {
          enemyShoot(Powerup("shotgun", {
            x: rand(CANVAS_WIDTH),
            yVelocity: 1
          }));
        }

        if (Math.random() < 0.4) {
          enemyShoot(Powerup("missile", {
            x: rand(CANVAS_WIDTH),
            yVelocity: 1
          }));
        }

        if (Math.random() < 0.4) {
          enemyShoot(Powerup("laser", {
            x: rand(CANVAS_WIDTH),
            yVelocity: 1
          }));
        }

        if (Math.random() < 0.4) {
          enemyShoot(Powerup("flame", {
            x: rand(CANVAS_WIDTH),
            yVelocity: 1
          }));
        }

      } else {
        enemyShoot(Powerup("meat", {
          x: rand(CANVAS_WIDTH),
          xVelocity: rand(6) - 3
        }));
      }
    }
  }

  var floor = Floor();

  var triggers = [{
    every: 500,
    event: function() {
      bombingRunActive = true;
    }
  }, {
    every: 1,
    event: function(level) {
      generateEnemies(level);
    }
  }, {
    at: 3000,
    event: function(level) {
      level.complete();
    }
  }];

  addCutscene("", "...", 4000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Telephone");
}());