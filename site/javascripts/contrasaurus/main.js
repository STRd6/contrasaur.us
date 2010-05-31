var score = 0;
var canvas;
var dino;
var floor;
var bulletTile = loadImageTile("images/blast_small.png");
var dinoTile = loadImageTile("images/dino1.png");
var tankTile = loadImageTile("images/tank.png");
var bulletQueue = [];
var dialogBox = DialogBox("GAME OVER");
var currentLevel;
var displayTexts = [];
var testExplosion = loadAnimation("explosion.png", 25, 67, 171);

var GRAVITY = 0.8;
var MILLISECONDS_PER_FRAME = 33;

function shoot(bullet) {
  currentLevel.shoot(bullet);
}

function enemyShoot(bullet) {
  currentLevel.enemyShoot(bullet);
}

function display(text) {
  displayTexts.push(GameText(text, dino.getCircle()));
}

$(document).keydown(function(e) {
  console.log(e);

  if(e.keyCode == 39) {
    currentLevel.changeTiltAmount(1);
    $('#tilt').text(currentLevel.tiltAmount());
  } else if(e.keyCode == 37) {
    currentLevel.changeTiltAmount(-1);
    $('#tilt').text(currentLevel.tiltAmount());
  }
});

var bombingRunActive = false;
var bombingRunCount = 0;
function generateEnemies(level) {
  var enemies = level.enemies();
  if (Math.random() < 0.005) {
    var p = PowerupContainer(Math.PI / 2);
    p.addListener(Powerup("laser", {
        x: rand(canvas.width()),
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
    enemies.push(Tank({sprite: tankTile}));
  }

  if (bombingRunActive) {
    if (bombingRunCount % 15 == 0) {
      enemies.push(Bomber({
        x: canvas.width() + 100 - bombingRunCount,
        y: 40
      }));
    }
    bombingRunCount++;
    if (bombingRunCount > 100) {
      bombingRunActive = false;
      bombingRunCount = 0;
    }
  }

  if (Math.random() < 0.01) {
    // HAX: Putting this in enemy bullets so it will collide with dino.
    if(Math.random() < 0.5) {
      if (Math.random() < 0.5) {
        enemyShoot(Powerup("bomb", {
          x: rand(canvas.width()),
          yVelocity: 2
        }));
      }

      if (Math.random() < 0.4) {
        enemyShoot(Powerup("shotgun", {
          x: rand(canvas.width()),
          yVelocity: 1
        }));
      }

      if (Math.random() < 0.4) {
        enemyShoot(Powerup("missile", {
          x: rand(canvas.width()),
          yVelocity: 1
        }));
      }

      if (Math.random() < 0.4) {
        enemyShoot(Powerup("laser", {
          x: rand(canvas.width()),
          yVelocity: 1
        }));
      }

      if (Math.random() < 0.4) {
        enemyShoot(Powerup("flame", {
          x: rand(canvas.width()),
          yVelocity: 1
        }));
      }

    } else {
      enemyShoot(Powerup("meat", {
        x: rand(canvas.width()),
        xVelocity: rand(6) - 3
      }));
    }
  }
}

$('#gameCanvas').powerCanvas({init: function(_canvas) {
  function drawOverlay() {
    var activeTexts = [];
    $.each(displayTexts, function(i, displayText) {
      //TODO: Move update out of draw
      displayText.update();

      if(displayText.active()) {
        displayText.draw(canvas);
        activeTexts.push(displayText);
      }
    });
    displayTexts = activeTexts;

    healthBar.value(dino.health());
    healthBar.draw(canvas);

    // Score display
    $("#score").text(score);
  }

  canvas = _canvas;
  canvas.font("bold 1em consolas, 'Courier New', 'andale mono', 'lucida console', monospace");

  dino = Dinosaur()
  floor = Floor();

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
        x: rand(canvas.width() - 116),
        y: 280
      }
    },
    {
      image: loadImageTile('images/jungleTree.png'),
      parallaxRate: 2,
      position: {
        x: rand(canvas.width() - 116),
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

  var healthBar = ProgressBar({
    colorMap: healthColorMap,
    max: dino.health(),
    value: dino.health()
  });

  var gameOver = false;
  var currentStage = -1;

  function nextStage() {
    if(!gameOver) {
      currentStage++;
      currentLevel = stages[currentStage];
      stages[currentStage].start(canvas);
    } else {
      // Game Over
    }
  }

  var timeCounter = 0;

  stages = [
    Cutscene("images/triassic.png", "Thousands of years ago...", 3000, nextStage),
    Level({
      canvas: canvas,
      dino: dino,
      scene: scene,
      platforms: [floor],
      afterStep: overlayUpdate,
      triggers: [{
        at: 180,
        event: function(level) {
          level.stop();
          dino.powerup({weapon: {machineGun: 6}});
          dino.powerup({weapon: {jetpack: 6}});
        }
      }],
      completed: nextStage
    }),
    Cutscene("images/lincoln_memorial.png",
      "Contrasaur! I know the terrible Truth behind Reagan's plan!",
      3000,
      nextStage
    ), Cutscene("images/tyrannosaurus_rex.png", "?!", 1000, nextStage),
    Level({
      canvas: canvas,
      dino: dino,
      scene: scene,
      platforms: [floor],
      beforeStep: generateEnemies,
      afterStep: overlayUpdate,
      triggers: [{
        every: 500,
        event: function() {
          bombingRunActive = true;
        }
      }],
      completed: nextStage
    })
  ];

  function overlayUpdate(){
    drawOverlay();

    // GG
    if (dino.health() <= 0) {
      gameOver = true;
      currentLevel.stop();

      dialogBox.draw(canvas);
    }
  }

  nextStage();
}});