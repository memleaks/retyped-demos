using Retyped;

using static Retyped.babylon_js.BABYLON;

namespace BabylonJsDemo.SceneProviders
{
    /// <summary>
    /// Original sources: http://www.babylonjs-playground.com/#12S23Y
    /// </summary>
    public class Scene1Provider : AbstractSceneProvider
    {
        public override Scene CreateScene(dom.HTMLCanvasElement canvas, Engine engine)
        {
            // This creates a basic Babylon Scene object (non-mesh)
            var scene = new Scene(engine);

            // This creates and positions a free camera (non-mesh)
            var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

            // This targets the camera to scene origin
            camera.setTarget(Vector3.Zero());

            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);

            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;

            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
            var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

            // Move the sphere upward 1/2 its height
            sphere.position.y = 1;

            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
            var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

            return scene;
        }
    }
}