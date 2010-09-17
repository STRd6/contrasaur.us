var score = 0;
var money = 1000;
var canvas;
var dino;
var healthBar;
var killCounter = {
  'bomber': 0,
  'boss': 0,
  'parasoldier': 0,
  'sandinista': 0,
  'secret service': 0,
  'tank': 0,
  'utahraptor': 0
};
var dialogBox;
var pauseDisplay = {
  draw: function(canvas) {
    canvas.fill("rgba(0, 0, 0, 0.66)");
    canvas.fillColor("#FFF");
    canvas.centerText("PAUSED", 230);
  }
};
var debugHalt = false;
var currentLevel;
var displayTexts = [];
var testExplosion = loadAnimation("images/effects/explosion.png", 25, 67, 171);
var stages = [];

var weapons = [];

var weaponMap = {
  "battleAxe": BattleAxe,
  "missileLauncher": MissileLauncher,
  "chainsaw": Chainsaw,
  "flamethrower": Flamethrower,
  "laserGun": LaserGun,
  "machineGun": MachineGun,
  "meat": Meat
};

$.each(weaponMap, function(name) {
  weapons.push(name);
});

var target;
var crosshair;
var showCrosshair = false;

var gameOver = false;
var currentStage = -1;

function addScore(points) {
  score += points;
}

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

  if(showCrosshair) {
    crosshair.draw(canvas, target.x - crosshair.width/2, target.y - crosshair.height/2);
  }

  // Score display
  $("#score").text(score);
  $("#money .amount").text(money);
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
    leaderBoard.draw(canvas);
    leader1.draw(canvas);
    leader2.draw(canvas);
    leader3.draw(canvas);
  }
}

function addLevel(I) {
  var level = Level($.extend({
    canvas: canvas,
    completed: nextStage
  }, I));

  level.bind("afterStep", overlayUpdate);
  level.addGameObject(dino);

  stages.push(level);

  return level;
}

function addCutscene(image, text, duration, avatar) {
  stages.push(Cutscene(image, text, duration, avatar, nextStage));
}

function addGameObject(gameObject) {
  if(currentLevel.addGameObject) {
    currentLevel.addGameObject(gameObject);
  }
}

function display(text) {
  displayTexts.push(GameText(text, dino.position()));
}

$(function() {
  var doctorAvatar = Sprite.load("images/doctor.png");
  dialogBox = DialogBox("He is dead...", {
    avatar: doctorAvatar,
    avatarWidth: 162
  });

  dino = Dinosaur();
  healthBar = ProgressBar({
    colorMap: healthColorMap,
    max: dino.health(),
    value: dino.health()
  });

  target = Point();
  crosshair = Sprite.load("images/crosshair.png");

  leaderBoard = DialogBox("ALL TIME LEADERS:", {
    height: 25,
    lineHeight: 0,
    y: 25
  });
  leader1 = DialogBox("Condor: 3,492,192", {
    height: 25,
    lineHeight: 0,
    y: 50
  });
  leader2 = DialogBox("Dr. Werewolf: 3,182,019", {
    height: 25,
    lineHeight: 0,
    y: 75
  });
  leader3 = DialogBox("Zuch: 3,052,222", {
    height: 25,
    lineHeight: 0,
    y: 100
  });

  $(document).bind('keydown', "0", function() {
    GameObject.DEBUG_HIT = !GameObject.DEBUG_HIT;
  });

  $(document).bind('keydown', "esc p", function() {
    if(currentLevel.togglePause()) {
      pauseDisplay.draw(canvas);
    }
  });

  // Level select
  $(document).keydown(function(e) {
    if(e.keyCode >= 49 && e.keyCode <= 57) {
      nextStage(e.keyCode - 48);
    }
  });

  $("#gameCanvas").bind("mousemove", function(event) {
    var offset = $(this).offset();

    var localY = event.pageY - offset.top;
    var localX = event.pageX - offset.left;

    target = Point(localX, localY);
  }).bind("contextmenu", function() {
    return false;
  });;
});
