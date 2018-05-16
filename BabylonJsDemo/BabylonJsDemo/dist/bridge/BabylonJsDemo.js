/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("BabylonJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("BabylonJsDemo.App", {
        main: function Main () {
            BabylonJsDemo.App._canvas = document.getElementById("renderCanvas");

            var canvasOrCtx = BabylonJsDemo.App._canvas;
            BabylonJsDemo.App._engine = new BABYLON.Engine(canvasOrCtx, true);

            BabylonJsDemo.App.InitEventHandlers();

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
                    window.addEventListener("resize", function (e) {
                        BabylonJsDemo.App._engine.resize();
                    });

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
                            throw new System.ArgumentOutOfRangeException.$ctor1("number");
                    }
                }
            }
        }
    });

    Bridge.define("BabylonJsDemo.SceneProviders.AbstractSceneProvider");

    /** @namespace BabylonJsDemo.SceneProviders */

    /**
     * Original sources: http://www.babylonjs-playground.com/#12S23Y
     *
     * @public
     * @class BabylonJsDemo.SceneProviders.Scene1Provider
     * @augments BabylonJsDemo.SceneProviders.AbstractSceneProvider
     */
    Bridge.define("BabylonJsDemo.SceneProviders.Scene1Provider", {
        inherits: [BabylonJsDemo.SceneProviders.AbstractSceneProvider],
        methods: {
            CreateScene: function (canvas, engine) {
                var scene = new BABYLON.Scene(engine);

                var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

                camera.setTarget(BABYLON.Vector3.Zero());

                camera.attachControl(canvas, true);

                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

                light.intensity = 0.7;

                var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

                sphere.position.y = 1;

                var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

                return scene;
            }
        }
    });

    /**
     * Original sources: http://www.babylonjs-playground.com/#NXXMR6
     *
     * @public
     * @class BabylonJsDemo.SceneProviders.Scene2Provider
     * @augments BabylonJsDemo.SceneProviders.AbstractSceneProvider
     */
    Bridge.define("BabylonJsDemo.SceneProviders.Scene2Provider", {
        inherits: [BabylonJsDemo.SceneProviders.AbstractSceneProvider],
        methods: {
            CreateScene: function (canvas, engine) {
                var $t;
                var scene = new BABYLON.Scene(engine);

                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
                camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
                camera.attachControl(canvas, true);

                var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
                var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, -10, 0), scene);
                var light2 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(10, 0, 0), scene);
                var light3 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);

                var material = new BABYLON.StandardMaterial("kosh", scene);
                var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 3, scene);

                var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
                var lightSphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 16, 0.5, scene);
                var lightSphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 16, 0.5, scene);

                var redMaterial = ($t = new BABYLON.StandardMaterial("red", scene), $t.diffuseColor = new BABYLON.Color3(0, 0, 0), $t.specularColor = new BABYLON.Color3(0, 0, 0), $t.emissiveColor = new BABYLON.Color3(1, 0, 0), $t);

                var greenMaterial = ($t = new BABYLON.StandardMaterial("green", scene), $t.diffuseColor = new BABYLON.Color3(0, 0, 0), $t.specularColor = new BABYLON.Color3(0, 0, 0), $t.emissiveColor = new BABYLON.Color3(0, 1, 0), $t);

                var blueMaterial = ($t = new BABYLON.StandardMaterial("blue", scene), $t.diffuseColor = new BABYLON.Color3(0, 0, 0), $t.specularColor = new BABYLON.Color3(0, 0, 0), $t.emissiveColor = new BABYLON.Color3(0, 0, 1), $t);

                lightSphere0.material = redMaterial;
                lightSphere1.material = greenMaterial;
                lightSphere2.material = blueMaterial;

                material.diffuseColor = new BABYLON.Color3(1, 1, 1);
                sphere.material = material;

                light0.diffuse = new BABYLON.Color3(1, 0, 0);
                light0.specular = new BABYLON.Color3(1, 0, 0);

                light1.diffuse = new BABYLON.Color3(0, 1, 0);
                light1.specular = new BABYLON.Color3(0, 1, 0);

                light2.diffuse = new BABYLON.Color3(0, 0, 1);
                light2.specular = new BABYLON.Color3(0, 0, 1);

                light3.diffuse = new BABYLON.Color3(1, 1, 1);
                light3.specular = new BABYLON.Color3(1, 1, 1);

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

    /**
     * Original sources: http://www.babylonjs-playground.com/#GJUMSZ
     *
     * @public
     * @class BabylonJsDemo.SceneProviders.Scene3Provider
     * @augments BabylonJsDemo.SceneProviders.AbstractSceneProvider
     */
    Bridge.define("BabylonJsDemo.SceneProviders.Scene3Provider", {
        inherits: [BabylonJsDemo.SceneProviders.AbstractSceneProvider],
        methods: {
            CreateScene: function (canvas, engine) {
                var scene = new BABYLON.Scene(engine);

                var light = new BABYLON.PointLight("Point", new BABYLON.Vector3(5, 10, 5), scene);
                var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 8, new BABYLON.Vector3(0, 0, 0), scene);
                camera.attachControl(canvas, true);

                var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "https://demos.retyped.com/dist/babylon.js/img/palm.png", 2000, Bridge.box(800, System.Int32), scene);

                for (var i = 0; i < 2000; i = (i + 1) | 0) {
                    var tree = new BABYLON.Sprite("tree", spriteManagerTrees);
                    tree.position.x = Math.random() * 100 - 50;
                    tree.position.z = Math.random() * 100 - 50;
                    tree.isPickable = true;

                    if (Math.round(Math.random() * 5) === 0) {
                        tree.angle = Math.PI * 90 / 180;
                        tree.position.y = -0.3;
                    }
                }

                var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager", "https://demos.retyped.com/dist/babylon.js/img/player.png", 2, Bridge.box(64, System.Int32), scene);

                var player = new BABYLON.Sprite("player", spriteManagerPlayer);
                player.playAnimation(0, 40, true, 100, null);
                player.position.y = -0.3;
                player.size = 0.3;
                player.isPickable = true;

                var player2 = new BABYLON.Sprite("player2", spriteManagerPlayer);
                player2.stopAnimation();
                player2.cellIndex = 2;
                player2.position.y = -0.3;
                player2.position.x = 1;
                player2.size = 0.3;
                player2.invertU = -1;
                player2.isPickable = true;

                spriteManagerTrees.isPickable = true;
                spriteManagerPlayer.isPickable = true;

                scene.onPointerDown = function (evt, pickInfo) {
                    var pickResult = scene.pickSprite(scene.pointerX, scene.pointerY);
                    if (pickResult.hit) {
                        var sprite = pickResult.pickedSprite;
                        sprite.angle += 0.5;
                    }
                };

                return scene;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCYWJ5bG9uSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJTY2VuZVByb3ZpZGVycy9TY2VuZTFQcm92aWRlci5jcyIsIlNjZW5lUHJvdmlkZXJzL1NjZW5lMlByb3ZpZGVyLmNzIiwiU2NlbmVQcm92aWRlcnMvU2NlbmUzUHJvdmlkZXIuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFrQllBLDRCQUFVQSxBQUF3QkE7O1lBR2xDQSxrQkFBa0JBO1lBQ2xCQSw0QkFBVUEsSUFBSUEsZUFBa0NBOztZQUdoREE7O1lBR0FBOzs7Ozs7Ozs7OztvQkFNQUEsa0NBQXNDQSxBQUFtREE7d0JBRXJGQTs7O29CQUlKQSxXQUFXQSxtQkFFUEEsdUNBQ0FBLHVDQUNBQTs7b0JBR0pBLEtBQUtBLFdBQVdBLElBQUlBLGFBQWFBO3dCQUU3QkEsa0JBQVlBO3dCQUNaQSx3QkFBS0EsR0FBTEEsaUJBQWtCQTs7Z0NBRWRBLGdDQUFjQTtnQ0FDZEEsT0FBT0E7Ozs7O3lDQUtjQTtvQkFFN0JBLElBQUlBO3dCQUVBQTt3QkFDQUEsZ0NBQWNBOzt3QkFFZEE7d0JBQ0FBLDJCQUFTQTt3QkFDVEE7OztvQkFHSkEsb0JBQW9CQSxtQ0FBaUJBO29CQUNyQ0EsMkJBQVNBLDBCQUEwQkEsMkJBQVNBOztvQkFFNUNBLHdDQUFzQkEsQUFBd0JBO3dCQUUxQ0E7OztvQkFHSkE7OzRDQUdpREE7b0JBRWpEQSxRQUFRQTt3QkFFSkE7NEJBQ0lBLE9BQU9BLElBQUlBO3dCQUVmQTs0QkFDSUEsT0FBT0EsSUFBSUE7d0JBRWZBOzRCQUNJQSxPQUFPQSxJQUFJQTt3QkFFZkE7NEJBQ0lBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNDdEZ1Q0EsUUFBOEJBO2dCQUd2RkEsWUFBWUEsSUFBSUEsY0FBaUNBOztnQkFHakRBLGFBQWFBLElBQUlBLDhCQUFpREEsSUFBSUEsc0JBQXlDQSxNQUFNQTs7Z0JBR3JIQSxpQkFBaUJBOztnQkFHakJBLHFCQUFxQkE7O2dCQUdyQkEsWUFBWUEsSUFBSUEsbUNBQXNEQSxJQUFJQSwwQkFBNkNBOztnQkFHdkhBOztnQkFHQUEsYUFBYUEsNENBQStEQTs7Z0JBRzVFQTs7Z0JBR0FBLGFBQWFBLDhDQUFpRUE7O2dCQUU5RUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7OzttQ0M3QmtEQSxRQUE4QkE7O2dCQUV2RkEsWUFBWUEsSUFBSUEsY0FBaUNBOztnQkFHakRBLGFBQWFBLElBQUlBLDRDQUErREEsd0JBQTJDQTtnQkFDM0hBLG1CQUFtQkEsSUFBSUEsZ0JBQW1DQTtnQkFDMURBLHFCQUFxQkE7O2dCQUdyQkEsYUFBYUEsSUFBSUEsNEJBQStDQSxJQUFJQSwyQkFBOENBO2dCQUNsSEEsYUFBYUEsSUFBSUEsNEJBQStDQSxJQUFJQSxtQkFBc0NBLFNBQVNBO2dCQUNuSEEsYUFBYUEsSUFBSUEsNEJBQStDQSxJQUFJQSwyQkFBOENBO2dCQUNsSEEsYUFBYUEsSUFBSUEsaUNBQW9EQSxJQUFJQSxtQkFBc0NBLFFBQVFBOztnQkFFdkhBLGVBQWVBLElBQUlBLGlDQUFvREE7Z0JBQ3ZFQSxhQUFhQSwyQ0FBOERBOztnQkFHM0VBLG1CQUFtQkEsOENBQWlFQTtnQkFDcEZBLG1CQUFtQkEsOENBQWlFQTtnQkFDcEZBLG1CQUFtQkEsOENBQWlFQTs7Z0JBRXBGQSxrQkFBa0JBLFVBQUlBLGdDQUFtREEsMEJBRXREQSxJQUFJQSw0Q0FDSEEsSUFBSUEsNENBQ0pBLElBQUlBOztnQkFHeEJBLG9CQUFvQkEsVUFBSUEsa0NBQXFEQSwwQkFFMURBLElBQUlBLDRDQUNIQSxJQUFJQSw0Q0FDSkEsSUFBSUE7O2dCQUd4QkEsbUJBQW1CQSxVQUFJQSxpQ0FBb0RBLDBCQUV4REEsSUFBSUEsNENBQ0hBLElBQUlBLDRDQUNKQSxJQUFJQTs7Z0JBR3hCQSx3QkFBd0JBO2dCQUN4QkEsd0JBQXdCQTtnQkFDeEJBLHdCQUF3QkE7O2dCQUd4QkEsd0JBQXdCQSxJQUFJQTtnQkFDNUJBLGtCQUFrQkE7O2dCQUdsQkEsaUJBQWlCQSxJQUFJQTtnQkFDckJBLGtCQUFrQkEsSUFBSUE7O2dCQUV0QkEsaUJBQWlCQSxJQUFJQTtnQkFDckJBLGtCQUFrQkEsSUFBSUE7O2dCQUV0QkEsaUJBQWlCQSxJQUFJQTtnQkFDckJBLGtCQUFrQkEsSUFBSUE7O2dCQUV0QkEsaUJBQWlCQSxJQUFJQTtnQkFDckJBLGtCQUFrQkEsSUFBSUE7O2dCQUd0QkE7Z0JBQ0FBLHFCQUFxQkEsQUFBa0JBO29CQUNuQ0Esa0JBQWtCQSxJQUFJQSxnQkFBbUNBLEtBQUtBLFNBQWFBLFdBQVdBLEtBQUtBLFNBQWFBO29CQUN4R0Esa0JBQWtCQSxJQUFJQSxnQkFBbUNBLEtBQUtBLFNBQWFBLFdBQVdBLE1BQU1BLFNBQWFBO29CQUN6R0Esa0JBQWtCQSxJQUFJQSxnQkFBbUNBLEtBQUtBLFNBQWFBLFdBQVdBLEtBQUtBLFNBQWFBOztvQkFFeEdBLHdCQUF3QkE7b0JBQ3hCQSx3QkFBd0JBO29CQUN4QkEsd0JBQXdCQTs7b0JBRXhCQTs7O2dCQUdKQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7O21DQy9Fa0RBLFFBQThCQTtnQkFFdkZBLFlBQVlBLElBQUlBLGNBQWlDQTs7Z0JBR2pEQSxZQUFZQSxJQUFJQSw0QkFBK0NBLElBQUlBLDJCQUE4Q0E7Z0JBQ2pIQSxhQUFhQSxJQUFJQSw2Q0FBZ0VBLElBQUlBLDBCQUE2Q0E7Z0JBQ2xJQSxxQkFBcUJBOztnQkFJckJBLHlCQUF5QkEsSUFBSUEscUlBQThIQTs7Z0JBRzNKQSxLQUFLQSxXQUFXQSxVQUFVQTtvQkFFdEJBLFdBQVdBLElBQUlBLHVCQUEwQ0E7b0JBQ3pEQSxrQkFBa0JBO29CQUNsQkEsa0JBQWtCQTtvQkFDbEJBOztvQkFHQUEsSUFBSUEsV0FBZUE7d0JBRWZBLGFBQWFBO3dCQUNiQSxrQkFBa0JBOzs7O2dCQUsxQkEsMEJBQTBCQSxJQUFJQSxvSUFBNkhBOztnQkFHM0pBLGFBQWFBLElBQUlBLHlCQUE0Q0E7Z0JBQzdEQSx1Q0FBdUNBLEFBQXVCQTtnQkFDOURBLG9CQUFvQkE7Z0JBQ3BCQTtnQkFDQUE7O2dCQUdBQSxjQUFjQSxJQUFJQSwwQkFBNkNBO2dCQUMvREE7Z0JBQ0FBO2dCQUNBQSxxQkFBcUJBO2dCQUNyQkE7Z0JBQ0FBO2dCQUNBQSxrQkFBa0JBO2dCQUNsQkE7O2dCQUdBQTtnQkFDQUE7O2dCQUVBQSxzQkFBc0JBLFVBQUNBLEtBQUtBO29CQUV4QkEsaUJBQWlCQSxBQUF5Q0EsaUJBQWlCQSxnQkFBZ0JBO29CQUMzRkEsSUFBSUE7d0JBRUFBLGFBQWFBLEFBQW9DQTt3QkFDakRBOzs7O2dCQUlSQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgQmFieWxvbkpzRGVtby5TY2VuZVByb3ZpZGVycztcclxudXNpbmcgUmV0eXBlZDtcclxudXNpbmcgUmV0eXBlZC5QcmltaXRpdmU7XHJcblxyXG5uYW1lc3BhY2UgQmFieWxvbkpzRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG9tLkhUTUxDYW52YXNFbGVtZW50IF9jYW52YXM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRW5naW5lIF9lbmdpbmU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUgX3NjZW5lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgX2lzUnVuO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJbml0IGNhbnZhczpcclxuICAgICAgICAgICAgX2NhbnZhcyA9IChkb20uSFRNTENhbnZhc0VsZW1lbnQpIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgZW5naW5lOlxyXG4gICAgICAgICAgICB2YXIgY2FudmFzT3JDdHggPSBfY2FudmFzLkFzPFVuaW9uPGJhYnlsb25fanMuSFRNTENhbnZhc0VsZW1lbnQsIGJhYnlsb25fanMuV2ViR0xSZW5kZXJpbmdDb250ZXh0Pj4oKTtcclxuICAgICAgICAgICAgX2VuZ2luZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUoY2FudmFzT3JDdHgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdCBFdmVudCBoYW5kbGVyczpcclxuICAgICAgICAgICAgSW5pdEV2ZW50SGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJ1biBTY2VuZTEgb24gc3RhcnQ6XHJcbiAgICAgICAgICAgIFN3aXRjaFNjZW5lVG8oMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIEluaXRFdmVudEhhbmRsZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFJlc2l6ZSBzY2VuZSB3aXRoIGFjY29yZGluZyB0byB0aGUgd2luZG93IHNpemU6XHJcbiAgICAgICAgICAgIGRvbS53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9lbmdpbmUucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgZXZlbnQgaGFuZGxlciBmb3IgYnV0dG9ucyBzd2l0Y2hpbmcgc2NlbmVzXHJcbiAgICAgICAgICAgIHZhciBidG5zID0gbmV3W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2FtcGxlMUJ0blwiKSxcclxuICAgICAgICAgICAgICAgIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhbXBsZTJCdG5cIiksXHJcbiAgICAgICAgICAgICAgICBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYW1wbGUzQnRuXCIpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ0bnMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBidG5zW2ldLm9uY2xpY2sgPSBlID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3dpdGNoU2NlbmVUbyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN3aXRjaFNjZW5lVG8oaW50IG51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfaXNSdW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9lbmdpbmUuc3RvcFJlbmRlckxvb3AoKTtcclxuICAgICAgICAgICAgICAgIF9lbmdpbmUuY2xlYXIoUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3I0LkZyb21JbnRzKDI1NSwgMjU1LCAyNTUsIDI1NSksIHRydWUsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9zY2VuZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBfc2NlbmUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgX2lzUnVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzY2VuZVByb3ZpZGVyID0gR2V0U2NlbmVQcm92aWRlcihudW1iZXIpO1xyXG4gICAgICAgICAgICBfc2NlbmUgPSBzY2VuZVByb3ZpZGVyLkNyZWF0ZVNjZW5lKF9jYW52YXMsIF9lbmdpbmUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX2VuZ2luZS5ydW5SZW5kZXJMb29wKChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9zY2VuZS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgX2lzUnVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQWJzdHJhY3RTY2VuZVByb3ZpZGVyIEdldFNjZW5lUHJvdmlkZXIoaW50IG51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobnVtYmVyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2VuZTFQcm92aWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNjZW5lMlByb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2NlbmUzUHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFeGNlcHRpb24oXCJudW1iZXJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBPcmlnaW5hbCBzb3VyY2VzOiBodHRwOi8vd3d3LmJhYnlsb25qcy1wbGF5Z3JvdW5kLmNvbS8jMTJTMjNZXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFNjZW5lMVByb3ZpZGVyIDogQWJzdHJhY3RTY2VuZVByb3ZpZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lIENyZWF0ZVNjZW5lKGRvbS5IVE1MQ2FudmFzRWxlbWVudCBjYW52YXMsIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkVuZ2luZSBlbmdpbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYSBiYXNpYyBCYWJ5bG9uIFNjZW5lIG9iamVjdCAobm9uLW1lc2gpXHJcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZShlbmdpbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGFuZCBwb3NpdGlvbnMgYSBmcmVlIGNhbWVyYSAobm9uLW1lc2gpXHJcbiAgICAgICAgICAgIHZhciBjYW1lcmEgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRnJlZUNhbWVyYShcImNhbWVyYTFcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMCwgNSwgLTEwKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyB0YXJnZXRzIHRoZSBjYW1lcmEgdG8gc2NlbmUgb3JpZ2luXHJcbiAgICAgICAgICAgIGNhbWVyYS5zZXRUYXJnZXQoUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMy5aZXJvKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcclxuICAgICAgICAgICAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhIGxpZ2h0LCBhaW1pbmcgMCwxLDAgLSB0byB0aGUgc2t5IChub24tbWVzaClcclxuICAgICAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodDFcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMCwgMSwgMCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlZmF1bHQgaW50ZW5zaXR5IGlzIDEuIExldCdzIGRpbSB0aGUgbGlnaHQgYSBzbWFsbCBhbW91bnRcclxuICAgICAgICAgICAgbGlnaHQuaW50ZW5zaXR5ID0gMC43O1xyXG5cclxuICAgICAgICAgICAgLy8gT3VyIGJ1aWx0LWluICdzcGhlcmUnIHNoYXBlLiBQYXJhbXM6IG5hbWUsIHN1YmRpdnMsIHNpemUsIHNjZW5lXHJcbiAgICAgICAgICAgIHZhciBzcGhlcmUgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcInNwaGVyZTFcIiwgMTYsIDIsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIHNwaGVyZSB1cHdhcmQgMS8yIGl0cyBoZWlnaHRcclxuICAgICAgICAgICAgc3BoZXJlLnBvc2l0aW9uLnkgPSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gT3VyIGJ1aWx0LWluICdncm91bmQnIHNoYXBlLiBQYXJhbXM6IG5hbWUsIHdpZHRoLCBkZXB0aCwgc3ViZGl2cywgc2NlbmVcclxuICAgICAgICAgICAgdmFyIGdyb3VuZCA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlR3JvdW5kKFwiZ3JvdW5kMVwiLCA2LCA2LCAyLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBPcmlnaW5hbCBzb3VyY2VzOiBodHRwOi8vd3d3LmJhYnlsb25qcy1wbGF5Z3JvdW5kLmNvbS8jTlhYTVI2XHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFNjZW5lMlByb3ZpZGVyIDogQWJzdHJhY3RTY2VuZVByb3ZpZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lIENyZWF0ZVNjZW5lKGRvbS5IVE1MQ2FudmFzRWxlbWVudCBjYW52YXMsIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkVuZ2luZSBlbmdpbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUoZW5naW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIGNhbWVyYVxyXG4gICAgICAgICAgICB2YXIgY2FtZXJhID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkFyY1JvdGF0ZUNhbWVyYShcIkNhbWVyYVwiLCAwLCAwLCAxMCwgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMy5aZXJvKCksIHNjZW5lKTtcclxuICAgICAgICAgICAgY2FtZXJhLnNldFBvc2l0aW9uKG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKC0xMCwgMTAsIDApKTtcclxuICAgICAgICAgICAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExpZ2h0c1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQwID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlBvaW50TGlnaHQoXCJPbW5pMFwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCAxMCwgMCksIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0MSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Qb2ludExpZ2h0KFwiT21uaTFcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMCwgLTEwLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlBvaW50TGlnaHQoXCJPbW5pMlwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygxMCwgMCwgMCksIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0MyA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5EaXJlY3Rpb25hbExpZ2h0KFwiRGlyMFwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygxLCAtMSwgMCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXRlcmlhbCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwia29zaFwiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBzcGhlcmUgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcIlNwaGVyZVwiLCAxNiwgMywgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRpbmcgbGlnaHQgc3BoZXJlXHJcbiAgICAgICAgICAgIHZhciBsaWdodFNwaGVyZTAgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcIlNwaGVyZTBcIiwgMTYsIDAuNSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHRTcGhlcmUxID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoXCJTcGhlcmUxXCIsIDE2LCAwLjUsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIGxpZ2h0U3BoZXJlMiA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwiU3BoZXJlMlwiLCAxNiwgMC41LCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVkTWF0ZXJpYWwgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInJlZFwiLCBzY2VuZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIHNwZWN1bGFyQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMSwgMCwgMClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBncmVlbk1hdGVyaWFsID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncmVlblwiLCBzY2VuZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIHNwZWN1bGFyQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMSwgMClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBibHVlTWF0ZXJpYWwgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImJsdWVcIiwgc2NlbmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2VDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBzcGVjdWxhckNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDEpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsaWdodFNwaGVyZTAubWF0ZXJpYWwgPSByZWRNYXRlcmlhbDtcclxuICAgICAgICAgICAgbGlnaHRTcGhlcmUxLm1hdGVyaWFsID0gZ3JlZW5NYXRlcmlhbDtcclxuICAgICAgICAgICAgbGlnaHRTcGhlcmUyLm1hdGVyaWFsID0gYmx1ZU1hdGVyaWFsO1xyXG5cclxuICAgICAgICAgICAgLy8gU3BoZXJlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgICAgIHNwaGVyZS5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG5cclxuICAgICAgICAgICAgLy8gTGlnaHRzIGNvbG9yc1xyXG4gICAgICAgICAgICBsaWdodDAuZGlmZnVzZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMSwgMCwgMCk7XHJcbiAgICAgICAgICAgIGxpZ2h0MC5zcGVjdWxhciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMSwgMCwgMCk7XHJcblxyXG4gICAgICAgICAgICBsaWdodDEuZGlmZnVzZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMSwgMCk7XHJcbiAgICAgICAgICAgIGxpZ2h0MS5zcGVjdWxhciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMSwgMCk7XHJcblxyXG4gICAgICAgICAgICBsaWdodDIuZGlmZnVzZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMSk7XHJcbiAgICAgICAgICAgIGxpZ2h0Mi5zcGVjdWxhciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMSk7XHJcblxyXG4gICAgICAgICAgICBsaWdodDMuZGlmZnVzZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgICAgIGxpZ2h0My5zcGVjdWxhciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMSwgMSwgMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbmltYXRpb25zXHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IDAuMDtcclxuICAgICAgICAgICAgc2NlbmUuYmVmb3JlUmVuZGVyID0gbmV3IFN5c3RlbS5BY3Rpb24oKCkgPT4geyBcclxuICAgICAgICAgICAgICAgIGxpZ2h0MC5wb3NpdGlvbiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEwICogZXM1Lk1hdGguc2luKGFscGhhKSwgMCwgMTAgKiBlczUuTWF0aC5jb3MoYWxwaGEpKTtcclxuICAgICAgICAgICAgICAgIGxpZ2h0MS5wb3NpdGlvbiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEwICogZXM1Lk1hdGguc2luKGFscGhhKSwgMCwgLTEwICogZXM1Lk1hdGguY29zKGFscGhhKSk7XHJcbiAgICAgICAgICAgICAgICBsaWdodDIucG9zaXRpb24gPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygxMCAqIGVzNS5NYXRoLmNvcyhhbHBoYSksIDAsIDEwICogZXM1Lk1hdGguc2luKGFscGhhKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGlnaHRTcGhlcmUwLnBvc2l0aW9uID0gbGlnaHQwLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGlnaHRTcGhlcmUxLnBvc2l0aW9uID0gbGlnaHQxLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGlnaHRTcGhlcmUyLnBvc2l0aW9uID0gbGlnaHQyLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGFscGhhICs9IDAuMDE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgQmFieWxvbkpzRGVtby5TY2VuZVByb3ZpZGVyc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gT3JpZ2luYWwgc291cmNlczogaHR0cDovL3d3dy5iYWJ5bG9uanMtcGxheWdyb3VuZC5jb20vI0dKVU1TWlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBTY2VuZTNQcm92aWRlciA6IEFic3RyYWN0U2NlbmVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZSBDcmVhdGVTY2VuZShkb20uSFRNTENhbnZhc0VsZW1lbnQgY2FudmFzLCBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUgZW5naW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lKGVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY2FtZXJhIGFuZCBsaWdodFxyXG4gICAgICAgICAgICB2YXIgbGlnaHQgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIlBvaW50XCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDUsIDEwLCA1KSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgY2FtZXJhID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkFyY1JvdGF0ZUNhbWVyYShcIkNhbWVyYVwiLCAxLCAwLjgsIDgsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIDAsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzcHJpdGUgbWFuYWdlciB0byBvcHRpbWl6ZSBHUFUgcmVzc291cmNlc1xyXG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzIDogbmFtZSwgaW1nVXJsLCBjYXBhY2l0eSwgY2VsbFNpemUsIHNjZW5lXHJcbiAgICAgICAgICAgIHZhciBzcHJpdGVNYW5hZ2VyVHJlZXMgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlTWFuYWdlcihcInRyZWVzTWFuYWdlclwiLCBcImh0dHBzOi8vZGVtb3MucmV0eXBlZC5jb20vZGlzdC9iYWJ5bG9uLmpzL2ltZy9wYWxtLnBuZ1wiLCAyMDAwLCA4MDAsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vV2UgY3JlYXRlIDIwMDAgdHJlZXMgYXQgcmFuZG9tIHBvc2l0aW9uc1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIwMDA7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyZWUgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlKFwidHJlZVwiLCBzcHJpdGVNYW5hZ2VyVHJlZXMpO1xyXG4gICAgICAgICAgICAgICAgdHJlZS5wb3NpdGlvbi54ID0gZXM1Lk1hdGgucmFuZG9tKCkgKiAxMDAgLSA1MDtcclxuICAgICAgICAgICAgICAgIHRyZWUucG9zaXRpb24ueiA9IGVzNS5NYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XHJcbiAgICAgICAgICAgICAgICB0cmVlLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vU29tZSBcImRlYWRcIiB0cmVlc1xyXG4gICAgICAgICAgICAgICAgaWYgKGVzNS5NYXRoLnJvdW5kKGVzNS5NYXRoLnJhbmRvbSgpICogNSkgPT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlLmFuZ2xlID0gZXM1Lk1hdGguUEkgKiA5MCAvIDE4MDtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlLnBvc2l0aW9uLnkgPSAtMC4zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIG1hbmFnZXIgZm9yIHRoZSBwbGF5ZXIncyBzcHJpdGUgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIHZhciBzcHJpdGVNYW5hZ2VyUGxheWVyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZU1hbmFnZXIoXCJwbGF5ZXJNYW5hZ2VyXCIsIFwiaHR0cHM6Ly9kZW1vcy5yZXR5cGVkLmNvbS9kaXN0L2JhYnlsb24uanMvaW1nL3BsYXllci5wbmdcIiwgMiwgNjQsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpcnN0IGFuaW1hdGVkIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZShcInBsYXllclwiLCBzcHJpdGVNYW5hZ2VyUGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLnBsYXlBbmltYXRpb24oMCwgNDAsIHRydWUsIDEwMCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbiludWxsKTtcclxuICAgICAgICAgICAgcGxheWVyLnBvc2l0aW9uLnkgPSAtMC4zO1xyXG4gICAgICAgICAgICBwbGF5ZXIuc2l6ZSA9IDAuMztcclxuICAgICAgICAgICAgcGxheWVyLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gU2Vjb25kIHN0YW5kaW5nIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgcGxheWVyMiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGUoXCJwbGF5ZXIyXCIsIHNwcml0ZU1hbmFnZXJQbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLnN0b3BBbmltYXRpb24oKTsgLy8gTm90IGFuaW1hdGVkXHJcbiAgICAgICAgICAgIHBsYXllcjIuY2VsbEluZGV4ID0gMjsgLy8gR29pbmcgdG8gZnJhbWUgbnVtYmVyIDJcclxuICAgICAgICAgICAgcGxheWVyMi5wb3NpdGlvbi55ID0gLTAuMztcclxuICAgICAgICAgICAgcGxheWVyMi5wb3NpdGlvbi54ID0gMTtcclxuICAgICAgICAgICAgcGxheWVyMi5zaXplID0gMC4zO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLmludmVydFUgPSAtMTsgLy9DaGFuZ2Ugb3JpZW50YXRpb25cclxuICAgICAgICAgICAgcGxheWVyMi5pc1BpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBpY2tpbmdcclxuICAgICAgICAgICAgc3ByaXRlTWFuYWdlclRyZWVzLmlzUGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzcHJpdGVNYW5hZ2VyUGxheWVyLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc2NlbmUub25Qb2ludGVyRG93biA9IChldnQsIHBpY2tJbmZvKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlja1Jlc3VsdCA9IChSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5QaWNraW5nSW5mbykgc2NlbmUucGlja1Nwcml0ZShzY2VuZS5wb2ludGVyWCwgc2NlbmUucG9pbnRlclkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpY2tSZXN1bHQuaGl0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcHJpdGUgPSAoUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlKSBwaWNrUmVzdWx0LnBpY2tlZFNwcml0ZTtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuYW5nbGUgKz0gMC41O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuICAgICAgICJdCn0K
