$(function() {
  var imgPath = "images/levels/washington_dc/sky/";

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "background.png"),
      parallaxRate: 0.25,
      position: {
        x: 0,
        y: 0
      },
      sky: true
    },
    {
      image: Sprite.load(imgPath + "midground.png"),
      parallaxRate: 0.5,
      position: {
        x: 0,
        y: 0
      },
      sky: true
    }
  ], [
    {
      image: Sprite.load(imgPath + "foreground.png"),
      parallaxRate: 1,
      position: {
        x: 0,
        y: 0
      },
      sky: true
    }
  ]);

  var triggers = [
    {
      at: 0,
      event: function() {
        var finalReagan = FinalReagan();
        dino.skyBattle();
        dino.boss(finalReagan);

        level.addGameObject(finalReagan);

        finalReagan.bind('destroy', function() {
          dino.boss(false);

          level.after(150, function() {
            level.fadeOut(50);

            level.after(50, function() {
              level.complete();
            });
          });
        });
      }
    }
  ];

  var level = addLevel({
    audio: "Dragonforce - My Spirit Will Go On",
    description: "AD 1984: D.C. Sky",
    skyMode: true,
    scene: scene,
    objective: "???",
    objectiveImage: 'images/enemies/dinofodder.png',
    platforms: [],
    triggers: triggers
  });

  addCutscene("images/levels/cutscenes/finale.png", "Everything is going according to plan...", 6000);
});
