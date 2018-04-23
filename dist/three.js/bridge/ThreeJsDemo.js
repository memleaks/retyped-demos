/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.0.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUaHJlZUpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBMEJZQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBS0FBLDRCQUFZQTt3QkFDWkEsMEJBQXVFQTs7O3dCQUd2RUEsYUFBYUE7d0JBQ2JBLFlBQVlBOzt3QkFFWkEseUJBQVNBLFVBQUlBLDRCQUFvQ0EsUUFBUUE7d0JBSXpEQSwrQkFBZUEsSUFBSUE7O3dCQUVuQkEsd0JBQVFBLFVBQUlBLCtCQUVLQSxJQUFJQTs7O3dCQUlyQkEsWUFBWUEsSUFBSUE7d0JBQ2hCQTt3QkFDQUEsMEJBQVVBOzt3QkFFVkEsUUFBUUEsSUFBSUE7d0JBQ1pBLG1CQUFtQkEsSUFBSUEsSUFBSUE7d0JBQzNCQSwwQkFBVUE7O3dCQUVWQSxhQUFhQSxJQUFJQTt3QkFDakJBLG1IQUFtSEEsQUFBMENBLFVBQUNBLFVBQVVBOzRCQUVwS0EsV0FBV0EsSUFBSUEsV0FBbUJBLFVBQVVBLElBQUlBLDBCQUFrQ0EsZ0JBRS9EQTs7NEJBSW5CQTs0QkFDQUEsMEJBQVVBOzs0QkFFVkEsd0JBQVFBLElBQUlBLHFCQUE2QkE7OzRCQUV6Q0EsV0FBV0EsNERBQW9FQTs0QkFDL0VBLGlDQUFpQkE7Ozs7d0JBSXJCQSwyQkFBV0EsSUFBSUE7d0JBQ2ZBLHVDQUF1QkE7d0JBQ3ZCQSxpQ0FBaUJBLE9BQU9BO3dCQUN4QkEsc0NBQTZEQTs7O3dCQUc3REEsa0NBQThDQSxBQUFtREE7NEJBQUtBOzs7O3dCQUt0R0EsYUFBYUE7d0JBQ2JBLFlBQVlBOzt3QkFFWkEsZ0NBQWdCQSxRQUFRQTt3QkFDeEJBO3dCQUNBQSxpQ0FBaUJBLE9BQU9BOzs7d0JBS3hCQSxzQkFBa0NBLEFBQTBDQSxBQUFXQTt3QkFDdkZBOzs7d0JBS0FBO3dCQUNBQSxvQ0FBb0JBLHlCQUFTQSxTQUFxQkEsb0JBQW9CQTt3QkFDdEVBLG9DQUFvQkEseUJBQVNBLFNBQXFCQSxvQkFBb0JBOzt3QkFFdEVBLDhCQUFjQTs7d0JBRWRBLElBQUlBLHlCQUFTQTs0QkFFVEEsV0FBV0E7NEJBQ1hBLDZCQUFhQSxDQUFDQSxPQUFPQTs0QkFDckJBLDJCQUFXQTs7d0JBRWZBLGdDQUFnQkEsdUJBQU9BOzs7O3dCQU12QkEsYUFBYUE7Ozs7O3dCQUtiQSxVQUFVQSxJQUFJQTs7O3dCQUdkQTs7d0JBRUFBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbnVzaW5nIE1hdGggPSBSZXR5cGVkLmVzNS5NYXRoO1xyXG5cclxubmFtZXNwYWNlIFRocmVlSnNEZW1vXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBTZWUgdGhlIG9yaWdpbmFsIHNhbXBsZSBoZXJlOlxyXG4gICAgLy8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvI3dlYmdsX21vcnBodGFyZ2V0c19ob3JzZVxyXG4gICAgLy8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9kYTI5MzY1NDBhNDg3NzRiMDQzYTFlNjE3YmRkYmRjZTUxMDJlNDE3L2V4YW1wbGVzL3dlYmdsX21vcnBodGFyZ2V0c19ob3JzZS5odG1sXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IGNvbnRhaW5lcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhIGNhbWVyYTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLlNjZW5lIHNjZW5lO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQudGhyZWUuQW5pbWF0aW9uTWl4ZXIgbWl4ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC50aHJlZS5XZWJHTFJlbmRlcmVyIHJlbmRlcmVyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSB0aGV0YTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgcmFkaXVzID0gNjAwO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSBwcmV2VGltZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnRocmVlLlZlY3RvcjMgY2FtZXJhVGFyZ2V0O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbml0KCk7XHJcbiAgICAgICAgICAgIEFuaW1hdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250YWluZXIgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEVsZW1lbnQ+KGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gR2V0QXZhaWxhYmxlSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IFJldHlwZWQuZG9tLndpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhID0gbmV3IFJldHlwZWQudGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEoNTAsIHdpZHRoIC8gaGVpZ2h0LCAxLCAxMDAwMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB7eSA9IDMwMH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY2FtZXJhVGFyZ2V0ID0gbmV3IFJldHlwZWQudGhyZWUuVmVjdG9yMygwLCAxNTAsIDApO1xyXG5cclxuICAgICAgICAgICAgc2NlbmUgPSBuZXcgUmV0eXBlZC50aHJlZS5TY2VuZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kID0gbmV3IFJldHlwZWQudGhyZWUuQ29sb3IoMHhmMGYwZjApXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICB2YXIgbGlnaHQgPSBuZXcgUmV0eXBlZC50aHJlZS5EaXJlY3Rpb25hbExpZ2h0KDB4ZWZlZmZmLCAxLjUpO1xyXG4gICAgICAgICAgICBsaWdodC5wb3NpdGlvbi5zZXQoMSwgMSwgMSkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgICAgICAgICBsaWdodCA9IG5ldyBSZXR5cGVkLnRocmVlLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmVmZWYsIDEuNSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uLnNldCgtMSwgLTEsIC0xKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsb2FkZXIgPSBuZXcgUmV0eXBlZC50aHJlZS5KU09OTG9hZGVyKCk7XHJcbiAgICAgICAgICAgIGxvYWRlci5sb2FkKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1JldHlwZWQvRGVtb3MvbWFzdGVyL1RocmVlSnNEZW1vL1RocmVlSnNEZW1vL2Rpc3QvbW9kZWxzL2hvcnNlLmpzXCIsIChnbG9iYWw6OlJldHlwZWQudGhyZWUuSlNPTkxvYWRlci5sb2FkRm4pKChnZW9tZXRyeSwgbWF0ZXJpYWxzKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzaCA9IG5ldyBSZXR5cGVkLnRocmVlLk1lc2goZ2VvbWV0cnksIG5ldyBSZXR5cGVkLnRocmVlLk1lc2hMYW1iZXJ0TWF0ZXJpYWwobmV3IFJldHlwZWQudGhyZWUuTWVzaExhbWJlcnRNYXRlcmlhbFBhcmFtZXRlcnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhDb2xvcnMgPSBSZXR5cGVkLnRocmVlLkZhY2VDb2xvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1lc2guc2NhbGUuc2V0KDEuNSwgMS41LCAxLjUpO1xyXG4gICAgICAgICAgICAgICAgc2NlbmUuYWRkKG1lc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1peGVyID0gbmV3IFJldHlwZWQudGhyZWUuQW5pbWF0aW9uTWl4ZXIobWVzaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNsaXAgPSBSZXR5cGVkLnRocmVlLkFuaW1hdGlvbkNsaXAuQ3JlYXRlRnJvbU1vcnBoVGFyZ2V0U2VxdWVuY2UoXCJnYWxsb3BcIiwgZ2VvbWV0cnkubW9ycGhUYXJnZXRzLCAzMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbWl4ZXIuY2xpcEFjdGlvbihjbGlwKS5zZXREdXJhdGlvbigxKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgcmVuZGVyZXIgPSBuZXcgUmV0eXBlZC50aHJlZS5XZWJHTFJlbmRlcmVyKCk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oUmV0eXBlZC5kb20ud2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudD4ocmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20ud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZG9tLkV2ZW50PikoZSA9PiBPbldpbmRvd1Jlc2l6ZSgpKSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBPbldpbmRvd1Jlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gR2V0QXZhaWxhYmxlSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IFJldHlwZWQuZG9tLndpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xyXG4gICAgICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBBbmltYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZ2xvYmFsOjpSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjayluZXcgQWN0aW9uKEFuaW1hdGUpLkFzPFJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrPigpKTtcclxuICAgICAgICAgICAgUmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGV0YSArPSAwLjE7XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gcmFkaXVzICogUmV0eXBlZC5lczUuTWF0aC5zaW4odGhyZWUuTWF0aC5kZWdUb1JhZCh0aGV0YSkpO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueiA9IHJhZGl1cyAqIFJldHlwZWQuZXM1Lk1hdGguY29zKHRocmVlLk1hdGguZGVnVG9SYWQodGhldGEpKTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5sb29rQXQoY2FtZXJhVGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtaXhlciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IFJldHlwZWQuZXM1LkRhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBtaXhlci51cGRhdGUoKHRpbWUgLSBwcmV2VGltZSkgKiAwLjAwMSk7XHJcbiAgICAgICAgICAgICAgICBwcmV2VGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIEdldEF2YWlsYWJsZUhlaWdodCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBPcmlnaW5hbCB2ZXJzaW9uOlxyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gUmV0eXBlZC5kb20ud2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgLy8gQWRqdXN0IGhlaWdodCB0byByZXNwZWN0IFJldHlwZWQgRGRlbW9zIFdlYlNpdGUgbGF5b3V0OlxyXG5cclxuICAgICAgICAgICAgLy8gb2Zmc2V0VG9wIHJlcHJlc2VudHMgaGVpZ2h0IG9mIGhlYWRlciAoPSBmb290ZXIpXHJcbiAgICAgICAgICAgIGhlaWdodCAtPSAyICogY29udGFpbmVyLm9mZnNldFRvcDsgLy8gb2Zmc2V0VG9wIHJlcHJlc2VudHMgaGVpZ2h0IG9mIHRoZSBoZWFkZXIgKD0gaGVpZ2h0IG9mIHRoZSBmb290ZXIpXHJcblxyXG4gICAgICAgICAgICAvLyBSZXNwZWN0IHRoZSBib3JkZXJzOlxyXG4gICAgICAgICAgICBoZWlnaHQgLT0gMjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
