/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("ThreeJsDemo", function ($asm, globals) {
    "use strict";

    require(["three"], function (THREE) {
        /** @namespace ThreeJsDemo */
    
        /**
         * See the original sample here:
         https://threejs.org/examples/#webgl_morphtargets_horse
         https://github.com/mrdoob/three.js/blob/da2936540a48774b043a1e617bddbdce5102e417/examples/webgl_morphtargets_horse.html
         *
         * @public
         * @class ThreeJsDemo.App
         */
        Bridge.define("ThreeJsDemo.App", {
            main: function Main () {
                ThreeJsDemo.App.Init();
                ThreeJsDemo.App.Animate();
            },
            statics: {
                fields: {
                    container: null,
                    camera: null,
                    scene: null,
                    mixer: null,
                    renderer: null,
                    theta: 0,
                    radius: 0,
                    prevTime: 0,
                    cameraTarget: null
                },
                ctors: {
                    init: function () {
                        this.radius = 600;
                    }
                },
                methods: {
                    Init: function () {
                        var $t;
                        ThreeJsDemo.App.container = document.createElement("div");
                        document.body.appendChild(ThreeJsDemo.App.container);
    
                        //
                        var height = ThreeJsDemo.App.GetAvailableHeight();
                        var width = window.innerWidth;
    
                        ThreeJsDemo.App.camera = ($t = new THREE.PerspectiveCamera(50, width / height, 1, 10000), $t.position.y = 300, $t);
                        ThreeJsDemo.App.cameraTarget = new THREE.Vector3(0, 150, 0);
    
                        ThreeJsDemo.App.scene = ($t = new THREE.Scene(), $t.background = new THREE.Color(15790320), $t);
    
                        //
                        var light = new THREE.DirectionalLight(15724543, 1.5);
                        light.position.set(1, 1, 1).normalize();
                        ThreeJsDemo.App.scene.add(light);
    
                        light = new THREE.DirectionalLight(16773103, 1.5);
                        light.position.set(-1, -1, -1).normalize();
                        ThreeJsDemo.App.scene.add(light);
    
                        var loader = new THREE.JSONLoader();
                        loader.load("https://raw.githubusercontent.com/Retyped/Demos/master/ThreeJsDemo/ThreeJsDemo/dist/models/horse.js", function (geometry, materials) {
                            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors, morphTargets: true }));
    
                            mesh.scale.set(1.5, 1.5, 1.5);
                            ThreeJsDemo.App.scene.add(mesh);
    
                            ThreeJsDemo.App.mixer = new THREE.AnimationMixer(mesh);
    
                            var clip = THREE.AnimationClip.CreateFromMorphTargetSequence("gallop", geometry.morphTargets, 30, false);
                            ThreeJsDemo.App.mixer.clipAction(clip).setDuration(1).play();
                        });
    
                        //
                        ThreeJsDemo.App.renderer = new THREE.WebGLRenderer();
                        ThreeJsDemo.App.renderer.setPixelRatio(window.devicePixelRatio);
                        ThreeJsDemo.App.renderer.setSize(width, height);
                        ThreeJsDemo.App.container.appendChild(ThreeJsDemo.App.renderer.domElement);
    
                        //
                        window.addEventListener("resize", function (e) {
                            ThreeJsDemo.App.OnWindowResize();
                        }, false);
                    },
                    OnWindowResize: function () {
                        var height = ThreeJsDemo.App.GetAvailableHeight();
                        var width = window.innerWidth;
    
                        ThreeJsDemo.App.camera.aspect = width / height;
                        ThreeJsDemo.App.camera.updateProjectionMatrix();
                        ThreeJsDemo.App.renderer.setSize(width, height);
                    },
                    Animate: function () {
                        requestAnimationFrame(ThreeJsDemo.App.Animate);
                        ThreeJsDemo.App.Render();
                    },
                    Render: function () {
                        ThreeJsDemo.App.theta += 0.1;
                        ThreeJsDemo.App.camera.position.x = ThreeJsDemo.App.radius * Math.sin(THREE.Math.degToRad(ThreeJsDemo.App.theta));
                        ThreeJsDemo.App.camera.position.z = ThreeJsDemo.App.radius * Math.cos(THREE.Math.degToRad(ThreeJsDemo.App.theta));
    
                        ThreeJsDemo.App.camera.lookAt(ThreeJsDemo.App.cameraTarget);
    
                        if (ThreeJsDemo.App.mixer != null) {
                            var time = Date.now();
                            ThreeJsDemo.App.mixer.update((time - ThreeJsDemo.App.prevTime) * 0.001);
                            ThreeJsDemo.App.prevTime = time;
                        }
                        ThreeJsDemo.App.renderer.render(ThreeJsDemo.App.scene, ThreeJsDemo.App.camera);
                    },
                    GetAvailableHeight: function () {
                        // Original version:
                        var height = window.innerHeight;
    
                        // Adjust height to respect Retyped Ddemos WebSite layout:
    
                        // offsetTop represents height of header (= footer)
                        height -= 2 * ThreeJsDemo.App.container.offsetTop; // offsetTop represents height of the header (= height of the footer)
    
                        // Respect the borders:
                        height -= 2;
    
                        return height;
                    }
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUaHJlZUpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBMEJZQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBS0FBLDRCQUFZQTt3QkFDWkEsMEJBQXVFQTs7O3dCQUd2RUEsYUFBYUE7d0JBQ2JBLFlBQVlBOzt3QkFFWkEseUJBQVNBLFVBQUlBLDRCQUFvQ0EsUUFBUUE7d0JBSXpEQSwrQkFBZUEsSUFBSUE7O3dCQUVuQkEsd0JBQVFBLFVBQUlBLCtCQUVLQSxJQUFJQTs7O3dCQUlyQkEsWUFBWUEsSUFBSUE7d0JBQ2hCQTt3QkFDQUEsMEJBQVVBOzt3QkFFVkEsUUFBUUEsSUFBSUE7d0JBQ1pBLG1CQUFtQkEsSUFBSUEsSUFBSUE7d0JBQzNCQSwwQkFBVUE7O3dCQUVWQSxhQUFhQSxJQUFJQTt3QkFDakJBLG1IQUFtSEEsQUFBMENBLFVBQUNBLFVBQVVBOzRCQUVwS0EsV0FBV0EsSUFBSUEsV0FBbUJBLFVBQVVBLElBQUlBLDBCQUFrQ0EsZ0JBRS9EQTs7NEJBSW5CQTs0QkFDQUEsMEJBQVVBOzs0QkFFVkEsd0JBQVFBLElBQUlBLHFCQUE2QkE7OzRCQUV6Q0EsV0FBV0EsNERBQW9FQTs0QkFDL0VBLGlDQUFpQkE7Ozs7d0JBSXJCQSwyQkFBV0EsSUFBSUE7d0JBQ2ZBLHVDQUF1QkE7d0JBQ3ZCQSxpQ0FBaUJBLE9BQU9BO3dCQUN4QkEsc0NBQTZEQTs7O3dCQUc3REEsa0NBQThDQSxBQUFtREE7NEJBQUtBOzs7O3dCQUt0R0EsYUFBYUE7d0JBQ2JBLFlBQVlBOzt3QkFFWkEsZ0NBQWdCQSxRQUFRQTt3QkFDeEJBO3dCQUNBQSxpQ0FBaUJBLE9BQU9BOzs7d0JBS3hCQSxzQkFBa0NBLEFBQVdBO3dCQUM3Q0E7Ozt3QkFLQUE7d0JBQ0FBLG9DQUFvQkEseUJBQVNBLFNBQXFCQSxvQkFBb0JBO3dCQUN0RUEsb0NBQW9CQSx5QkFBU0EsU0FBcUJBLG9CQUFvQkE7O3dCQUV0RUEsOEJBQWNBOzt3QkFFZEEsSUFBSUEseUJBQVNBOzRCQUVUQSxXQUFXQTs0QkFDWEEsNkJBQWFBLENBQUNBLE9BQU9BOzRCQUNyQkEsMkJBQVdBOzt3QkFFZkEsZ0NBQWdCQSx1QkFBT0E7Ozs7d0JBTXZCQSxhQUFhQTs7Ozs7d0JBS2JBLFVBQVVBLElBQUlBOzs7d0JBR2RBOzt3QkFFQUEsT0FBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxudXNpbmcgTWF0aCA9IFJldHlwZWQuZXM1Lk1hdGg7XHJcblxyXG5uYW1lc3BhY2UgVGhyZWVKc0RlbW9cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFNlZSB0aGUgb3JpZ2luYWwgc2FtcGxlIGhlcmU6XHJcbiAgICAvLy8gaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy8jd2ViZ2xfbW9ycGh0YXJnZXRzX2hvcnNlXHJcbiAgICAvLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL2RhMjkzNjU0MGE0ODc3NGIwNDNhMWU2MTdiZGRiZGNlNTEwMmU0MTcvZXhhbXBsZXMvd2ViZ2xfbW9ycGh0YXJnZXRzX2hvcnNlLmh0bWxcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgY29udGFpbmVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEgY2FtZXJhO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuU2NlbmUgc2NlbmU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5BbmltYXRpb25NaXhlciBtaXhlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLldlYkdMUmVuZGVyZXIgcmVuZGVyZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIHRoZXRhO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSByYWRpdXMgPSA2MDA7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIHByZXZUaW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuVmVjdG9yMyBjYW1lcmFUYXJnZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluaXQoKTtcclxuICAgICAgICAgICAgQW5pbWF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IFJldHlwZWQuZG9tLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRWxlbWVudD4oY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBHZXRBdmFpbGFibGVIZWlnaHQoKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gUmV0eXBlZC5kb20ud2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEgPSBuZXcgUmV0eXBlZC50aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSg1MCwgd2lkdGggLyBoZWlnaHQsIDEsIDEwMDAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHt5ID0gMzAwfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjYW1lcmFUYXJnZXQgPSBuZXcgUmV0eXBlZC50aHJlZS5WZWN0b3IzKDAsIDE1MCwgMCk7XHJcblxyXG4gICAgICAgICAgICBzY2VuZSA9IG5ldyBSZXR5cGVkLnRocmVlLlNjZW5lXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBuZXcgUmV0eXBlZC50aHJlZS5Db2xvcigweGYwZjBmMClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBSZXR5cGVkLnRocmVlLkRpcmVjdGlvbmFsTGlnaHQoMHhlZmVmZmYsIDEuNSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uLnNldCgxLCAxLCAxKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0ID0gbmV3IFJldHlwZWQudGhyZWUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWZlZiwgMS41KTtcclxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KC0xLCAtMSwgLTEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzY2VuZS5hZGQobGlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBSZXR5cGVkLnRocmVlLkpTT05Mb2FkZXIoKTtcclxuICAgICAgICAgICAgbG9hZGVyLmxvYWQoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUmV0eXBlZC9EZW1vcy9tYXN0ZXIvVGhyZWVKc0RlbW8vVGhyZWVKc0RlbW8vZGlzdC9tb2RlbHMvaG9yc2UuanNcIiwgKGdsb2JhbDo6UmV0eXBlZC50aHJlZS5KU09OTG9hZGVyLmxvYWRGbikoKGdlb21ldHJ5LCBtYXRlcmlhbHMpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNoID0gbmV3IFJldHlwZWQudGhyZWUuTWVzaChnZW9tZXRyeSwgbmV3IFJldHlwZWQudGhyZWUuTWVzaExhbWJlcnRNYXRlcmlhbChuZXcgUmV0eXBlZC50aHJlZS5NZXNoTGFtYmVydE1hdGVyaWFsUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleENvbG9ycyA9IFJldHlwZWQudGhyZWUuRmFjZUNvbG9ycyxcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldHMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVzaC5zY2FsZS5zZXQoMS41LCAxLjUsIDEuNSk7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5hZGQobWVzaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWl4ZXIgPSBuZXcgUmV0eXBlZC50aHJlZS5BbmltYXRpb25NaXhlcihtZXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2xpcCA9IFJldHlwZWQudGhyZWUuQW5pbWF0aW9uQ2xpcC5DcmVhdGVGcm9tTW9ycGhUYXJnZXRTZXF1ZW5jZShcImdhbGxvcFwiLCBnZW9tZXRyeS5tb3JwaFRhcmdldHMsIDMwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBtaXhlci5jbGlwQWN0aW9uKGNsaXApLnNldER1cmF0aW9uKDEpLnBsYXkoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICByZW5kZXJlciA9IG5ldyBSZXR5cGVkLnRocmVlLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhSZXR5cGVkLmRvbS53aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50PihyZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+IE9uV2luZG93UmVzaXplKCkpLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIE9uV2luZG93UmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBHZXRBdmFpbGFibGVIZWlnaHQoKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gUmV0eXBlZC5kb20ud2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIEFuaW1hdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG5ldyBBY3Rpb24oQW5pbWF0ZSkuQXM8UmV0eXBlZC5kb20uRnJhbWVSZXF1ZXN0Q2FsbGJhY2s+KCkpO1xyXG4gICAgICAgICAgICBSZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoZXRhICs9IDAuMTtcclxuICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSByYWRpdXMgKiBSZXR5cGVkLmVzNS5NYXRoLnNpbih0aHJlZS5NYXRoLmRlZ1RvUmFkKHRoZXRhKSk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gcmFkaXVzICogUmV0eXBlZC5lczUuTWF0aC5jb3ModGhyZWUuTWF0aC5kZWdUb1JhZCh0aGV0YSkpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLmxvb2tBdChjYW1lcmFUYXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1peGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gUmV0eXBlZC5lczUuRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIG1peGVyLnVwZGF0ZSgodGltZSAtIHByZXZUaW1lKSAqIDAuMDAxKTtcclxuICAgICAgICAgICAgICAgIHByZXZUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgR2V0QXZhaWxhYmxlSGVpZ2h0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIE9yaWdpbmFsIHZlcnNpb246XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGp1c3QgaGVpZ2h0IHRvIHJlc3BlY3QgUmV0eXBlZCBEZGVtb3MgV2ViU2l0ZSBsYXlvdXQ6XHJcblxyXG4gICAgICAgICAgICAvLyBvZmZzZXRUb3AgcmVwcmVzZW50cyBoZWlnaHQgb2YgaGVhZGVyICg9IGZvb3RlcilcclxuICAgICAgICAgICAgaGVpZ2h0IC09IDIgKiBjb250YWluZXIub2Zmc2V0VG9wOyAvLyBvZmZzZXRUb3AgcmVwcmVzZW50cyBoZWlnaHQgb2YgdGhlIGhlYWRlciAoPSBoZWlnaHQgb2YgdGhlIGZvb3RlcilcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc3BlY3QgdGhlIGJvcmRlcnM6XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSAyO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
