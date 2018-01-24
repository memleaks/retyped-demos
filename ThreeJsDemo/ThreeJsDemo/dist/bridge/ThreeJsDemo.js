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
                        // Original version:
                        // var height = window.innerHeight;
    
                        // Retyped version: to respect WebSite header/footer:
                        var height = window.innerHeight - 2 * ThreeJsDemo.App.renderer.domElement.offsetTop - 2; // offsetTop represents height of header (= footer), 2 - borders
    
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
                    }
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUaHJlZUpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBeUJZQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFLQUEsZ0JBQWdCQTt3QkFDaEJBLDBCQUF1RUE7Ozt3QkFHdkVBLHlCQUFTQSxVQUFJQSw0QkFBb0NBLG9CQUFpQ0E7d0JBSWxGQSwrQkFBZUEsSUFBSUE7O3dCQUVuQkEsd0JBQVFBLFVBQUlBLCtCQUVLQSxJQUFJQTs7O3dCQUlyQkEsWUFBWUEsSUFBSUE7d0JBQ2hCQTt3QkFDQUEsMEJBQVVBOzt3QkFFVkEsUUFBUUEsSUFBSUE7d0JBQ1pBLG1CQUFtQkEsSUFBSUEsSUFBSUE7d0JBQzNCQSwwQkFBVUE7O3dCQUVWQSxhQUFhQSxJQUFJQTt3QkFDakJBLG1IQUFtSEEsQUFBMENBLFVBQUNBLFVBQVVBOzRCQUVwS0EsV0FBV0EsSUFBSUEsV0FBbUJBLFVBQVVBLElBQUlBLDBCQUFrQ0EsZ0JBRS9EQTs7NEJBSW5CQTs0QkFDQUEsMEJBQVVBOzs0QkFFVkEsd0JBQVFBLElBQUlBLHFCQUE2QkE7OzRCQUV6Q0EsV0FBV0EsNERBQW9FQTs0QkFDL0VBLGlDQUFpQkE7Ozs7d0JBSXJCQSwyQkFBV0EsSUFBSUE7d0JBQ2ZBLHVDQUF1QkE7d0JBQ3ZCQSxpQ0FBaUJBLG1CQUErQkE7d0JBQ2hEQSxzQkFBNkRBOzs7d0JBRzdEQSxrQ0FBOENBLEFBQW1EQTs0QkFBS0E7Ozs7Ozs7O3dCQVN0R0EsYUFBYUEscUJBQWtDQSxJQUFJQTs7d0JBRW5EQSxZQUFZQTs7d0JBRVpBLGdDQUFnQkEsUUFBUUE7d0JBQ3hCQTt3QkFDQUEsaUNBQWlCQSxPQUFPQTs7O3dCQUt4QkEsc0JBQWtDQSxBQUFXQTt3QkFDN0NBOzs7d0JBS0FBO3dCQUNBQSxvQ0FBb0JBLHlCQUFTQSxTQUFxQkEsb0JBQW9CQTt3QkFDdEVBLG9DQUFvQkEseUJBQVNBLFNBQXFCQSxvQkFBb0JBOzt3QkFFdEVBLDhCQUFjQTs7d0JBRWRBLElBQUlBLHlCQUFTQTs0QkFFVEEsV0FBV0E7NEJBQ1hBLDZCQUFhQSxDQUFDQSxPQUFPQTs0QkFDckJBLDJCQUFXQTs7d0JBRWZBLGdDQUFnQkEsdUJBQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbnVzaW5nIE1hdGggPSBSZXR5cGVkLmVzNS5NYXRoO1xyXG5cclxubmFtZXNwYWNlIFRocmVlSnNEZW1vXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBTZWUgdGhlIG9yaWdpbmFsIHNhbXBsZSBoZXJlOlxyXG4gICAgLy8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvI3dlYmdsX21vcnBodGFyZ2V0c19ob3JzZVxyXG4gICAgLy8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9kYTI5MzY1NDBhNDg3NzRiMDQzYTFlNjE3YmRkYmRjZTUxMDJlNDE3L2V4YW1wbGVzL3dlYmdsX21vcnBodGFyZ2V0c19ob3JzZS5odG1sXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEgY2FtZXJhO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuU2NlbmUgc2NlbmU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5BbmltYXRpb25NaXhlciBtaXhlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLldlYkdMUmVuZGVyZXIgcmVuZGVyZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIHRoZXRhO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSByYWRpdXMgPSA2MDA7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIHByZXZUaW1lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuVmVjdG9yMyBjYW1lcmFUYXJnZXQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluaXQoKTtcclxuICAgICAgICAgICAgQW5pbWF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IFJldHlwZWQuZG9tLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRWxlbWVudD4oY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGNhbWVyYSA9IG5ldyBSZXR5cGVkLnRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhKDUwLCBSZXR5cGVkLmRvbS53aW5kb3cgLmlubmVyV2lkdGggLyBSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHt5ID0gMzAwfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjYW1lcmFUYXJnZXQgPSBuZXcgUmV0eXBlZC50aHJlZS5WZWN0b3IzKDAsIDE1MCwgMCk7XHJcblxyXG4gICAgICAgICAgICBzY2VuZSA9IG5ldyBSZXR5cGVkLnRocmVlLlNjZW5lXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBuZXcgUmV0eXBlZC50aHJlZS5Db2xvcigweGYwZjBmMClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBSZXR5cGVkLnRocmVlLkRpcmVjdGlvbmFsTGlnaHQoMHhlZmVmZmYsIDEuNSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uLnNldCgxLCAxLCAxKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0ID0gbmV3IFJldHlwZWQudGhyZWUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWZlZiwgMS41KTtcclxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KC0xLCAtMSwgLTEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzY2VuZS5hZGQobGlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBSZXR5cGVkLnRocmVlLkpTT05Mb2FkZXIoKTtcclxuICAgICAgICAgICAgbG9hZGVyLmxvYWQoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUmV0eXBlZC9EZW1vcy9tYXN0ZXIvVGhyZWVKc0RlbW8vVGhyZWVKc0RlbW8vZGlzdC9tb2RlbHMvaG9yc2UuanNcIiwgKGdsb2JhbDo6UmV0eXBlZC50aHJlZS5KU09OTG9hZGVyLmxvYWRGbikoKGdlb21ldHJ5LCBtYXRlcmlhbHMpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNoID0gbmV3IFJldHlwZWQudGhyZWUuTWVzaChnZW9tZXRyeSwgbmV3IFJldHlwZWQudGhyZWUuTWVzaExhbWJlcnRNYXRlcmlhbChuZXcgUmV0eXBlZC50aHJlZS5NZXNoTGFtYmVydE1hdGVyaWFsUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleENvbG9ycyA9IFJldHlwZWQudGhyZWUuRmFjZUNvbG9ycyxcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldHMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVzaC5zY2FsZS5zZXQoMS41LCAxLjUsIDEuNSk7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5hZGQobWVzaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWl4ZXIgPSBuZXcgUmV0eXBlZC50aHJlZS5BbmltYXRpb25NaXhlcihtZXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2xpcCA9IFJldHlwZWQudGhyZWUuQW5pbWF0aW9uQ2xpcC5DcmVhdGVGcm9tTW9ycGhUYXJnZXRTZXF1ZW5jZShcImdhbGxvcFwiLCBnZW9tZXRyeS5tb3JwaFRhcmdldHMsIDMwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBtaXhlci5jbGlwQWN0aW9uKGNsaXApLnNldER1cmF0aW9uKDEpLnBsYXkoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICByZW5kZXJlciA9IG5ldyBSZXR5cGVkLnRocmVlLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhSZXR5cGVkLmRvbS53aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNldFNpemUoUmV0eXBlZC5kb20ud2luZG93LmlubmVyV2lkdGgsIFJldHlwZWQuZG9tLndpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50PihyZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+IE9uV2luZG93UmVzaXplKCkpLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgT25XaW5kb3dSZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgdmVyc2lvbjpcclxuICAgICAgICAgICAgLy8gdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHlwZWQgdmVyc2lvbjogdG8gcmVzcGVjdCBXZWJTaXRlIGhlYWRlci9mb290ZXI6XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBSZXR5cGVkLmRvbS53aW5kb3cgLmlubmVySGVpZ2h0IC0gMiAqIHJlbmRlcmVyLmRvbUVsZW1lbnQub2Zmc2V0VG9wIC0gMjsgLy8gb2Zmc2V0VG9wIHJlcHJlc2VudHMgaGVpZ2h0IG9mIGhlYWRlciAoPSBmb290ZXIpLCAyIC0gYm9yZGVyc1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gUmV0eXBlZC5kb20ud2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEuYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgQW5pbWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobmV3IEFjdGlvbihBbmltYXRlKS5BczxSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjaz4oKSk7XHJcbiAgICAgICAgICAgIFJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFJlbmRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGV0YSArPSAwLjE7XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gcmFkaXVzICogUmV0eXBlZC5lczUuTWF0aC5zaW4odGhyZWUuTWF0aC5kZWdUb1JhZCh0aGV0YSkpO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueiA9IHJhZGl1cyAqIFJldHlwZWQuZXM1Lk1hdGguY29zKHRocmVlLk1hdGguZGVnVG9SYWQodGhldGEpKTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5sb29rQXQoY2FtZXJhVGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtaXhlciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IFJldHlwZWQuZXM1LkRhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBtaXhlci51cGRhdGUoKHRpbWUgLSBwcmV2VGltZSkgKiAwLjAwMSk7XHJcbiAgICAgICAgICAgICAgICBwcmV2VGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
