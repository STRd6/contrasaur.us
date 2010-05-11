function rand(n) {
  return Math.floor(Math.random() * n);
}

function GameObject(I) {
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
    
    health: function() { return I.health },
    
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
    
    update: function() {}
  }
}

function Dinosaur() {
  var width = 50;
  var height = 50;
  var health = 50;
  var active = true;
  var jetpackCounter = 0

  var x = (canvas.width() - width) / 2;
  var y = 0;

  var airborne = true;

  var xVelocity = 1;
  var yVelocity = 6;
  var theta = 0;
  var thetaVelocity = Math.PI / 24;

  var I = {
    x: x,
    y: y,
    width: width,
    height: height,
    active: active,
    color: "#00F",
    health: health
  };

  return $.extend(GameObject(I), {

    update: function() {
      I.x += xVelocity;
      I.y += yVelocity;

      if (I.x + I.width > canvas.width() || I.x < 0) {
        xVelocity = xVelocity * -1;
      }

      if (airborne) {
        xVelocity += (Math.random() - 0.5) * 3;
        xVelocity = xVelocity * 0.9;
      }

      if (I.y + I.height > 200) {
        I.y = 200 - I.height;
        yVelocity = 0;

        xVelocity = (Math.abs(xVelocity) / xVelocity) * 5;
        airborne = false;
      }

      bullets.push(Bullet(I.x + I.width/2 , I.y + I.height/2, theta));
      score += bullets.length;

      theta += thetaVelocity;

      if(Math.random() < 0.01 && jetpackCounter <= 0 && !airborne) {
        jetpackCounter += 50;
      }

      if (jetpackCounter > 0 && !airborne) {
        yVelocity = -1;
      }

      if (jetpackCounter <= 0) {
        yVelocity = 6;
      }

      if (jetpackCounter > 0) {
        airborne = true;
        jetpackCounter--;
      }

      if(Math.random() < 0.05) {
        thetaVelocity = thetaVelocity * -1;
      }

      if(Math.random() < 0.05) {
        theta += Math.PI;
      }

      if(Math.sin(-theta) < 0 && !airborne) {
        theta = -theta;
      }
    },

    collisionAction: function() {
      xVelocity = xVelocity * -1
    }

  });
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
      A.collisionAction();
      A.hit();
      B.hit();
    }
  }
}

function Enemy() {
  var height = 40;
  var width = 10;

  var startingY;

  if (Math.random() < 0.5) {
    startingY = 0;
  } else {
    startingY = 200;
  }

  var yVelocity = 3;
  var theta = Math.random() * (Math.PI * 2);
  var I = {
    x: rand(300),
    y: startingY,
    width: width,
    height: height,
    health: 3,
    color: "#F00",
    active: true
  }

  var self = $.extend(GameObject(I), {
    collisionAction: function() {},
    update: function() {
      
      I.y += yVelocity;

      if (Math.random() < 0.3) {
        enemyBullets.push(Bullet(I.x + I.width/2 , I.y + I.height/2, theta, "#C00"));
      }

      if (I.y + I.height > 200) {
        I.y = 200 - I.height;
        yVelocity = 0;
      }
    }
  });

  return self;
}

function Floor() {
  var height = 100;
  var active = true;

  return {

    update: function() {},

    draw: function(canvas) {
      canvas.fillColor("#0F0");
      canvas.fillRect(0, canvas.height() - height, canvas.width(), height);
    },

    active: function() { return active }
  }
}

function Bullet(x, y, theta, color) {

  var speed = 10;
  var xVelocity = Math.cos(theta)*speed;
  var yVelocity = Math.sin(theta)*speed;
  var width = 5;
  var height = 5;
  var active = true;
  var health = 1;

  var I = {
    x: x,
    y: y,
    width: width,
    height: height,
    active: active,
    color: color || "#000"
  };

  return $.extend(GameObject(I), {

    update: function() {
      I.x += xVelocity;
      I.y += yVelocity;

      if (I.x >= 0 && I.x < canvas.width() &&
        I.y >= 0 && I.y < 200) {
        I.active = I.active && true;
      } else {
        I.active = false;
      }
      return I.active;
    },

    collisionAction: function() {
      I.active = false;
    }
  });
}