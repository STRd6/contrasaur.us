function Boss(I) {
  I = I || {};

  $.reverseMerge(I, {
    type: 'boss'
  });

  var healthBar;

  var self = Enemy(I).extend({
    healthBar: function() {
      if(!healthBar) {
        healthBar = ProgressBar({
          colorMap: healthColorMap,
          element: $("#bossHealth"),
          max: self.health(),
          value: self.health()
        });
      }

      return healthBar;
    },

    after: {
      update: function() {
        if(healthBar) {
          healthBar.value(I.health);
        }
      }
    }
  });

  return self;
}