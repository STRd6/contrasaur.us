function Chainsaw(I) {
  I = I || {};

  $.reverseMerge(I, {
    age: 0,
    collideDamage: 7,
    effectCount: 3,
    radius: 5.5,
    sprite: loadImageTile("images/weapons/chainsaw.png"),
    theta: 0
  });

  var exitPoints = [Point(60, 20), Point(90, 20)];

  function generateBulletData(globalPosition, localPosition) {
    return {
      duration: 1,
      speed: 0,
      sprite: Tile.EMPTY,
      radius: 10,
      x: localPosition.x + globalPosition.x,
      y: localPosition.y + globalPosition.y
    };
  }

  var self = Weapon(I).extend({

    draw: function(canvas) {
      if (I.active) {
        canvas.withState(
          0,
          0,
          { transform: self.getTransform() },
          function() {
            I.sprite.draw(canvas);
          }
        )
      }
    },

    getTransform: function() {
      return Matrix.translation(-5, 0).concat(Matrix.rotation(I.theta));
    },

    shoot: function(position, transform) {
      $.each(exitPoints, function(i, exitPoint) {
        var localPosition = transform.concat(self.getTransform()).transformPoint(exitPoint);

        addGameObject(Bullet(0, generateBulletData(position, localPosition)));
      });
    },

    update: function() {
      I.duration--;
      I.age++;
      I.theta = Math.sin(I.age / 4) * (Math.PI / 6);
    }
  })
  return self;
}