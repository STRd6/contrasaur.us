function Jetpack(I) {

  I = I || {};

  var jetpackTile = Sprite.load("images/weapons/jetpack.png");
  var activeTile = Sprite.load("images/weapons/jetpack_active.png");

  $.reverseMerge(I, {
    age: 0,
    engaged: false,
    jetpackCharge: 0,
    jetpackCounter: 0,
    sprite: Sprite.load("images/weapons/jetpack.png")
  });

  var self = Weapon(I).extend({

    engaged: function(value) {
      if (value === undefined) {
        return I.engaged;
      } else {
        I.engaged = value;
        return self;
      }
    },

    draw: function(canvas) {
      I.sprite.draw(canvas, -45, -55);
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
        I.engaged = true;
      } else {
        I.engaged = false;
      }

      I.sprite = I.engaged ? activeTile : jetpackTile;
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