(function() {

  var scene = Scene(
    [],
    []
  );

  var floor = Floor();

  var triggers = [];

  addCutscene("images/levels/cutscenes/finale.png", "Everything is going according to plan...", 6000);
  addLevel(scene, [floor], triggers, "Dragonforce - My Spirit Will Go On");
}());
