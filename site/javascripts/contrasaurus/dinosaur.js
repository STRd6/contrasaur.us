function Dinosaur() {
  var width = 128;
  var height = 128;

  var jetpack = Jetpack();

  //using this to indicate the first time the jetpack goes off
  var jetpackFlag = false;
  var userControlled = false;

  var currentHealth = 0;

  var biteCounter = 0;

  var x = (CANVAS_WIDTH - width) / 2;
  var y = 150;

  var parasailing = false;
  var boss = false;
  var airborne = true;

  var weapons = [];
  var activeWeapons = [];

  var pitchAngle = 0;
  var leftBaseAngle = Math.PI;
  var rightBaseAngle = 0;

  var walkModel = Model(
      loadAnimation("images/contrasaurus/walk.png", 8, 283, 163, 3),
      [
        [{"x":87,"y":-52,"radius":27},{"x":13,"y":-10,"radius":37},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-27,"y":-12,"radius":25},{"x":-60,"y":-2,"radius":18},{"x":-89,"y":5,"radius":14},{"x":-113,"y":10,"radius":12},{"x":-2,"y":35,"radius":20},{"x":0,"y":64,"radius":18},{"x":24,"y":72,"radius":10},{"x":39,"y":73,"radius":8},{"x":-130,"y":11,"radius":8}],
        [{"x":87,"y":-52,"radius":27},{"x":12,"y":-8,"radius":41},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-22,"y":-13,"radius":26},{"x":-60,"y":-2,"radius":18},{"x":-89,"y":5,"radius":14},{"x":-112,"y":10,"radius":12},{"x":-130,"y":10,"radius":8},{"x":26,"y":39,"radius":9},{"x":-19,"y":43,"radius":10},{"x":69,"y":63,"radius":14},{"x":-16,"y":65,"radius":18},{"x":-9,"y":28,"radius":10},{"x":48,"y":56,"radius":9},{"x":9,"y":73,"radius":10},{"x":35,"y":50,"radius":8}],
        [{"x":87,"y":-53,"radius":27},{"x":12,"y":-9,"radius":38},{"x":118,"y":-45,"radius":23},{"x":50,"y":-38,"radius":19},{"x":-21,"y":-12,"radius":28},{"x":-60,"y":-6,"radius":18},{"x":-88,"y":0,"radius":14},{"x":-113,"y":1,"radius":12},{"x":-127,"y":0,"radius":8},{"x":-37,"y":59,"radius":25},{"x":51,"y":70,"radius":12},{"x":-34,"y":31,"radius":11},{"x":35,"y":19,"radius":12},{"x":42,"y":53,"radius":10},{"x":37,"y":37,"radius":8},{"x":89,"y":60,"radius":10},{"x":67,"y":71,"radius":7},{"x":79,"y":67,"radius":7},{"x":-18,"y":24,"radius":8}],
        [{"x":85,"y":-54,"radius":27},{"x":9,"y":-6,"radius":42},{"x":117,"y":-45,"radius":24},{"x":49,"y":-36,"radius":18},{"x":-26,"y":-4,"radius":31},{"x":-60,"y":-5,"radius":17},{"x":-88,"y":2,"radius":15},{"x":-112,"y":4,"radius":12},{"x":-130,"y":2,"radius":7},{"x":28,"y":74,"radius":9},{"x":-84,"y":63,"radius":18},{"x":13,"y":44,"radius":10},{"x":18,"y":61,"radius":8},{"x":67,"y":74,"radius":9},{"x":43,"y":76,"radius":7},{"x":54,"y":76,"radius":6},{"x":-66,"y":48,"radius":8},{"x":-47,"y":27,"radius":8},{"x":-60,"y":34,"radius":10}],
        [{"x":86,"y":-53,"radius":27},{"x":13,"y":-10,"radius":37},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-27,"y":-12,"radius":25},{"x":-60,"y":-2,"radius":18},{"x":-87,"y":6,"radius":15},{"x":-112,"y":10,"radius":13},{"x":-130,"y":12,"radius":8},{"x":-2,"y":64,"radius":20},{"x":-7,"y":34,"radius":20},{"x":37,"y":73,"radius":11},{"x":20,"y":74,"radius":9}],
        [{"x":87,"y":-52,"radius":27},{"x":13,"y":-11,"radius":38},{"x":118,"y":-43,"radius":24},{"x":49,"y":-39,"radius":19},{"x":-25,"y":-14,"radius":24},{"x":-60,"y":-3,"radius":17},{"x":-89,"y":5,"radius":14},{"x":-112,"y":8,"radius":11},{"x":-129,"y":9,"radius":7},{"x":-11,"y":58,"radius":25},{"x":4,"y":40,"radius":27},{"x":80,"y":65,"radius":12},{"x":66,"y":54,"radius":11},{"x":37,"y":52,"radius":10},{"x":49,"y":54,"radius":10}],
        [{"x":86,"y":-53,"radius":27},{"x":12,"y":-8,"radius":41},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-24,"y":-13,"radius":25},{"x":-60,"y":-6,"radius":18},{"x":-86,"y":-2,"radius":15},{"x":-109,"y":0,"radius":12},{"x":-127,"y":-1,"radius":8},{"x":-40,"y":59,"radius":25},{"x":56,"y":72,"radius":12},{"x":-33,"y":31,"radius":11},{"x":-18,"y":25,"radius":7},{"x":37,"y":27,"radius":10},{"x":36,"y":44,"radius":10},{"x":43,"y":59,"radius":8},{"x":74,"y":67,"radius":9},{"x":90,"y":57,"radius":11}],
        [{"x":85,"y":-54,"radius":27},{"x":5,"y":-5,"radius":44},{"x":117,"y":-45,"radius":24},{"x":50,"y":-37,"radius":19},{"x":-33,"y":1,"radius":33},{"x":-62,"y":-5,"radius":18},{"x":-90,"y":1,"radius":14},{"x":-113,"y":2,"radius":11},{"x":-128,"y":1,"radius":7},{"x":-89,"y":66,"radius":13},{"x":68,"y":73,"radius":10},{"x":48,"y":74,"radius":10},{"x":29,"y":72,"radius":10},{"x":-62,"y":38,"radius":15},{"x":16,"y":59,"radius":10},{"x":-71,"y":58,"radius":9},{"x":12,"y":44,"radius":8}]
      ]
  );
  var flyModel = Model(
    Sprite.load("images/contrasaurus/fly.png"),
    [
      [{"x":88,"y":-49,"radius":30},{"x":16,"y":-12,"radius":36},{"x":117,"y":-45,"radius":24},{"x":51,"y":-36,"radius":20},{"x":-62,"y":1,"radius":19},{"x":-28,"y":-6,"radius":30},{"x":-86,"y":8,"radius":18},{"x":-114,"y":24,"radius":25},{"x":-135,"y":9,"radius":6}]
    ]
  );
  var biteModel = Model(
    loadAnimation("images/contrasaurus/bite.png", 8, 302, 189, 3),
    [
      [{"x":106,"y":-31,"radius":27},{"x":-70,"y":8,"radius":18},{"x":-92,"y":15,"radius":16},{"x":74,"y":-26,"radius":14},{"x":62,"y":-39,"radius":19},{"x":83,"y":-51,"radius":18},{"x":-116,"y":21,"radius":12},{"x":-1,"y":1,"radius":41},{"x":39,"y":-27,"radius":19},{"x":-41,"y":0,"radius":26},{"x":-136,"y":23,"radius":9},{"x":-21,"y":34,"radius":13},{"x":-35,"y":40,"radius":9},{"x":-46,"y":53,"radius":8},{"x":-46,"y":66,"radius":8},{"x":-43,"y":83,"radius":11},{"x":-25,"y":88,"radius":7},{"x":-9,"y":88,"radius":10},{"x":23,"y":31,"radius":15},{"x":16,"y":50,"radius":9},{"x":15,"y":67,"radius":9},{"x":27,"y":80,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":60,"y":24,"radius":8},{"x":53,"y":12,"radius":7},{"x":43,"y":2,"radius":8}],[{"x":106,"y":-29,"radius":16},{"x":-70,"y":12,"radius":18},{"x":-92,"y":21,"radius":16},{"x":70,"y":-19,"radius":14},{"x":62,"y":-39,"radius":19},{"x":88,"y":-47,"radius":15},{"x":-116,"y":28,"radius":13},{"x":-1,"y":1,"radius":41},{"x":39,"y":-27,"radius":19},{"x":-41,"y":0,"radius":26},{"x":-136,"y":30,"radius":9},{"x":-21,"y":34,"radius":13},{"x":-35,"y":40,"radius":9},{"x":-46,"y":53,"radius":8},{"x":-46,"y":66,"radius":8},{"x":-43,"y":83,"radius":11},{"x":-25,"y":88,"radius":7},{"x":-9,"y":88,"radius":10},{"x":23,"y":31,"radius":15},{"x":16,"y":50,"radius":9},{"x":15,"y":67,"radius":9},{"x":27,"y":80,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":55,"y":17,"radius":8},{"x":53,"y":8,"radius":7},{"x":43,"y":2,"radius":8},{"x":86,"y":-1,"radius":12},{"x":97,"y":8,"radius":12},{"x":117,"y":-23,"radius":15}],[{"x":97,"y":-63,"radius":18},{"x":-70,"y":16,"radius":18},{"x":-92,"y":24,"radius":16},{"x":82,"y":-25,"radius":14},{"x":51,"y":-63,"radius":19},{"x":68,"y":-77,"radius":17},{"x":-116,"y":33,"radius":12},{"x":-2,"y":-1,"radius":40},{"x":31,"y":-42,"radius":17},{"x":-41,"y":3,"radius":26},{"x":-136,"y":36,"radius":9},{"x":-21,"y":34,"radius":13},{"x":-35,"y":40,"radius":9},{"x":-46,"y":53,"radius":8},{"x":-46,"y":66,"radius":8},{"x":-43,"y":83,"radius":11},{"x":-25,"y":88,"radius":7},{"x":-9,"y":88,"radius":10},{"x":23,"y":31,"radius":15},{"x":16,"y":50,"radius":9},{"x":15,"y":67,"radius":9},{"x":27,"y":80,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":48,"y":0,"radius":8},{"x":64,"y":-38,"radius":12}],[{"x":93,"y":-66,"radius":19},{"x":-70,"y":16,"radius":18},{"x":-92,"y":26,"radius":16},{"x":78,"y":-28,"radius":15},{"x":47,"y":-67,"radius":19},{"x":63,"y":-80,"radius":16},{"x":-116,"y":33,"radius":13},{"x":-1,"y":-1,"radius":41},{"x":31,"y":-46,"radius":18},{"x":-41,"y":4,"radius":26},{"x":-136,"y":37,"radius":9},{"x":-21,"y":34,"radius":13},{"x":-35,"y":40,"radius":9},{"x":-46,"y":53,"radius":8},{"x":-46,"y":66,"radius":8},{"x":-43,"y":83,"radius":11},{"x":-25,"y":88,"radius":7},{"x":-9,"y":88,"radius":10},{"x":23,"y":31,"radius":15},{"x":16,"y":50,"radius":9},{"x":15,"y":67,"radius":9},{"x":27,"y":80,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":46,"y":-3,"radius":8},{"x":59,"y":-42,"radius":11}],[{"x":109,"y":51,"radius":24},{"x":-66,"y":-30,"radius":16},{"x":-91,"y":-30,"radius":14},{"x":81,"y":30,"radius":14},{"x":92,"y":13,"radius":19},{"x":103,"y":19,"radius":18},{"x":-115,"y":-26,"radius":12},{"x":2,"y":4,"radius":37},{"x":53,"y":6,"radius":21},{"x":-41,"y":-26,"radius":19},{"x":-134,"y":-26,"radius":9},{"x":-17,"y":36,"radius":13},{"x":-33,"y":43,"radius":9},{"x":-42,"y":55,"radius":8},{"x":-46,"y":66,"radius":8},{"x":-46,"y":84,"radius":11},{"x":-28,"y":88,"radius":7},{"x":-10,"y":88,"radius":10},{"x":28,"y":35,"radius":15},{"x":18,"y":48,"radius":9},{"x":12,"y":65,"radius":9},{"x":25,"y":78,"radius":9},{"x":42,"y":88,"radius":9},{"x":59,"y":89,"radius":8},{"x":77,"y":88,"radius":10}],[{"x":113,"y":54,"radius":24},{"x":-64,"y":-30,"radius":15},{"x":-89,"y":-31,"radius":14},{"x":85,"y":32,"radius":14},{"x":93,"y":15,"radius":19},{"x":106,"y":21,"radius":18},{"x":-112,"y":-30,"radius":12},{"x":1,"y":1,"radius":35},{"x":66,"y":12,"radius":17},{"x":-38,"y":-26,"radius":20},{"x":-131,"y":-31,"radius":9},{"x":-16,"y":36,"radius":13},{"x":-31,"y":44,"radius":9},{"x":-42,"y":53,"radius":7},{"x":-46,"y":66,"radius":8},{"x":-45,"y":85,"radius":11},{"x":-27,"y":88,"radius":7},{"x":-10,"y":88,"radius":10},{"x":29,"y":36,"radius":15},{"x":19,"y":52,"radius":9},{"x":14,"y":68,"radius":9},{"x":27,"y":80,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":7,"y":38,"radius":10},{"x":44,"y":7,"radius":25}],[{"x":126,"y":9,"radius":25},{"x":-70,"y":4,"radius":18},{"x":-92,"y":9,"radius":16},{"x":94,"y":7,"radius":14},{"x":93,"y":-14,"radius":19},{"x":106,"y":-16,"radius":18},{"x":-116,"y":7,"radius":12},{"x":5,"y":4,"radius":37},{"x":45,"y":-4,"radius":20},{"x":-41,"y":0,"radius":26},{"x":-136,"y":3,"radius":9},{"x":-21,"y":34,"radius":13},{"x":-34,"y":44,"radius":9},{"x":-45,"y":54,"radius":8},{"x":-48,"y":66,"radius":8},{"x":-48,"y":81,"radius":11},{"x":-32,"y":88,"radius":7},{"x":-13,"y":88,"radius":10},{"x":23,"y":30,"radius":15},{"x":16,"y":50,"radius":9},{"x":15,"y":65,"radius":9},{"x":29,"y":79,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":46,"y":36,"radius":8},{"x":50,"y":27,"radius":7},{"x":40,"y":21,"radius":8},{"x":70,"y":-7,"radius":16}],[{"x":106,"y":-31,"radius":27},{"x":-70,"y":8,"radius":18},{"x":-92,"y":15,"radius":16},{"x":74,"y":-26,"radius":14},{"x":62,"y":-39,"radius":19},{"x":83,"y":-51,"radius":18},{"x":-116,"y":21,"radius":12},{"x":-1,"y":1,"radius":41},{"x":39,"y":-27,"radius":19},{"x":-41,"y":0,"radius":26},{"x":-136,"y":23,"radius":9},{"x":-21,"y":34,"radius":13},{"x":-35,"y":40,"radius":9},{"x":-46,"y":53,"radius":8},{"x":-46,"y":66,"radius":8},{"x":-43,"y":83,"radius":11},{"x":-25,"y":88,"radius":7},{"x":-9,"y":88,"radius":10},{"x":23,"y":31,"radius":15},{"x":16,"y":50,"radius":9},{"x":15,"y":67,"radius":9},{"x":27,"y":80,"radius":9},{"x":43,"y":89,"radius":9},{"x":60,"y":89,"radius":8},{"x":77,"y":88,"radius":10},{"x":60,"y":24,"radius":8},{"x":53,"y":12,"radius":7},{"x":43,"y":2,"radius":8}]
    ]
  );
  var cryModel = Model(
    Sprite.load("images/contrasaurus/cry.png"),
    [
      [{"x":87,"y":-52,"radius":27},{"x":13,"y":-10,"radius":37},{"x":117,"y":-45,"radius":24},{"x":50,"y":-38,"radius":19},{"x":-27,"y":-12,"radius":25},{"x":-60,"y":-2,"radius":18},{"x":-89,"y":5,"radius":14},{"x":-113,"y":10,"radius":12},{"x":-2,"y":35,"radius":20},{"x":0,"y":64,"radius":18},{"x":24,"y":72,"radius":10},{"x":39,"y":73,"radius":8},{"x":-130,"y":11,"radius":8}]
    ]
  );

  var parasailTile = Sprite.load("images/levels/parasail/parasail.png");

  var currentModel = walkModel;

  var I = {
    collideDamage: 2,
    collisionType: "dino",
    hitCircles: currentModel.hitFrame(),
    health: 500,
    radius: 72,
    sprite: currentModel.animation,
    x: x,
    y: y,
    xVelocity: 1,
    yVelocity: 6
  };

  var accessories = [];

  var lastDirection = I.xVelocity;

  var healthMax = I.health;

  $(document).bind('keydown', 'space', function() {
    jetpack.jetpackCounter(50);
    pitchAngle = Math.clamp(pitchAngle, -Math.PI/3, Math.PI/24)
    I.yVelocity = Math.clamp(I.xVelocity * Math.tan(pitchAngle), -5, 0);
    userControlled = true;
  });

  $(document).bind('keydown', 'left', function() {
    if(airborne) {
      if (jetpack.engaged()) {
        pitchAngle = Math.clamp(pitchAngle - Math.PI/48, -Math.PI/3, Math.PI/24);
        I.yVelocity = Math.clamp(I.xVelocity * Math.tan(pitchAngle), -5, 0);
      }
    }

    if (I.xVelocity >= 0 && !airborne) {
      I.xVelocity = (-1*I.xVelocity);
    }
    
    userControlled = true;
  });

  $(document).bind('keydown', 'right', function() {
    if(airborne) {
      if (jetpack.engaged()) {
        pitchAngle = Math.clamp(pitchAngle + Math.PI/48, -Math.PI/3, Math.PI/24);
        I.yVelocity = Math.clamp(I.xVelocity * Math.tan(pitchAngle), -5, 0);
      }
    }
    
    if (I.xVelocity < 0 && !airborne) {
      I.xVelocity = (-1*I.xVelocity);
    }

    userControlled = true;
  });

  function heal(amount) {
    I.health = Math.clamp(I.health + amount, 0, healthMax);
  }

  function setModel(model) {
    currentModel = model;
    I.sprite = currentModel.animation;
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

    boss: function(value) {
      if (value !== undefined) {
        boss = value;
        if (boss) {
          I.xVelocity = 1;
        }
      } else {
        if (boss) {
          I.xVelocity = 1;
        }
      }
      return boss;
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
      if (biteCounter <= 0) {
        biteCounter = 24;
        biteModel.animation.frame(0);
      }

      if (!airborne && biteCounter > 0) {
        setModel(biteModel);
      }
    },

    draw: function(canvas) {

      canvas.withTransform(self.getTransform(), function() {
        if(parasailing) {
          parasailTile.draw(canvas, -100, -100);
        }

        I.sprite.draw(canvas,
          -I.sprite.width/2,
          -I.sprite.height/2
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
        pitchAngle = -Math.PI/24
        jetpackFlag = false;
        jetpack.engaged(false);
        userControlled = false;
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

    xVelocity: function(value) {
      if(value !== undefined) {
        I.xVelocity = value;
        return I.xVelocity;
      } else {
        return I.xVelocity;
      }
    },

    yVelocity: function(value) {
      if(value !== undefined) {
        I.yVelocity = value;
        return I.yVelocity;
      } else {
        return I.yVelocity;
      }
    },
    before: {
      // HAX: to make sure walking on the floor
      // doesn't trigger the cry model
      hit: function(other) {
        currentHealth = I.health;
      }
    },
    after: {
      hit: function(other) {
        if (I.health < currentHealth && !airborne && biteCounter <= 0) {
          setModel(cryModel);
        }
      },
      update: function(position) {
        // Choose correct animation and hitFrames

        biteCounter--;

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
          }

          if (!(jetpack.engaged()) && airborne) {
            I.yVelocity += GRAVITY;
          }

          if (airborne) {
            setModel(flyModel);
            if (!userControlled) {
              pitchAngle += Math.PI / 24;
            }
          } else {
            if (biteCounter <= 0) {
              setModel(walkModel);
            }
            lastDirection = I.xVelocity;
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

        I.hitCircles = currentModel.hitFrame();
      }
    }
  });

  return self;
}
