// Hook the ready callback.
pulse.ready(function() {
  // Create an engine.
  var engine = new pulse.Engine({
    gameWindow: 'helloWindow'
  });

  // Create a scene.
  var scene = new pulse.Scene();

  // Create a layer and add it to the scene.
  var layer = new pulse.Layer();
  layer.position = { x: 300, y : 200 };
  scene.addLayer(layer);

  // Create a label and add it to the layer.
  var label = new pulse.CanvasLabel({ text: 'Hello World!' });
  label.position = { x: 300, y: 200 };
  layer.addNode(label);

  // Add an activate the scene.
  engine.scenes.addScene(scene);
  engine.scenes.activateScene(scene);

  // Start the update and render loop.
  engine.go(30);
});