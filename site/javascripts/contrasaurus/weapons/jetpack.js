function Jetpack(I) {

  I = I || {};

  var jetpackTile = loadImageTile("images/jetpack.png");
  var activeTile = loadImageTile("images/jetpack_active.png");

  $.reverseMerge(I, {
    active: false,
    age: 0,
    jetpackCharge: 0,
    jetpackCounter: 0,
    sprite: loadImageTile("images/jetpack.png"),
  });

  var self = Weapon(I).extend({

    active: function(value) {
      if (value === undefined) {
        return I.active;
      } else {
        I.active = value;
        return self;
      }
    },

    draw: function(canvas) {
      I.sprite.draw(canvas, -65, -25);
    },

    jetpackCharge: function(value) {
      if(value === undefined) {
        return I.jetpackCharge;
      } else {
        I.jetpackCharge += value;
        return self;
      }
    },

    shoot: $.noop,

    update: function() {
      if((Math.random() < 0.01 && I.jetpackCounter <= 0) || I.jetpackCharge >= 25) {
        I.jetpackCounter = 50 + rand(50);
        I.jetpackCharge = 0;
      }

      if (I.jetpackCounter > 0) {
        I.jetpackCounter--;
        I.active = true;
      } else {
        I.active = false;
      }

      I.sprite = I.active ? activeTile : jetpackTile;
    },

    yVelocity: function(value) {
      if (value === undefined) {
        return I.yVelocity;
      } else {
        I.yVelocity = value;
        return self;
      }
    }
  })
  return self;
}