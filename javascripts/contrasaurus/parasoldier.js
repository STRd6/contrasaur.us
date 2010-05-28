function Parasoldier(I) {
  I = I || {};

  var soldierTile = loadImageTile("images/soldier.png");
  var parachuteActiveTile = loadImageTile("images/parasoldier.png");
  var airborne = true;
  var startingHeight = 90;

  var theta = Math.random() * (Math.PI * 2);

  $.reverseMerge(I, {
    x: rand(canvas.width()),
    y: 40,
    width: 10,
    height: startingHeight,
    yVelocity: 4,
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
    sprite: parachuteActiveTile
  });

  var self = GameObject(I).extend({
    land: function(h) {
      I.y = h - I.height;
      I.yVelocity = 0;
      I.y = 300;
      airborne = false;
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
//        if (!airborne) {
//          I.sprite = soldierTile;
//        }
      }
    }
  });

  return self;
}