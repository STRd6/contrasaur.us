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
  var effects = [];
  var effectsQueue = [];
  var gameObjects = [];
  var backgroundColor = "#A2EEFF";
  var step = 0;
  var intervalId;
  var tiltAmount = 0;

  $.reverseMerge(I, {
    triggers: [],
    afterStep: $.noop,
    beforeStep: $.noop
  });

  if (I.audio) {
    var backgroundMusic = $('<audio src="audio/' + I.audio + '.mp3"></audio>').appendTo('#game_container');
  }

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
    complete: function() {
      self.stop();

      I.completed();
    },

    dino: function() {
      return I.dino;
    },

    position: function() {
      return position;
    },

    changeTiltAmount: function(amount) {
      tiltAmount += amount;
      if (tiltAmount > 2) {
        tiltAmount = Math.floor(tiltAmount);
      } else if (tiltAmount < -2) {
        tiltAmount = Math.ceil(tiltAmount);
      }
    },

    tiltAmount: function(value) {
      if (value === undefined) {
        return tiltAmount
      } else {
        tiltAmount = value;
        return self;
      }
    },
    
    start: function() {
      if (backgroundMusic) {
        backgroundMusic.get(0).play();
      }

      intervalId = setInterval(function() {
        activateTriggers();
        I.beforeStep(self);
        self.step();
        I.afterStep(self);
        step++;
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      if (backgroundMusic) {
        backgroundMusic.animate({volume: 0}, 5000, function() {
          this.pause();
        });
      }

      clearInterval(intervalId);
    },

    step: function step() {
      canvas.fill(backgroundColor);

      // Draw Backgrounds
      I.scene.drawBackgrounds(position, canvas);

      Array.prototype.push.apply(bullets, bulletQueue);
      bulletQueue = [];

      Array.prototype.push.apply(enemyBullets, enemyBulletQueue);
      enemyBulletQueue = [];

      Array.prototype.push.apply(effects, effectsQueue);
      effectsQueue = [];

      var liveEffects = [];
      $.each(effects, function(i, effect) {
        effect.update();
        if(effect.active()) {
          liveEffects.push(effect);
        }
      });
      effects = liveEffects;

      canvas.withState(-position.x, -position.y, {}, function() {
        $.each(I.platforms, function(i, platform) {
          planeCollision(I.dino, platform);

          platform.draw(canvas);
        });

        I.dino.update(position, {x: tiltAmount, y: 0});
        I.dino.draw(canvas);

        var liveEnemies = [];
        $.each(enemies, function(i, enemy) {
          $.each(I.platforms, function(i, platform) {
            planeCollision(enemy, platform);
          });

          enemy.update(position);

          $.each(bullets, function(i, bullet) {
            circleCollision(bullet, enemy);
          });

          circleCollision(I.dino, enemy);

          if (enemy.active()) {
            liveEnemies.push(enemy);
            enemy.draw(canvas);
          } else {
            // TODO: Move this into an onDestroy event
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
          bullet.update(position);

          if (bullet.active()) {
            bullet.draw(canvas);
            liveBullets.push(bullet);
          }
        });
        bullets = liveBullets;

        var liveEnemyBullets = [];
        $.each(enemyBullets, function(i, bullet) {
          circleCollision(bullet, I.dino);
          bullet.update(position);

          if (bullet.active()) {
            bullet.draw(canvas);
            liveEnemyBullets.push(bullet);
          }
        });
        enemyBullets = liveEnemyBullets;

        $.each(effects, function(i, effect) {
          effect.draw(canvas);
        });
      });

      // Draw Foregrounds
      I.scene.drawForegrounds(position, canvas);

      score += bullets.length;

      position.x += tiltAmount;
    },

    shoot: function(bullet) {
      bulletQueue.push(bullet);
    },

    enemyShoot: function(bullet) {
      enemyBulletQueue.push(bullet);
    },

    addEffect: function(effect) {
      effectsQueue.push(effect);
    },

    enemies: function() {
      return enemies;
    }
  };

  return self;
}
