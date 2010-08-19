function Jetpack(I) {

  I = I || {};

  var fireSprite = Animation.load("images/weapons/jetpack_fire.png", 4, 91, 89, 2);
  var jetpackSprite = Sprite.load("images/weapons/jetpack.png");

  var maxSpeed = -4;

  $.reverseMerge(I, {
    attachment: "back",
    duration: -1,
    engaged: false,
    eventCallbacks: {
      engage: function() {
        if(!I.engaged ) {
          I.engaged = true;
          I.yImpulse = -1;
          dino.airborne(true);
        }
      },
      disengage: function() {
        if(I.engaged) {
          I.engaged = false;
          I.yImpulse = 0;
        }
      }
    },
    sprite: jetpackSprite,
    xImpulse: 0,
    yImpulse: 0
  });

  var self = Accessory(I).extend({
    data: $.noop,
    draw: function(canvas) {
      canvas.withTransform(self.getTransform(), function() {
        jetpackSprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);

        if (I.engaged) {
          fireSprite.draw(canvas, -I.sprite.width/2, -I.sprite.height/2);
        }
      });
    },

    engaged: function(value) {
      if (value !== undefined) {
        I.engaged = value;
      }
      return I.engaged;
    },

    shoot: $.noop,

    update: function() {
      dino.yVelocity(Math.max(dino.yVelocity() + I.yImpulse, maxSpeed));

      fireSprite.update();

      if(I.engaged) {
        var p = dino.getTransform().transformPoint(Point(-20, 20).add(self.position()));
        var jetFlame = Bullet({
          collideDamage: 20,
          effectCount: 0,
          duration: 1,
          radius: 20,
          speed: 0,
          sprite: Sprite.EMPTY,
          x: p.x,
          y: p.y
        }).extend({
          before: {
            hit: function(other) {
              if(other.burn) {
                other.burn(jetFlame);
              }
            }
          }
        });

        addGameObject(jetFlame);
      }
    }
  })
  return self;
}
