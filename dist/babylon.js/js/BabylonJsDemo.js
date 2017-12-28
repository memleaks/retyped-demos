/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCYWJ5bG9uSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJTY2VuZVByb3ZpZGVycy9TY2VuZTFQcm92aWRlci5jcyIsIlNjZW5lUHJvdmlkZXJzL1NjZW5lMlByb3ZpZGVyLmNzIiwiU2NlbmVQcm92aWRlcnMvU2NlbmUzUHJvdmlkZXIuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O1lBZ0JZQSw0QkFBVUEsWUFBd0JBOzs7WUFHbENBLDRCQUFVQSxJQUFJQSxlQUFrQ0E7OztZQUdoREE7OztZQUdBQTs7Ozs7Ozs7Ozs7O29CQU1BQSxrQ0FBc0NBLEFBQW1EQTt3QkFFckZBOzs7O29CQUlKQSxXQUFXQSxtQkFFUEEsdUNBQ0FBLHVDQUNBQTs7b0JBR0pBLEtBQUtBLFdBQVdBLElBQUlBLGFBQWFBO3dCQUU3QkEsa0JBQVlBO3dCQUNaQSx3QkFBS0EsR0FBTEEsaUJBQWtCQTs7Z0NBRWRBLGdDQUFjQTtnQ0FDZEEsT0FBT0E7Ozs7O3lDQUtjQTtvQkFFN0JBLElBQUlBO3dCQUVBQTt3QkFDQUEsZ0NBQWNBOzt3QkFFZEE7d0JBQ0FBLDJCQUFTQTt3QkFDVEE7OztvQkFHSkEsb0JBQW9CQSxtQ0FBaUJBO29CQUNyQ0EsMkJBQVNBLDBCQUEwQkEsMkJBQVNBOztvQkFFNUNBLHdDQUFzQkEsQUFBd0JBO3dCQUUxQ0E7OztvQkFHSkE7OzRDQUdpREE7b0JBRWpEQSxRQUFRQTt3QkFFSkE7NEJBQ0lBLE9BQU9BLElBQUlBO3dCQUVmQTs0QkFDSUEsT0FBT0EsSUFBSUE7d0JBRWZBOzRCQUNJQSxPQUFPQSxJQUFJQTt3QkFFZkE7NEJBQ0lBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7Ozs7bUNDckZ1Q0EsUUFBOEJBOztnQkFHdkZBLFlBQVlBLElBQUlBLGNBQWlDQTs7O2dCQUdqREEsYUFBYUEsSUFBSUEsOEJBQWlEQSxJQUFJQSxzQkFBeUNBLE1BQU1BOzs7Z0JBR3JI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Q0FBOzs7Z0JBR0FBLGNBQWNBLElBQUlBLDBCQUE2Q0E7Z0JBQy9EQTtnQkFDQUE7Z0JBQ0FBLHFCQUFxQkE7Z0JBQ3JCQTtnQkFDQUE7Z0JBQ0FBLGtCQUFrQkE7Z0JBQ2xCQTs7O2dCQUdBQTtnQkFDQUE7O2dCQUVBQSxzQkFBc0JBLFVBQUNBLEtBQUtBOztvQkFFeEJBLGlCQUFpQkEsaUJBQWlCQSxnQkFBZ0JBO29CQUNsREEsSUFBSUE7d0JBRUFBOzs7OztnQkFJUkEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJhYnlsb25Kc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvbS5IVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkVuZ2luZSBfZW5naW5lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lIF9zY2VuZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIF9pc1J1bjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSW5pdCBjYW52YXM6XHJcbiAgICAgICAgICAgIF9jYW52YXMgPSAoZG9tLkhUTUxDYW52YXNFbGVtZW50KSBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0IGVuZ2luZTpcclxuICAgICAgICAgICAgX2VuZ2luZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUoX2NhbnZhcy5BczxiYWJ5bG9uX2pzLkhUTUxDYW52YXNFbGVtZW50PigpLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgRXZlbnQgaGFuZGxlcnM6XHJcbiAgICAgICAgICAgIEluaXRFdmVudEhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gU2NlbmUxIG9uIHN0YXJ0OlxyXG4gICAgICAgICAgICBTd2l0Y2hTY2VuZVRvKDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0RXZlbnRIYW5kbGVycygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBSZXNpemUgc2NlbmUgd2l0aCBhY2NvcmRpbmcgdG8gdGhlIHdpbmRvdyBzaXplOlxyXG4gICAgICAgICAgICBkb20ud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZG9tLkV2ZW50PikoZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZW5naW5lLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0IGV2ZW50IGhhbmRsZXIgZm9yIGJ1dHRvbnMgc3dpdGNoaW5nIHNjZW5lc1xyXG4gICAgICAgICAgICB2YXIgYnRucyA9IG5ld1tdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhbXBsZTFCdG5cIiksXHJcbiAgICAgICAgICAgICAgICBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYW1wbGUyQnRuXCIpLFxyXG4gICAgICAgICAgICAgICAgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2FtcGxlM0J0blwiKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidG5zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnRuc1tpXS5vbmNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFN3aXRjaFNjZW5lVG8oaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTd2l0Y2hTY2VuZVRvKGludCBudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX2lzUnVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZW5naW5lLnN0b3BSZW5kZXJMb29wKCk7XHJcbiAgICAgICAgICAgICAgICBfZW5naW5lLmNsZWFyKFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yNC5Gcm9tSW50cygyNTUsIDI1NSwgMjU1LCAyNTUpLCB0cnVlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfc2NlbmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgX3NjZW5lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIF9pc1J1biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NlbmVQcm92aWRlciA9IEdldFNjZW5lUHJvdmlkZXIobnVtYmVyKTtcclxuICAgICAgICAgICAgX3NjZW5lID0gc2NlbmVQcm92aWRlci5DcmVhdGVTY2VuZShfY2FudmFzLCBfZW5naW5lKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9lbmdpbmUucnVuUmVuZGVyTG9vcCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc2NlbmUucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIF9pc1J1biA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEFic3RyYWN0U2NlbmVQcm92aWRlciBHZXRTY2VuZVByb3ZpZGVyKGludCBudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG51bWJlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2NlbmUxUHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2VuZTJQcm92aWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNjZW5lM1Byb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwibnVtYmVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTY2VuZTFQcm92aWRlciA6IEFic3RyYWN0U2NlbmVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZSBDcmVhdGVTY2VuZShkb20uSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzLCBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUgZW5naW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGEgYmFzaWMgQmFieWxvbiBTY2VuZSBvYmplY3QgKG5vbi1tZXNoKVxyXG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUoZW5naW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhbmQgcG9zaXRpb25zIGEgZnJlZSBjYW1lcmEgKG5vbi1tZXNoKVxyXG4gICAgICAgICAgICB2YXIgY2FtZXJhID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkZyZWVDYW1lcmEoXCJjYW1lcmExXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIDUsIC0xMCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgdGFyZ2V0cyB0aGUgY2FtZXJhIHRvIHNjZW5lIG9yaWdpblxyXG4gICAgICAgICAgICBjYW1lcmEuc2V0VGFyZ2V0KFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMuWmVybygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYXR0YWNoZXMgdGhlIGNhbWVyYSB0byB0aGUgY2FudmFzXHJcbiAgICAgICAgICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYSBsaWdodCwgYWltaW5nIDAsMSwwIC0gdG8gdGhlIHNreSAobm9uLW1lc2gpXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFwibGlnaHQxXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIDEsIDApLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEZWZhdWx0IGludGVuc2l0eSBpcyAxLiBMZXQncyBkaW0gdGhlIGxpZ2h0IGEgc21hbGwgYW1vdW50XHJcbiAgICAgICAgICAgIGxpZ2h0LmludGVuc2l0eSA9IDAuNztcclxuXHJcbiAgICAgICAgICAgIC8vIE91ciBidWlsdC1pbiAnc3BoZXJlJyBzaGFwZS4gUGFyYW1zOiBuYW1lLCBzdWJkaXZzLCBzaXplLCBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgc3BoZXJlID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoXCJzcGhlcmUxXCIsIDE2LCAyLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBNb3ZlIHRoZSBzcGhlcmUgdXB3YXJkIDEvMiBpdHMgaGVpZ2h0XHJcbiAgICAgICAgICAgIHNwaGVyZS5wb3NpdGlvbi55ID0gMTtcclxuXHJcbiAgICAgICAgICAgIC8vIE91ciBidWlsdC1pbiAnZ3JvdW5kJyBzaGFwZS4gUGFyYW1zOiBuYW1lLCB3aWR0aCwgZGVwdGgsIHN1YmRpdnMsIHNjZW5lXHJcbiAgICAgICAgICAgIHZhciBncm91bmQgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZUdyb3VuZChcImdyb3VuZDFcIiwgNiwgNiwgMiwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTY2VuZTJQcm92aWRlciA6IEFic3RyYWN0U2NlbmVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZSBDcmVhdGVTY2VuZShkb20uSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzLCBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUgZW5naW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lKGVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCBjYW1lcmFcclxuICAgICAgICAgICAgdmFyIGNhbWVyYSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5BcmNSb3RhdGVDYW1lcmEoXCJDYW1lcmFcIiwgMCwgMCwgMTAsIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMuWmVybygpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5zZXRQb3NpdGlvbihuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygtMTAsIDEwLCAwKSk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBMaWdodHNcclxuICAgICAgICAgICAgdmFyIGxpZ2h0MCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Qb2ludExpZ2h0KFwiT21uaTBcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMCwgMTAsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodDEgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIk9tbmkxXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIC0xMCwgMCksIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0MiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Qb2ludExpZ2h0KFwiT21uaTJcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMTAsIDAsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodDMgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcIkRpcjBcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMSwgLTEsIDApLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF0ZXJpYWwgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImtvc2hcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgc3BoZXJlID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoXCJTcGhlcmVcIiwgMTYsIDMsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0aW5nIGxpZ2h0IHNwaGVyZVxyXG4gICAgICAgICAgICB2YXIgbGlnaHRTcGhlcmUwID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoXCJTcGhlcmUwXCIsIDE2LCAwLjUsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0U3BoZXJlMSA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwiU3BoZXJlMVwiLCAxNiwgMC41LCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodFNwaGVyZTIgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcIlNwaGVyZTJcIiwgMTYsIDAuNSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlZE1hdGVyaWFsID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJyZWRcIiwgc2NlbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2VDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBzcGVjdWxhckNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDEsIDAsIDApXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZ3JlZW5NYXRlcmlhbCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JlZW5cIiwgc2NlbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2VDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBzcGVjdWxhckNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDEsIDApXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgYmx1ZU1hdGVyaWFsID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJibHVlXCIsIHNjZW5lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAxKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGlnaHRTcGhlcmUwLm1hdGVyaWFsID0gcmVkTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgIGxpZ2h0U3BoZXJlMS5tYXRlcmlhbCA9IGdyZWVuTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgIGxpZ2h0U3BoZXJlMi5tYXRlcmlhbCA9IGJsdWVNYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFNwaGVyZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICBzcGhlcmUubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgIC8vIExpZ2h0cyBjb2xvcnNcclxuICAgICAgICAgICAgbGlnaHQwLmRpZmZ1c2UgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDEsIDAsIDApO1xyXG4gICAgICAgICAgICBsaWdodDAuc3BlY3VsYXIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDEsIDAsIDApO1xyXG5cclxuICAgICAgICAgICAgbGlnaHQxLmRpZmZ1c2UgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDEsIDApO1xyXG4gICAgICAgICAgICBsaWdodDEuc3BlY3VsYXIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDEsIDApO1xyXG5cclxuICAgICAgICAgICAgbGlnaHQyLmRpZmZ1c2UgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDEpO1xyXG4gICAgICAgICAgICBsaWdodDIuc3BlY3VsYXIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDEpO1xyXG5cclxuICAgICAgICAgICAgbGlnaHQzLmRpZmZ1c2UgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICBsaWdodDMuc3BlY3VsYXIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDEsIDEsIDEpO1xyXG5cclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uc1xyXG4gICAgICAgICAgICB2YXIgYWxwaGEgPSAwLjA7XHJcbiAgICAgICAgICAgIHNjZW5lLmJlZm9yZVJlbmRlciA9ICgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICBsaWdodDAucG9zaXRpb24gPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygxMCAqIGVzNS5NYXRoLnNpbihhbHBoYSksIDAsIDEwICogZXM1Lk1hdGguY29zKGFscGhhKSk7XHJcbiAgICAgICAgICAgICAgICBsaWdodDEucG9zaXRpb24gPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygxMCAqIGVzNS5NYXRoLnNpbihhbHBoYSksIDAsIC0xMCAqIGVzNS5NYXRoLmNvcyhhbHBoYSkpO1xyXG4gICAgICAgICAgICAgICAgbGlnaHQyLnBvc2l0aW9uID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMTAgKiBlczUuTWF0aC5jb3MoYWxwaGEpLCAwLCAxMCAqIGVzNS5NYXRoLnNpbihhbHBoYSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpZ2h0U3BoZXJlMC5wb3NpdGlvbiA9IGxpZ2h0MC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGxpZ2h0U3BoZXJlMS5wb3NpdGlvbiA9IGxpZ2h0MS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGxpZ2h0U3BoZXJlMi5wb3NpdGlvbiA9IGxpZ2h0Mi5wb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBhbHBoYSArPSAwLjAxO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTY2VuZTNQcm92aWRlciA6IEFic3RyYWN0U2NlbmVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZSBDcmVhdGVTY2VuZShkb20uSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzLCBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUgZW5naW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lKGVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY2FtZXJhIGFuZCBsaWdodFxyXG4gICAgICAgICAgICB2YXIgbGlnaHQgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIlBvaW50XCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDUsIDEwLCA1KSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgY2FtZXJhID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkFyY1JvdGF0ZUNhbWVyYShcIkNhbWVyYVwiLCAxLCAwLjgsIDgsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIDAsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzcHJpdGUgbWFuYWdlciB0byBvcHRpbWl6ZSBHUFUgcmVzc291cmNlc1xyXG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzIDogbmFtZSwgaW1nVXJsLCBjYXBhY2l0eSwgY2VsbFNpemUsIHNjZW5lXHJcbiAgICAgICAgICAgIHZhciBzcHJpdGVNYW5hZ2VyVHJlZXMgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlTWFuYWdlcihcInRyZWVzTWFuYWdlclwiLCBcImh0dHBzOi8vZGVtb3MucmV0eXBlZC5jb20vZGlzdC9iYWJ5bG9uLmpzL2ltZy9wYWxtLnBuZ1wiLCAyMDAwLCA4MDAsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vV2UgY3JlYXRlIDIwMDAgdHJlZXMgYXQgcmFuZG9tIHBvc2l0aW9uc1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIwMDA7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyZWUgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlKFwidHJlZVwiLCBzcHJpdGVNYW5hZ2VyVHJlZXMpO1xyXG4gICAgICAgICAgICAgICAgdHJlZS5wb3NpdGlvbi54ID0gZXM1Lk1hdGgucmFuZG9tKCkgKiAxMDAgLSA1MDtcclxuICAgICAgICAgICAgICAgIHRyZWUucG9zaXRpb24ueiA9IGVzNS5NYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XHJcbiAgICAgICAgICAgICAgICB0cmVlLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vU29tZSBcImRlYWRcIiB0cmVlc1xyXG4gICAgICAgICAgICAgICAgaWYgKGVzNS5NYXRoLnJvdW5kKGVzNS5NYXRoLnJhbmRvbSgpICogNSkgPT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlLmFuZ2xlID0gZXM1Lk1hdGguUEkgKiA5MCAvIDE4MDtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlLnBvc2l0aW9uLnkgPSAtMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIG1hbmFnZXIgZm9yIHRoZSBwbGF5ZXIncyBzcHJpdGUgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIHZhciBzcHJpdGVNYW5hZ2VyUGxheWVyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZU1hbmFnZXIoXCJwbGF5ZXJNYW5hZ2VyXCIsIFwiaHR0cHM6Ly9kZW1vcy5yZXR5cGVkLmNvbS9kaXN0L2JhYnlsb24uanMvaW1nL3BsYXllci5wbmdcIiwgMiwgNjQsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpcnN0IGFuaW1hdGVkIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZShcInBsYXllclwiLCBzcHJpdGVNYW5hZ2VyUGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLnBsYXlBbmltYXRpb24oMCwgNDAsIHRydWUsIDEwMCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbiludWxsKTtcclxuICAgICAgICAgICAgcGxheWVyLnBvc2l0aW9uLnkgPSAtMC4zO1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2l6ZSA9IDAuMztcclxuICAgICAgICAgICAgcGxheWVyLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gU2Vjb25kIHN0YW5kaW5nIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgcGxheWVyMiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGUoXCJwbGF5ZXIyXCIsIHNwcml0ZU1hbmFnZXJQbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLnN0b3BBbmltYXRpb24oKTsgLy8gTm90IGFuaW1hdGVkXHJcbiAgICAgICAgICAgIHBsYXllcjIuY2VsbEluZGV4ID0gMjsgLy8gR29pbmcgdG8gZnJhbWUgbnVtYmVyIDJcclxuICAgICAgICAgICAgcGxheWVyMi5wb3NpdGlvbi55ID0gLTAuMztcclxuICAgICAgICAgICAgcGxheWVyMi5wb3NpdGlvbi54ID0gMTtcclxuICAgICAgICAgICAgcGxheWVyMi5zaXplID0gMC4zO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLmludmVydFUgPSAtMTsgLy9DaGFuZ2Ugb3JpZW50YXRpb25cclxuICAgICAgICAgICAgcGxheWVyMi5pc1BpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBpY2tpbmdcclxuICAgICAgICAgICAgc3ByaXRlTWFuYWdlclRyZWVzLmlzUGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzcHJpdGVNYW5hZ2VyUGxheWVyLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc2NlbmUub25Qb2ludGVyRG93biA9IChldnQsIHBpY2tJbmZvKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlja1Jlc3VsdCA9IHNjZW5lLnBpY2tTcHJpdGUoc2NlbmUucG9pbnRlclgsIHNjZW5lLnBvaW50ZXJZKTtcclxuICAgICAgICAgICAgICAgIGlmIChwaWNrUmVzdWx0LmhpdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrUmVzdWx0LnBpY2tlZFNwcml0ZS5hbmdsZSArPSAwLjU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIl0KfQo=
