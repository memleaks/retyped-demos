using System;
using Bridge;
using BabylonJsDemo.SceneProviders;
using Retyped;
using Retyped.Primitive;
using static Retyped.babylon_js.BABYLON;

namespace BabylonJsDemo
{
    public class App
    {
        private static dom.HTMLCanvasElement _canvas;
        private static Engine _engine;
        private static Scene _scene;
        private static bool _isRun;

        public static void Main()
        {
            // Init canvas:
            _canvas = (dom.HTMLCanvasElement) dom.document.getElementById("renderCanvas");

            // Init engine:
            var canvasOrCtx = _canvas.As<Union<babylon_js.HTMLCanvasElement, babylon_js.WebGLRenderingContext>>();
            _engine = new Engine(canvasOrCtx, true);

            // Init Event handlers:
            InitEventHandlers();

            // Run Scene1 on start:
            SwitchSceneTo(1);
        }

        private static void InitEventHandlers()
        {
            // Resize scene with according to the window size:
            dom.window.addEventListener("resize", e =>
            {
                _engine.resize();
            });

            // Init event handler for buttons switching scenes
            var btns = new[]
            {
                dom.document.getElementById("sample1Btn"),
                dom.document.getElementById("sample2Btn"),
                dom.document.getElementById("sample3Btn")
            };

            for (var i = 0; i < btns.Length; i++)
            {
                var index = i;
                btns[i].onclick = e =>
                {
                    SwitchSceneTo(index + 1);
                    return null;
                };
            }
        }

        public static void SwitchSceneTo(int number)
        {
            if (_isRun)
            {
                _engine.stopRenderLoop();
                _engine.clear(Color4.FromInts(255, 255, 255, 255), true, true);

                _scene.dispose();
                _scene = null;
                _isRun = false;
            }

            var sceneProvider = GetSceneProvider(number);
            _scene = sceneProvider.CreateScene(_canvas, _engine);
            
            _engine.runRenderLoop(() =>
            {
                _scene.render();
            });

            _isRun = true;
        }

        public static AbstractSceneProvider GetSceneProvider(int number)
        {
            switch (number)
            {
                case 1:
                    return new Scene1Provider();

                case 2:
                    return new Scene2Provider();

                case 3:
                    return new Scene3Provider();

                default:
                    throw new ArgumentOutOfRangeException(nameof(number));
            }
        }
    }
}
