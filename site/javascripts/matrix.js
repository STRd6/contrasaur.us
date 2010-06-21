/**
 * Matrix, loosely based on flash.
 * http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/geom/Matrix.html
 */
(function() {
  function Point(x, y) {
    return {
      x: x || 0,
      y: y || 0,
      add: function(other) {
        return Point(this.x + other.x, this.y + other.y);
      }
    }
  }

  Point.distance = function(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  function Matrix(a, b, c, d, tx, ty) {
    return {
      a: a || 1,
      b: b || 0,
      c: c || 0,
      d: d || 1,
      tx: tx || 0,
      ty: ty || 0,

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

      inverse: function() {
        var determinant = this.a * this.d - this.b * this.c;
        return Matrix(
          this.d / determinant,
          -this.b / determinant,
          -this.c / determinant,
          this.a / determinant,
          (this.c * this.ty - this.d * this.tx) / determinant,
          (this.b * this.tx - this.a * this.ty) / determinant
        );
      },

      rotate: function(theta, aboutPoint) {
        return Matrix.rotation(theta, aboutPoint).concat(this);
      },

      scale: function(sx, sy) {
        return Matrix.scale(sx, sy).concat(this);
      },

      transformPoint: function(point) {
        return Point(
          this.a * point.x + this.c * point.y + this.tx,
          this.b * point.x + this.d * point.y + this.ty
        );
      },

      translate: function(tx, ty) {
        return Matrix.translation(tx, ty).concat(this);
      }
    }
  }

  Matrix.rotation = function(theta, aboutPoint) {
    var rotationMatrix = Matrix(
      Math.cos(theta),
      Math.sin(theta),
      -Math.sin(theta),
      Math.cos(theta)
    );

    if(aboutPoint) {
      rotationMatrix =
        Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
          rotationMatrix
        ).concat(
          Matrix.translation(-aboutPoint.x, -aboutPoint.y)
        );
    }

    return rotationMatrix;
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
