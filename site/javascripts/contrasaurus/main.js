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

$("#meat").click(function() {
  console.log("Meat!");
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.heal) {
        hitTarget.heal(50);
      }
    },
    sprite: loadImageTile("images/meat.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    xVelocity: rand(6) - 3
  }));
});

$("#shotgun").click(function() {
  console.log("Shotgun!");
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(Shotgun());
      }
    },
    sprite: loadImageTile("images/powerup_shotgun.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#bomb").click(function() {
  console.log("Bombs!");
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(PrimalScream());
      }
    },
    sprite: loadImageTile("images/powerup_bomb.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#missile").click(function() {
  console.log("Missiles!");
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(Bazooka());
      }
    },
    sprite: loadImageTile("images/powerup_missile.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#laser").click(function() {
  console.log("Laser!");
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(LaserGun());
      }
    },
    sprite: loadImageTile("images/powerup_laser.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#flame").click(function() {
  console.log("Flamethrower!");
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(Flamethrower());
      }
    },
    sprite: loadImageTile("images/powerup_flame.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#machineGun").click(function() {
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(MachineGun());
      }
    },
    sprite: loadImageTile("images/machine_gun.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#chainsaw").click(function() {
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(Chainsaw());
      }
    },
    sprite: loadImageTile("images/weapons/chainsaw.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});

$("#battleAxe").click(function() {
  addGameObject(Powerup({
    callback: function(hitTarget) {
      if(hitTarget.addWeapon) {
        hitTarget.addWeapon(BattleAxe());
      }
    },
    sprite: loadImageTile("images/weapons/battle_axe.png"),
    x: currentLevel.position().x + rand(CANVAS_WIDTH),
    yVelocity: 2
  }));
});
