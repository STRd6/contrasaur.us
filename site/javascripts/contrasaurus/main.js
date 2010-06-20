var score = 0;
var canvas;
var dino = Dinosaur();
var floor;
var bulletTile = loadImageTile("images/projectiles/blast_small.png");
var dinoTile = loadImageTile("images/levels/dino1.png");
var tankTile = loadImageTile("images/enemies/tank.png");
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
  "laser": LaserGun,
  "machineGun": MachineGun,
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

$(document).keydown(function(e) {
  if(e.keyCode == 39) {
    currentLevel.changeTiltAmount(0.5);
    $('#tilt').text(currentLevel.tiltAmount());
  } else if(e.keyCode == 37) {
    currentLevel.changeTiltAmount(-0.5);
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
    sprite: loadImageTile("images/weapons/" + imgFile),
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
  return [
    '<div class="menu" data-iconname="battle_axe.png" data-weaponclass="battleAxe"><img alt="battleAxe" src="images/menu/battleAxe.png"></div>',
    '<div class="menu" data-iconname="placeholder_bazooka.png" data-weaponclass="bazooka"><img alt="bazooka" src="images/menu/bazooka.png"></div>',
    '<div class="menu" data-iconname="placeholder_bomb.png" data-weaponclass="bomb"><img alt="bomb" src="images/menu/bomb.png"></div>',
    '<div class="menu" data-iconname="chainsaw.png" data-weaponclass="chainsaw"><img alt="chainsaw" src="images/menu/chainsaw.png"></div>',
    '<div class="menu" data-iconname="placeholder_flamethrower.png" data-weaponclass="flamethrower"><img alt="flamethrower" src="images/menu/flamethrower.png"></div>',
    '<div class="menu" data-iconname="placeholder_laserGun.png" data-weaponclass="laser"><img alt="laser" src="images/menu/laserGun.png"></div>',
    '<div class="menu" data-iconname="machine_gun.png" data-weaponclass="machineGun"><img alt="machineGun" src="images/menu/machineGun.png"></div>',
    '<div class="menu" data-iconname="placeholder_shotgun.png" data-weaponclass="shotgun"><img alt="shotgun" src="images/menu/shotgun.png"></div>'
  ].rand();
}

function weaponDisposal(object) {
  object.fadeOut("slow", function() {
  object.remove();
 });
}

$(".menu").live("click", function() {
  $(this).unbind("click");
  dropWeaponPowerup(
    "" + $(this).attr("data-iconName"),
    weaponMap[$(this).attr("data-weaponClass")]
  );
  weaponDisposal($(this));
  $("div.menu:last").after(addRandomWeapon());
});