function Boss(I) {
  I = I || {};

  $('#boss_health_text').show();

  $.reverseMerge(I, {
    checkBounds: $.noop,
    type: 'boss'
  });

  bossHealthBar = ProgressBar({
    colorMap: healthColorMap,
    max: I.health,
    value: I.health,
    x: 262,
    y: 20,
    width: 240,
    height: 30
  });

  var self = Enemy(I).extend({
    sink: $.noop,

    before: {
      update: function() {
        if (I.health > 0)  {
          bossHealthBar.value(I.health);
        }
      }
    }
  });

  self.bind('destroy', function() {
    bossHealthBar = null;
    $('#boss_health_text').hide();
  });

  return self;
}