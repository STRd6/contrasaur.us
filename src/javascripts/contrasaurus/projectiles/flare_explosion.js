function FlareExplosion(I) {
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    collisionType: "enemy",
    duration: 200,
    sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
  });

  var self = GameObject(I).extend({
    hit: $.noop,

    after: {
      update: function() {
        if(I.age > 6) {
          I.collideDamage = 0;
        }

        // if(I.age > I.duration) {
        //   I.active = false;
        //   self.trigger('complete');
        // }
      }
    }
  });

  Sound.play(I.sound);

  return self;
}
