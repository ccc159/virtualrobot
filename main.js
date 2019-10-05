window.addEventListener("DOMContentLoaded", main);

function main() {
  // get the canvas DOM element
  var canvas = document.getElementById("renderCanvas");

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  var delayCreateScene = function() {
    // Create a scene.
    var scene = new BABYLON.Scene(engine);

    // Create a default skybox with an environment.
    // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/studio.dds", scene);
    // var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    // Append glTF model to scene.
    var aa = BABYLON.SceneLoader.Append("test.obj", "", scene, function(
      scene
    ) {});

    console.log(aa);

    return scene;
  };

  // createScene function that creates and return the scene
  var createScene = function() {
    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      scene
    );

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // move the sphere upward 1/2 of its height
    sphere.position.y = 1;

    // create a built-in "ground" shape;
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // return the created scene
    return scene;
  };

  // call the createScene function
  var scene = delayCreateScene();

  // Create a default arc rotate camera and light.

  scene.createDefaultCameraOrLight(true, true, true);

  // The default camera looks at the back of the asset.
  // Rotate the camera by 180 degrees to the front of the asset.
  scene.activeCamera.alpha += Math.PI;

  // create a basic light, aiming 0,1,0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // run the render loop
  engine.runRenderLoop(function() {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener("resize", function() {
    engine.resize();
  });
}
