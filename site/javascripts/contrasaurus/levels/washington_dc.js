(function(){
  var scene = Scene(
    [{
      image: loadImageTile("images/levels/washington_dc/background.png"),
      parallaxRate: 0,
      position: {
        x: 0,
        y: 0
      }
    }],
    []
  );

  var floor = Floor();

  var triggers = [
    {at: 1000, event: function(level) {
      level.complete();
    }}
  ]

  addCutscene(
    "images/levels/cutscenes/lincoln_memorial.png",
    "Contrasaur! I know the terrible Truth behind Reagan's plan!",
    3000
  );

  addCutscene("images/levels/cutscenes/tyrannosaurus_rex.png", "?!", 1000);

  addLevel(scene, [floor], triggers, "Dragonforce - My Spirit Will Go On");
}());
