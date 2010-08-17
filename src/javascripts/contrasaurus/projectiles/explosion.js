function Explosion(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemyBullet",    
    duration: 25,    
    eventCallbacks: {
      'complete': $.noop,
      'destroy': $.noop
    },
    hitCircles: [{"x": 0, "y": 20, "radius": 25}, {"x": 0, "y": -40, "radius": 25}],
    sprite: loadAnimation("images/effects/explosion.png", 25, 67, 171),
    radius: 20,
    width: 67,
    height: 171
  });

  var self = GameObject(I).extend({
    hit: $.noop,

    after: {
      update: function() {
        if(I.age > 6) {
          I.collideDamage = 0;
        }

        if(I.age > I.duration) {
          I.active = false;
          self.trigger('complete');
        }
      }
    }
  });

  Sound.play("explosion");

  return self;
}
