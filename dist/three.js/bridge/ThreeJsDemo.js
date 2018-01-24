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
                        var container = document.createElement("div");
                        document.body.appendChild(container);
    
                        //
                        ThreeJsDemo.App.camera = ($t = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000), $t.position.y = 300, $t);
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
                        ThreeJsDemo.App.renderer.setSize(window.innerWidth, window.innerHeight);
                        container.appendChild(ThreeJsDemo.App.renderer.domElement);
    
                        //
                        window.addEventListener("resize", function (e) {
                            ThreeJsDemo.App.OnWindowResize();
                        }, false);
                    },
                    OnWindowResize: function () {
                        ThreeJsDemo.App.camera.aspect = window.innerWidth / window.innerHeight;
                        ThreeJsDemo.App.camera.updateProjectionMatrix();
                        ThreeJsDemo.App.renderer.setSize(window.innerWidth, window.innerHeight);
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
                    }
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUaHJlZUpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBeUJZQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFLQUEsZ0JBQWdCQTt3QkFDaEJBLDBCQUF1RUE7Ozt3QkFHdkVBLHlCQUFTQSxVQUFJQSw0QkFBb0NBLG9CQUFpQ0E7d0JBSWxGQSwrQkFBZUEsSUFBSUE7O3dCQUVuQkEsd0JBQVFBLFVBQUlBLCtCQUVLQSxJQUFJQTs7O3dCQUlyQkEsWUFBWUEsSUFBSUE7d0JBQ2hCQTt3QkFDQUEsMEJBQVVBOzt3QkFFVkEsUUFBUUEsSUFBSUE7d0JBQ1pBLG1CQUFtQkEsSUFBSUEsSUFBSUE7d0JBQzNCQSwwQkFBVUE7O3dCQUVWQSxhQUFhQSxJQUFJQTt3QkFDakJBLG1IQUFtSEEsQUFBMENBLFVBQUNBLFVBQVVBOzRCQUVwS0EsV0FBV0EsSUFBSUEsV0FBbUJBLFVBQVVBLElBQUlBLDBCQUFrQ0EsZ0JBRS9EQTs7NEJBSW5CQTs0QkFDQUEsMEJBQVVBOzs0QkFFVkEsd0JBQVFBLElBQUlBLHFCQUE2QkE7OzRCQUV6Q0EsV0FBV0EsNERBQW9FQTs0QkFDL0VBLGlDQUFpQkE7Ozs7d0JBSXJCQSwyQkFBV0EsSUFBSUE7d0JBQ2ZBLHVDQUF1QkE7d0JBQ3ZCQSxpQ0FBaUJBLG1CQUErQkE7d0JBQ2hEQSxzQkFBNkRBOzs7d0JBRzdEQSxrQ0FBOENBLEFBQW1EQTs0QkFBS0E7Ozs7d0JBS3RHQSxnQ0FBZ0JBLG9CQUFpQ0E7d0JBQ2pEQTt3QkFDQUEsaUNBQWlCQSxtQkFBK0JBOzs7d0JBS2hEQSxzQkFBa0NBLEFBQVdBO3dCQUM3Q0E7Ozt3QkFLQUE7d0JBQ0FBLG9DQUFvQkEseUJBQVNBLFNBQXFCQSxvQkFBb0JBO3dCQUN0RUEsb0NBQW9CQSx5QkFBU0EsU0FBcUJBLG9CQUFvQkE7O3dCQUV0RUEsOEJBQWNBOzt3QkFFZEEsSUFBSUEseUJBQVNBOzRCQUVUQSxXQUFXQTs0QkFDWEEsNkJBQWFBLENBQUNBLE9BQU9BOzRCQUNyQkEsMkJBQVdBOzt3QkFFZkEsZ0NBQWdCQSx1QkFBT0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxudXNpbmcgTWF0aCA9IFJldHlwZWQuZXM1Lk1hdGg7XHJcblxyXG5uYW1lc3BhY2UgVGhyZWVKc0RlbW9cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFNlZSB0aGUgb3JpZ2luYWwgc2FtcGxlIGhlcmU6XHJcbiAgICAvLy8gaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy8jd2ViZ2xfbW9ycGh0YXJnZXRzX2hvcnNlXHJcbiAgICAvLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL2RhMjkzNjU0MGE0ODc3NGIwNDNhMWU2MTdiZGRiZGNlNTEwMmU0MTcvZXhhbXBsZXMvd2ViZ2xfbW9ycGh0YXJnZXRzX2hvcnNlLmh0bWxcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSBjYW1lcmE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5TY2VuZSBzY2VuZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLkFuaW1hdGlvbk1peGVyIG1peGVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuV2ViR0xSZW5kZXJlciByZW5kZXJlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgdGhldGE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIHJhZGl1cyA9IDYwMDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgcHJldlRpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5WZWN0b3IzIGNhbWVyYVRhcmdldDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5pdCgpO1xyXG4gICAgICAgICAgICBBbmltYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxFbGVtZW50Pihjb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgY2FtZXJhID0gbmV3IFJldHlwZWQudGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEoNTAsIFJldHlwZWQuZG9tLndpbmRvdyAuaW5uZXJXaWR0aCAvIFJldHlwZWQuZG9tLndpbmRvdy5pbm5lckhlaWdodCwgMSwgMTAwMDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0ge3kgPSAzMDB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNhbWVyYVRhcmdldCA9IG5ldyBSZXR5cGVkLnRocmVlLlZlY3RvcjMoMCwgMTUwLCAwKTtcclxuXHJcbiAgICAgICAgICAgIHNjZW5lID0gbmV3IFJldHlwZWQudGhyZWUuU2NlbmVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZCA9IG5ldyBSZXR5cGVkLnRocmVlLkNvbG9yKDB4ZjBmMGYwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IFJldHlwZWQudGhyZWUuRGlyZWN0aW9uYWxMaWdodCgweGVmZWZmZiwgMS41KTtcclxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzY2VuZS5hZGQobGlnaHQpO1xyXG5cclxuICAgICAgICAgICAgbGlnaHQgPSBuZXcgUmV0eXBlZC50aHJlZS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZmVmLCAxLjUpO1xyXG4gICAgICAgICAgICBsaWdodC5wb3NpdGlvbi5zZXQoLTEsIC0xLCAtMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGVyID0gbmV3IFJldHlwZWQudGhyZWUuSlNPTkxvYWRlcigpO1xyXG4gICAgICAgICAgICBsb2FkZXIubG9hZChcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SZXR5cGVkL0RlbW9zL21hc3Rlci9UaHJlZUpzRGVtby9UaHJlZUpzRGVtby9kaXN0L21vZGVscy9ob3JzZS5qc1wiLCAoZ2xvYmFsOjpSZXR5cGVkLnRocmVlLkpTT05Mb2FkZXIubG9hZEZuKSgoZ2VvbWV0cnksIG1hdGVyaWFscykgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc2ggPSBuZXcgUmV0eXBlZC50aHJlZS5NZXNoKGdlb21ldHJ5LCBuZXcgUmV0eXBlZC50aHJlZS5NZXNoTGFtYmVydE1hdGVyaWFsKG5ldyBSZXR5cGVkLnRocmVlLk1lc2hMYW1iZXJ0TWF0ZXJpYWxQYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4Q29sb3JzID0gUmV0eXBlZC50aHJlZS5GYWNlQ29sb3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0cyA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNoLnNjYWxlLnNldCgxLjUsIDEuNSwgMS41KTtcclxuICAgICAgICAgICAgICAgIHNjZW5lLmFkZChtZXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtaXhlciA9IG5ldyBSZXR5cGVkLnRocmVlLkFuaW1hdGlvbk1peGVyKG1lc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjbGlwID0gUmV0eXBlZC50aHJlZS5BbmltYXRpb25DbGlwLkNyZWF0ZUZyb21Nb3JwaFRhcmdldFNlcXVlbmNlKFwiZ2FsbG9wXCIsIGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cywgMzAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG1peGVyLmNsaXBBY3Rpb24oY2xpcCkuc2V0RHVyYXRpb24oMSkucGxheSgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHJlbmRlcmVyID0gbmV3IFJldHlwZWQudGhyZWUuV2ViR0xSZW5kZXJlcigpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKFJldHlwZWQuZG9tLndpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZShSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJXaWR0aCwgUmV0eXBlZC5kb20ud2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTENhbnZhc0VsZW1lbnQ+KHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmRvbS5FdmVudD4pKGUgPT4gT25XaW5kb3dSZXNpemUoKSksIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBPbldpbmRvd1Jlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYW1lcmEuYXNwZWN0ID0gUmV0eXBlZC5kb20ud2luZG93IC5pbm5lcldpZHRoIC8gUmV0eXBlZC5kb20ud2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTaXplKFJldHlwZWQuZG9tLndpbmRvdy5pbm5lcldpZHRoLCBSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEFuaW1hdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG5ldyBBY3Rpb24oQW5pbWF0ZSkuQXM8UmV0eXBlZC5kb20uRnJhbWVSZXF1ZXN0Q2FsbGJhY2s+KCkpO1xyXG4gICAgICAgICAgICBSZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhldGEgKz0gMC4xO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueCA9IHJhZGl1cyAqIFJldHlwZWQuZXM1Lk1hdGguc2luKHRocmVlLk1hdGguZGVnVG9SYWQodGhldGEpKTtcclxuICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSByYWRpdXMgKiBSZXR5cGVkLmVzNS5NYXRoLmNvcyh0aHJlZS5NYXRoLmRlZ1RvUmFkKHRoZXRhKSk7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEubG9va0F0KGNhbWVyYVRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWl4ZXIgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBSZXR5cGVkLmVzNS5EYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgbWl4ZXIudXBkYXRlKCh0aW1lIC0gcHJldlRpbWUpICogMC4wMDEpO1xyXG4gICAgICAgICAgICAgICAgcHJldlRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
