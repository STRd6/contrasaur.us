function Chainsaw(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    collideDamage: 7,
    radius: 5.5,
    sprite: loadImageTile("images/weapons/chainsaw.png"),
    theta: 0
  });

  var self = Weapon(I).extend({

    draw: function(canvas) {
      canvas.withState( 
        0,
        0, 
        { transform: self.getTransform() },
        function() {
          I.sprite.draw(canvas);
        }
      )
    },

    getTransform: function() {
      return Matrix.translation(-5, 0).concat(Matrix.rotation(I.theta));
    },

    shoot: function(position, transform) {
      var bulletPosition = transform.concat(self.getTransform()).transformPoint(50, 0);
      addGameObject(Bullet(0,
        {
          x: bulletPosition.x + position.x,
          y: bulletPosition.y + position.y,
          speed: 0
        }
      ));
    },

    update: function() {
      I.age++;
      I.theta = Math.sin(I.age / 4) * Math.PI / 6;
    }
  })
  return self;
}