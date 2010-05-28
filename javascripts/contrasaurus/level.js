function Level(I) {
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
  var backgroundColor = "#A2EEFF";
  var step = 0;
  var intervalId;

  $.reverseMerge(I, {
    triggers: [],
    afterStep: $.noop,
    beforeStep: $.noop
  });

  var backgroundMusic = $('<audio src="audio/Dragon Force - My Spirit Will Go On.mp3"></audio>').appendTo('#game_container');

  function activateTriggers() {
    $.each(I.triggers, function(i, trigger) {
      if(step === trigger.at) {
        trigger.event(self);
      }

      if(trigger.every && step % trigger.every == 0) {
        trigger.event(self);
      }
    });
  }

  var self = {
    start: function() {
      backgroundMusic.get(0).play();

      intervalId = setInterval(function() {
        activateTriggers();
        I.beforeStep(self);
        self.step();
        I.afterStep(self);
        step++;
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      backgroundMusic.animate({volume: 0}, 5000, function() {
        this.pause();
      });

      clearInterval(intervalId);
      I.completed();
    },

    step: function step() {
      I.canvas.fill(backgroundColor);

      // Draw Backgrounds
      I.scene.drawBackgrounds(position, I.canvas);

      Array.prototype.push.apply(bullets, bulletQueue);
      bulletQueue = [];

      Array.prototype.push.apply(enemyBullets, enemyBulletQueue);
      enemyBulletQueue = [];

      $.each(I.platforms, function(i, platform) {
        collision(I.dino, platform);

        platform.draw(I.canvas);
      });

      I.dino.update();
      I.dino.draw(I.canvas);

      var liveEnemies = [];
      $.each(enemies, function(i, enemy) {
        $.each(I.platforms, function(i, platform) {
          collision(platform, enemy);
        });

        enemy.update();

        $.each(bullets, function(i, bullet) {
          collision(bullet, enemy);
        });

        collision(I.dino, enemy);

        if (enemy.active()) {
          liveEnemies.push(enemy);
          enemy.draw(I.canvas);
        } else {
          score += enemy.pointsWorth();
        }
      });
      enemies = liveEnemies;

      $.each(gameObjects, function(i, gameObject) {
        gameObject.update();

        if (gameObject.active()) {
          gameObject.draw(I.canvas);
        }
      });

      var liveBullets = [];
      $.each(bullets, function(i, bullet) {
        bullet.update();

        if (bullet.active()) {
          bullet.draw(I.canvas);
          liveBullets.push(bullet);
        }
      });
      bullets = liveBullets;

      var liveEnemyBullets = [];
      $.each(enemyBullets, function(i, bullet) {
        collision(bullet, I.dino);
        bullet.update();

        if (bullet.active()) {
          bullet.draw(I.canvas);
          liveEnemyBullets.push(bullet);
        }
      });
      enemyBullets = liveEnemyBullets;

      // Draw Foregrounds
      I.scene.drawForegrounds(position, I.canvas);

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
