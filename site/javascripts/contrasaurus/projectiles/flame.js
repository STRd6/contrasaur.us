function Flame(direction, I) {
  var speed = 2;
  var theta = Math.PI/4;
  var age = 0;

  $.reverseMerge(I, {
    color: '#500',
    width: 36,
    height: 78,
    radius: 18,
    collideDamage: 20,
    sprite: loadImageTile("images/flame.png"),
    xVelocity: speed * direction,
    yVelocity: Math.sin(theta)*speed
  });

  var self = Bullet(theta, I).extend({
    hit: $.noop,
    after: {
      update: function() {
        age++;
        theta -= Math.PI/48;
        if (age > 24) {
          I.active = false;
        }
        I.yVelocity = speed * Math.sin(theta);
        console.log(I.xVelocity);
      }
    }
  });
  return self;
}
