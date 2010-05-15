function GameObject(I) {
  $.reverseMerge(I, {
    active: true,
    age: 0,
    color: "#880",
    health: 1,
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    xVelocity: 0,
    yVelocity: 0,
    collideDamage: 1,
    pointsWorth: 1000
  });

  function move() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
  }

  var self = {

    midpoint: function() {
      return {
        x: I.x + I.width/2,
        y: I.y + I.height/2
      }
    },

    boundingBox: function() {
      return { x: I.x, y: I.y, w: I.width, h: I.height };
    },

    // TODO: Encapsulate these better
    collideDamage: function() { return I.collideDamage },
    pointsWorth: function() { return I.pointsWorth },

    active: function(newActive) {
      if(newActive != undefined) {
        I.active = newActive;
        return this;
      } else {
        return I.active;
      }
    },

    health: function(newHealth) {
      if(newHealth != undefined) {
        I.health = newHealth;
        return this;
      } else {
        return I.health;
      }
    },

    velocity: function() {
      return {
        x: I.xVelocity,
        y: I.yVelocity
      }
    },

    hit: function(other) {
      I.health = I.health - other.collideDamage();
      if (I.health <= 0) {
        I.active = false;
      }
    },

    draw: function(canvas) {
      if (I.sprite) {
        I.sprite.draw(canvas, I.x, I.y);
      } else {
        canvas.fillColor(I.color);
        canvas.fillRect(I.x, I.y, I.width, I.height);
      }
    },

    update: function() {
      I.age++;
      move();
    },

    extend: function(options) {
      var afterMethods = options.after;
      var beforeMethods = options.before;

      delete options.after;
      delete options.before;

      $.each(options, function(name, method) {
        self[name] = method;
      });

      if(beforeMethods) {
        $.each(beforeMethods, function(name, method) {
          self[name] = before(self[name], method);
        });
      }

      if(afterMethods) {
        $.each(afterMethods, function(name, method) {
          self[name] = after(self[name], method);
        });
      }

      return self;
    }
  };

  return self;
}

function GameText(text, I) {
  I.y -= 30;
  I.width = 1;
  I.height = 1;

  return GameObject(I).extend({
    draw: function(canvas) {
      canvas.fillColor("#000");
      canvas.fillText(text, I.x, I.y);
    },

    after: {
      update: function() {
        if(I.age > 30) {
          I.active = false;
        }
      }
    }
  });
}

