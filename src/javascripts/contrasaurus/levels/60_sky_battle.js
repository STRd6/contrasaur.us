$(function() {
  var imgPath = "images/levels/washington_dc/sky/";

  var scene = Scene([
    {
      image: Sprite.load(imgPath + "mobile.png"),
      parallaxRate: 0.25,
      position: Point(0, 0),
      sky: true
    }
  ], []);

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
    objective: "Defeat",
    objectiveImage: "images/enemies/robo_reagan/reagan_thumb.png",
    platforms: [],
    triggers: triggers
  });

  addCutscene("images/levels/cutscenes/finale.png", "Everything is going according to plan...", 6000);
});
