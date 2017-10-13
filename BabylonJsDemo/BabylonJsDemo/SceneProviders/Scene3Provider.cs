using System;
using Retyped;

using static Retyped.babylon_js.BABYLON;

namespace BabylonJsDemo.SceneProviders
{
    public class Scene3Provider : AbstractSceneProvider
    {
        public override Scene CreateScene(dom.HTMLCanvasElement canvas, Engine engine)
        {
            var scene = new Scene(engine);

            // Create camera and light
            var light = new PointLight("Point", new Vector3(5, 10, 5), scene);
            var camera = new ArcRotateCamera("Camera", 1, 0.8, 8, new Vector3(0, 0, 0), scene);
            camera.attachControl(canvas, true);

            // Create a sprite manager to optimize GPU ressources
            // Parameters : name, imgUrl, capacity, cellSize, scene
            var spriteManagerTrees = new SpriteManager("treesManager", "https://demos.retyped.com/babylon.js/dist/img/palm.png", 2000, 800, scene);

            //We create 2000 trees at random positions
            for (var i = 0; i < 2000; i++)
            {
                var tree = new Sprite("tree", spriteManagerTrees);
                tree.position.x = es5.Math.random() * 100 - 50;
                tree.position.z = es5.Math.random() * 100 - 50;
                tree.isPickable = true;

                //Some "dead" trees
                if (es5.Math.round(es5.Math.random() * 5) == 0)
                {
                    tree.angle = es5.Math.PI * 90 / 180;
                    tree.position.y = -0.3;
                }
            }

            //Create a manager for the player's sprite animation
            var spriteManagerPlayer = new SpriteManager("playerManager", "https://demos.retyped.com/babylon.js/dist/img/player.png", 2, 64, scene);

            // First animated player
            var player = new Sprite("player", spriteManagerPlayer);
            player.playAnimation(0, 40, true, 100, null);
            player.position.y = -0.3;
            player.size = 0.3;
            player.isPickable = true;

            // Second standing player
            var player2 = new Sprite("player2", spriteManagerPlayer);
            player2.stopAnimation(); // Not animated
            player2.cellIndex = 2; // Going to frame number 2
            player2.position.y = -0.3;
            player2.position.x = 1;
            player2.size = 0.3;
            player2.invertU = -1; //Change orientation
            player2.isPickable = true;

            // Picking
            spriteManagerTrees.isPickable = true;
            spriteManagerPlayer.isPickable = true;

            scene.onPointerDown = (evt, pickInfo) =>
            {
                var pickResult = scene.pickSprite(scene.pointerX, scene.pointerY);
                if (pickResult.hit)
                {
                    pickResult.pickedSprite.angle += 0.5;
                }
            };

            return scene;
        }
    }
}

       