function Dinosaur() {
  var width = 128;
  var height = 128;
  var jetpackCounter = 0;

  var x = (canvas.width() - width) / 2;
  var y = 0;

  var airborne = true;
  var berserk = false;

  var theta = 0;
  var thetaVelocity = Math.PI / 24;

  var I = {
    x: x,
    y: y,
    width: width,
    height: height,
    color: "#00F",
    health: 500,
    weapons: {
      bombs: 0,
      machineGun: 1,
      shotgun: 6
    },
    xVelocity: 1,
    yVelocity: 6,
    collideDamage: 2
  };

  var healthMax = I.health;

  function fireWeapons() {
    var berserkTheta = theta - Math.PI / 24;

    // Machine Gun Fire
    bullets.push(Bullet(theta, {
      x: self.midpoint().x,
      y: self.midpoint().y
    }));
 
    if (berserk) {
      bullets.push(Bullet(berserkTheta, {
        x: self.midpoint().x,
        y: self.midpoint().y
      }));
    }

    if (I.weapons.bombs && rand(100) < I.weapons.bombs) {
      // Bomb Blast
      (24).times(function(i) {
        var theta = (i / 12) * Math.PI;
        Bullet(theta, {
          x: self.midpoint().x,
          y: self.midpoint().y
        });
      }
    )};

    if(I.weapons.shotgun && rand(100) < I.weapons.shotgun) {
      var target = nearestEnemy();
      // Shotgun Blast
      var direction;

      if(target) {
        var targetMidpoint = target.midpoint();
        var targetDistance = distance(self.midpoint(), targetMidpoint);
        var targetVelocity = target.velocity();

        targetMidpoint.y += (targetDistance / 10) * targetVelocity.y;
        targetMidpoint.x += (targetDistance / 10) * targetVelocity.x;

        direction = Math.atan2(
          targetMidpoint.y - self.midpoint().y,
          targetMidpoint.x - self.midpoint().x
        );
      } else {
        direction = Math.atan2(I.yVelocity, I.xVelocity);
      }

      (3 + rand(I.weapons.shotgun)).times(function() {
        function fuzz() {
          return Math.random() * 20 - 10;
        }

        var x = I.x + I.width/2 + fuzz();
        var y = I.y + I.height/2 + fuzz() * 2;

        bullets.push(Bullet(direction, { x: x, y: y }));
      });
    }
  }

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  function nearestEnemy() {
    var nearest;
    var nearestDistance;

    $.each(enemies, function(i, enemy) {
      var enemyDistance = distance(self.midpoint(), enemy.midpoint());
      if(nearest) {
        if(nearestDistance > enemyDistance) {
          nearest = enemy;
          nearestDistance = enemyDistance;
        }
      } else {
        nearest = enemy;
        nearestDistance = enemyDistance
      }
    });

    return nearest;
  }
  
  // Adjust machine gun angle
  function updateGunAngle() {
    theta += thetaVelocity;
    
    // Change gun rotation direction
    if(Math.random() < 0.05) {
      thetaVelocity = thetaVelocity * -1;
    }

    // Flip target angle 180
    if(Math.random() < 0.05) {
      theta += Math.PI;
    }

    // Don't shoot machine gun into the ground
    if(Math.sin(-theta) < -0.3 && !airborne) {
      theta -= thetaVelocity * 2;
    }
  }

  var self = GameObject(I).extend({
    bump: function() {
      I.xVelocity = -I.xVelocity;
    },

    draw: function(canvas) {
      dinoTile.draw(canvas, I.x, I.y);
    },
    land: function(h) {
      I.y = h - (I.height + 1);
      I.yVelocity = 0;
      I.xVelocity = (Math.abs(I.xVelocity) / I.xVelocity) * 5;
      airborne = false;
    },
    powerup: function(powerup) {
      if(powerup.health) {
        display("FOOD!");
        heal(powerup.health);
      }

      if(powerup.weapon) {
        for(var weapon in powerup.weapon) {
          display(weapon + "!");
          I.weapons[weapon] += powerup.weapon[weapon];
        }
      }
    },
    after: {
      update: function() {
        if(I.health < healthMax / 2) {
          berserk = true;
        } else {
          berserk = false;
        }

        // Flip when hitting edges of screen
        if (I.x + I.width > canvas.width() || I.x < 0) {
          I.xVelocity = I.xVelocity * -1;
          I.x += I.xVelocity;
        }

        // Wiggle in the air
        if (airborne) {
          I.xVelocity += (Math.random() - 0.5) * 3;
          I.xVelocity = I.xVelocity * 0.9;
        }

        fireWeapons();
        updateGunAngle();

        if(Math.random() < 0.01 && jetpackCounter <= 0) {
          jetpackCounter += 50;
        }

        if (jetpackCounter > 0 && !airborne) {
          I.yVelocity = -1;
          airborne = true;
        }

        if (jetpackCounter <= 0 && airborne) {
          I.yVelocity = 6;
        }

        if (jetpackCounter > 0) {
          jetpackCounter--;
        }
      }
    }
  });

  return self;
}

