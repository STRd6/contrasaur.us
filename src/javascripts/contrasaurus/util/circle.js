function Circle(x, y, radius) {
  return {
    x: x,
    y: y,
    radius: radius,
    randomPoint: function() {
      var m = Math.max(rand(), rand()) * this.radius;
      var theta = rand() * 2 * Math.PI;

      return Point(m * Math.cos(theta) + this.x, m * Math.sin(theta) + this.y);
    }
  }
}
