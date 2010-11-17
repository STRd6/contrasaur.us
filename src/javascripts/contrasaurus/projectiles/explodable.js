function Explodable(I) {

  function explode() {
    if(I.active) {
      I.active = false;

      addGameObject(Explosion({
        collideDamage: I.explosionDamage || 1,
        collisionType: I.collisionType,
        duration: 10,
        sprite: loadAnimation("images/effects/small_explosion.png", 5, 44, 41, 2),
        x: I.x,
        y: I.y
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