function collision(A, B) {
  var b = A.boundingBox();
  var t = B.boundingBox();

  var xOverlap = (b.x < t.x && b.x + b.w >= t.x) ||
    (t.x < b.x && t.x + t.w >= b.x);
  var yOverlap = (b.y < t.y && b.y + b.h >= t.y) ||
    (t.y < b.y && t.y + t.h >= b.y);
  if (A.active() && B.active()) {
    if(xOverlap && yOverlap) {
      A.hit(B);
      B.hit(A);
    }
  }
}

function Enemy(I) {
  I = I || {};

  var startingY;
  if (Math.random() < 0.5) {
    startingY = 0;
  } else {
    startingY = 340;
  }

  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(canvas.width()),
    y: startingY,
    width: 10,
    height: 40,
    yVelocity: 3,
    health: 3,
    color: "#F00",
    collideDamage: 1,
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        enemyBullets.push(Bullet(
          theta, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            color: '#C00'
          }
        ));
      }
    }
  });

  var self = GameObject(I).extend({
    land: function(h) {
      I.y = h - I.height;
      I.yVelocity = 0;
    },
    after: {
      hit: function(other) {
        if(other.bump) {
          other.bump();
        }
      },
      update: function() {
        I.shootLogic();
      }
    }
  });

  return self;
}

function Tank() {
  var gunAngle;
  var xVelocity;

  if (Math.random() < 0.5) {
    xVelocity = 0.5;
    gunAngle = - Math.PI / 12;
  } else {
    xVelocity = -0.5;
    gunAngle = 13 * Math.PI / 12;
  }

  var I = {
    y: 350,
    width: 30,
    height: 30,
    xVelocity: xVelocity,
    health: 10,
    color: "#FF7",
    shootLogic: function() {
      // Shoot
      if (Math.random() < 0.05) {
        enemyBullets.push(Bullet(
          gunAngle, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            sprite: loadImageTile("blast_small.png"),
            collideDamage: 7
          }
        ));
      }
    }
  };

  var self = Enemy(I);

  return self;
}

function Floor() {
  var height = 100;

  var I = {
    x: 0,
    y: canvas.height() - height,
    width: canvas.width(),
    height: height,
    color: "#0F0",
    collideDamage: 0
  };

  return GameObject(I).extend({

    hit: function(other) {
      other.land(I.y);
    }
  });
}

function Bullet(theta, I) {
  var speed = 10;

  $.reverseMerge(I, {
    collideDamage: 1,
    width: 4,
    height: 4,
    color: "#000",
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  });

  var self = GameObject(I).extend({
    draw: function(canvas) {
      if (I.sprite) {
        I.sprite.draw(canvas, I.x, I.y);
      } else {
        canvas.fillColor(I.color);
        var midpoint = self.midpoint();
        canvas.fillCircle(midpoint.x, midpoint.y, I.width/2, '#000');
      }
    },
    after: {
      update: function() {
        // Check Bounds
        if (I.x >= 0 && I.x < canvas.width() &&
          I.y >= 0 && I.y < 380) {
          I.active = I.active && true;
        } else {
          I.active = false;
        }
        return I.active;
      }
    }
  });

  return self;
}

function PowerUp(I) {
  $.reverseMerge(I, {
    color: "#F0F",
    symbol: "?",
    width: 15,
    height: 15,
    pointsWorth: 1000
  });

  return GameObject(I).extend({
    before: {
      update: function() {
        I.xVelocity = Math.sin(I.age/10);
      }
    },
    after: {
      draw: function(canvas) {
        canvas.fillColor("#FFF");
        canvas.fillText(I.symbol, I.x + I.width/2 - 2, I.y + 12);
      },
      hit: function(other) {
        if(other.powerup) {
          other.powerup([
            {health: 10},
            {weapon: {shotgun: 2}},
            {weapon: {bombs: 1}}
          ].rand());
        }
      },
      update: function() {
        // Check Bounds
        if (I.x >= 0 && I.x < canvas.width() &&
          I.y >= 0 && I.y < 380) {
          I.active = I.active && true;
        } else {
          I.active = false;
        }
      }
    }
  });
}
