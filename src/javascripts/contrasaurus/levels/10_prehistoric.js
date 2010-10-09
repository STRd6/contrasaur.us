$(function() {
  var imgPath = "images/levels/prehistoric/";

  var meteorsActive = false;

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
        every: 1920
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
        every: 1000
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
        every: 1200
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
      }
    },
    {
      image: Sprite.load(imgPath + "volcano_background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    },
    {
      image: Sprite.load(imgPath + "volcano_midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    },
    {
      image: Sprite.load(imgPath + "volcano_grassy_foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 4
      },
      repeat: true
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

      if (dino.boss()) {
        level.addGameObject(
          Utahraptor({
            xVelocity: -6, x: level.position().x + CANVAS_WIDTH + 30
          })
        );
      }
    }
  }, {
    at: 495,
    event: function() {
      meteorsActive = true;
    }
  }, {
    at: 1200,
    event: function(level) {
      brontosaurus = Brontosaurus({
        x: level.position().x + CANVAS_WIDTH + 160
      });

      brontosaurus.bind('destroy', function() {
        dino.timeTravel(true);
        dino.boss(false);

        level.after(140, function() {
          level.fadeOut(10);
        });

        level.after(150, function() {
          level.complete();
        });
      });

      dino.boss(brontosaurus);

      level.addGameObject(brontosaurus);
      level.lockCamera(level.position().x, level.position().x + 250);
    }
  }];

  var pressDownToChomp = DialogBox({
    text: "Press space to CHOMP!"
  });

  addCutscene("images/levels/cutscenes/triassic.png", "Thousands of years ago... the search for a champion begins.", 3000);

  var level = addLevel({
    audio: "Lady Gaga - Bad Romance",
    description: "BC 3,700: Prehistoric Utah",
    scene: scene,
    objective: "Eat",
    objectiveImage: 'images/enemies/dinofodder.png',
    platforms: [floor],
    triggers: triggers
  });

  level.bind("afterStep", function(level) {
    if (level.age() > 300 && level.age() < 500) {
      pressDownToChomp.update();
      pressDownToChomp.draw(canvas);
    }
  });
});
