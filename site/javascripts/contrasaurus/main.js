var score = 0;
var canvas;
var dino = Dinosaur();
var killCounter = {
      'bomber': 0,
      'boss': 0,
      'parasoldier': 0,
      'sandinista': 0,
      'scientist': 0,
      'secret service': 0,
      'tank': 0,
      'utahraptor': 0,
      'wolf': 0
    };
var floor;
var bulletQueue = [];
var dialogBox = DialogBox("GAME OVER");
var gamePaused = false;
var debugHalt = false;
var leaderBoard = DialogBox("ALL TIME LEADERS:", {
  height: 25,
  yPosition: 25
});
var leader1 = DialogBox("Condor: 3,492,192", {
  height: 25,
  yPosition: 50
});
var leader2 = DialogBox("Dr. Werewolf: 3,182,019", {
  height: 25,
  yPosition: 75
});
var leader3 = DialogBox("Zuch: 3,052,222", {
  height: 25,
  yPosition: 100
});
var currentLevel;
var displayTexts = [];
var testExplosion = loadAnimation("images/effects/explosion.png", 25, 67, 171);
var stages = [];

var weapons = [
  "battleAxe",
  "bazooka",
  "bomb",
  "chainsaw",
  "flamethrower",
  "laserGun",
  "machineGun",
  "meat",
  "shield",
  "shotgun"
]

var weaponMap = {
  "battleAxe": BattleAxe,
  "bazooka": Bazooka,
  "bomb": PrimalScream,
  "chainsaw": Chainsaw,
  "flamethrower": Flamethrower,
  "laserGun": LaserGun,
  "machineGun": MachineGun,
  "meat": Meat,
  "shield": Shield,
  "shotgun": Shotgun
}

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
    leaderBoard.draw(canvas);
    leader1.draw(canvas);
    leader2.draw(canvas);
    leader3.draw(canvas);
  }
}

function addLevel(scene, platforms, triggers, audio) {
  var level = Level({
    audio: audio,
    canvas: canvas,
    scene: scene,
    afterStep: overlayUpdate,
    triggers: triggers,
    completed: nextStage
  });

  $.each(platforms, function(i, platform) {
    level.addGameObject(platform);
  });
  level.addGameObject(dino);

  stages.push(level);
}

function addCutscene(image, text, duration) {
  stages.push(Cutscene(image, text, duration, nextStage));
}

function addGameObject(gameObject) {
  if(currentLevel.addGameObject) {
    currentLevel.addGameObject(gameObject);
  }
}

function display(text) {
  displayTexts.push(GameText(text, dino.position()));
}

// Keyboard Bindings
$(document).bind('keydown', "esc", function() {
  currentLevel.stop();
});

$(document).bind('keydown', "0", function() {
  GameObject.DEBUG_HIT = !GameObject.DEBUG_HIT;
});

$(document).bind('keydown', "d", function() {
  debugHalt = true;
});

$(document).bind('keydown', "p", function() {
  gamePaused = !gamePaused;
});

// Level select
$(document).keydown(function(e) {
  if(e.keyCode >= 49 && e.keyCode <= 57) {
    nextStage(e.keyCode - 48);
  }
});

function dropPowerup(imgFile, callback) {
  addGameObject(Powerup({
    callback: callback,
    sprite: Sprite.load("images/weapons/" + imgFile + ".png"),
    x: dino.position().x,
    xVelocity: dino.velocity().x,
    yVelocity: 0
  }));
}

function dropWeaponPowerup(imgFile, weaponClass) {
  dropPowerup(imgFile, function(hitTarget) {
    if(hitTarget.addWeapon) {
      hitTarget.addWeapon(weaponClass());
    }
  });
}

function addRandomWeapon() {
  return $.map(["battleAxe", "bazooka", "bomb", "chainsaw", "flamethrower", "laserGun", "machineGun", "meat", "shotgun"], function(weaponClass) {
    var div = $("<div />").addClass("menu").attr("data-weaponClass", weaponClass);
    div.append($("<img />").attr("src", "images/menu/" + weaponClass + ".png"));
    return div;
  }).rand();
}

function weaponDisposal(object) {
  object.remove();
}

function weaponPurchase() {
  $("#menu_container .inventory").append(addRandomWeapon());
}

$(".store .menu").live("click", function() {
  weaponPurchase();
});

$(".inventory .menu").live("click", function() {
  if (!$(this).attr("data-used")) {
    var weaponClass = $(this).attr("data-weaponClass");
    dropWeaponPowerup(
      weaponClass,
      weaponMap[weaponClass]
    );
    weaponDisposal($(this));
    
    $(this).attr("data-used", 'true');
  }
});
