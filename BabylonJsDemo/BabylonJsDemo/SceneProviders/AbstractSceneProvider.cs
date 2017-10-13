using Retyped;

namespace BabylonJsDemo.SceneProviders
{
    public abstract class AbstractSceneProvider
    {
        public abstract babylon_js.BABYLON.Scene CreateScene(dom.HTMLCanvasElement canvas, babylon_js.BABYLON.Engine engine);
    }
}