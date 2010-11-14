var score = 0;

var canvas;
var dino;
var healthBar;

function detectIphoneOrIpod() {
  var userAgent = navigator.userAgent.toLowerCase();
  return userAgent.search("iphone") !== -1 || userAgent.search("ipod") !== -1;
}

var mobile = detectIphoneOrIpod();

var pauseDisplay = {
  draw: function(canvas) {
    canvas.fill("rgba(0, 0, 0, 0.66)");
    canvas.fillColor("#FFF");
    canvas.centerText("PAUSED", 180);
  }
};
var debugHalt = false;
var currentLevel;
var displayTexts = [];
var stages = [];

var highScores = [];
var cookieScores = [];

if (readCookie("highScore")) {
  var cookieScores = readCookie("highScore").split(",");
}

cookieScores.push(score);
$.unique(cookieScores);

highScores = $.map(cookieScores, function(cookie) {
  return [[parseInt(cookie), "You"]];
});

createCookie("highScore", cookieScores.join(","));
highScores = highScores.concat([[100000, "Zuch"], [200000, "Dr. Werewolf"], [300000, "Condor"]]);

var weapons = [];

var weaponMap = {
  "battleAxe": BattleAxe,
  "missileLauncher": MissileLauncher,
  "chainsaw": Chainsaw,
  "flamethrower": Flamethrower,
  "laserGun": LaserGun,
  "machineGun": MachineGun
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

  if(showCrosshair && !mobile) {
    crosshair.draw(canvas, target.x - crosshair.width/2, target.y - crosshair.height/2);
  }

  // Score display
  canvas.fillText(score, 510, 38)
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
        cookieScores.push(score);
        createCookie("highScore", cookieScores.join(","));
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

function endGameDisplay() {
  endGame();

  var leaderDisplay = {
    draw: function(canvas) {
      highScores.sort(function(a, b) { return a[0] - b[0] });
      highScores.reverse();

      canvas.fill("rgba(0, 0, 0, 0.66)");
      canvas.fillColor("#FFF");
      canvas.centerText("ALL TIME LEADERS:", 200);
      canvas.centerText(highScores[0][1] + ": " + highScores[0][0], 230);
      canvas.centerText(highScores[1][1] + ": " + highScores[1][0], 260);
      canvas.centerText(highScores[2][1] + ": " + highScores[2][0], 290);
    }
  };

  leaderDisplay.draw(canvas);
}

function continueGame() {
  currentLevel.continuePause();
  $('#continue').show();
  $("#game_container").css("cursor", "default");
  dino.active(true);
}

function overlayUpdate(){
  drawOverlay();
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

function createCookie(name, value, days) {
  var expires;
  var cookie;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }

  cookie = name + "=" + value + expires + "; path=/";

  return document.cookie = cookie;
}

function readCookie(name) {
  var nameEquals = name + "=";
  var cookies = document.cookie.replace(/\s/g, "").split(';');
  var result;

  $.each(cookies, function(i, cookie) {
    if (cookie.indexOf(nameEquals) == 0) {
      result = cookie.substring(nameEquals.length, cookie.length);
    }
  });

  return result;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

function addHighScore(score, player) {
  return highScores.push([parseInt(score), player]);
}

$(function() {

  dino = Dinosaur();
  healthBar = ProgressBar({
    colorMap: healthColorMap,
    max: dino.health(),
    value: dino.health()
  });

  target = Point();
  crosshair = Sprite.load("images/crosshair.png");

  $(document).bind('keydown', "esc p", function() {
    if(currentLevel.togglePause()) {
      pauseDisplay.draw(canvas);
      $("#level_objectives").show();
    } else {
      $("#level_objectives").hide();
    }
  });

  if(DEVELOPMENT) {
    // Hit Circles
    $(document).bind('keydown', "0", function() {
      GameObject.DEBUG_HIT = !GameObject.DEBUG_HIT;
    });

    // Level select
    $(document).keydown(function(e) {
      if(e.keyCode >= 49 && e.keyCode <= 57) {
        nextStage(e.keyCode - 48);
      }
    });
  }

  $("#game_container").bind("mousemove", function(event) {
    var offset = $(this).offset();

    var localY = event.pageY - offset.top;
    var localX = event.pageX - offset.left;

    target = Point(localX, localY);
  }).bind("contextmenu", function() {
    return false;
  });
});
