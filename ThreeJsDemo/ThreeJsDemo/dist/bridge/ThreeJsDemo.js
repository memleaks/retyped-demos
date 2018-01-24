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
                ThreeJsDemo.App.animate();
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
                        var container = document.createElement("div");
                        document.body.appendChild(container);
    
                        //
                        ThreeJsDemo.App.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
                        ThreeJsDemo.App.camera.position.y = 300;
                        ThreeJsDemo.App.cameraTarget = new THREE.Vector3(0, 150, 0);
    
                        ThreeJsDemo.App.scene = new THREE.Scene();
                        ThreeJsDemo.App.scene.background = new THREE.Color(15790320);
    
                        //
                        var light = new THREE.DirectionalLight(15724543, 1.5);
                        light.position.set(1, 1, 1).normalize();
                        ThreeJsDemo.App.scene.add(light);
    
                        light = new THREE.DirectionalLight(16773103, 1.5);
                        light.position.set(-1, -1, -1).normalize();
                        ThreeJsDemo.App.scene.add(light);
    
                        var loader = new THREE.JSONLoader();
                        loader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/animated/horse.js", function (geometry, materials) {
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
                            ThreeJsDemo.App.onWindowResize();
                        }, false);
                    },
                    onWindowResize: function () {
                        ThreeJsDemo.App.camera.aspect = window.innerWidth / window.innerHeight;
                        ThreeJsDemo.App.camera.updateProjectionMatrix();
                        ThreeJsDemo.App.renderer.setSize(window.innerWidth, window.innerHeight);
                    },
                    animate: function () {
                        requestAnimationFrame(ThreeJsDemo.App.animate);
                        ThreeJsDemo.App.render();
                    },
                    render: function () {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUaHJlZUpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBeUJZQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUtBQSxnQkFBZ0JBO3dCQUNoQkEsMEJBQXVFQTs7O3dCQUd2RUEseUJBQVNBLElBQUlBLDRCQUFvQ0Esb0JBQWlDQTt3QkFDbEZBO3dCQUNBQSwrQkFBZUEsSUFBSUE7O3dCQUVuQkEsd0JBQVFBLElBQUlBO3dCQUNaQSxtQ0FBbUJBLElBQUlBOzs7d0JBR3ZCQSxZQUFZQSxJQUFJQTt3QkFDaEJBO3dCQUNBQSwwQkFBVUE7O3dCQUVWQSxRQUFRQSxJQUFJQTt3QkFDWkEsbUJBQW1CQSxJQUFJQSxJQUFJQTt3QkFDM0JBLDBCQUFVQTs7d0JBRVZBLGFBQWFBLElBQUlBO3dCQUNqQkEsMEdBQTBHQSxBQUEwQ0EsVUFBQ0EsVUFBVUE7NEJBRTNKQSxXQUFXQSxJQUFJQSxXQUFtQkEsVUFBVUEsSUFBSUEsMEJBQWtDQSxnQkFFL0RBOzs0QkFJbkJBOzRCQUNBQSwwQkFBVUE7OzRCQUVWQSx3QkFBUUEsSUFBSUEscUJBQTZCQTs7NEJBRXpDQSxXQUFXQSw0REFBb0VBOzRCQUMvRUEsaUNBQWlCQTs7Ozt3QkFJckJBLDJCQUFXQSxJQUFJQTt3QkFDZkEsdUNBQXVCQTt3QkFDdkJBLGlDQUFpQkEsbUJBQStCQTt3QkFDaERBLHNCQUE2REE7Ozt3QkFHN0RBLGtDQUE4Q0EsQUFBbURBOzRCQUFLQTs7Ozt3QkFLdEdBLGdDQUFnQkEsb0JBQWlDQTt3QkFDakRBO3dCQUNBQSxpQ0FBaUJBLG1CQUErQkE7Ozt3QkFLaERBLHNCQUFrQ0EsQUFBV0E7d0JBQzdDQTs7O3dCQUtBQTt3QkFDQUEsb0NBQW9CQSx5QkFBU0EsU0FBcUJBLG9CQUFvQkE7d0JBQ3RFQSxvQ0FBb0JBLHlCQUFTQSxTQUFxQkEsb0JBQW9CQTs7d0JBRXRFQSw4QkFBY0E7O3dCQUVkQSxJQUFJQSx5QkFBU0E7NEJBRVRBLFdBQVdBOzRCQUNYQSw2QkFBYUEsQ0FBQ0EsT0FBT0E7NEJBQ3JCQSwyQkFBV0E7O3dCQUVmQSxnQ0FBZ0JBLHVCQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG51c2luZyBNYXRoID0gUmV0eXBlZC5lczUuTWF0aDtcclxuXHJcbm5hbWVzcGFjZSBUaHJlZUpzRGVtb1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gU2VlIHRoZSBvcmlnaW5hbCBzYW1wbGUgaGVyZTpcclxuICAgIC8vLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLyN3ZWJnbF9tb3JwaHRhcmdldHNfaG9yc2VcclxuICAgIC8vLyBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvZGEyOTM2NTQwYTQ4Nzc0YjA0M2ExZTYxN2JkZGJkY2U1MTAyZTQxNy9leGFtcGxlcy93ZWJnbF9tb3JwaHRhcmdldHNfaG9yc2UuaHRtbFxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhIGNhbWVyYTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLlNjZW5lIHNjZW5lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuQW5pbWF0aW9uTWl4ZXIgbWl4ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5XZWJHTFJlbmRlcmVyIHJlbmRlcmVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSB0aGV0YTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgcmFkaXVzID0gNjAwO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSBwcmV2VGltZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLlZlY3RvcjMgY2FtZXJhVGFyZ2V0O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbml0KCk7XHJcbiAgICAgICAgICAgIGFuaW1hdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEVsZW1lbnQ+KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBjYW1lcmEgPSBuZXcgUmV0eXBlZC50aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSg1MCwgUmV0eXBlZC5kb20ud2luZG93IC5pbm5lcldpZHRoIC8gUmV0eXBlZC5kb20ud2luZG93LmlubmVySGVpZ2h0LCAxLCAxMDAwMCk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMzAwO1xyXG4gICAgICAgICAgICBjYW1lcmFUYXJnZXQgPSBuZXcgUmV0eXBlZC50aHJlZS5WZWN0b3IzKDAsIDE1MCwgMCk7XHJcblxyXG4gICAgICAgICAgICBzY2VuZSA9IG5ldyBSZXR5cGVkLnRocmVlLlNjZW5lKCk7XHJcbiAgICAgICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgUmV0eXBlZC50aHJlZS5Db2xvcigweGYwZjBmMCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBSZXR5cGVkLnRocmVlLkRpcmVjdGlvbmFsTGlnaHQoMHhlZmVmZmYsIDEuNSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uLnNldCgxLCAxLCAxKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0ID0gbmV3IFJldHlwZWQudGhyZWUuRGlyZWN0aW9uYWxMaWdodCgweGZmZWZlZiwgMS41KTtcclxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KC0xLCAtMSwgLTEpLm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzY2VuZS5hZGQobGlnaHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBSZXR5cGVkLnRocmVlLkpTT05Mb2FkZXIoKTtcclxuICAgICAgICAgICAgbG9hZGVyLmxvYWQoXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbXJkb29iL3RocmVlLmpzL21hc3Rlci9leGFtcGxlcy9tb2RlbHMvYW5pbWF0ZWQvaG9yc2UuanNcIiwgKGdsb2JhbDo6UmV0eXBlZC50aHJlZS5KU09OTG9hZGVyLmxvYWRGbikoKGdlb21ldHJ5LCBtYXRlcmlhbHMpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNoID0gbmV3IFJldHlwZWQudGhyZWUuTWVzaChnZW9tZXRyeSwgbmV3IFJldHlwZWQudGhyZWUuTWVzaExhbWJlcnRNYXRlcmlhbChuZXcgUmV0eXBlZC50aHJlZS5NZXNoTGFtYmVydE1hdGVyaWFsUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleENvbG9ycyA9IFJldHlwZWQudGhyZWUuRmFjZUNvbG9ycyxcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldHMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVzaC5zY2FsZS5zZXQoMS41LCAxLjUsIDEuNSk7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5hZGQobWVzaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWl4ZXIgPSBuZXcgUmV0eXBlZC50aHJlZS5BbmltYXRpb25NaXhlcihtZXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2xpcCA9IFJldHlwZWQudGhyZWUuQW5pbWF0aW9uQ2xpcC5DcmVhdGVGcm9tTW9ycGhUYXJnZXRTZXF1ZW5jZShcImdhbGxvcFwiLCBnZW9tZXRyeS5tb3JwaFRhcmdldHMsIDMwLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBtaXhlci5jbGlwQWN0aW9uKGNsaXApLnNldER1cmF0aW9uKDEpLnBsYXkoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICByZW5kZXJlciA9IG5ldyBSZXR5cGVkLnRocmVlLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhSZXR5cGVkLmRvbS53aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNldFNpemUoUmV0eXBlZC5kb20ud2luZG93LmlubmVyV2lkdGgsIFJldHlwZWQuZG9tLndpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50PihyZW5kZXJlci5kb21FbGVtZW50KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5kb20uRXZlbnQ+KShlID0+IG9uV2luZG93UmVzaXplKCkpLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgb25XaW5kb3dSZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FtZXJhLmFzcGVjdCA9IFJldHlwZWQuZG9tLndpbmRvdyAuaW5uZXJXaWR0aCAvIFJldHlwZWQuZG9tLndpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZShSZXR5cGVkLmRvbS53aW5kb3cuaW5uZXJXaWR0aCwgUmV0eXBlZC5kb20ud2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBhbmltYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZShuZXcgQWN0aW9uKGFuaW1hdGUpLkFzPFJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrPigpKTtcclxuICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgcmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoZXRhICs9IDAuMTtcclxuICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSByYWRpdXMgKiBSZXR5cGVkLmVzNS5NYXRoLnNpbih0aHJlZS5NYXRoLmRlZ1RvUmFkKHRoZXRhKSk7XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gcmFkaXVzICogUmV0eXBlZC5lczUuTWF0aC5jb3ModGhyZWUuTWF0aC5kZWdUb1JhZCh0aGV0YSkpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLmxvb2tBdChjYW1lcmFUYXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1peGVyICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gUmV0eXBlZC5lczUuRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIG1peGVyLnVwZGF0ZSgodGltZSAtIHByZXZUaW1lKSAqIDAuMDAxKTtcclxuICAgICAgICAgICAgICAgIHByZXZUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
