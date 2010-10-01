function EffectGenerator(I) {
  I = I || {};

  $.reverseMerge(I, {
    delay: 6,
    duration: 100,
    objectGenerator: function(I) {
      return Effect($.extend(I, {
        duration: I.spawnDuration,
        rotation: 0,
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
      }));
    },
    spawnDuration: 25
  });

  function spawnEffect() {
    var point = Circle(I.x, I.y, I.radius).randomPoint();

    addGameObject(I.objectGenerator(point));
  }

  var self = GameObject(I).extend({
    draw: function(canvas) {
      if (GameObject.DEBUG_HIT) {
        self.drawHitCircles(canvas);
      }
    },

    after: {
      update: function() {
        if(I.age % I.delay == 0)
        spawnEffect();
      }
    }
  });

  return self;
}
