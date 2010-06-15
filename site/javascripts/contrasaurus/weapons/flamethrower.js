function Flamethrower(I) {
  I = I || {};
  
  var mouthPoint = {
    x: 45,
    y: 20
  };

  $.reverseMerge(I, {
    power: 0,
    radius: 5,
    theta: 0,
    sprite: Tile.EMPTY
  });

  var self = Weapon(I).extend({
    shoot: function(midpoint, transform) {

      if (rand(100) < I.power) {
        var exitPoint = transformPoint(mouthPoint, transform);
        addGameObject(Flame(direction, {
          x: midpoint.x + exitPoint.x,
          y: midpoint.y + exitPoint.y
        }));
      }
    },

    update: $.noop
  });
  return self;
}