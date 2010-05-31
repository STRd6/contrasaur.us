function LaserGun(dino) {
  if (dino.getWeapons().laser && rand(100) < dino.getWeapons().laser) {
    shoot(Laser(dino.getTheta(), {
      x: dino.midpoint().x,
      y: dino.midpoint().y
    }));
  }
}