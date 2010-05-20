function Level(canvas, dino, scene, platforms, generateEnemies) {
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

  var backgroundMusic = $('<audio src="audio/Dragon Force - My Spirit Will Go On.mp3"></audio>').appendTo('body');

  return {
    start: function() {
      backgroundMusic.get(0).play();
    },

    stop: function() {
      backgroundMusic.get(0).pause();
    },

    step: function step() {
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
  }
}
