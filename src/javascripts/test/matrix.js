$(function() {
  function equalEnough(expected, actual, tolerance, message) {
    ok(expected + tolerance >= actual && expected - tolerance <= actual, message);
  }

  test("Identity", function() {
    var matrix = Matrix();

    equals(matrix.a, 1, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 1, "d");
    equals(matrix.tx, 0, "tx");
    equals(matrix.ty, 0, "ty");
  });

  test("Empty Matrix", function() {
    var matrix = Matrix(0, 0, 0, 0, 0, 0);

    equals(matrix.a, 0, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 0, "d");
    equals(matrix.tx, 0, "tx");
    equals(matrix.ty, 0, "ty");
  });

  test("Matrix.scale", function() {
    var matrix = Matrix.scale(2, 2);

    equals(matrix.a, 2, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 2, "d");
  });

  test("Matrix.rotation", function() {
    var matrix = Matrix.rotation(Math.PI / 2);

    equalEnough(matrix.a, 0, 0.00001);
    equalEnough(matrix.b, 1, 0.00001);
    equalEnough(matrix.c,-1, 0.00001);
    equalEnough(matrix.d, 0, 0.00001);
  });

  test("Matrix#inverse (Identity)", function() {
    var matrix = Matrix().inverse();

    equals(matrix.a, 1, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 1, "d");
    equals(matrix.tx, 0, "tx");
    equals(matrix.ty, 0, "ty");
  });

  test("Matrix#concat", function() {
    var matrix = Matrix.rotation(Math.PI / 2).concat(Matrix.rotation(-Math.PI / 2));

    equalEnough(matrix.a,  1, 0.00001);
    equalEnough(matrix.b,  0, 0.00001);
    equalEnough(matrix.c,  0, 0.00001);
    equalEnough(matrix.d,  1, 0.00001);
    equalEnough(matrix.tx, 0, 0.00001);
    equalEnough(matrix.ty, 0, 0.00001);
  });
});