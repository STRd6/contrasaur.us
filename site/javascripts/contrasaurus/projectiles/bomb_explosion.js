function BombExplosion(I) {
  var duration = 25;
  I = I || {};

  $.reverseMerge(I, {
    collideDamage: 1,
    sprite: loadAnimation("images/explosion.png", 25, 67, 171),
    width: 67,
    height: 171
  });

  return GameObject(I).extend({
    after: {
      hit: function() {
        I.active = true;
      },
      update: function() {
        if(I.age > 6) {
          I.collideDamage = 0;
        }

        if(I.age > duration) {
          I.active = false;
        } else {
          I.sprite.update();
        }
      }
    }
  });
}
