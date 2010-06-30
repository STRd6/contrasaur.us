function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack = Jetpack();

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [];
  var activeWeapons = [];

  var pitchAngle = 0;

  var walkAnimation = loadAnimation("images/contrasaurus/walk.png", 8, 283, 163, 3);
  var walkFrameCircles = [
    [{"x":87,"y":-52,"radius":27},{"x":13,"y":-10,"radius":37},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-27,"y":-12,"radius":25},{"x":-60,"y":-2,"radius":18},{"x":-89,"y":5,"radius":14},{"x":-113,"y":10,"radius":12},{"x":-2,"y":35,"radius":20},{"x":0,"y":64,"radius":18},{"x":24,"y":72,"radius":10},{"x":39,"y":73,"radius":8},{"x":-130,"y":11,"radius":8}],
    [{"x":87,"y":-52,"radius":27},{"x":12,"y":-8,"radius":41},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-22,"y":-13,"radius":26},{"x":-60,"y":-2,"radius":18},{"x":-89,"y":5,"radius":14},{"x":-112,"y":10,"radius":12},{"x":-130,"y":10,"radius":8},{"x":26,"y":39,"radius":9},{"x":-19,"y":43,"radius":10},{"x":69,"y":63,"radius":14},{"x":-16,"y":65,"radius":18},{"x":-9,"y":28,"radius":10},{"x":48,"y":56,"radius":9},{"x":9,"y":73,"radius":10},{"x":35,"y":50,"radius":8}],
    [{"x":87,"y":-53,"radius":27},{"x":12,"y":-9,"radius":38},{"x":118,"y":-45,"radius":23},{"x":50,"y":-38,"radius":19},{"x":-21,"y":-12,"radius":28},{"x":-60,"y":-6,"radius":18},{"x":-88,"y":0,"radius":14},{"x":-113,"y":1,"radius":12},{"x":-127,"y":0,"radius":8},{"x":-37,"y":59,"radius":25},{"x":51,"y":70,"radius":12},{"x":-34,"y":31,"radius":11},{"x":35,"y":19,"radius":12},{"x":42,"y":53,"radius":10},{"x":37,"y":37,"radius":8},{"x":89,"y":60,"radius":10},{"x":67,"y":71,"radius":7},{"x":79,"y":67,"radius":7},{"x":-18,"y":24,"radius":8}],
    [{"x":85,"y":-54,"radius":27},{"x":9,"y":-6,"radius":42},{"x":117,"y":-45,"radius":24},{"x":49,"y":-36,"radius":18},{"x":-26,"y":-4,"radius":31},{"x":-60,"y":-5,"radius":17},{"x":-88,"y":2,"radius":15},{"x":-112,"y":4,"radius":12},{"x":-130,"y":2,"radius":7},{"x":28,"y":74,"radius":9},{"x":-84,"y":63,"radius":18},{"x":13,"y":44,"radius":10},{"x":18,"y":61,"radius":8},{"x":67,"y":74,"radius":9},{"x":43,"y":76,"radius":7},{"x":54,"y":76,"radius":6},{"x":-66,"y":48,"radius":8},{"x":-47,"y":27,"radius":8},{"x":-60,"y":34,"radius":10}],
    [{"x":86,"y":-53,"radius":27},{"x":13,"y":-10,"radius":37},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-27,"y":-12,"radius":25},{"x":-60,"y":-2,"radius":18},{"x":-87,"y":6,"radius":15},{"x":-112,"y":10,"radius":13},{"x":-130,"y":12,"radius":8},{"x":-2,"y":64,"radius":20},{"x":-7,"y":34,"radius":20},{"x":37,"y":73,"radius":11},{"x":20,"y":74,"radius":9}],
    [{"x":87,"y":-52,"radius":27},{"x":13,"y":-11,"radius":38},{"x":118,"y":-43,"radius":24},{"x":49,"y":-39,"radius":19},{"x":-25,"y":-14,"radius":24},{"x":-60,"y":-3,"radius":17},{"x":-89,"y":5,"radius":14},{"x":-112,"y":8,"radius":11},{"x":-129,"y":9,"radius":7},{"x":-11,"y":58,"radius":25},{"x":4,"y":40,"radius":27},{"x":80,"y":65,"radius":12},{"x":66,"y":54,"radius":11},{"x":37,"y":52,"radius":10},{"x":49,"y":54,"radius":10}],
    [{"x":86,"y":-53,"radius":27},{"x":12,"y":-8,"radius":41},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-24,"y":-13,"radius":25},{"x":-60,"y":-6,"radius":18},{"x":-86,"y":-2,"radius":15},{"x":-109,"y":0,"radius":12},{"x":-127,"y":-1,"radius":8},{"x":-40,"y":59,"radius":25},{"x":56,"y":72,"radius":12},{"x":-33,"y":31,"radius":11},{"x":-18,"y":25,"radius":7},{"x":37,"y":27,"radius":10},{"x":36,"y":44,"radius":10},{"x":43,"y":59,"radius":8},{"x":74,"y":67,"radius":9},{"x":90,"y":57,"radius":11}],
    [{"x":85,"y":-54,"radius":27},{"x":5,"y":-5,"radius":44},{"x":117,"y":-45,"radius":24},{"x":50,"y":-37,"radius":19},{"x":-33,"y":1,"radius":33},{"x":-62,"y":-5,"radius":18},{"x":-90,"y":1,"radius":14},{"x":-113,"y":2,"radius":11},{"x":-128,"y":1,"radius":7},{"x":-89,"y":66,"radius":13},{"x":68,"y":73,"radius":10},{"x":48,"y":74,"radius":10},{"x":29,"y":72,"radius":10},{"x":-62,"y":38,"radius":15},{"x":16,"y":59,"radius":10},{"x":-71,"y":58,"radius":9},{"x":12,"y":44,"radius":8}]
  ];
  var parasailTile = Sprite.load("images/levels/parasail/parasail.png");
  
  var I = {
    x: x,
    y: y,
    width: width,
    height: height,
    color: "#00F",
    health: 500,
    radius: 72,
    xVelocity: 1,
    yVelocity: 6,
    collideDamage: 2,
    collisionType: "dino",
    hitCircles: walkFrameCircles[0],
    sprite: walkAnimation
  };

  var accessories = [];

  var lastDirection = I.xVelocity;

  var healthMax = I.health;

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  var self = GameObject(I).extend({
    addAccessory: function(accessory) {
      accessories.push(accessory);
    },

    addWeapon: function(weapon) {
      weapons.push(weapon.dino(self));
    },

    airborne: function() {
      return airborne;
    },

    boss: function(newValue) {
      if(newValue != undefined) {
        boss = newValue;
      } else {
        return boss;
      }
      return self;
    },

    bulletHitEffect: Enemy.bloodSprayEffect,

    components: function() {
      return weapons;
    },

    getTransform: function() {
      var transform;

      if (lastDirection <= 0 && !parasailing) {
        transform = Matrix.HORIZONTAL_FLIP;
      } else {
        transform = Matrix.IDENTITY;
      }
      
      if(airborne) {
        transform = transform.concat(Matrix.rotation(pitchAngle));
      }

      return transform.translate(I.x, I.y);
    },

    heal: heal,

    bump: function() {
      //I.xVelocity = -I.xVelocity;
    },

    draw: function(canvas) {

      canvas.withTransform(self.getTransform(), function() {
        if(parasailing) {
          parasailTile.draw(canvas, -100, -100);
        }

        walkAnimation.draw(canvas,
          -walkAnimation.width/2,
          -walkAnimation.height/2
        );

        $.each(accessories, function(i, accessory) {
          accessory.draw(canvas);
        });

        if(!parasailing) {
          jetpack.draw(canvas);
        }

        $.each(weapons, function(i, weapon) {
          weapon.draw(canvas);
        });
      });

      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    land: function(h) {
      if(I.yVelocity >= 0) {
        I.y = h - (I.radius + 1);
        I.yVelocity = 0;
        I.xVelocity = (Math.abs(I.xVelocity) / I.xVelocity) * 5;
        airborne = false;
      }
    },

    parasailing: function(newValue) {
      if(newValue != undefined) {
        parasailing = newValue;
        if(parasailing == true) {
          I.x = (CANVAS_WIDTH - width) / 2;
          I.y = 150;
          pitchAngle = 0;
          airborne = true;
        }
        return self;
      } else {
        return parasailing;
      }
    },

    after: {
      update: function(position) {
        I.hitCircles = walkFrameCircles[walkAnimation.frame()];

        jetpack.update();

        if(parasailing) {
          I.xVelocity = Math.sin(I.age);
          I.yVelocity = Math.cos(I.age/2);
        } else {
          if (jetpack.engaged()) {
            airborne = true;
            currentLevel.tiltAmount(6);
            I.xVelocity = 7;
          } else {
            currentLevel.tiltAmount(1);
          }

          if (boss) {
            currentLevel.tiltAmount(0);
            I.xVelocity = 1;
          }

          if (airborne && jetpack.engaged()) {
            I.yVelocity = -1;
          }

          if (!(jetpack.engaged()) && airborne) {
            I.yVelocity = 6;
          }

          if (!airborne) {
            lastDirection = I.xVelocity;
          } else {
            pitchAngle += Math.PI / 24;
          }
        }

        $.each(weapons, function(i, weapon) {
          weapon.update(self);

          if(weapon.active()) {
            activeWeapons.push(weapon);
          }
        });

        weapons = activeWeapons;
        activeWeapons = [];

        // Stay in screen
        if (I.x < position.x + I.radius) {
          I.x = position.x + I.radius;
          I.xVelocity = Math.abs(I.xVelocity);
        } else if (I.x > position.x + CANVAS_WIDTH - I.radius) {
          I.x = position.x + CANVAS_WIDTH - I.radius;
          I.xVelocity = -Math.abs(I.xVelocity);
        }

        // Wiggle in the air
        if (airborne) {
          I.xVelocity += (Math.random() - 0.5) * 3;
          I.xVelocity = I.xVelocity * 0.9;
        }
      }
    }
  });

  self.addWeapon(LaserGun());

  return self;
}
