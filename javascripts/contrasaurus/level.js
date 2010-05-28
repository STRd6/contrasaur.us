function Level(canvas, dino, scene, platforms, generateEnemies, overlayUpdate, completedCallback) {
  var position = {
    x: 0,
    y: 0
  };
  var enemies = [];
  var bullets = [];
  var bulletQueue = [];
  var enemyBullets = [];
  var enemyBulletQueue = [];
  var gameObjects = [];
  var backgroundColor = "#000";
  var intervalId;

  var backgroundMusic = $('<audio src="audio/Dragon Force - My Spirit Will Go On.mp3"></audio>').appendTo('#game_container');

  var self = {
    start: function() {
      backgroundMusic.get(0).play();

      intervalId = setInterval(function() {
        self.step();
        overlayUpdate();
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      backgroundMusic.animate({volume: 0}, 5000, function() {
        this.pause();
      });

      clearInterval(intervalId);
      completedCallback();
    },

    step: function step() {
      canvas.fill(backgroundColor);

      // Draw Backgrounds
      scene.drawBackgrounds(position, canvas);

      Array.prototype.push.apply(bullets, bulletQueue);
      bulletQueue = [];

      Array.prototype.push.apply(enemyBullets, enemyBulletQueue);
      enemyBulletQueue = [];

      generateEnemies(enemies);

      $.each(platforms, function(i, platform) {
        collision(dino, platform);

        platform.draw(canvas);
      });

      dino.update();
      dino.draw(canvas);

      var liveEnemies = [];
      $.each(enemies, function(i, enemy) {
        $.each(platforms, function(i, platform) {
          collision(platform, enemy);
        });

        enemy.update();

        $.each(bullets, function(i, bullet) {
          collision(bullet, enemy);
        });

        collision(dino, enemy);

        if (enemy.active()) {
          liveEnemies.push(enemy);
          enemy.draw(canvas);
        } else {
          score += enemy.pointsWorth();
        }
      });
      enemies = liveEnemies;

      $.each(gameObjects, function(i, gameObject) {
        gameObject.update();

        if (gameObject.active()) {
          gameObject.draw(canvas);
        }
      });

      var liveBullets = [];
      $.each(bullets, function(i, bullet) {
        bullet.update();

        if (bullet.active()) {
          bullet.draw(canvas);
          liveBullets.push(bullet);
        }
      });
      bullets = liveBullets;

      var liveEnemyBullets = [];
      $.each(enemyBullets, function(i, bullet) {
        collision(bullet, dino);
        bullet.update();

        if (bullet.active()) {
          bullet.draw(canvas);
          liveEnemyBullets.push(bullet);
        }
      });
      enemyBullets = liveEnemyBullets;

      // Draw Foregrounds
      scene.drawForegrounds(position, canvas);

      score += bullets.length;

      position.x -= 0.2;
    },

    shoot: function(bullet) {
      bulletQueue.push(bullet);
    },

    enemyShoot: function(bullet) {
      enemyBulletQueue.push(bullet);
    },

    enemies: function() {
      return enemies;
    }
  };

  return self;
}
