(function(){
  var scene = Scene(
    [{
      image: Sprite.load("images/levels/washington_dc/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    }],
    []
  );

  var floor = Floor();

  var triggers = [{
      at: 50,
      event: function(level) {
        var whiteHouse = Enemy({
          health: 200,
          hitCircles: [
            {"x":-156,"y":34,"radius":62},{"x":3,"y":0,"radius":117},{"x":247,"y":-55,"radius":38},{"x":240,"y":29,"radius":43},{"x":-174,"y":-43,"radius":55},{"x":-242,"y":16,"radius":44},{"x":-242,"y":-13,"radius":43},{"x":238,"y":-17,"radius":45},{"x":140,"y":4,"radius":74},{"x":224,"y":-66,"radius":32},{"x":179,"y":-37,"radius":58},{"x":-239,"y":-50,"radius":49}
          ],
          x: level.position().x + CANVAS_WIDTH + 100,
          y: 190,
          shootLogic: $.noop,
          sprite: Sprite.load('images/levels/washington_dc/whiteHouse.png')
        });

        whiteHouse.bind('destroy', function() {
          var roboReagan = RoboReagan({
            x: level.position().x + 320
          });
          roboReagan.bind('destroy', function() {
            level.complete();
            dino.boss(false);
          });
          level.addGameObject(roboReagan);
        });

        level.addGameObject(whiteHouse);
      }
    }, {
    at: 100,
      event: function() {
        dino.boss(true);
      }
    }
  ]

  addCutscene(
    "images/levels/cutscenes/lincoln_memorial.png",
    "Contrasaur! I know the terrible Truth behind Reagan's plan!",
    3000
  );

  addCutscene("images/levels/cutscenes/tyrannosaurus_rex.png", "?!", 1000);

  addLevel(scene, [floor], triggers, "Dragonforce - My Spirit Will Go On");
}());
