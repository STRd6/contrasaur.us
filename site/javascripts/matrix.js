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

      // TODO: Check the math!!
      concat: function(matrix) {
        return Matrix(
          a * matrix.a + c * matrix.b,
          b * matrix.a + d * matrix.b,
          a * matrix.c + c * matrix.d,
          b * matrix.c + d * matrix.d,
          a * matrix.tx + c * matrix.ty + tx,
          b * matrix.tx + d * matrix.ty + ty
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
        return Point(a * point.x + c * point.y, b * point.x + d * point.y);
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
