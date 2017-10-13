using System;
using Retyped;

using static Retyped.babylon_js.BABYLON;

namespace BabylonJsDemo.SceneProviders
{
    public class Scene2Provider : AbstractSceneProvider
    {
        public override Scene CreateScene(dom.HTMLCanvasElement canvas, Engine engine)
        {
            var scene = new Scene(engine);

            // Setup camera
            var camera = new ArcRotateCamera("Camera", 0, 0, 10, Vector3.Zero(), scene);
            camera.setPosition(new Vector3(-10, 10, 0));
            camera.attachControl(canvas, true);

            // Lights
            var light0 = new PointLight("Omni0", new Vector3(0, 10, 0), scene);
            var light1 = new PointLight("Omni1", new Vector3(0, -10, 0), scene);
            var light2 = new PointLight("Omni2", new Vector3(10, 0, 0), scene);
            var light3 = new DirectionalLight("Dir0", new Vector3(1, -1, 0), scene);

            var material = new StandardMaterial("kosh", scene);
            var sphere = Mesh.CreateSphere("Sphere", 16, 3, scene);

            // Creating light sphere
            var lightSphere0 = Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
            var lightSphere1 = Mesh.CreateSphere("Sphere1", 16, 0.5, scene);
            var lightSphere2 = Mesh.CreateSphere("Sphere2", 16, 0.5, scene);

            var redMaterial = new StandardMaterial("red", scene)
            {
                diffuseColor = new Color3(0, 0, 0),
                specularColor = new Color3(0, 0, 0),
                emissiveColor = new Color3(1, 0, 0)
            };

            var greenMaterial = new StandardMaterial("green", scene)
            {
                diffuseColor = new Color3(0, 0, 0),
                specularColor = new Color3(0, 0, 0),
                emissiveColor = new Color3(0, 1, 0)
            };

            var blueMaterial = new StandardMaterial("blue", scene)
            {
                diffuseColor = new Color3(0, 0, 0),
                specularColor = new Color3(0, 0, 0),
                emissiveColor = new Color3(0, 0, 1)
            };

            lightSphere0.material = redMaterial;
            lightSphere1.material = greenMaterial;
            lightSphere2.material = blueMaterial;

            // Sphere material
            material.diffuseColor = new Color3(1, 1, 1);
            sphere.material = material;

            // Lights colors
            light0.diffuse = new Color3(1, 0, 0);
            light0.specular = new Color3(1, 0, 0);

            light1.diffuse = new Color3(0, 1, 0);
            light1.specular = new Color3(0, 1, 0);

            light2.diffuse = new Color3(0, 0, 1);
            light2.specular = new Color3(0, 0, 1);

            light3.diffuse = new Color3(1, 1, 1);
            light3.specular = new Color3(1, 1, 1);

            // Animations
            var alpha = 0.0;
            scene.beforeRender = () => { 
                light0.position = new Vector3(10 * es5.Math.sin(alpha), 0, 10 * es5.Math.cos(alpha));
                light1.position = new Vector3(10 * es5.Math.sin(alpha), 0, -10 * es5.Math.cos(alpha));
                light2.position = new Vector3(10 * es5.Math.cos(alpha), 0, 10 * es5.Math.sin(alpha));

                lightSphere0.position = light0.position;
                lightSphere1.position = light1.position;
                lightSphere2.position = light2.position;

                alpha += 0.01;
            };

            return scene;
        }
    }
}