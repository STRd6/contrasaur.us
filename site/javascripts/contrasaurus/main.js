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

$(document).keydown(function(e) {
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

var tophat = GameObject({
  x: 30,
  y: -32,
  sprite: loadImageTile("images/accessories/tophat.png")
});

if(rand() < 0.25) {
  dino.addAccessory(tophat);
}

function dropPowerup(imgFile, callback) {
  addGameObject(Powerup({
    callback: callback,
    sprite: loadImageTile("images/" + imgFile),
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

$("#meat").click(function() {
  $("#meat").unbind("click");
  dropPowerup("meat.png", function(hitTarget) {
    if(hitTarget.heal) {
      hitTarget.heal(50);
    }
  });
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#shotgun").click(function() {
  $("#shotgun").unbind("click");
  dropWeaponPowerup("powerup_shotgun.png", Shotgun);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#bomb").click(function() {
  $("#bomb").unbind("click");
  dropWeaponPowerup("powerup_bomb.png", PrimalScream);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#missile").click(function() {
  $("#missile").unbind("click");
  dropWeaponPowerup("powerup_missile.png", Bazooka);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#laser").click(function() {
  $("#laser").unbind("click");
  dropWeaponPowerup("powerup_laser.png", LaserGun);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#flame").click(function() {
  $("#flame").unbind("click");
  dropWeaponPowerup("powerup_flame.png", Flamethrower);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#machineGun").click(function() {
  $("#machineGun").unbind("click");
  dropWeaponPowerup("machine_gun.png", MachineGun);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#chainsaw").click(function() {
  $("#chainsaw").unbind("click");
  dropWeaponPowerup("weapons/chainsaw.png", Chainsaw);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#battleAxe").click(function() {
  $("#battleAxe").unbind("click");
  dropWeaponPowerup("weapons/battle_axe.png", BattleAxe);
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});

$("#shield").click(function() {
  $("#shield").unbind("click");
  //Get an icon to drop for the shield
  $(this).fadeOut("slow", function() {
    $(this).remove();
  });
});
