function ThrownItem(I) {
  I = I || {};

  var position = dino.position();
  var levelPosition = currentLevel.position();

  var throwAngle = Point.direction(position, target.add(levelPosition));

  var throwSpeed = Point.distance(position, target.add(levelPosition)) / 10;

  $.reverseMerge(I, {
    speed: throwSpeed,
    theta: throwAngle,
    weaponName: "battleAxe"
  });

  $.reverseMerge(I, {
    collideDamage: 20,
    collisionType: "dinoBullet",
    explodeDamage: 20,
    radius: 30,
    rotation: 0,
    rotationalVelocity: Math.PI/10,
    shoot: $.noop,
    sprite: Sprite.load("images/weapons/" + I.weaponName + ".png")
  });

  function detonate() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        collideDamage: I.explodeDamage + throwSpeed*10,
        collisionType: "dinoBullet",
        x: I.x + 10,
        y: I.y
      }));
    }
  }

  var self = Bullet(I).extend({
    getTransform: GameObject.rotationGetTransform(I),
    
    land: function() {
      I.active = false;
    },

    before: {
      hit: function(other) {
        I.collideDamage = throwSpeed*30;
        detonate();
      },

      update: function() {
        I.rotation += I.rotationalVelocity;
        I.yVelocity += GRAVITY;
        I.shoot(I);
      }
    }
  });

  return self;
}
