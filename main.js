///<reference path="babylon.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var RobotScene = /** @class */ (function () {
    function RobotScene(canvasElement) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    RobotScene.prototype.createCamera = function () {
        // Parameters: alpha, beta, radius, target position, scene
        this._camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
        // Positions the camera overwriting alpha, beta, radius
        this._camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        // This attaches the camera to the canvas
        this._camera.attachControl(this._canvas, true);
    };
    RobotScene.prototype.createLights = function () {
        this._sphere_light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._direction_light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-2, -3, 1), this._scene);
        this._direction_light.position = new BABYLON.Vector3(6, 9, 3);
    };
    RobotScene.prototype.setEnvironment = function () {
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
    };
    RobotScene.prototype.createScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Create a basic BJS Scene object.
                        this._scene = new BABYLON.Scene(this._engine);
                        // Append model to scene.
                        return [4 /*yield*/, BABYLON.SceneLoader.AppendAsync("test.obj", "", this._scene)];
                    case 1:
                        // Append model to scene.
                        _a.sent();
                        // create camera
                        this.createCamera();
                        // create light
                        this.createLights();
                        // set environments
                        this.setEnvironment();
                        return [2 /*return*/];
                }
            });
        });
    };
    RobotScene.prototype.doRender = function () {
        var _this = this;
        // Run the render loop.
        this._engine.runRenderLoop(function () {
            _this._scene.render();
        });
        // The canvas/window resize event handler.
        window.addEventListener("resize", function () {
            _this._engine.resize();
        });
    };
    return RobotScene;
}());
window.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var robotScene;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                robotScene = new RobotScene("renderCanvas");
                // Create the scene.
                return [4 /*yield*/, robotScene.createScene()];
            case 1:
                // Create the scene.
                _a.sent();
                // Start render loop.
                robotScene.doRender();
                return [2 /*return*/];
        }
    });
}); });
