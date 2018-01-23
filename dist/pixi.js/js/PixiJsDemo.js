/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("PixiJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("PixiJsDemo.App", {
        main: function Main () {
            // Original demo:
            // http://pixijs.github.io/examples/#/demos/dragging.js

            var demo = new PixiJsDemo.Demo();
            demo.Start();
        }
    });

    Bridge.define("PixiJsDemo.Demo", {
        fields: {
            app: null,
            texture: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                // Original demo:
                // http://pixijs.github.io/examples/#/demos/dragging.js

                var appOptions = { };
                appOptions.backgroundColor = 1087931;

                this.app = new PIXI.Application(800, 600, appOptions);
                document.body.appendChild(this.app.view);

                // create a new Sprite from an image path
                this.texture = PIXI.Texture.fromImage("https://raw.githubusercontent.com/pixijs/examples/gh-pages/required/assets/bunny.png");
                this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            }
        },
        methods: {
            Start: function () {
                var renderer = this.app.renderer;

                for (var i = 0; i < 10; i = (i + 1) | 0) {
                    this.createBunny(Math.floor(Math.random() * renderer.width), Math.floor(Math.random() * renderer.height));
                }
            },
            createBunny: function (x, y) {
                // create our little bunny friend..
                var bunny = new PIXI.Sprite(this.texture);

                // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
                bunny.interactive = true;

                // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
                bunny.buttonMode = true;

                // center the bunny's anchor point
                bunny.anchor.set(0.5);

                // make it a bit bigger, so it's easier to grab
                bunny.scale.set(3);

                // setup events for mouse + touch using
                // the pointer events

                bunny.on("pointerdown", Bridge.fn.cacheBind(this, this.onDragStart));
                bunny.on("pointerup", Bridge.fn.cacheBind(this, this.onDragEnd));
                bunny.on("pointerupoutside", Bridge.fn.cacheBind(this, this.onDragEnd));
                bunny.on("pointermove", Bridge.fn.cacheBind(this, this.onDragMove));

                // move the sprite to its designated position
                bunny.x = x;
                bunny.y = y;

                // add it to the stage
                this.app.stage.addChild(bunny);
            },
            onDragStart: function (ev) {
                // store a reference to the data
                // the reason for this is because of multitouch
                // we want to track the movement of this particular touch

                var target = ev.currentTarget;

                target.dragging = true;
                target.data = ev.data;
                target.alpha = 0.5;
            },
            onDragEnd: function (ev) {
                var target = ev.currentTarget;

                target.alpha = 1;
                target.dragging = false;

                // set the interaction data to null
                target.data = null;
            },
            onDragMove: function (ev) {
                var target = ev.currentTarget;

                if (target.dragging) {
                    var newPosition = target.data.getLocalPosition(target.parent);

                    target.x = newPosition.x;
                    target.y = newPosition.y;
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJQaXhpSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJEZW1vLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O1lBU1lBLFdBQVdBLElBQUlBO1lBQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7Z0JDTUFBLGlCQUFpQkE7Z0JBQ2pCQTs7Z0JBRUFBLFdBQU1BLElBQUlBLDJCQUEyQ0E7Z0JBQ3JEQSwwQkFBcUVBOzs7Z0JBR3JFQSxlQUFVQTtnQkFDVkEscUNBQWdDQTs7Ozs7Z0JBS2hDQSxlQUFlQSxBQUFxQ0E7O2dCQUVwREEsS0FBS0EsV0FBV0EsUUFBUUE7b0JBRXBCQSxpQkFDSUEsV0FBZUEsZ0JBQW9CQSxpQkFDbkNBLFdBQWVBLGdCQUFvQkE7OzttQ0FJdEJBLEdBQVVBOztnQkFHL0JBLFlBQVlBLElBQUlBLFlBQTRCQTs7O2dCQUc1Q0E7OztnQkFHQUE7OztnQkFHQUE7OztnQkFHQUE7Ozs7O2dCQUtBQSx3QkFBd0JBLEFBQTJEQTtnQkFDbkZBLHNCQUFzQkEsQUFBMkRBO2dCQUNqRkEsNkJBQTZCQSxBQUEyREE7Z0JBQ3hGQSx3QkFBd0JBLEFBQTJEQTs7O2dCQUduRkEsVUFBVUE7Z0JBQ1ZBLFVBQVVBOzs7Z0JBR1ZBLHdCQUF3REE7O21DQUduQ0E7Ozs7O2dCQU1yQkEsYUFBYUEsQUFBV0E7O2dCQUV4QkE7Z0JBQ0FBLGNBQWNBO2dCQUNkQTs7aUNBR21CQTtnQkFFbkJBLGFBQWFBLEFBQVdBOztnQkFFeEJBO2dCQUNBQTs7O2dCQUdBQSxjQUFjQTs7a0NBR01BO2dCQUVwQkEsYUFBYUEsQUFBV0E7O2dCQUV4QkEsSUFBSUE7b0JBRUFBLGtCQUFrQkEsNkJBQTZCQTs7b0JBRS9DQSxXQUFXQTtvQkFDWEEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsibmFtZXNwYWNlIFBpeGlKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIE9yaWdpbmFsIGRlbW86XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9waXhpanMuZ2l0aHViLmlvL2V4YW1wbGVzLyMvZGVtb3MvZHJhZ2dpbmcuanNcclxuXHJcbiAgICAgICAgICAgIHZhciBkZW1vID0gbmV3IERlbW8oKTtcclxuICAgICAgICAgICAgZGVtby5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFBpeGlKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlbW9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQucGl4aV9qcy5QSVhJLkFwcGxpY2F0aW9uIGFwcDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQucGl4aV9qcy5QSVhJLlRleHR1cmUgdGV4dHVyZTtcclxuXHJcbiAgICAgICAgcHVibGljIERlbW8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgZGVtbzpcclxuICAgICAgICAgICAgLy8gaHR0cDovL3BpeGlqcy5naXRodWIuaW8vZXhhbXBsZXMvIy9kZW1vcy9kcmFnZ2luZy5qc1xyXG5cclxuICAgICAgICAgICAgdmFyIGFwcE9wdGlvbnMgPSBPYmplY3RMaXRlcmFsLkNyZWF0ZTxSZXR5cGVkLnBpeGlfanMuUElYSS5JQXBwbGljYXRpb25PcHRpb25zPigpO1xyXG4gICAgICAgICAgICBhcHBPcHRpb25zLmJhY2tncm91bmRDb2xvciA9IDB4MTA5OWJiO1xyXG5cclxuICAgICAgICAgICAgYXBwID0gbmV3IFJldHlwZWQucGl4aV9qcy5QSVhJLkFwcGxpY2F0aW9uKDgwMCwgNjAwLCBhcHBPcHRpb25zKTtcclxuICAgICAgICAgICAgZG9tLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudD4oYXBwLnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IFNwcml0ZSBmcm9tIGFuIGltYWdlIHBhdGhcclxuICAgICAgICAgICAgdGV4dHVyZSA9IFJldHlwZWQucGl4aV9qcy5QSVhJLlRleHR1cmUuZnJvbUltYWdlKFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3BpeGlqcy9leGFtcGxlcy9naC1wYWdlcy9yZXF1aXJlZC9hc3NldHMvYnVubnkucG5nXCIpO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLmJhc2VUZXh0dXJlLnNjYWxlTW9kZSA9IFJldHlwZWQucGl4aV9qcy5QSVhJLlNDQUxFX01PREVTLk5FQVJFU1Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSAoUmV0eXBlZC5waXhpX2pzLlBJWEkuQ2FudmFzUmVuZGVyZXIpYXBwLnJlbmRlcmVyO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVCdW5ueShcclxuICAgICAgICAgICAgICAgICAgICBlczUuTWF0aC5mbG9vcihlczUuTWF0aC5yYW5kb20oKSAqIHJlbmRlcmVyLndpZHRoKSxcclxuICAgICAgICAgICAgICAgICAgICBlczUuTWF0aC5mbG9vcihlczUuTWF0aC5yYW5kb20oKSAqIHJlbmRlcmVyLmhlaWdodCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgY3JlYXRlQnVubnkoZG91YmxlIHgsIGRvdWJsZSB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIG91ciBsaXR0bGUgYnVubnkgZnJpZW5kLi5cclxuICAgICAgICAgICAgdmFyIGJ1bm55ID0gbmV3IFJldHlwZWQucGl4aV9qcy5QSVhJLlNwcml0ZSh0ZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGVuYWJsZSB0aGUgYnVubnkgdG8gYmUgaW50ZXJhY3RpdmUuLi4gdGhpcyB3aWxsIGFsbG93IGl0IHRvIHJlc3BvbmQgdG8gbW91c2UgYW5kIHRvdWNoIGV2ZW50c1xyXG4gICAgICAgICAgICBidW5ueS5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzIGJ1dHRvbiBtb2RlIHdpbGwgbWVhbiB0aGUgaGFuZCBjdXJzb3IgYXBwZWFycyB3aGVuIHlvdSByb2xsIG92ZXIgdGhlIGJ1bm55IHdpdGggeW91ciBtb3VzZVxyXG4gICAgICAgICAgICBidW5ueS5idXR0b25Nb2RlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNlbnRlciB0aGUgYnVubnkncyBhbmNob3IgcG9pbnRcclxuICAgICAgICAgICAgYnVubnkuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSBpdCBhIGJpdCBiaWdnZXIsIHNvIGl0J3MgZWFzaWVyIHRvIGdyYWJcclxuICAgICAgICAgICAgYnVubnkuc2NhbGUuc2V0KDMpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgZXZlbnRzIGZvciBtb3VzZSArIHRvdWNoIHVzaW5nXHJcbiAgICAgICAgICAgIC8vIHRoZSBwb2ludGVyIGV2ZW50c1xyXG5cclxuICAgICAgICAgICAgYnVubnkub24oXCJwb2ludGVyZG93blwiLCAoQWN0aW9uPFJldHlwZWQucGl4aV9qcy5QSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQ+KW9uRHJhZ1N0YXJ0KTtcclxuICAgICAgICAgICAgYnVubnkub24oXCJwb2ludGVydXBcIiwgKEFjdGlvbjxSZXR5cGVkLnBpeGlfanMuUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50PilvbkRyYWdFbmQpO1xyXG4gICAgICAgICAgICBidW5ueS5vbihcInBvaW50ZXJ1cG91dHNpZGVcIiwgKEFjdGlvbjxSZXR5cGVkLnBpeGlfanMuUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50PilvbkRyYWdFbmQpO1xyXG4gICAgICAgICAgICBidW5ueS5vbihcInBvaW50ZXJtb3ZlXCIsIChBY3Rpb248UmV0eXBlZC5waXhpX2pzLlBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudD4pb25EcmFnTW92ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBzcHJpdGUgdG8gaXRzIGRlc2lnbmF0ZWQgcG9zaXRpb25cclxuICAgICAgICAgICAgYnVubnkueCA9IHg7XHJcbiAgICAgICAgICAgIGJ1bm55LnkgPSB5O1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBzdGFnZVxyXG4gICAgICAgICAgICBhcHAuc3RhZ2UuYWRkQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLnBpeGlfanMuUElYSS5TcHJpdGU+KGJ1bm55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBvbkRyYWdTdGFydChSZXR5cGVkLnBpeGlfanMuUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50IGV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gc3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIGRhdGFcclxuICAgICAgICAgICAgLy8gdGhlIHJlYXNvbiBmb3IgdGhpcyBpcyBiZWNhdXNlIG9mIG11bHRpdG91Y2hcclxuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byB0cmFjayB0aGUgbW92ZW1lbnQgb2YgdGhpcyBwYXJ0aWN1bGFyIHRvdWNoXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gKFRhcmdldEV4KSBldi5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmRyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGFyZ2V0LmRhdGEgPSBldi5kYXRhO1xyXG4gICAgICAgICAgICB0YXJnZXQuYWxwaGEgPSAwLjU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgb25EcmFnRW5kKFJldHlwZWQucGl4aV9qcy5QSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQgZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gKFRhcmdldEV4KSBldi5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmFscGhhID0gMTtcclxuICAgICAgICAgICAgdGFyZ2V0LmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gc2V0IHRoZSBpbnRlcmFjdGlvbiBkYXRhIHRvIG51bGxcclxuICAgICAgICAgICAgdGFyZ2V0LmRhdGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIG9uRHJhZ01vdmUoUmV0eXBlZC5waXhpX2pzLlBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCBldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoVGFyZ2V0RXgpIGV2LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmRyYWdnaW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB0YXJnZXQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRhcmdldC5wYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRhcmdldC54ID0gbmV3UG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHRhcmdldC55ID0gbmV3UG9zaXRpb24ueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
