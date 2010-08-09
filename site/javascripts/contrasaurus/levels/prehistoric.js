(function() {
  var imgPath = "images/levels/prehistoric/";

  var meteorsActive = false;

  function generateStandingEnemies(level, count) {
    count.times(function(i) {
      level.addGameObject(
        Utahraptor({
          xVelocity: 0,
          x: level.position().x + CANVAS_WIDTH + i*30,
          sprite: loadAnimation("images/enemies/dinofodder_eat.png", 2, 61, 33, 6)
        })
      );
      level.addGameObject(GameObject({
        sprite: Sprite.load([
          imgPath + "grass1.png",
          imgPath + "grass2.png",
          imgPath + "grass3.png"
        ].rand()),
        x: level.position().x + CANVAS_WIDTH + (i*30) - 40,
        y: 310
      }));
    });
  }

  function generateRunningEnemies(level, count) {
    count.times(function(i) {
      level.addGameObject(
        Utahraptor({
          xVelocity: -(rand(6) + 0.5),
          x: level.position().x + CANVAS_WIDTH + i*20
        }
      ));
    });
  }

  function generateForegroundScenary() {
    var foregrounds = [];
    (7).times(function() {
      foregrounds.push({
        image: Sprite.load(imgPath + "rock.png"),
        parallaxRate: 1,
        position: {
          x: rand(1920),
          y: 325 + rand(150)
        },
        repeat: true,
        width: 1920
      });
    });

    (5).times(function(i) {
      foregrounds.push({
        image: Sprite.load([
          imgPath + "plant3.png",
          imgPath + "plant4.png",
          imgPath + "plant4.png"
        ].rand()),
        parallaxRate: 1,
        position: {
          x: i * 150 + rand(50),
          y: 225 + rand(80)
        },
        repeat: true,
        width: 1000
      });
    });

    (12).times(function(i) {
      foregrounds.push({
        image: Sprite.load([
          imgPath + "plant1.png",
          imgPath + "plant2.png"
        ].rand()),
        parallaxRate: 1.5,
        position: {
          x: i * 100,
          y: 400
        },
        repeat: true,
        width: 1200
      });
    });

    return foregrounds;
  }

  var scene = Scene([
    {
      image: Sprite.load('images/levels/ground.png'),
      parallaxRate: 0,
      position: {
        x: 0,
        y: CANVAS_HEIGHT - Floor.LEVEL
      },
      repeat: true,
      width: 640
    },
    {
      image: Sprite.load(imgPath + "volcano_background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 1500
    },
    {
      image: Sprite.load(imgPath + "volcano_midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true,
      width: 6161
    },
    {
      image: Sprite.load(imgPath + "volcano_grassy_foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 4
      },
      repeat: true,
      width: 10000
    }
  ], generateForegroundScenary());

  var floor = Floor();

  var brontosaurus;

  var triggers = [{
    every: 1,
    event: function(level) {
      if(Math.random() < 0.01) {
        generateRunningEnemies(level, rand(5));
      }

      if(meteorsActive) {
        if (Math.random() < 0.03) {
          level.addGameObject(Meteor({
            x: level.position().x + rand(CANVAS_WIDTH)
          }));
        }
      }
    }
  }, {
    every: 50,
    event: function(level) {
      level.addGameObject(GameObject({
        sprite: Sprite.load([
          "images/levels/prehistoric/grass1.png",
          "images/levels/prehistoric/grass2.png",
          "images/levels/prehistoric/grass3.png"
        ].rand()),
        x: level.position().x + rand(CANVAS_WIDTH) + CANVAS_WIDTH,
        y: 310
      }));

      if(Math.random() < 0.5) {
        generateStandingEnemies(level, rand(4) + 1);
      }

      if (dino.boss()) {
        level.addGameObject(
          Utahraptor({
            xVelocity: -6, x: level.position().x + CANVAS_WIDTH + 30
          })
        );
      }
    }
  }, {
    at: 1000,
    event: function() {
      meteorsActive = true;
    }
  }, {
    at: 2500,
    event: function(level) {
      brontosaurus = Brontosaurus({
        x: level.position().x + CANVAS_WIDTH + 100,
        y: 170
      });

      brontosaurus.bind('destroy', function() {
        currentLevel.complete();
        dino.boss(false);
      });

      dino.boss(brontosaurus);

      level.addGameObject(brontosaurus);
    }
  }];

  var useTheYawToChomp = DialogBox("Use the yaw to CHOMP!");

  addCutscene("images/levels/cutscenes/triassic.png", "Thousands of years ago...", 3000);
  addLevel(scene, [floor], triggers, "Lady Gaga - Bad Romance", function(level) {
    if (level.age() > 400 && level.age() < 600) {
      useTheYawToChomp.draw(canvas);
    }
  });
}());
