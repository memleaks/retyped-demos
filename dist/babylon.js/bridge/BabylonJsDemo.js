/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
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

                var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "https://demos.retyped.com/dist/babylon.js/img/palm.png", 2000, 800, scene);

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

                var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager", "https://demos.retyped.com/dist/babylon.js/img/player.png", 2, 64, scene);

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCYWJ5bG9uSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJTY2VuZVByb3ZpZGVycy9TY2VuZTFQcm92aWRlci5jcyIsIlNjZW5lUHJvdmlkZXJzL1NjZW5lMlByb3ZpZGVyLmNzIiwiU2NlbmVQcm92aWRlcnMvU2NlbmUzUHJvdmlkZXIuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFrQllBLDRCQUFVQSxBQUF3QkE7O1lBR2xDQSxrQkFBa0JBO1lBQ2xCQSw0QkFBVUEsSUFBSUEsZUFBa0NBOztZQUdoREE7O1lBR0FBOzs7Ozs7Ozs7OztvQkFNQUEsa0NBQXNDQSxBQUFtREEsVUFBQ0E7d0JBRXRGQTs7O29CQUlKQSxXQUFXQSxtQkFFUEEsdUNBQ0FBLHVDQUNBQTs7b0JBR0pBLEtBQUtBLFdBQVdBLElBQUlBLGFBQWFBO3dCQUU3QkEsa0JBQVlBO3dCQUNaQSx3QkFBS0EsR0FBTEEsaUJBQWtCQTs7Z0NBRWRBLGdDQUFjQTs7Ozs7eUNBS09BO29CQUU3QkEsSUFBSUE7d0JBRUFBO3dCQUNBQSxnQ0FBY0E7O3dCQUVkQTt3QkFDQUEsMkJBQVNBO3dCQUNUQTs7O29CQUdKQSxvQkFBb0JBLG1DQUFpQkE7b0JBQ3JDQSwyQkFBU0EsMEJBQTBCQSwyQkFBU0E7O29CQUU1Q0Esd0NBQXNCQSxBQUF3QkE7d0JBRTFDQTs7O29CQUdKQTs7NENBR2lEQTtvQkFFakRBLFFBQVFBO3dCQUVKQTs0QkFDSUEsT0FBT0EsSUFBSUE7d0JBRWZBOzRCQUNJQSxPQUFPQSxJQUFJQTt3QkFFZkE7NEJBQ0lBLE9BQU9BLElBQUlBO3dCQUVmQTs0QkFDSUEsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0NyRnVDQSxRQUE4QkE7Z0JBR3ZGQSxZQUFZQSxJQUFJQSxjQUFpQ0E7O2dCQUdqREEsYUFBYUEsSUFBSUEsOEJBQWlEQSxJQUFJQSxzQkFBeUNBLE1BQU1B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QkFDcEJBO2dCQUNBQTs7Z0JBR0FBLGNBQWNBLElBQUlBLDBCQUE2Q0E7Z0JBQy9EQTtnQkFDQUE7Z0JBQ0FBLHFCQUFxQkE7Z0JBQ3JCQTtnQkFDQUE7Z0JBQ0FBLGtCQUFrQkE7Z0JBQ2xCQTs7Z0JBR0FBO2dCQUNBQTs7Z0JBRUFBLHNCQUFzQkEsVUFBQ0EsS0FBS0E7b0JBRXhCQSxpQkFBaUJBLEFBQXlDQSxpQkFBaUJBLGdCQUFnQkE7b0JBQzNGQSxJQUFJQTt3QkFFQUEsYUFBYUEsQUFBb0NBO3dCQUNqREE7Ozs7Z0JBSVJBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzO1xyXG51c2luZyBSZXR5cGVkO1xyXG51c2luZyBSZXR5cGVkLlByaW1pdGl2ZTtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb20uSFRNTENhbnZhc0VsZW1lbnQgX2NhbnZhcztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5FbmdpbmUgX2VuZ2luZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZSBfc2NlbmU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBfaXNSdW47XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEluaXQgY2FudmFzOlxyXG4gICAgICAgICAgICBfY2FudmFzID0gKGRvbS5IVE1MQ2FudmFzRWxlbWVudCkgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdCBlbmdpbmU6XHJcbiAgICAgICAgICAgIHZhciBjYW52YXNPckN0eCA9IF9jYW52YXMuQXM8VW5pb248YmFieWxvbl9qcy5IVE1MQ2FudmFzRWxlbWVudCwgYmFieWxvbl9qcy5XZWJHTFJlbmRlcmluZ0NvbnRleHQ+PigpO1xyXG4gICAgICAgICAgICBfZW5naW5lID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkVuZ2luZShjYW52YXNPckN0eCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0IEV2ZW50IGhhbmRsZXJzOlxyXG4gICAgICAgICAgICBJbml0RXZlbnRIYW5kbGVycygpO1xyXG5cclxuICAgICAgICAgICAgLy8gUnVuIFNjZW5lMSBvbiBzdGFydDpcclxuICAgICAgICAgICAgU3dpdGNoU2NlbmVUbygxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgSW5pdEV2ZW50SGFuZGxlcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVzaXplIHNjZW5lIHdpdGggYWNjb3JkaW5nIHRvIHRoZSB3aW5kb3cgc2l6ZTpcclxuICAgICAgICAgICAgZG9tLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmRvbS5FdmVudD4pKChkb20uRXZlbnQgZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2VuZ2luZS5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdCBldmVudCBoYW5kbGVyIGZvciBidXR0b25zIHN3aXRjaGluZyBzY2VuZXNcclxuICAgICAgICAgICAgdmFyIGJ0bnMgPSBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYW1wbGUxQnRuXCIpLFxyXG4gICAgICAgICAgICAgICAgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2FtcGxlMkJ0blwiKSxcclxuICAgICAgICAgICAgICAgIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhbXBsZTNCdG5cIilcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnRucy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGJ0bnNbaV0ub25jbGljayA9IGUgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTd2l0Y2hTY2VuZVRvKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU3dpdGNoU2NlbmVUbyhpbnQgbnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9pc1J1bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2VuZ2luZS5zdG9wUmVuZGVyTG9vcCgpO1xyXG4gICAgICAgICAgICAgICAgX2VuZ2luZS5jbGVhcihSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjQuRnJvbUludHMoMjU1LCAyNTUsIDI1NSwgMjU1KSwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3NjZW5lLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIF9zY2VuZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBfaXNSdW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNjZW5lUHJvdmlkZXIgPSBHZXRTY2VuZVByb3ZpZGVyKG51bWJlcik7XHJcbiAgICAgICAgICAgIF9zY2VuZSA9IHNjZW5lUHJvdmlkZXIuQ3JlYXRlU2NlbmUoX2NhbnZhcywgX2VuZ2luZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfZW5naW5lLnJ1blJlbmRlckxvb3AoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3NjZW5lLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBfaXNSdW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBBYnN0cmFjdFNjZW5lUHJvdmlkZXIgR2V0U2NlbmVQcm92aWRlcihpbnQgbnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChudW1iZXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNjZW5lMVByb3ZpZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2NlbmUyUHJvdmlkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2VuZTNQcm92aWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbihcIm51bWJlclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJhYnlsb25Kc0RlbW8uU2NlbmVQcm92aWRlcnNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE9yaWdpbmFsIHNvdXJjZXM6IGh0dHA6Ly93d3cuYmFieWxvbmpzLXBsYXlncm91bmQuY29tLyMxMlMyM1lcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgU2NlbmUxUHJvdmlkZXIgOiBBYnN0cmFjdFNjZW5lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUgQ3JlYXRlU2NlbmUoZG9tLkhUTUxDYW52YXNFbGVtZW50IGNhbnZhcywgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRW5naW5lIGVuZ2luZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhIGJhc2ljIEJhYnlsb24gU2NlbmUgb2JqZWN0IChub24tbWVzaClcclxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lKGVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhIGZyZWUgY2FtZXJhIChub24tbWVzaClcclxuICAgICAgICAgICAgdmFyIGNhbWVyYSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5GcmVlQ2FtZXJhKFwiY2FtZXJhMVwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCA1LCAtMTApLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cclxuICAgICAgICAgICAgY2FtZXJhLnNldFRhcmdldChSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzLlplcm8oKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGF0dGFjaGVzIHRoZSBjYW1lcmEgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGEgbGlnaHQsIGFpbWluZyAwLDEsMCAtIHRvIHRoZSBza3kgKG5vbi1tZXNoKVxyXG4gICAgICAgICAgICB2YXIgbGlnaHQgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCAxLCAwKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGVmYXVsdCBpbnRlbnNpdHkgaXMgMS4gTGV0J3MgZGltIHRoZSBsaWdodCBhIHNtYWxsIGFtb3VudFxyXG4gICAgICAgICAgICBsaWdodC5pbnRlbnNpdHkgPSAwLjc7XHJcblxyXG4gICAgICAgICAgICAvLyBPdXIgYnVpbHQtaW4gJ3NwaGVyZScgc2hhcGUuIFBhcmFtczogbmFtZSwgc3ViZGl2cywgc2l6ZSwgc2NlbmVcclxuICAgICAgICAgICAgdmFyIHNwaGVyZSA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwic3BoZXJlMVwiLCAxNiwgMiwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0aGUgc3BoZXJlIHVwd2FyZCAxLzIgaXRzIGhlaWdodFxyXG4gICAgICAgICAgICBzcGhlcmUucG9zaXRpb24ueSA9IDE7XHJcblxyXG4gICAgICAgICAgICAvLyBPdXIgYnVpbHQtaW4gJ2dyb3VuZCcgc2hhcGUuIFBhcmFtczogbmFtZSwgd2lkdGgsIGRlcHRoLCBzdWJkaXZzLCBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgZ3JvdW5kID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVHcm91bmQoXCJncm91bmQxXCIsIDYsIDYsIDIsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzY2VuZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIEJhYnlsb25Kc0RlbW8uU2NlbmVQcm92aWRlcnNcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE9yaWdpbmFsIHNvdXJjZXM6IGh0dHA6Ly93d3cuYmFieWxvbmpzLXBsYXlncm91bmQuY29tLyNOWFhNUjZcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgU2NlbmUyUHJvdmlkZXIgOiBBYnN0cmFjdFNjZW5lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUgQ3JlYXRlU2NlbmUoZG9tLkhUTUxDYW52YXNFbGVtZW50IGNhbnZhcywgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uRW5naW5lIGVuZ2luZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TY2VuZShlbmdpbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgY2FtZXJhXHJcbiAgICAgICAgICAgIHZhciBjYW1lcmEgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIDAsIDAsIDEwLCBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICBjYW1lcmEuc2V0UG9zaXRpb24obmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoLTEwLCAxMCwgMCkpO1xyXG4gICAgICAgICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGlnaHRzXHJcbiAgICAgICAgICAgIHZhciBsaWdodDAgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIk9tbmkwXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDAsIDEwLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQxID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlBvaW50TGlnaHQoXCJPbW5pMVwiLCBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uVmVjdG9yMygwLCAtMTAsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodDIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uUG9pbnRMaWdodChcIk9tbmkyXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEwLCAwLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQzID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJEaXIwXCIsIG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEsIC0xLCAwKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJrb3NoXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIHNwaGVyZSA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwiU3BoZXJlXCIsIDE2LCAzLCBzY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGluZyBsaWdodCBzcGhlcmVcclxuICAgICAgICAgICAgdmFyIGxpZ2h0U3BoZXJlMCA9IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKFwiU3BoZXJlMFwiLCAxNiwgMC41LCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBsaWdodFNwaGVyZTEgPSBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcIlNwaGVyZTFcIiwgMTYsIDAuNSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHRTcGhlcmUyID0gUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoXCJTcGhlcmUyXCIsIDE2LCAwLjUsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZWRNYXRlcmlhbCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicmVkXCIsIHNjZW5lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAwLCAwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyZWVuTWF0ZXJpYWwgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImdyZWVuXCIsIHNjZW5lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCksXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAxLCAwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGJsdWVNYXRlcmlhbCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiYmx1ZVwiLCBzY2VuZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgICAgIHNwZWN1bGFyQ29sb3IgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQ29sb3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVDb2xvciA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Db2xvcjMoMCwgMCwgMSlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0U3BoZXJlMC5tYXRlcmlhbCA9IHJlZE1hdGVyaWFsO1xyXG4gICAgICAgICAgICBsaWdodFNwaGVyZTEubWF0ZXJpYWwgPSBncmVlbk1hdGVyaWFsO1xyXG4gICAgICAgICAgICBsaWdodFNwaGVyZTIubWF0ZXJpYWwgPSBibHVlTWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGhlcmUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcclxuICAgICAgICAgICAgc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAvLyBMaWdodHMgY29sb3JzXHJcbiAgICAgICAgICAgIGxpZ2h0MC5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAwLCAwKTtcclxuICAgICAgICAgICAgbGlnaHQwLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAwLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0MS5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgbGlnaHQxLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAxLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0Mi5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAxKTtcclxuICAgICAgICAgICAgbGlnaHQyLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygwLCAwLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0My5kaWZmdXNlID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcclxuICAgICAgICAgICAgbGlnaHQzLnNwZWN1bGFyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkNvbG9yMygxLCAxLCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbnNcclxuICAgICAgICAgICAgdmFyIGFscGhhID0gMC4wO1xyXG4gICAgICAgICAgICBzY2VuZS5iZWZvcmVSZW5kZXIgPSBuZXcgU3lzdGVtLkFjdGlvbigoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgbGlnaHQwLnBvc2l0aW9uID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMTAgKiBlczUuTWF0aC5zaW4oYWxwaGEpLCAwLCAxMCAqIGVzNS5NYXRoLmNvcyhhbHBoYSkpO1xyXG4gICAgICAgICAgICAgICAgbGlnaHQxLnBvc2l0aW9uID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMTAgKiBlczUuTWF0aC5zaW4oYWxwaGEpLCAwLCAtMTAgKiBlczUuTWF0aC5jb3MoYWxwaGEpKTtcclxuICAgICAgICAgICAgICAgIGxpZ2h0Mi5wb3NpdGlvbiA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5WZWN0b3IzKDEwICogZXM1Lk1hdGguY29zKGFscGhhKSwgMCwgMTAgKiBlczUuTWF0aC5zaW4oYWxwaGEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaWdodFNwaGVyZTAucG9zaXRpb24gPSBsaWdodDAucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBsaWdodFNwaGVyZTEucG9zaXRpb24gPSBsaWdodDEucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBsaWdodFNwaGVyZTIucG9zaXRpb24gPSBsaWdodDIucG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgYWxwaGEgKz0gMC4wMTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBCYWJ5bG9uSnNEZW1vLlNjZW5lUHJvdmlkZXJzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBPcmlnaW5hbCBzb3VyY2VzOiBodHRwOi8vd3d3LmJhYnlsb25qcy1wbGF5Z3JvdW5kLmNvbS8jR0pVTVNaXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIFNjZW5lM1Byb3ZpZGVyIDogQWJzdHJhY3RTY2VuZVByb3ZpZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNjZW5lIENyZWF0ZVNjZW5lKGRvbS5IVE1MQ2FudmFzRWxlbWVudCBjYW52YXMsIFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLkVuZ2luZSBlbmdpbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU2NlbmUoZW5naW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjYW1lcmEgYW5kIGxpZ2h0XHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5Qb2ludExpZ2h0KFwiUG9pbnRcIiwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoNSwgMTAsIDUpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHZhciBjYW1lcmEgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIDEsIDAuOCwgOCwgbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlZlY3RvcjMoMCwgMCwgMCksIHNjZW5lKTtcclxuICAgICAgICAgICAgY2FtZXJhLmF0dGFjaENvbnRyb2woY2FudmFzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNwcml0ZSBtYW5hZ2VyIHRvIG9wdGltaXplIEdQVSByZXNzb3VyY2VzXHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnMgOiBuYW1lLCBpbWdVcmwsIGNhcGFjaXR5LCBjZWxsU2l6ZSwgc2NlbmVcclxuICAgICAgICAgICAgdmFyIHNwcml0ZU1hbmFnZXJUcmVlcyA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKFwidHJlZXNNYW5hZ2VyXCIsIFwiaHR0cHM6Ly9kZW1vcy5yZXR5cGVkLmNvbS9kaXN0L2JhYnlsb24uanMvaW1nL3BhbG0ucG5nXCIsIDIwMDAsIDgwMCwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy9XZSBjcmVhdGUgMjAwMCB0cmVlcyBhdCByYW5kb20gcG9zaXRpb25zXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjAwMDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJlZSA9IG5ldyBSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGUoXCJ0cmVlXCIsIHNwcml0ZU1hbmFnZXJUcmVlcyk7XHJcbiAgICAgICAgICAgICAgICB0cmVlLnBvc2l0aW9uLnggPSBlczUuTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xyXG4gICAgICAgICAgICAgICAgdHJlZS5wb3NpdGlvbi56ID0gZXM1Lk1hdGgucmFuZG9tKCkgKiAxMDAgLSA1MDtcclxuICAgICAgICAgICAgICAgIHRyZWUuaXNQaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Tb21lIFwiZGVhZFwiIHRyZWVzXHJcbiAgICAgICAgICAgICAgICBpZiAoZXM1Lk1hdGgucm91bmQoZXM1Lk1hdGgucmFuZG9tKCkgKiA1KSA9PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWUuYW5nbGUgPSBlczUuTWF0aC5QSSAqIDkwIC8gMTgwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyZWUucG9zaXRpb24ueSA9IC0wLjM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgbWFuYWdlciBmb3IgdGhlIHBsYXllcidzIHNwcml0ZSBhbmltYXRpb25cclxuICAgICAgICAgICAgdmFyIHNwcml0ZU1hbmFnZXJQbGF5ZXIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlTWFuYWdlcihcInBsYXllck1hbmFnZXJcIiwgXCJodHRwczovL2RlbW9zLnJldHlwZWQuY29tL2Rpc3QvYmFieWxvbi5qcy9pbWcvcGxheWVyLnBuZ1wiLCAyLCA2NCwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmlyc3QgYW5pbWF0ZWQgcGxheWVyXHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUmV0eXBlZC5iYWJ5bG9uX2pzLkJBQllMT04uU3ByaXRlKFwicGxheWVyXCIsIHNwcml0ZU1hbmFnZXJQbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIucGxheUFuaW1hdGlvbigwLCA0MCwgdHJ1ZSwgMTAwLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKW51bGwpO1xyXG4gICAgICAgICAgICBwbGF5ZXIucG9zaXRpb24ueSA9IC0wLjM7XHJcbiAgICAgICAgICAgIHBsYXllci5zaXplID0gMC4zO1xyXG4gICAgICAgICAgICBwbGF5ZXIuaXNQaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBTZWNvbmQgc3RhbmRpbmcgcGxheWVyXHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIyID0gbmV3IFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlNwcml0ZShcInBsYXllcjJcIiwgc3ByaXRlTWFuYWdlclBsYXllcik7XHJcbiAgICAgICAgICAgIHBsYXllcjIuc3RvcEFuaW1hdGlvbigpOyAvLyBOb3QgYW5pbWF0ZWRcclxuICAgICAgICAgICAgcGxheWVyMi5jZWxsSW5kZXggPSAyOyAvLyBHb2luZyB0byBmcmFtZSBudW1iZXIgMlxyXG4gICAgICAgICAgICBwbGF5ZXIyLnBvc2l0aW9uLnkgPSAtMC4zO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLnBvc2l0aW9uLnggPSAxO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLnNpemUgPSAwLjM7XHJcbiAgICAgICAgICAgIHBsYXllcjIuaW52ZXJ0VSA9IC0xOyAvL0NoYW5nZSBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICBwbGF5ZXIyLmlzUGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gUGlja2luZ1xyXG4gICAgICAgICAgICBzcHJpdGVNYW5hZ2VyVHJlZXMuaXNQaWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNwcml0ZU1hbmFnZXJQbGF5ZXIuaXNQaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBzY2VuZS5vblBvaW50ZXJEb3duID0gKGV2dCwgcGlja0luZm8pID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBwaWNrUmVzdWx0ID0gKFJldHlwZWQuYmFieWxvbl9qcy5CQUJZTE9OLlBpY2tpbmdJbmZvKSBzY2VuZS5waWNrU3ByaXRlKHNjZW5lLnBvaW50ZXJYLCBzY2VuZS5wb2ludGVyWSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGlja1Jlc3VsdC5oaXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwcml0ZSA9IChSZXR5cGVkLmJhYnlsb25fanMuQkFCWUxPTi5TcHJpdGUpIHBpY2tSZXN1bHQucGlja2VkU3ByaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5hbmdsZSArPSAwLjU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIl0KfQo=
