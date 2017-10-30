/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.4.1
 */
Bridge.assembly("BabylonJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("BabylonJsDemo.App", {
        main: function Main () {
            // Init canvas:
            BabylonJsDemo.App._canvas = Bridge.cast(document.getElementById("renderCanvas"), HTMLCanvasElement);

            // Init engine:
            BabylonJsDemo.App._engine = new BABYLON.Engine(BabylonJsDemo.App._canvas, true);

            // Init Event handlers:
            BabylonJsDemo.App.InitEventHandlers();

            // Run Scene1 on start:
            BabylonJsDemo.App.SwitchSceneTo(1);
        },
        statics: {
            fields: {
                _canvas: null,
                _engine: null,
                _scene: null,
                _isRun: false
            },
            methods: {
                InitEventHandlers: function () {
                    // Resize scene with according to the window size:
                    window.addEventListener("resize", function (e) {
                        BabylonJsDemo.App._engine.resize();
                    });

                    // Init event handler for buttons switching scenes
                    var btns = System.Array.init([document.getElementById("sample1Btn"), document.getElementById("sample2Btn"), document.getElementById("sample3Btn")], HTMLElement);

                    for (var i = 0; i < btns.length; i = (i + 1) | 0) {
                        var index = { v : i };
                        btns[System.Array.index(i, btns)].onclick = (function ($me, index) {
                            return function (e) {
                                BabylonJsDemo.App.SwitchSceneTo(((index.v + 1) | 0));
                                return null;
                            };
                        })(this, index);
                    }
                },
                SwitchSceneTo: function (number) {
                    if (BabylonJsDemo.App._isRun) {
                        BabylonJsDemo.App._engine.stopRenderLoop();
                        BabylonJsDemo.App._engine.clear(BABYLON.Color4.FromInts(255, 255, 255, 255), true, true);

                        BabylonJsDemo.App._scene.dispose();
                        BabylonJsDemo.App._scene = null;
                        BabylonJsDemo.App._isRun = false;
                    }

                    var sceneProvider = BabylonJsDemo.App.GetSceneProvider(number);
                    BabylonJsDemo.App._scene = sceneProvider.CreateScene(BabylonJsDemo.App._canvas, BabylonJsDemo.App._engine);

                    BabylonJsDemo.App._engine.runRenderLoop(function () {
                        BabylonJsDemo.App._scene.render();
                    });

                    BabylonJsDemo.App._isRun = true;
                },
                GetSceneProvider: function (number) {
                    switch (number) {
                        case 1: 
                            return new BabylonJsDemo.SceneProviders.Scene1Provider();
                        case 2: 
                            return new BabylonJsDemo.SceneProviders.Scene2Provider();
                        case 3: 
                            return new BabylonJsDemo.SceneProviders.Scene3Provider();
                        default: 
                            throw new System.ArgumentOutOfRangeException("number");
                    }
                }
            }
        }
    });

    Bridge.define("BabylonJsDemo.SceneProviders.AbstractSceneProvider");

    Bridge.define("BabylonJsDemo.SceneProviders.Scene1Provider", {
        inherits: [BabylonJsDemo.SceneProviders.AbstractSceneProvider],
        methods: {
            CreateScene: function (canvas, engine) {
                // This creates a basic Babylon Scene object (non-mesh)
                var scene = new BABYLON.Scene(engine);

                // This creates and positions a free camera (non-mesh)
                var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

                // This targets the camera to scene origin
                camera.setTarget(BABYLON.Vector3.Zero());

                // This attaches the camera to the canvas
                camera.attachControl(canvas, true);

                // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

                // Default intensity is 1. Let's dim the light a small amount
                light.intensity = 0.7;

                // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
                var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

                // Move the sphere upward 1/2 its height
                sphere.position.y = 1;

                // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
                var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

                return scene;
            }
        }
    });

    Bridge.define("BabylonJsDemo.SceneProviders.Scene2Provider", {
        inherits: [BabylonJsDemo.SceneProviders.AbstractSceneProvider],
        methods: {
            CreateScene: function (canvas, engine) {
                var $t;
                var scene = new BABYLON.Scene(engine);

                // Setup camera
                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
                camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
                camera.attachControl(canvas, true);

                // Lights
                var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
                var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, -10, 0), scene);
                var light2 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(10, 0, 0), scene);
                var light3 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);

                var material = new BABYLON.StandardMaterial("kosh", scene);
                var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 3, scene);

                // Creating light sphere
                var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
                var lightSphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 16, 0.5, scene);
                var lightSphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 16, 0.5, scene);

                var redMaterial = ($t = new BABYLON.StandardMaterial("red", scene), $t.diffuseColor = new BABYLON.Color3(0, 0, 0), $t.specularColor = new BABYLON.Color3(0, 0, 0), $t.emissiveColor = new BABYLON.Color3(1, 0, 0), $t);

                var greenMaterial = ($t = new BABYLON.StandardMaterial("green", scene), $t.diffuseColor = new BABYLON.Color3(0, 0, 0), $t.specularColor = new BABYLON.Color3(0, 0, 0), $t.emissiveColor = new BABYLON.Color3(0, 1, 0), $t);

                var blueMaterial = ($t = new BABYLON.StandardMaterial("blue", scene), $t.diffuseColor = new BABYLON.Color3(0, 0, 0), $t.specularColor = new BABYLON.Color3(0, 0, 0), $t.emissiveColor = new BABYLON.Color3(0, 0, 1), $t);

                lightSphere0.material = redMaterial;
                lightSphere1.material = greenMaterial;
                lightSphere2.material = blueMaterial;

                // Sphere material
                material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                sphere.material = material;

                // Lights colors
                light0.diffuse = new BABYLON.Color3(1, 0, 0);
                light0.specular = new BABYLON.Color3(1, 0, 0);

                light1.diffuse = new BABYLON.Color3(0, 1, 0);
                light1.specular = new BABYLON.Color3(0, 1, 0);

                light2.diffuse = new BABYLON.Color3(0, 0, 1);
                light2.specular = new BABYLON.Color3(0, 0, 1);

                light3.diffuse = new BABYLON.Color3(1, 1, 1);
                light3.specular = new BABYLON.Color3(1, 1, 1);

                // Animations
                var alpha = 0.0;
                scene.beforeRender = function () {
                    light0.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, 10 * Math.cos(alpha));
                    light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, -10 * Math.cos(alpha));
                    light2.position = new BABYLON.Vector3(10 * Math.cos(alpha), 0, 10 * Math.sin(alpha));

                    lightSphere0.position = light0.position;
                    lightSphere1.position = light1.position;
                    lightSphere2.position = light2.position;

                    alpha += 0.01;
                };

                return scene;
            }
        }
    });

    Bridge.define("BabylonJsDemo.SceneProviders.Scene3Provider", {
        inherits: [BabylonJsDemo.SceneProviders.AbstractSceneProvider],
        methods: {
            CreateScene: function (canvas, engine) {
                var scene = new BABYLON.Scene(engine);

                // Create camera and light
                var light = new BABYLON.PointLight("Point", new BABYLON.Vector3(5, 10, 5), scene);
                var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 8, new BABYLON.Vector3(0, 0, 0), scene);
                camera.attachControl(canvas, true);

                // Create a sprite manager to optimize GPU ressources
                // Parameters : name, imgUrl, capacity, cellSize, scene
                var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "https://demos.retyped.com/dist/babylon.js/img/palm.png", 2000, Bridge.box(800, System.Int32), scene);

                //We create 2000 trees at random positions
                for (var i = 0; i < 2000; i = (i + 1) | 0) {
                    var tree = new BABYLON.Sprite("tree", spriteManagerTrees);
                    tree.position.x = Math.random() * 100 - 50;
                    tree.position.z = Math.random() * 100 - 50;
                    tree.isPickable = true;

                    //Some "dead" trees
                    if (Math.round(Math.random() * 5) === 0) {
                        tree.angle = Math.PI * 90 / 180;
                        tree.position.y = -0.3;
                    }
                }

                //Create a manager for the player's sprite animation
                var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager", "https://demos.retyped.com/dist/babylon.js/img/player.png", 2, Bridge.box(64, System.Int32), scene);

                // First animated player
                var player = new BABYLON.Sprite("player", spriteManagerPlayer);
                player.playAnimation(0, 40, true, 100, null);
                player.position.y = -0.3;
                player.size = 0.3;
                player.isPickable = true;

                // Second standing player
                var player2 = new BABYLON.Sprite("player2", spriteManagerPlayer);
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

                scene.onPointerDown = function (evt, pickInfo) {
                    var $t;
                    var pickResult = scene.pickSprite(scene.pointerX, scene.pointerY);
                    if (pickResult.hit) {
                        $t = pickResult.pickedSprite;
                        $t.angle += 0.5;
                    }
                };

                return scene;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCYWJ5bG9uSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJTY2VuZVByb3ZpZGVycy9TY2VuZTFQcm92aWRlci5jcyIsIlNjZW5lUHJvdmlkZXJzL1NjZW5lMlByb3ZpZGVyLmNzIiwiU2NlbmVQcm92aWRlcnMvU2NlbmUzUHJvdmlkZXIuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O1lBZ0JZQSw0QkFBVUEsWUFBd0JBOzs7WUFHbENBLDRCQUFVQSxJQUFJQSxlQUFrQ0E7OztZQUdoREE7OztZQUdBQTs7Ozs7Ozs7Ozs7O29CQU1BQSxrQ0FBc0NBLEFBQTZEQTt3QkFFL0ZBOzs7O29CQUlKQSxXQUFXQSxtQkFFUEEsdUNBQ0FBLHVDQUNBQTs7b0JBR0pBLEtBQUtBLFdBQVdBLElBQUlBLGFBQWFBO3dCQUU3QkEsa0JBQVlBO3dCQUNaQSx3QkFBS0EsR0FBTEEsaUJBQWtCQTs7Z0NBRWRBLGdDQUFjQTtnQ0FDZEEsT0FBT0E7Ozs7O3lDQUtjQTtvQkFFN0JBLElBQUlBO3dCQUVBQTt3QkFDQUEsZ0NBQWNBOzt3QkFFZEE7d0JBQ0FBLDJCQUFTQTt3QkFDVEE7OztvQkFHSkEsb0JBQW9CQSxtQ0FBaUJBO29CQUNyQ0EsMkJBQVNBLDBCQUEwQkEsMkJBQVNBOztvQkFFNUNBLHdDQUFzQkEsQUFBd0JBO3dCQUUxQ0E7OztvQkFHSkE7OzRDQUdpREE7b0JBRWpEQSxRQUFRQTt3QkFFSkE7NEJBQ0lBLE9BQU9BLElBQUlBO3dCQUVmQTs0QkFDSUEsT0FBT0EsSUFBSUE7d0JBRWZBOzRCQUNJQSxPQUFPQSxJQUFJQTt3QkFFZkE7NEJBQ0lBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7Ozs7bUNDckZ1Q0EsUUFBOEJBOztnQkFHdkZBLFlBQVlBLElBQUlBLGNBQWlDQTs7O2dCQUdqREEsYUFBYUEsSUFBSUEsOEJBQWlEQSxJQUFJQSxzQkFBeUNBLE1BQU1BOzs7Z0JBR3JIQSxpQkFBaUJBOzs7Z0JBR2pCQSxxQkFBcUJBOzs7Z0JBR3JCQSxZQUFZQSxJQUFJQSxtQ0FBc0RBLElBQUlBLDBCQUE2Q0E7OztnQkFHdkhBOzs7Z0JBR0FBLGFBQWFBLDRDQUErREE7OztnQkFHNUVBOzs7Z0JBR0FBLGFBQWFBLDhDQUFpRUE7O2dCQUU5RUEsT0FBT0E7Ozs7Ozs7O21DQzdCa0RBLFFBQThCQTs7Z0JBRXZGQSxZQUFZQSxJQUFJQSxjQUFpQ0E7OztnQkFHakRBLGFBQWFBLElBQUlBLDRDQUErREEsd0JBQTJDQTtnQkFDM0hBLG1CQUFtQkEsSUFBSUEsZ0JBQW1DQTtnQkFDMURBLHFCQUFxQkE7OztnQkFHckJBLGFBQWFBLElBQUlBLDRCQUErQ0EsSUFBSUEsMkJBQThDQTtnQkFDbEhBLGFBQWFBLElBQUlBLDRCQUErQ0EsSUFBSUEsbUJBQXNDQSxTQUFTQTtnQkFDbkhBLGFBQWFBLElBQUlBLDRCQUErQ0EsSUFBSUEsMkJBQThDQTtnQkFDbEhBLGFBQWFBLElBQUlBLGlDQUFvREEsSUFBSUEsbUJBQXNDQSxRQUFRQTs7Z0JBRXZIQSxlQUFlQSxJQUFJQSxpQ0FBb0RBO2dCQUN2RUEsYUFBYUEsMkNBQThEQTs7O2dCQUczRUEsbUJBQW1CQSw4Q0FBaUVBO2dCQUNwRkEsbUJBQW1CQSw4Q0FBaUVBO2dCQUNwRkEsbUJBQW1CQSw4Q0FBaUVBOztnQkFFcEZBLGtCQUFrQkEsVUFBSUEsZ0NBQW1EQSwwQkFFdERBLElBQUlBLDRDQUNIQSxJQUFJQSw0Q0FDSkEsSUFBSUE7O2dCQUd4QkEsb0JBQW9CQSxVQUFJQSxrQ0FBcURBLDBCQUUxREEsSUFBSUEsNENBQ0hBLElBQUlBLDRDQUNKQSxJQUFJQTs7Z0JBR3hCQSxtQkFBbUJBLFVBQUlBLGlDQUFvREEsMEJBRXhEQSxJQUFJQSw0Q0FDSEEsSUFBSUEsNENBQ0pBLElBQUlBOztnQkFHeEJBLHdCQUF3QkE7Z0JBQ3hCQSx3QkFBd0JBO2dCQUN4QkEsd0JBQXdCQTs7O2dCQUd4QkEsd0JBQXdCQSxJQUFJQTtnQkFDNUJBLGtCQUFrQkE7OztnQkFHbEJBLGlCQUFpQkEsSUFBSUE7Z0JBQ3JCQSxrQkFBa0JBLElBQUlBOztnQkFFdEJBLGlCQUFpQkEsSUFBSUE7Z0JBQ3JCQSxrQkFBa0JBLElBQUlBOztnQkFFdEJBLGlCQUFpQkEsSUFBSUE7Z0JBQ3JCQSxrQkFBa0JBLElBQUlBOztnQkFFdEJBLGlCQUFpQkEsSUFBSUE7Z0JBQ3JCQSxrQkFBa0JBLElBQUlBOzs7Z0JBR3RCQTtnQkFDQUEscUJBQXFCQTtvQkFDakJBLGtCQUFrQkEsSUFBSUEsZ0JBQW1DQSxLQUFLQSxTQUFhQSxXQUFXQSxLQUFLQSxTQUFhQTtvQkFDeEdBLGtCQUFrQkEsSUFBSUEsZ0JBQW1DQSxLQUFLQSxTQUFhQSxXQUFXQSxNQUFNQSxTQUFhQTtvQkFDekdBLGtCQUFrQkEsSUFBSUEsZ0JBQW1DQSxLQUFLQSxTQUFhQSxXQUFXQSxLQUFLQSxTQUFhQTs7b0JBRXhHQSx3QkFBd0JBO29CQUN4QkEsd0JBQXdCQTtvQkFDeEJBLHdCQUF3QkE7O29CQUV4QkE7OztnQkFHSkEsT0FBT0E7Ozs7Ozs7O21DQy9Fa0RBLFFBQThCQTtnQkFFdkZBLFlBQVlBLElBQUlBLGNBQWlDQTs7O2dCQUdqREEsWUFBWUEsSUFBSUEsNEJBQStDQSxJQUFJQSwyQkFBOENBO2dCQUNqSEEsYUFBYUEsSUFBSUEsNkNBQWdFQSxJQUFJQSwwQkFBNkNBO2dCQUNsSUEscUJBQXFCQTs7OztnQkFJckJBLHlCQUF5QkEsSUFBSUEscUlBQThIQTs7O2dCQUczSkEsS0FBS0EsV0FBV0EsVUFBVUE7b0JBRXRCQSxXQUFXQSxJQUFJQSx1QkFBMENBO29CQUN6REEsa0JBQWtCQTtvQkFDbEJBLGtCQUFrQkE7b0JBQ2xCQTs7O29CQUdBQSxJQUFJQSxXQUFlQTt3QkFFZkEsYUFBYUE7d0JBQ2JBLGtCQUFrQkE7Ozs7O2dCQUsxQkEsMEJBQTBCQSxJQUFJQSxvSUFBNkhBOzs7Z0JBRzNKQSxhQUFhQSxJQUFJQSx5QkFBNENBO2dCQUM3REEsdUNBQXVDQSxBQUF1QkE7Z0JBQzlEQSxvQkFBb0JBO2dCQUNwQkE7Z0JBQ0FBOzs7Z0JBR0FBLGNBQWNBLElBQUlBLDBCQUE2Q0E7Z0JBQy9EQTtnQkFDQUE7Z0JBQ0FBLHFCQUFxQkE7Z0JBQ3JCQTtnQkFDQUE7Z0JBQ0FBLGtCQUFrQkE7Z0JBQ2xCQTs7O2dCQUdBQTtnQkFDQUE7O2dCQUVBQSxzQkFBc0JBLFVBQUNBLEtBQUtBOztvQkFFeEJBLGlCQUFpQkEsaUJBQWlCQSxnQkFBZ0JBO29CQUNsREEsSUFBSUE7d0JBRUFBOzs7OztnQkFJUkEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJhYnlsb25Kc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvbS5IVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkVuZ2luZSBfZW5naW5lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lIF9zY2VuZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIF9pc1J1bjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSW5pdCBjYW52YXM6XHJcbiAgICAgICAgICAgIF9jYW52YXMgPSAoZG9tLkhUTUxDYW52YXNFbGVtZW50KSBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0IGVuZ2luZTpcclxuICAgICAgICAgICAgX2VuZ2luZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUoX2NhbnZhcy5BczxiYWJ5bG9uX2pzLkhUTUxDYW52YXNFbGVtZW50PigpLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgRXZlbnQgaGFuZGxlcnM6XHJcbiAgICAgICAgICAgIEluaXRFdmVudEhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gU2NlbmUxIG9uIHN0YXJ0OlxyXG4gICAgICAgICAgICBTd2l0Y2hTY2VuZVRvKDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0RXZlbnRIYW5kbGVycygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBSZXNpemUgc2NlbmUgd2l0aCBhY2NvcmRpbmcgdG8gdGhlIHdpbmRvdyBzaXplOlxyXG4gICAgICAgICAgICBkb20ud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZG9tLkV2ZW50LkludGVyZmFjZT4pKGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2VuZ2luZS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdCBldmVudCBoYW5kbGVyIGZvciBidXR0b25zIHN3aXRjaGluZyBzY2VuZXNcclxuICAgICAgICAgICAgdmFyIGJ0bnMgPSBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYW1wbGUxQnRuXCIpLFxyXG4gICAgICAgICAgICAgICAgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2FtcGxlMkJ0blwiKSxcclxuICAgICAgICAgICAgICAgIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhbXBsZTNCdG5cIilcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnRucy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJ0bnNbaV0ub25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTd2l0Y2hTY2VuZVRvKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3dpdGNoU2NlbmVUbyhpbnQgbnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9pc1J1bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2VuZ2luZS5zdG9wUmVuZGVyTG9vcCgpO1xyXG4gICAgICAgICAgICAgICAgX2VuZ2luZS5jbGVhcihSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjQuRnJvbUludHMoMjU1LCAyNTUsIDI1NSwgMjU1KSwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3NjZW5lLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIF9zY2VuZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBfaXNSdW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNjZW5lUHJvdmlkZXIgPSBHZXRTY2VuZVByb3ZpZGVyKG51bWJlcik7XHJcbiAgICAgICAgICAgIF9zY2VuZSA9IHNjZW5lUHJvdmlkZXIuQ3JlYXRlU2NlbmUoX2NhbnZhcywgX2VuZ2luZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfZW5naW5lLnJ1blJlbmRlckxvb3AoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3NjZW5lLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBfaXNSdW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBBYnN0cmFjdFNjZW5lUHJvdmlkZXIgR2V0U2NlbmVQcm92aWRlcihpbnQgbnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChudW1iZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNjZW5lMVByb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2NlbmUyUHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2VuZTNQcm92aWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcIm51bWJlclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQmFieWxvbkpzRGVtby5TY2VuZVByb3ZpZGVyc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2NlbmUxUHJvdmlkZXIgOiBBYnN0cmFjdFNjZW5lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUgQ3JlYXRlU2NlbmUoZG9tLkhUTUxDYW52YXNFbGVtZW50IGNhbnZhcywgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRW5naW5lIGVuZ2luZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhIGJhc2ljIEJhYnlsb24gU2NlbmUgb2JqZWN0IChub24tbWVzaClcclxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lKGVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhIGZyZWUgY2FtZXJhIChub24tbWVzaClcclxuICAgICAgICAgICAgdmFyIGNhbWVyYSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5GcmVlQ2FtZXJhKFwiY2FtZXJhMVwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCA1LCAtMTApLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cclxuICAgICAgICAgICAgY2FtZXJhLnNldFRhcmdldChSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzLlplcm8oKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGF0dGFjaGVzIHRoZSBjYW1lcmEgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGEgbGlnaHQsIGFpbWluZyAwLDEsMCAtIHRvIHRoZSBza3kgKG5vbi1tZXNoKVxyXG4gICAgICAgICAgICB2YXIgbGlnaHQgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCAxLCAwKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGVmYXVsdCBpbnRlbnNpdHkgaXMgMS4gTGV0J3MgZGltIHRoZSBsaWdodCBhIHNtYWxsIGFtb3VudFxyXG4gICAgICAgICAgICBsaWdodC5pbnRlbnNpdHkgPSAwLjc7XHJcblxyXG4gICAgICAgICAgICAvLyBPdXIgYnVpbHQtaW4gJ3NwaGVyZScgc2hhcGUuIFBhcmFtczogbmFtZSwgc3ViZGl2cywgc2l6ZSwgc2NlbmVcclxuICAgICAgICAgICAgdmFyIHNwaGVyZSA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwic3BoZXJlMVwiLCAxNiwgMiwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0aGUgc3BoZXJlIHVwd2FyZCAxLzIgaXRzIGhlaWdodFxyXG4gICAgICAgICAgICBzcGhlcmUucG9zaXRpb24ueSA9IDE7XHJcblxyXG4gICAgICAgICAgICAvLyBPdXIgYnVpbHQtaW4gJ2dyb3VuZCcgc2hhcGUuIFBhcmFtczogbmFtZSwgd2lkdGgsIGRlcHRoLCBzdWJkaXZzLCBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVHcm91bmQoXCJncm91bmQxXCIsIDYsIDYsIDIsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzY2VuZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQmFieWxvbkpzRGVtby5TY2VuZVByb3ZpZGVyc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2NlbmUyUHJvdmlkZXIgOiBBYnN0cmFjdFNjZW5lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUgQ3JlYXRlU2NlbmUoZG9tLkhUTUxDYW52YXNFbGVtZW50IGNhbnZhcywgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRW5naW5lIGVuZ2luZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZShlbmdpbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgY2FtZXJhXHJcbiAgICAgICAgICAgIHZhciBjYW1lcmEgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIDAsIDAsIDEwLCBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICBjYW1lcmEuc2V0UG9zaXRpb24obmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoLTEwLCAxMCwgMCkpO1xyXG4gICAgICAgICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGlnaHRzXHJcbiAgICAgICAgICAgIHZhciBsaWdodDAgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIk9tbmkwXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIDEwLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQxID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlBvaW50TGlnaHQoXCJPbW5pMVwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCAtMTAsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodDIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIk9tbmkyXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEwLCAwLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQzID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJEaXIwXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEsIC0xLCAwKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJrb3NoXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIHNwaGVyZSA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwiU3BoZXJlXCIsIDE2LCAzLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBsaWdodCBzcGhlcmVcclxuICAgICAgICAgICAgdmFyIGxpZ2h0U3BoZXJlMCA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwiU3BoZXJlMFwiLCAxNiwgMC41LCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodFNwaGVyZTEgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcIlNwaGVyZTFcIiwgMTYsIDAuNSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHRTcGhlcmUyID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoXCJTcGhlcmUyXCIsIDE2LCAwLjUsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWRNYXRlcmlhbCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmVkXCIsIHNjZW5lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAwLCAwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyZWVuTWF0ZXJpYWwgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImdyZWVuXCIsIHNjZW5lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAxLCAwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsdWVNYXRlcmlhbCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiYmx1ZVwiLCBzY2VuZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIHNwZWN1bGFyQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMSlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0U3BoZXJlMC5tYXRlcmlhbCA9IHJlZE1hdGVyaWFsO1xyXG4gICAgICAgICAgICBsaWdodFNwaGVyZTEubWF0ZXJpYWwgPSBncmVlbk1hdGVyaWFsO1xyXG4gICAgICAgICAgICBsaWdodFNwaGVyZTIubWF0ZXJpYWwgPSBibHVlTWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGhlcmUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcclxuICAgICAgICAgICAgc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAvLyBMaWdodHMgY29sb3JzXHJcbiAgICAgICAgICAgIGxpZ2h0MC5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAwLCAwKTtcclxuICAgICAgICAgICAgbGlnaHQwLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAwLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0MS5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgbGlnaHQxLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAxLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0Mi5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAxKTtcclxuICAgICAgICAgICAgbGlnaHQyLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0My5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcclxuICAgICAgICAgICAgbGlnaHQzLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbnNcclxuICAgICAgICAgICAgdmFyIGFscGhhID0gMC4wO1xyXG4gICAgICAgICAgICBzY2VuZS5iZWZvcmVSZW5kZXIgPSAoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgbGlnaHQwLnBvc2l0aW9uID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMTAgKiBlczUuTWF0aC5zaW4oYWxwaGEpLCAwLCAxMCAqIGVzNS5NYXRoLmNvcyhhbHBoYSkpO1xyXG4gICAgICAgICAgICAgICAgbGlnaHQxLnBvc2l0aW9uID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMTAgKiBlczUuTWF0aC5zaW4oYWxwaGEpLCAwLCAtMTAgKiBlczUuTWF0aC5jb3MoYWxwaGEpKTtcclxuICAgICAgICAgICAgICAgIGxpZ2h0Mi5wb3NpdGlvbiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEwICogZXM1Lk1hdGguY29zKGFscGhhKSwgMCwgMTAgKiBlczUuTWF0aC5zaW4oYWxwaGEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaWdodFNwaGVyZTAucG9zaXRpb24gPSBsaWdodDAucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBsaWdodFNwaGVyZTEucG9zaXRpb24gPSBsaWdodDEucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBsaWdodFNwaGVyZTIucG9zaXRpb24gPSBsaWdodDIucG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgYWxwaGEgKz0gMC4wMTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzY2VuZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQmFieWxvbkpzRGVtby5TY2VuZVByb3ZpZGVyc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2NlbmUzUHJvdmlkZXIgOiBBYnN0cmFjdFNjZW5lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUgQ3JlYXRlU2NlbmUoZG9tLkhUTUxDYW52YXNFbGVtZW50IGNhbnZhcywgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRW5naW5lIGVuZ2luZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZShlbmdpbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNhbWVyYSBhbmQgbGlnaHRcclxuICAgICAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlBvaW50TGlnaHQoXCJQb2ludFwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMyg1LCAxMCwgNSksIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIGNhbWVyYSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5BcmNSb3RhdGVDYW1lcmEoXCJDYW1lcmFcIiwgMSwgMC44LCA4LCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCAwLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc3ByaXRlIG1hbmFnZXIgdG8gb3B0aW1pemUgR1BVIHJlc3NvdXJjZXNcclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVycyA6IG5hbWUsIGltZ1VybCwgY2FwYWNpdHksIGNlbGxTaXplLCBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgc3ByaXRlTWFuYWdlclRyZWVzID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZU1hbmFnZXIoXCJ0cmVlc01hbmFnZXJcIiwgXCJodHRwczovL2RlbW9zLnJldHlwZWQuY29tL2Rpc3QvYmFieWxvbi5qcy9pbWcvcGFsbS5wbmdcIiwgMjAwMCwgODAwLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvL1dlIGNyZWF0ZSAyMDAwIHRyZWVzIGF0IHJhbmRvbSBwb3NpdGlvbnNcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyMDAwOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0cmVlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZShcInRyZWVcIiwgc3ByaXRlTWFuYWdlclRyZWVzKTtcclxuICAgICAgICAgICAgICAgIHRyZWUucG9zaXRpb24ueCA9IGVzNS5NYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XHJcbiAgICAgICAgICAgICAgICB0cmVlLnBvc2l0aW9uLnogPSBlczUuTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xyXG4gICAgICAgICAgICAgICAgdHJlZS5pc1BpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1NvbWUgXCJkZWFkXCIgdHJlZXNcclxuICAgICAgICAgICAgICAgIGlmIChlczUuTWF0aC5yb3VuZChlczUuTWF0aC5yYW5kb20oKSAqIDUpID09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5hbmdsZSA9IGVzNS5NYXRoLlBJICogOTAgLyAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5wb3NpdGlvbi55ID0gLTAuMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9DcmVhdGUgYSBtYW5hZ2VyIGZvciB0aGUgcGxheWVyJ3Mgc3ByaXRlIGFuaW1hdGlvblxyXG4gICAgICAgICAgICB2YXIgc3ByaXRlTWFuYWdlclBsYXllciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKFwicGxheWVyTWFuYWdlclwiLCBcImh0dHBzOi8vZGVtb3MucmV0eXBlZC5jb20vZGlzdC9iYWJ5bG9uLmpzL2ltZy9wbGF5ZXIucG5nXCIsIDIsIDY0LCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXJzdCBhbmltYXRlZCBwbGF5ZXJcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGUoXCJwbGF5ZXJcIiwgc3ByaXRlTWFuYWdlclBsYXllcik7XHJcbiAgICAgICAgICAgIHBsYXllci5wbGF5QW5pbWF0aW9uKDAsIDQwLCB0cnVlLCAxMDAsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pbnVsbCk7XHJcbiAgICAgICAgICAgIHBsYXllci5wb3NpdGlvbi55ID0gLTAuMztcclxuICAgICAgICAgICAgcGxheWVyLnNpemUgPSAwLjM7XHJcbiAgICAgICAgICAgIHBsYXllci5pc1BpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNlY29uZCBzdGFuZGluZyBwbGF5ZXJcclxuICAgICAgICAgICAgdmFyIHBsYXllcjIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlKFwicGxheWVyMlwiLCBzcHJpdGVNYW5hZ2VyUGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyMi5zdG9wQW5pbWF0aW9uKCk7IC8vIE5vdCBhbmltYXRlZFxyXG4gICAgICAgICAgICBwbGF5ZXIyLmNlbGxJbmRleCA9IDI7IC8vIEdvaW5nIHRvIGZyYW1lIG51bWJlciAyXHJcbiAgICAgICAgICAgIHBsYXllcjIucG9zaXRpb24ueSA9IC0wLjM7XHJcbiAgICAgICAgICAgIHBsYXllcjIucG9zaXRpb24ueCA9IDE7XHJcbiAgICAgICAgICAgIHBsYXllcjIuc2l6ZSA9IDAuMztcclxuICAgICAgICAgICAgcGxheWVyMi5pbnZlcnRVID0gLTE7IC8vQ2hhbmdlIG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgIHBsYXllcjIuaXNQaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBQaWNraW5nXHJcbiAgICAgICAgICAgIHNwcml0ZU1hbmFnZXJUcmVlcy5pc1BpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3ByaXRlTWFuYWdlclBsYXllci5pc1BpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHNjZW5lLm9uUG9pbnRlckRvd24gPSAoZXZ0LCBwaWNrSW5mbykgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBpY2tSZXN1bHQgPSBzY2VuZS5waWNrU3ByaXRlKHNjZW5lLnBvaW50ZXJYLCBzY2VuZS5wb2ludGVyWSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGlja1Jlc3VsdC5oaXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlja1Jlc3VsdC5waWNrZWRTcHJpdGUuYW5nbGUgKz0gMC41O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuICAgICAgICJdCn0K
