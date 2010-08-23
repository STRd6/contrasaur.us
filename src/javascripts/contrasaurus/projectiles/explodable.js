function Explodable(I) {

  function explode() {
    if(I.active) {
      I.active = false;
      addGameObject(Explosion({
        x: I.x,
        y: I.y,
        collisionType: I.collisionType,
        duration: 10,
        sprite: loadAnimation("images/effects/explosion_46x46.png", 5, 46, 46, 2)
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
