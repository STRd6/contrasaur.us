function PrimalScream(I) {
  I = I || {};

  var radius = 5;

  var exitPoints = [];

  (24).times(function(i) {
    var theta = (i / 12) * Math.PI;
    exitPoints.push(Point(Math.cos(theta) * radius, Math.sin(theta) * radius));
  });

  $.reverseMerge(I, {
    exitPoints: exitPoints,
    power: 2
  });

  var self = Weapon(I).extend({
    draw: $.noop
  });

  return self;
}
