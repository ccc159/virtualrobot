///<reference path="babylon.d.ts" />

class RobotScene {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.ArcRotateCamera;
  private _sphere_light: BABYLON.HemisphericLight;
  private _direction_light: BABYLON.DirectionalLight;

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createCamera(): void {
    // Parameters: alpha, beta, radius, target position, scene
    this._camera = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      0,
      10,
      new BABYLON.Vector3(0, 0, 0),
      this._scene
    );

    // Positions the camera overwriting alpha, beta, radius
    this._camera.setPosition(new BABYLON.Vector3(0, 0, 20));

    // This attaches the camera to the canvas
    this._camera.attachControl(this._canvas, true);
  }

  createLights(): void {
    this._sphere_light = new BABYLON.HemisphericLight(
      "HemiLight",
      new BABYLON.Vector3(0, 1, 0),
      this._scene
    );
    this._direction_light = new BABYLON.DirectionalLight(
      "DirectionalLight",
      new BABYLON.Vector3(-2, -3, 1),
      this._scene
    );
    this._direction_light.position = new BABYLON.Vector3(6, 9, 3);
  }

  setEnvironment(): void {
    var generator = new BABYLON.ShadowGenerator(512, this._direction_light);
    generator.useBlurExponentialShadowMap = true;
    generator.blurKernel = 32;

    for (var i = 0; i < this._scene.meshes.length; i++) {
      generator.addShadowCaster(this._scene.meshes[i]);
    }

    this._scene.createDefaultEnvironment({
      enableGroundMirror: true,
      groundShadowLevel: 0.6,
      sizeAuto: true,
      skyboxSize: 300,
      skyboxColor: BABYLON.Color3.Teal()
    });
  }

  async createScene(): Promise<void> {
    // Create a basic BJS Scene object.
    this._scene = new BABYLON.Scene(this._engine);

    // Append model to scene.
    await BABYLON.SceneLoader.AppendAsync("test.obj", "", this._scene);

    // create camera
    this.createCamera();

    // create light
    this.createLights();

    // set environments
    this.setEnvironment();
  }

  doRender(): void {
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  // Create the robotScene using the 'renderCanvas'.
  let robotScene = new RobotScene("renderCanvas");

  // Create the scene.
  await robotScene.createScene();

  // Start render loop.
  robotScene.doRender();
});
