$('#gameCanvas').powerCanvas({init: function(_canvas) {

  canvas = _canvas;
  canvas.font("bold 1.2em 'Monaco', 'Inconsolata', 'consolas', 'Courier New', 'andale mono', 'lucida console', 'monospace'");

  var started = false;
  var loaded = false;
  var titleScreen = Sprite.load("images/titlescreen.png");
  var dots = "";

  var loadingInterval = setInterval(function() {
    if(dots.length % 4 == 3) {
      dots = "";
    } else {
      dots = dots + ".";
    }

    var status = AssetTracker.count();

    if(status[0] >= status[1]) {
      loaded = true;
      clearInterval(loadingInterval);
    }

    titleScreen.draw(canvas, 0, 0);
    canvas.fillColor("#FFF");
    if(loaded) {
      canvas.centerText("PRESS SPACE TO START", 360);
    } else {
      canvas.fillText("LOADING" + dots, 280, 360);
    }
  }, 500);

  $('.continue_yes').click(function() {
    dino.heal(500);
    score = Math.floor(score / 2);
    currentLevel.continueResume();
    $("#game_container").css("cursor", "none");
    $('#continue').hide();
  });

  $('.continue_no').click(function() {
    $('#continue').hide();
    endGameDisplay();
  });

  $(document).bind("keydown", "space", function() {
    if(loaded && !started) {
      started = true;
      nextStage();
    }
  })
}});
