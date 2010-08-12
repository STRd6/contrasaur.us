function ThrownItem(I) {
  I = I || {};

  // TODO: make the weapon throw farther based on how far away you click
  // make csour turn if you throw it behind you

  var position = dino.position();
  var levelPosition = currentLevel.position();

  var throwAngle = Point.direction(position, target.add(levelPosition));

  if ((Math.cos(throwAngle) < 0 && dino.xVelocity() >= 0) || (Math.cos(throwAngle) >= 0 && dino.xVelocity() < 0)) {
    var dinoVelocity = dino.xVelocity();
    dino.xVelocity(-1 * dinoVelocity);
  }

  var throwSpeed = Point.distance(position, target.add(levelPosition)) / 10;

  $.reverseMerge(I, {
    speed: throwSpeed,
    theta: throwAngle,
    weaponName: "battleAxe"
  });

  $.reverseMerge(I, {
    collideDamage: 10,
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
        collideDamage: I.explodeDamage,
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
