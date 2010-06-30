var score = 0;
var canvas;
var dino = Dinosaur();
var floor;
var bulletTile = Sprite.load("images/projectiles/blast_small.png");
var dinoTile = Sprite.load("images/levels/dino1.png");
var tankTile = Sprite.load("images/enemies/tank.png");
var bulletQueue = [];
var dialogBox = DialogBox("GAME OVER");
var currentLevel;
var displayTexts = [];
var testExplosion = loadAnimation("images/effects/explosion.png", 25, 67, 171);
var stages = [];
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

// Level select
$(document).keydown(function(e) {
  if(e.keyCode >= 49 && e.keyCode <= 57) {
    nextStage(e.keyCode - 48);
  }
});

var tophat = GameObject({
  x: 85,
  y: -85,
  sprite: Sprite.load("images/accessories/tophat.png")
});

if(rand() < 1) {
  dino.addAccessory(tophat);
}

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
  object.fadeOut("slow", function() {
  object.remove();
 });
}

$(".menu").live("click", function() {
  if (!$(this).attr("data-used")) {
    var weaponClass = $(this).attr("data-weaponClass");
    dropWeaponPowerup(
      weaponClass,
      weaponMap[weaponClass]
    );
    weaponDisposal($(this));
    $("div.menu:last").after(addRandomWeapon());
    $("div.menu:last").hide().fadeIn(2000);
    
    $(this).attr("data-used", 'true');
  }
});
