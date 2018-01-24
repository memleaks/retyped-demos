using System;
using Retyped;

using static Retyped.es5;
using static Retyped.dom;
using static Retyped.three;

using Math = Retyped.es5.Math;

namespace ThreeJsDemo
{
    /// <summary>
    /// See the original sample here:
    /// https://threejs.org/examples/#webgl_morphtargets_horse
    /// https://github.com/mrdoob/three.js/blob/da2936540a48774b043a1e617bddbdce5102e417/examples/webgl_morphtargets_horse.html
    /// </summary>
    public class App
    {
        private static HTMLElement container;
        private static PerspectiveCamera camera;
        private static Scene scene;
        private static AnimationMixer mixer;
        private static WebGLRenderer renderer;
        private static double theta;
        private static double radius = 600;
        private static double prevTime;
        private static Vector3 cameraTarget;

        public static void Main()
        {
            Init();
            Animate();
        }

        private static void Init()
        {
            container = document.createElement("div");
            document.body.appendChild(container);

            //
            var height = GetAvailableHeight();
            var width = window.innerWidth;

            camera = new PerspectiveCamera(50, width / height, 1, 10000)
            {
                position = {y = 300}
            };
            cameraTarget = new Vector3(0, 150, 0);

            scene = new Scene
            {
                background = new Color(0xf0f0f0)
            };

            //
            var light = new DirectionalLight(0xefefff, 1.5);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);

            light = new DirectionalLight(0xffefef, 1.5);
            light.position.set(-1, -1, -1).normalize();
            scene.add(light);

            var loader = new JSONLoader();
            loader.load("https://raw.githubusercontent.com/Retyped/Demos/master/ThreeJsDemo/ThreeJsDemo/dist/models/horse.js", (geometry, materials) =>
            {
                var mesh = new Mesh(geometry, new MeshLambertMaterial(new MeshLambertMaterialParameters
                {
                    vertexColors = FaceColors,
                    morphTargets = true
                }));

                mesh.scale.set(1.5, 1.5, 1.5);
                scene.add(mesh);

                mixer = new AnimationMixer(mesh);

                var clip = AnimationClip.CreateFromMorphTargetSequence("gallop", geometry.morphTargets, 30, false);
                mixer.clipAction(clip).setDuration(1).play();
            });
           
            //
            renderer = new WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);
          
            //
            window.addEventListener("resize", e => OnWindowResize(), false);
        }

        private static void OnWindowResize()
        {
            var height = GetAvailableHeight();
            var width = window.innerWidth;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }

        private static void Animate()
        {
            requestAnimationFrame(new Action(Animate).As<FrameRequestCallback>());
            Render();
        }

        private static void Render()
        {
            theta += 0.1;
            camera.position.x = radius * Math.sin(three.Math.degToRad(theta));
            camera.position.z = radius * Math.cos(three.Math.degToRad(theta));

            camera.lookAt(cameraTarget);

            if (mixer != null)
            {
                var time = Date.now();
                mixer.update((time - prevTime) * 0.001);
                prevTime = time;
            }
            renderer.render(scene, camera);
        }

        private static double GetAvailableHeight()
        {
            // Original version:
            var height = window.innerHeight;

            // Adjust height to respect Retyped Ddemos WebSite layout:

            // offsetTop represents height of header (= footer)
            height -= 2 * container.offsetTop; // offsetTop represents height of the header (= height of the footer)

            // Respect the borders:
            height -= 2;

            return height;
        }
    }
}