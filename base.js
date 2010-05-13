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
    yVelocity: 0
  });

  function move() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;
  }

  return {
    boundingBox: function() {
      return {x: I.x, y: I.y, w: I.width, h: I.height};
    },

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

    yVelocity: function(newyVelocity) {
      if(newyVelocity != undefined) {
        I.yVelocity = newyVelocity;
        return this;
      } else {
        return I.yVelocity;
      }
    },

    hit: function() {
      I.health--;
      if (I.health <= 0) {
        I.active = false;
      }
    },

    draw: function(canvas) {
      canvas.fillColor(I.color);
      canvas.fillRect(I.x, I.y, I.width, I.height);
    },

    update: function() {
      I.age++;
      move();
    }
  }
}

function GameText(text, I) {
  var self = GameObject(I);
  
  I.y -= 30;
  I.width = 1;
  I.height = 1;

  self.draw = function() {
    canvas.fillColor("#000");
    canvas.fillText(text, I.x, I.y);
  };
  
  self.update = after(self.update, function() {
    if(I.age > 30) {
      I.active = false;
    }
  });

  return self;
}

function Dinosaur() {
  var width = 50;
  var height = 50;
  var jetpackCounter = 0;

  var x = (canvas.width() - width) / 2;
  var y = 0;
  
  var healthMax = 50;

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
    health: 50,
    weapons: {
      bombs: 0,
      machineGun: 1,
      shotgun: 0
    },
    xVelocity: 1,
    yVelocity: 6
  };

  var self = GameObject(I);

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  function fireWeapons() {
    var berserkTheta = theta - Math.PI / 24;

    if(I.weapons.machineGun && !berserk) {
      // Machine Gun Fire
      bullets.push(Bullet(I.x + I.width/2, I.y + I.height/2, theta));
    } 
    
    if (I.weapons.machineGun && berserk) {
      bullets.push(Bullet(I.x + I.width/2, I.y + I.height/2, theta));
      bullets.push(Bullet(I.x + I.width/2, I.y + I.height/2, berserkTheta));
    }

    if (I.weapons.bombs && score % 69 == 0) {
      // Bomb Blast
      for (var i = 0; i <= 24; i++) {
        bullets.push(Bullet(I.x + I.width/2, I.y + I.height/2, (i / 12) * Math.PI)
        );
      }
    };
    
    if(I.weapons.shotgun && rand(100) < I.weapons.shotgun) {
      // Shotgun Blast
      var direction = Math.atan(I.yVelocity/I.xVelocity);
      if(I.xVelocity < 0) {
        direction = direction + Math.PI;
      }

      (3 + rand(I.weapons.shotgun)).times(function() {
        function fuzz() {
          return Math.random() * 20 - 10;
        }

        var x = I.x + I.width/2 + fuzz();
        var y = I.y + I.height/2 + fuzz();

        bullets.push(Bullet(x, y, direction));
      });
    }
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
    if(Math.sin(-theta) < 0 && !airborne) {
      theta = -theta;
    }
  }

  self.update = after(self.update, function() {
    if(I.health < healthMax / 2) {
      berserk = true;
    } else {
      berserk = false;
    }

    // Flip when hitting edges of screen
    if (I.x + I.width > canvas.width() || I.x < 0) {
      I.xVelocity = I.xVelocity * -1;
    }
    
    // Wiggle in the air
    if (airborne) {
      I.xVelocity += (Math.random() - 0.5) * 3;
      I.xVelocity = I.xVelocity * 0.9;
    }
    
    // Land
    if (I.y + I.height > 200) {
      I.y = 200 - I.height;
      I.yVelocity = 0;

      I.xVelocity = (Math.abs(I.xVelocity) / I.xVelocity) * 5;
      airborne = false;
    }
    
    fireWeapons();
    updateGunAngle();

    if(Math.random() < 0.01 && jetpackCounter <= 0) {
      jetpackCounter += 50;
    }

    if (jetpackCounter > 0 && !airborne) {
      I.yVelocity = -1;
    }

    if (jetpackCounter <= 0) {
      I.yVelocity = 6;
    }

    if (jetpackCounter > 0) {
      airborne = true;
      jetpackCounter--;
    }
  });
  
  self.powerup = function(powerup) {
    // HAX: Countering the default loss from hitting the powerup
    I.health++;
    
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
  };
  
  self.bump = function() {
    I.xVelocity = -I.xVelocity;
  };
  
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

function Enemy() {
  var startingY;
  if (Math.random() < 0.5) {
    startingY = 0;
  } else {
    startingY = 160;
  }

  var theta = Math.random() * (Math.PI * 2);

  var I = {
    x: rand(canvas.width()),
    y: startingY,
    width: 10,
    height: 40,
    yVelocity: 3,
    health: 3,
    color: "#F00"
  }

  var self = GameObject(I);
  
  self.update = after(self.update, function() {
    // Shoot
    if (Math.random() < 0.3) {
      enemyBullets.push(Bullet(I.x + I.width/2 , I.y + I.height/2, theta, "#C00"));
    }
  });

  self.hit = after(self.hit, function(other) {
    if(other.bump) {
      other.bump();
    }
  });

  return self;
}

function Floor() {
  var height = 100;
  var active = true;

  var I = {
    x: 0,
    y: canvas.height() - height,
    width: canvas.width(),
    height: height,
    yVelocity: 0,
    health: 1,
    color: "#0F0"
  }

  var self = GameObject(I);

  self.hit = function(other) {
    active = true;

  var o = other.boundingBox();

    if(o.y + o.h > canvas.height() - height) {
      o.y = (canvas.height() - height) - o.h;
      other.yVelocity(0);
    }
}

  return self;
}

// Land on the ground
//    if (I.y + I.height > 200) {
//      I.y = 200 - I.height;
//      yVelocity = 0;
//    }

function Bullet(x, y, theta, color) {
  var speed = 10;

  var I = {
    x: x,
    y: y,
    width: 4,
    height: 4,
    color: color || "#000",
    xVelocity: Math.cos(theta)*speed,
    yVelocity: Math.sin(theta)*speed
  };

  var self = GameObject(I);
  
  self.draw = function(canvas) {
    bulletTile.draw(canvas, I.x, I.y);
  };

  self.update = after(self.update, function() {
    // Check Bounds
    if (I.x >= 0 && I.x < canvas.width() &&
      I.y >= 0 && I.y < 200) {
      I.active = I.active && true;
    } else {
      I.active = false;
    }
    return I.active;
  });

  return self;
}

function PowerUp(I) {
  $.reverseMerge(I, {
    color: "#F0F",
    symbol: "?",
    width: 15,
    height: 15
  });

  var self = GameObject(I);
  
  self.draw = after(self.draw, function() {
    canvas.fillColor("#FFF");
    canvas.fillText(I.symbol, I.x + I.width/2 - 2, I.y + 12);
  });
  
  self.update = before(self.update, function() {
    I.xVelocity = Math.sin(I.age/10);
  });

  self.update = after(self.update, function() {
    // Check Bounds
    if (I.x >= 0 && I.x < canvas.width() &&
      I.y >= 0 && I.y < 200) {
      I.active = I.active && true;
    } else {
      I.active = false;
    }
  });

  self.hit = after(self.hit, function(other) {
    if(other.powerup) {
      other.powerup([
        {health: 10},
        {weapon: {shotgun: 2}},
        {weapon: {bombs: 1}}
      ].rand());
    }
  });

  return self;
}