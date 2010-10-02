function Explosion(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemyBullet",
    duration: 25,
    height: 171,
    hitCircles: [{"x": 0, "y": 20, "radius": 25}, {"x": 0, "y": -40, "radius": 25}],
    radius: 20,
    sound: "explosion",
    sprite: loadAnimation("images/effects/tall_explosion.png", 11, 48, 110),
    width: 67
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

  Sound.play(I.sound);

  return self;
}
