function Enemy(I) {
  I = I || {};

  var soldierTile = loadImageTile("images/soldier.png");
  var parachuteActiveTile = loadImageTile("images/parasoldier.png");
  var airborne;
  var startingHeight;
  var groundSoldier;

  var startingY;
  if (Math.random() < 0.5) {
    startingY = 0;
    airborne = true;
    // HACK
    startingHeight = 90;
  } else {
    startingY = 340;
    airborne = false;
    groundSoldier = true;
  }

  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(canvas.width()),
    y: startingY,
    width: 10,
    height: startingHeight || 53,
    yVelocity: 3,
    health: 3,
    color: "#F00",
    collideDamage: 1,
    pointsWorth: 1000,
    shootLogic: function() {
      if (Math.random() < 0.3) {
        enemyShoot(Bullet(
          theta, {
            x: self.midpoint().x,
            y: self.midpoint().y,
            color: '#C00'
          }
        ));
      }
    },
    sprite: soldierTile
  });

  var self = GameObject(I).extend({
    land: function(h) {
      I.y = h - I.height;
      I.yVelocity = 0;
      airborne = false;
      if (!groundSoldier) {
        I.sprite = soldierTile;
        // HACK to compensate for parachute image being taller
        // than soldier image
        I.y += 40;
      }
    },
    after: {
      hit: function(other) {
        if(other.bump) {
          other.bump();
        }
      },
      update: function() {
        I.shootLogic();
      },
      draw: function() {
        if (airborne) {
          I.sprite = parachuteActiveTile;
        } else {
          I.sprite = soldierTile;
        }
      }
    }
  });

  return self;
}