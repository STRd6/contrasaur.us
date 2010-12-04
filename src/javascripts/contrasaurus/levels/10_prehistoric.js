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

    (1).times(function(i) {
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

    return foregrounds;
  }

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "mobile.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      repeat: true
    }
  ], generateForegroundScenary());

  var floor = Floor();

  var brontosaurus;

  var triggers = [{
    every: 43,
    event: function(level) {
      if(meteorsActive) {
        level.addGameObject(Meteor({
          x: level.position().x + rand(CANVAS_WIDTH)
        }));
      }
    }
  }, {
    every: 100,
    event: function(level) {
      generateRunningEnemies(level, 1);
    }
  }, {
    at: 200,
    event: function() {
      showRedButton = true;
      level.dialog(DialogBox({
        text: (mobile) ? "Tap red button to CHOMP" : "Press space to CHOMP!"
      }), 200);
    }
  }, {
    at: 495,
    event: function() {
      meteorsActive = true;
    }
  }, {
    at: 500,
    event: function() {
      showRedButton = false;
    }
  }, {
    at: 1200,
    event: function(level) {
      canScore = true;

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

  addCutscene("images/levels/cutscenes/triassic.png", "Thousands of years ago... the search for a champion begins.", 4000);

  var level = addLevel({
    audio: "1",
    description: "BC 3,700: Prehistoric Utah",
    scene: scene,
    objective: "Eat",
    objectiveImage: 'images/enemies/dinofodder.png',
    platforms: [floor],
    triggers: triggers
  });
});
