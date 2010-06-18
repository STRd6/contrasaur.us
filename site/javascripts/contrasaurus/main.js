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
var weapons = [];
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

weapons.push(
  "meat", "Shotgun", "Bomb", "Bazooka",
  "LaserGun", "Flamethrower", "MachineGun", "Chainsaw",
  "BattleAxe", "Shield"
);

function weaponDisposal(weapon) {
  $("#" + weapon).unbind("click")
                 .fadeOut("slow", function() {
                   $(this).remove();
                   $("div.menu:last").after(addRandomWeapon())
                 });
}

// TODO: use code similar to this to handle all menu items at once
//$.each(weapons, function(i, weapon) {
//  $("#" + weapon).click(menuClickHandler(weapon))
//});

// TODO add grayout effect until weapon is available
function addRandomWeapon() {
  var weapon = weapons.rand();
  return '<div class="menu" id="' + weapon + '"><img alt="' + weapon + '" src="images/menu/' + weapon + '.png"/></div>';
}

$("#meat").click(function() {
  $("#meat").unbind("click");
  dropPowerup("meat.png", function(hitTarget) {
    if(hitTarget.heal) {
      hitTarget.heal(50);
    }
  });
  weaponDisposal("meat");
});

$("#Shotgun").click(function() {
  $("#Shotgun").unbind("click");
  dropWeaponPowerup("powerup_shotgun.png", Shotgun);
  weaponDisposal("Shotgun");
});

$("#Bomb").click(function() {
  $("#Bomb").unbind("click");
  dropWeaponPowerup("powerup_bomb.png", PrimalScream);
  weaponDisposal("Bomb");
});

$("#Bazooka").click(function() {
  $("#Bazooka").unbind("click");
  dropWeaponPowerup("powerup_missile.png", Bazooka);
  weaponDisposal("Bazooka");
});

$("#LaserGun").click(function() {
  $("#LaserGun").unbind("click");
  dropWeaponPowerup("powerup_laser.png", LaserGun);
  weaponDisposal("LaserGun");
});

$("#Flamethrower").click(function() {
  $("#Flamethrower").unbind("click");
  dropWeaponPowerup("powerup_flame.png", Flamethrower);
  weaponDisposal("Flamethrower");
});

$("#MachineGun").click(function() {
  $("#MachineGun").unbind("click");
  dropWeaponPowerup("machine_gun.png", MachineGun);
  weaponDisposal("MachineGun");
});

$("#Chainsaw").click(function() {
  $("#Chainsaw").unbind("click");
  dropWeaponPowerup("weapons/chainsaw.png", Chainsaw);
  weaponDisposal("Chainsaw");
});

$("#BattleAxe").click(function() {
  dropWeaponPowerup("weapons/battle_axe.png", BattleAxe);
  weaponDisposal("BattleAxe");
});

$("#Shield").click(function() {
  $("#Shield").unbind("click");
  //Get an icon to drop for the shield
  weaponDisposal("Shield");
});
