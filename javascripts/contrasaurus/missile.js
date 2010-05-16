function Missile(theta, I) {
  $.reverseMerge(I, {
    color: '#000',
    width: 8,
    height: 4,
    collideDamage: 20
  });

  var self = Bullet(theta, I).extend({
    after: {
      update: function() {
        I.speed += 2;
      }
    }
  });
  return self;
}