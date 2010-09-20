function Burnable(I) {
  return {
    burn: function(flame) {
      I.onFire = true;
    },

    after: {
      update: function() {
        if(I.onFire) {
          I.health--;

          if(Math.random() < 0.1) {
            //Smoke/flame
            addGameObject(Effect($.extend(Circle(I.x, I.y, I.radius || 10).randomPoint(), {
              sprite: Sprite.load("images/effects/smoke.png"),
              velocity: Point(0, 0)
            })));
          }
        }
      }
    }
  };
}
