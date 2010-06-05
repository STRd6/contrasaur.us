var score = 0;
var canvas;
var dino = Dinosaur();
var floor;
var bulletTile = loadImageTile("images/blast_small.png");
var dinoTile = loadImageTile("images/dino1.png");
var tankTile = loadImageTile("images/tank.png");
var bulletQueue = [];
var dialogBox = DialogBox("GAME OVER");
var currentLevel;
var displayTexts = [];
var testExplosion = loadAnimation("explosion.png", 25, 67, 171);
var stages = [];

var gameOver = false;
var currentStage = -1;

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

function nextStage(choice) {
  if(choice !== undefined) {
    if(currentLevel && currentLevel.stop) {
      currentLevel.stop();
    }

    currentStage = choice;
    currentLevel = stages[currentStage];
    stages[currentStage].start(canvas);
  } else {
    if(!gameOver) {
      currentStage++;
      if(currentStage >= stages.length) {
        endGame();
        alert("You Win!");
      } else {
        currentLevel = stages[currentStage];
        stages[currentStage].start(canvas);
      }
    } else {
      // Game Over
    }
  }
}

var healthBar = ProgressBar({
  colorMap: healthColorMap,
  max: dino.health(),
  value: dino.health()
});

function endGame() {
  gameOver = true;
  currentLevel.stop();
}

function overlayUpdate(){
  drawOverlay();

  // GG
  if (dino.health() <= 0) {
    endGame();

    dialogBox.draw(canvas);
  }
}

function addLevel(scene, platforms, triggers, audio) {
  stages.push(Level({
    audio: audio,
    canvas: canvas,
    dino: dino,
    scene: scene,
    platforms: platforms,
    afterStep: overlayUpdate,
    triggers: triggers,
    completed: nextStage
  }));
}

function addCutscene(image, text, duration) {
  stages.push(Cutscene(image, text, duration, nextStage));
}

function shoot(bullet) {
  if(currentLevel) {
    currentLevel.shoot(bullet);
  }
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
    currentLevel.changeTiltAmount(0.2);
    $('#tilt').text(currentLevel.tiltAmount());
  } else if(e.keyCode == 37) {
    currentLevel.changeTiltAmount(-0.2);
    $('#tilt').text(currentLevel.tiltAmount());
  } else if (e.keyCode == 32) {
    dino.jetpack().jetpackCharge(1);
  } else if(e.keyCode == 48) {
    GameObject.DEBUG_HIT = !GameObject.DEBUG_HIT;
  } else if(e.keyCode >= 49 && e.keyCode <= 57) {
    nextStage(e.keyCode - 48);
  }
});
