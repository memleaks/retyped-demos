/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.0
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
    
                        var height = ThreeJsDemo.App.GetAvailableHeight();
                        var width = window.innerWidth;
    
                        ThreeJsDemo.App.camera = ($t = new THREE.PerspectiveCamera(50, width / height, 1, 10000), $t.position.y = 300, $t);
                        ThreeJsDemo.App.cameraTarget = new THREE.Vector3(0, 150, 0);
    
                        ThreeJsDemo.App.scene = ($t = new THREE.Scene(), $t.background = new THREE.Color(15790320), $t);
    
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
    
                        ThreeJsDemo.App.renderer = new THREE.WebGLRenderer();
                        ThreeJsDemo.App.renderer.setPixelRatio(window.devicePixelRatio);
                        ThreeJsDemo.App.renderer.setSize(width, height);
                        ThreeJsDemo.App.container.appendChild(ThreeJsDemo.App.renderer.domElement);
    
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
                        var height = window.innerHeight;
    
    
                        height = (height - (Bridge.Int.mul(2, ThreeJsDemo.App.container.offsetTop))) | 0;
    
                        height = (height - 2) | 0;
    
                        return height;
                    }
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUaHJlZUpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBMEJZQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBS0FBLDRCQUFZQTt3QkFDWkEsMEJBQXVFQTs7d0JBR3ZFQSxhQUFhQTt3QkFDYkEsWUFBWUE7O3dCQUVaQSx5QkFBU0EsVUFBSUEsNEJBQW9DQSxRQUFRQTt3QkFJekRBLCtCQUFlQSxJQUFJQTs7d0JBRW5CQSx3QkFBUUEsVUFBSUEsK0JBRUtBLElBQUlBOzt3QkFJckJBLFlBQVlBLElBQUlBO3dCQUNoQkE7d0JBQ0FBLDBCQUFVQTs7d0JBRVZBLFFBQVFBLElBQUlBO3dCQUNaQSxtQkFBbUJBLElBQUlBLElBQUlBO3dCQUMzQkEsMEJBQVVBOzt3QkFFVkEsYUFBYUEsSUFBSUE7d0JBQ2pCQSxtSEFBbUhBLEFBQTBDQSxVQUFDQSxVQUFVQTs0QkFFcEtBLFdBQVdBLElBQUlBLFdBQW1CQSxVQUFVQSxJQUFJQSwwQkFBa0NBLGdCQUUvREE7OzRCQUluQkE7NEJBQ0FBLDBCQUFVQTs7NEJBRVZBLHdCQUFRQSxJQUFJQSxxQkFBNkJBOzs0QkFFekNBLFdBQVdBLDREQUFvRUE7NEJBQy9FQSxpQ0FBaUJBOzs7d0JBSXJCQSwyQkFBV0EsSUFBSUE7d0JBQ2ZBLHVDQUF1QkE7d0JBQ3ZCQSxpQ0FBaUJBLE9BQU9BO3dCQUN4QkEsc0NBQTZEQTs7d0JBRzdEQSxrQ0FBOENBLEFBQW1EQSxVQUFDQTs0QkFBZ0JBOzs7O3dCQUtsSEEsYUFBYUE7d0JBQ2JBLFlBQVlBOzt3QkFFWkEsZ0NBQWdCQSxRQUFRQTt3QkFDeEJBO3dCQUNBQSxpQ0FBaUJBLE9BQU9BOzs7d0JBS3hCQSxzQkFBa0NBLEFBQTBDQSxBQUFXQTt3QkFDdkZBOzs7d0JBS0FBO3dCQUNBQSxvQ0FBb0JBLHlCQUFTQSxTQUFxQkEsb0JBQW9CQTt3QkFDdEVBLG9DQUFvQkEseUJBQVNBLFNBQXFCQSxvQkFBb0JBOzt3QkFFdEVBLDhCQUFjQTs7d0JBRWRBLElBQUlBLHlCQUFTQTs0QkFFVEEsV0FBV0E7NEJBQ1hBLDZCQUFhQSxDQUFDQSxPQUFPQTs0QkFDckJBLDJCQUFXQTs7d0JBRWZBLGdDQUFnQkEsdUJBQU9BOzs7d0JBTXZCQSxhQUFhQTs7O3dCQUtiQSxtQkFBVUEsbUJBQUlBOzt3QkFHZEE7O3dCQUVBQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG51c2luZyBNYXRoID0gUmV0eXBlZC5lczUuTWF0aDtcclxuXHJcbm5hbWVzcGFjZSBUaHJlZUpzRGVtb1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gU2VlIHRoZSBvcmlnaW5hbCBzYW1wbGUgaGVyZTpcclxuICAgIC8vLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLyN3ZWJnbF9tb3JwaHRhcmdldHNfaG9yc2VcclxuICAgIC8vLyBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvZGEyOTM2NTQwYTQ4Nzc0YjA0M2ExZTYxN2JkZGJkY2U1MTAyZTQxNy9leGFtcGxlcy93ZWJnbF9tb3JwaHRhcmdldHNfaG9yc2UuaHRtbFxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCBjb250YWluZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSBjYW1lcmE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5TY2VuZSBzY2VuZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLkFuaW1hdGlvbk1peGVyIG1peGVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuV2ViR0xSZW5kZXJlciByZW5kZXJlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgdGhldGE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIHJhZGl1cyA9IDYwMDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgcHJldlRpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5WZWN0b3IzIGNhbWVyYVRhcmdldDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSW5pdCgpO1xyXG4gICAgICAgICAgICBBbmltYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxFbGVtZW50Pihjb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IEdldEF2YWlsYWJsZUhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYSA9IG5ldyBSZXR5cGVkLnRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhKDUwLCB3aWR0aCAvIGhlaWdodCwgMSwgMTAwMDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0ge3kgPSAzMDB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNhbWVyYVRhcmdldCA9IG5ldyBSZXR5cGVkLnRocmVlLlZlY3RvcjMoMCwgMTUwLCAwKTtcclxuXHJcbiAgICAgICAgICAgIHNjZW5lID0gbmV3IFJldHlwZWQudGhyZWUuU2NlbmVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZCA9IG5ldyBSZXR5cGVkLnRocmVlLkNvbG9yKDB4ZjBmMGYwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IFJldHlwZWQudGhyZWUuRGlyZWN0aW9uYWxMaWdodCgweGVmZWZmZiwgMS41KTtcclxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KDEsIDEsIDEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzY2VuZS5hZGQobGlnaHQpO1xyXG5cclxuICAgICAgICAgICAgbGlnaHQgPSBuZXcgUmV0eXBlZC50aHJlZS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZlZmVmLCAxLjUpO1xyXG4gICAgICAgICAgICBsaWdodC5wb3NpdGlvbi5zZXQoLTEsIC0xLCAtMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9hZGVyID0gbmV3IFJldHlwZWQudGhyZWUuSlNPTkxvYWRlcigpO1xyXG4gICAgICAgICAgICBsb2FkZXIubG9hZChcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SZXR5cGVkL0RlbW9zL21hc3Rlci9UaHJlZUpzRGVtby9UaHJlZUpzRGVtby9kaXN0L21vZGVscy9ob3JzZS5qc1wiLCAoZ2xvYmFsOjpSZXR5cGVkLnRocmVlLkpTT05Mb2FkZXIubG9hZEZuKSgoZ2VvbWV0cnksIG1hdGVyaWFscykgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc2ggPSBuZXcgUmV0eXBlZC50aHJlZS5NZXNoKGdlb21ldHJ5LCBuZXcgUmV0eXBlZC50aHJlZS5NZXNoTGFtYmVydE1hdGVyaWFsKG5ldyBSZXR5cGVkLnRocmVlLk1lc2hMYW1iZXJ0TWF0ZXJpYWxQYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4Q29sb3JzID0gUmV0eXBlZC50aHJlZS5GYWNlQ29sb3JzLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0cyA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNoLnNjYWxlLnNldCgxLjUsIDEuNSwgMS41KTtcclxuICAgICAgICAgICAgICAgIHNjZW5lLmFkZChtZXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtaXhlciA9IG5ldyBSZXR5cGVkLnRocmVlLkFuaW1hdGlvbk1peGVyKG1lc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjbGlwID0gUmV0eXBlZC50aHJlZS5BbmltYXRpb25DbGlwLkNyZWF0ZUZyb21Nb3JwaFRhcmdldFNlcXVlbmNlKFwiZ2FsbG9wXCIsIGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cywgMzAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIG1peGVyLmNsaXBBY3Rpb24oY2xpcCkuc2V0RHVyYXRpb24oMSkucGxheSgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHJlbmRlcmVyID0gbmV3IFJldHlwZWQudGhyZWUuV2ViR0xSZW5kZXJlcigpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKFJldHlwZWQuZG9tLndpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTENhbnZhc0VsZW1lbnQ+KHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmRvbS5FdmVudD4pKChkb20uRXZlbnQgZSkgPT4gT25XaW5kb3dSZXNpemUoKSksIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgT25XaW5kb3dSZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IEdldEF2YWlsYWJsZUhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcclxuICAgICAgICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQW5pbWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGdsb2JhbDo6UmV0eXBlZC5kb20uRnJhbWVSZXF1ZXN0Q2FsbGJhY2spbmV3IEFjdGlvbihBbmltYXRlKS5BczxSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjaz4oKSk7XHJcbiAgICAgICAgICAgIFJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhldGEgKz0gMC4xO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueCA9IHJhZGl1cyAqIFJldHlwZWQuZXM1Lk1hdGguc2luKHRocmVlLk1hdGguZGVnVG9SYWQodGhldGEpKTtcclxuICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSByYWRpdXMgKiBSZXR5cGVkLmVzNS5NYXRoLmNvcyh0aHJlZS5NYXRoLmRlZ1RvUmFkKHRoZXRhKSk7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEubG9va0F0KGNhbWVyYVRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWl4ZXIgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBSZXR5cGVkLmVzNS5EYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgbWl4ZXIudXBkYXRlKCh0aW1lIC0gcHJldlRpbWUpICogMC4wMDEpO1xyXG4gICAgICAgICAgICAgICAgcHJldlRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSBHZXRBdmFpbGFibGVIZWlnaHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgdmVyc2lvbjpcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IFJldHlwZWQuZG9tLndpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkanVzdCBoZWlnaHQgdG8gcmVzcGVjdCBSZXR5cGVkIERkZW1vcyBXZWJTaXRlIGxheW91dDpcclxuXHJcbiAgICAgICAgICAgIC8vIG9mZnNldFRvcCByZXByZXNlbnRzIGhlaWdodCBvZiBoZWFkZXIgKD0gZm9vdGVyKVxyXG4gICAgICAgICAgICBoZWlnaHQgLT0gMiAqIGNvbnRhaW5lci5vZmZzZXRUb3A7IC8vIG9mZnNldFRvcCByZXByZXNlbnRzIGhlaWdodCBvZiB0aGUgaGVhZGVyICg9IGhlaWdodCBvZiB0aGUgZm9vdGVyKVxyXG5cclxuICAgICAgICAgICAgLy8gUmVzcGVjdCB0aGUgYm9yZGVyczpcclxuICAgICAgICAgICAgaGVpZ2h0IC09IDI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
