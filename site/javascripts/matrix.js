/**
 * Matrix, loosely based on flash.
 * http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/geom/Matrix.html
 */
(function() {
  function Point(x, y) {
    return {
      x: x || 0,
      y: y || 0
    }
  }

  function Matrix(a, b, c, d, tx, ty) {
    return {
      a: a || 1,
      b: b || 0,
      c: c || 0,
      d: d || 1,
      tx: tx || 0,
      ty: ty || 0,

      // TODO: Check the math on tx and ty!!
      concat: function(matrix) {
        return Matrix(
          this.a * matrix.a + this.c * matrix.b,
          this.b * matrix.a + this.d * matrix.b,
          this.a * matrix.c + this.c * matrix.d,
          this.b * matrix.c + this.d * matrix.d,
          this.a * matrix.tx + this.c * matrix.ty + this.tx,
          this.b * matrix.tx + this.d * matrix.ty + this.ty
        );
      },

      rotate: function(theta) {
        return this.concat(Matrix.rotation(theta));
      },

      scale: function(sx, sy) {
        return this.concat(Matrix.scale(sx, sy));
      },

      // TODO: Include tx and ty
      transformPoint: function(point) {
        return Point(
          this.a * point.x + this.c * point.y,
          this.b * point.x + this.d * point.y
        );
      },

      translate: function(tx, ty) {
        return this.concat(Matrix.translation(tx, ty));
      }
    }
  }

  Matrix.rotation = function(theta) {
    return Matrix(
      Math.cos(theta),
      Math.sin(theta),
      -Math.sin(theta),
      Math.cos(theta)
    );
  };

  Matrix.scale = function(sx, sy) {
    return Matrix(sx, 0, 0, sy);
  };

  Matrix.translation = function(tx, ty) {
    return Matrix(1, 0, 0, 1, tx, ty);
  };

  Matrix.IDENTITY = Matrix();
  Matrix.HORIZONTAL_FLIP = Matrix(-1, 0, 0, 1);
  Matrix.VERTICAL_FLIP = Matrix(1, 0, 0, -1);

  window['Matrix'] = Matrix;
  window['Point'] = Point;
}());
