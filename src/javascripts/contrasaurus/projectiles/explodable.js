function Explodable(I) {

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: I.collisionType,
        duration: 10,
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2)
      }));
    }
  }

  return {
    before: {
      hit: function() {
        explode();
      }
    }
  };
}
