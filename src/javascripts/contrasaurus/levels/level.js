debugCounts = false;
hideBackgrounds = false;

function Level(I) {
  var position = {
    x: 0,
    y: 0
  };

  var gameObjects = [];
  var gameObjectsQueue = [];
  var oldEnemies = [];
  var collidables;
  var backgroundColor = "#A2EEFF";
  var step = 0;
  var paused = false;
  var intervalId;

  $.reverseMerge(I, {
    textColor: "#FFF",
    triggers: []
  });

  function BGMusic(name) {
    var audio = $('<audio src="audio/' + name + '.mp3"></audio>').appendTo('#game_container');

    return {
      fadeOut: function() {
        audio.animate({volume: 0}, 5000, function() {
          this.pause();
        });
      },

      play: function() {
        try {
          audio.get(0).play();
        } catch(e) {
          console.log(e);
        }
      },

      pause: function() {
        try {
          audio.get(0).pause();
        } catch(e) {
          console.log(e);
        }
      }
    };
  }

  if (I.audio) {
    var backgroundMusic = BGMusic(I.audio);
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

  function trackDino() {
    var dinoPosition = dino.position();

    var wiggle = 80;
    var screenCenterX = position.x + CANVAS_WIDTH / 2;

    if(dinoPosition.x > screenCenterX + wiggle) {
      position.x = (dinoPosition.x - wiggle) - CANVAS_WIDTH / 2;
    } else if(dinoPosition.x < screenCenterX - wiggle) {
      position.x = (dinoPosition.x + wiggle) - CANVAS_WIDTH / 2;
    }
  }

  function getTransform() {
    return Matrix.translation(-position.x, -position.y);
  }

  function draw(canvas) {
    // Draw Backgrounds
    canvas.fill(backgroundColor);

    if(!hideBackgrounds) {
      I.scene.drawBackgrounds(position, canvas);
    }

    canvas.withTransform(getTransform(), function() {
      $.each(gameObjects, function(i, gameObject) {
        gameObject.draw(canvas);
      });
    });

    if(!hideBackgrounds) {
      I.scene.drawForegrounds(position, canvas);
    }

    // Draw Overlays
    if(I.description) {
      var textMargin = 12;
      var descriptionWidth = canvas.measureText(I.description);
      canvas.fillColor(I.textColor);
      canvas.fillText(I.description, CANVAS_WIDTH - (descriptionWidth + textMargin), 16);
    }
  }

  function resetCollidables() {
    collidables = {
      platform: [],
      enemy: [],
      enemyBullet: [],
      dino: [],
      dinoBullet: [],
      biteTrigger: [],
      levelHazard: []
    };
  }

  function handleCollisions(collidables) {
    // Most things can hit platforms
    $.each(collidables.platform, function(i, platform) {
      $.each(collidables.enemyBullet, function(j, bullet) {
        planeCollision(bullet, platform);
      });

      $.each(collidables.dinoBullet, function(j, bullet) {
        planeCollision(bullet, platform);
      });

      $.each(collidables.enemy, function(j, enemy) {
        planeCollision(enemy, platform);
      });

      $.each(collidables.dino, function(j, dino) {
        planeCollision(dino, platform);
      });
    });

    // Enemy bullets can hit dinos
    $.each(collidables.enemyBullet, function(i, bullet) {
      $.each(collidables.dino, function(j, dino) {
        circleCollision(bullet, dino);
      });
    });

    // Level hazards can hit everything
    $.each(collidables.levelHazard, function(i, bullet) {
      $.each(collidables.dino, function(j, dino) {
        circleCollision(bullet, dino);
      });

      $.each(collidables.enemy, function(j, enemy) {
        circleCollision(bullet, enemy);
      });

      $.each(collidables.platform, function(i, platform) {
        planeCollision(bullet, platform);
      });
    });

    // Dino bullets can hit enemies
    $.each(collidables.dinoBullet, function(i, bullet) {
      $.each(collidables.enemy, function(j, enemy) {
        circleCollision(bullet, enemy);
      });
    });

    // Bite triggers can hit enemies
    $.each(collidables.biteTrigger, function(i, bullet) {
      $.each(collidables.enemy, function(j, enemy) {
        circleCollision(bullet, enemy);
      });
    });
  }

  resetCollidables();

  var self = {
    addGameObject: function(gameObject) {
      gameObjectsQueue.push(gameObject);
    },

    after: function(steps, fn) {
      I.triggers.push({
        at: step + steps,
        event: fn
      })
    },

    age: function() {
      return step;
    },

    complete: function() {
      self.stop();

      I.completed();
    },

    debugCounts: function() {
      var results = {};
      $.each(collidables, function(key, value) {
        results[key] = value.length;
      });

      return results;
    },

    enemies: function() {
      return oldEnemies;
    },

    position: function() {
      return position;
    },

    nearestEnemy: function(currentPosition) {
      return self.nearestTarget(currentPosition, "dinoBullet");
    },

    nearestTarget: function(currentPosition, collisionType) {
      var selection = [];

      if(collisionType == "enemyBullet") {
        selection = collidables.dino;
      } else if(collisionType == "dinoBullet") {
        selection = self.enemies();
      }

      var nearest;
      var nearestDistance;

      $.each(selection, function(i, target) {
        var targetDistance = Point.distance(currentPosition, target.position());
        if(nearest) {
          if(nearestDistance > targetDistance) {
            nearest = target;
            nearestDistance = targetDistance;
          }
        } else {
          nearest = target;
          nearestDistance = targetDistance;
        }
      });

      return nearest;
    },

    start: function() {
      if (backgroundMusic) {
        backgroundMusic.play();
        $('#level_objectives img').remove();

        if(I.objectiveImage) {
          $('<img src=' + I.objectiveImage + '>').appendTo('#level_objectives');
        }
        $('#level_objectives p').remove();
        if(I.objective) {
          $('<p>' + I.objective + '</p>').appendTo('#level_objectives');
        }
      }

      intervalId = setInterval(function() {
        if (paused) {
          return;
        }
        activateTriggers();
        self.trigger("beforeStep");
        self.step();
        self.trigger("afterStep");
        step++;
      }, MILLISECONDS_PER_FRAME);
    },

    stop: function() {
      if (backgroundMusic) {
        backgroundMusic.fadeOut();
      }

      clearInterval(intervalId);
    },

    step: function step() {
      if (debugHalt) {
        debugger;
      }

      I.scene.update();

      resetCollidables();

      var liveGameObjects = [];
      $.each(gameObjects, function(i, gameObject) {
        gameObject.update(position);

        if(gameObject.active()) {
          liveGameObjects.push(gameObject);

          // Add to hit detection queues
          if(collidables[gameObject.collisionType()]) {
            collidables[gameObject.collisionType()].push(gameObject);
          }
        }
      });
      gameObjects = liveGameObjects;

      handleCollisions(collidables);

      // Add Queued Game Objects
      Array.prototype.push.apply(gameObjects, gameObjectsQueue);
      gameObjectsQueue = [];

      trackDino();

      // TODO: Move this somewhere
      score += collidables.dinoBullet.length;

      oldEnemies = collidables.enemy;

      // Update debug
      if(debugCounts) {
        var html = "";
        $.each(self.debugCounts(), function(key, value) {
          html += key + ": " + value + "<br />"
        });

        $("#debug").html(html);
      }

      draw(canvas);
    },

    togglePause: function() {
      paused = !paused;

      if(paused) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }

      return paused;
    }
  };

  $.extend(self, Bindable());

  $.each(I.platforms, function(i, platform) {
    self.addGameObject(platform);
  });

  return self;
}
