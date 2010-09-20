debugCounts = false;
hideBackgrounds = false;

function Level(I) {
  var position = {
    x: 0,
    y: 0
  };

  var gameObjects = [];
  var gameObjectsQueue = [];
  var prependGameObjectsQueue = [];
  var oldEnemies = [];
  var collidables;

  var backgroundColor = "#A2EEFF";
  var step = 0;
  var paused = false;
  var intervalId;

  var fadeAmount = 0;
  var fadeDuration;
  var fadeStart;

  var dialogStop;
  var displayDialog;

  var prevDelta = 0;

  var cameraLock = {
    min: -Infinity,
    max: Infinity
  };

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
    var dinoVelocity = dino.velocity();
    var dinoPosition = dino.position();

    var weightedX = dinoPosition.x + (1.25 * dinoVelocity.x * dinoVelocity.x * dinoVelocity.x.sign());

    var wiggle = 80;
    var screenCenterX = position.x + CANVAS_WIDTH / 2;

    var delta = 0;

    if(weightedX > screenCenterX + wiggle) {
      delta = ((weightedX - wiggle) - CANVAS_WIDTH / 2) - position.x;
    } else if(weightedX < screenCenterX - wiggle) {
      delta = (weightedX + wiggle) - CANVAS_WIDTH / 2 - position.x;
    }

    delta = delta.clamp(-2 + prevDelta, 2 + prevDelta);

    var oldPosition = position.x;

    position.x += delta;
    position.x = position.x.clamp(cameraLock.min, cameraLock.max);

    prevDelta = position.x - oldPosition;
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

    if(displayDialog) {
      displayDialog.draw(canvas);
    }

    if(fadeAmount != 0) {
      var fadeColor = "rgba(0, 0, 0, " + fadeAmount.clamp(0, 1) + ")";
      canvas.fill(fadeColor);
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

    prependGameObject: function(gameObject) {
      prependGameObjectsQueue.push(gameObject);
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

    dialog: function(dialog, duration) {
      duration = duration || 100;

      displayDialog = dialog;
      dialogStop = step + duration;
    },

    enemies: function() {
      return oldEnemies;
    },

    fadeOut: function(duration) {
      fadeStart = step;
      fadeDuration = duration;
    },

    lockCamera: function(min, max) {
      cameraLock.min = min;
      cameraLock.max = max;
    },

    unlockCamera: function() {
      cameraLock.min = -Infinity;
      cameraLock.max = Infinity;
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

      dino.position(Point(CANVAS_WIDTH / 2, dino.position().y));

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

    step: function() {
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
      Array.prototype.unshift.apply(gameObjects, prependGameObjectsQueue);
      prependGameObjectsQueue = [];
      Array.prototype.push.apply(gameObjects, gameObjectsQueue);
      gameObjectsQueue = [];

      trackDino();

      // Update fade
      if(fadeStart) {
        fadeAmount = (step - fadeStart) / fadeDuration;
      }

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

      // Update dialogs
      if(step > dialogStop) {
        displayDialog = null;
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
