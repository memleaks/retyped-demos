/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.4.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJQaXhpSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJEZW1vLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O1lBU1lBLFdBQVdBLElBQUlBO1lBQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7Z0JDTUFBLGlCQUFpQkE7Z0JBQ2pCQTs7Z0JBRUFBLFdBQU1BLElBQUlBLDJCQUEyQ0E7Z0JBQ3JEQSwwQkFBK0VBOzs7Z0JBRy9FQSxlQUFVQTtnQkFDVkEscUNBQWdDQTs7Ozs7Z0JBS2hDQSxlQUFlQSxBQUFxQ0E7O2dCQUVwREEsS0FBS0EsV0FBV0EsUUFBUUE7b0JBRXBCQSxpQkFDSUEsV0FBZUEsZ0JBQW9CQSxpQkFDbkNBLFdBQWVBLGdCQUFvQkE7OzttQ0FJdEJBLEdBQVVBOztnQkFHL0JBLFlBQVlBLElBQUlBLFlBQTRCQTs7O2dCQUc1Q0E7OztnQkFHQUE7OztnQkFHQUE7OztnQkFHQUE7Ozs7O2dCQUtBQSx3QkFBd0JBLEFBQTJEQTtnQkFDbkZBLHNCQUFzQkEsQUFBMkRBO2dCQUNqRkEsNkJBQTZCQSxBQUEyREE7Z0JBQ3hGQSx3QkFBd0JBLEFBQTJEQTs7O2dCQUduRkEsVUFBVUE7Z0JBQ1ZBLFVBQVVBOzs7Z0JBR1ZBLHdCQUF3REE7O21DQUduQ0E7Ozs7O2dCQU1yQkEsYUFBYUEsQUFBV0E7O2dCQUV4QkE7Z0JBQ0FBLGNBQWNBO2dCQUNkQTs7aUNBR21CQTtnQkFFbkJBLGFBQWFBLEFBQVdBOztnQkFFeEJBO2dCQUNBQTs7O2dCQUdBQSxjQUFjQTs7a0NBR01BO2dCQUVwQkEsYUFBYUEsQUFBV0E7O2dCQUV4QkEsSUFBSUE7b0JBRUFBLGtCQUFrQkEsNkJBQTZCQTs7b0JBRS9DQSxXQUFXQTtvQkFDWEEsV0FBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsibmFtZXNwYWNlIFBpeGlKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIE9yaWdpbmFsIGRlbW86XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9waXhpanMuZ2l0aHViLmlvL2V4YW1wbGVzLyMvZGVtb3MvZHJhZ2dpbmcuanNcclxuXHJcbiAgICAgICAgICAgIHZhciBkZW1vID0gbmV3IERlbW8oKTtcclxuICAgICAgICAgICAgZGVtby5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFBpeGlKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlbW9cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQucGl4aV9qcy5QSVhJLkFwcGxpY2F0aW9uIGFwcDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQucGl4aV9qcy5QSVhJLlRleHR1cmUgdGV4dHVyZTtcclxuXHJcbiAgICAgICAgcHVibGljIERlbW8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgZGVtbzpcclxuICAgICAgICAgICAgLy8gaHR0cDovL3BpeGlqcy5naXRodWIuaW8vZXhhbXBsZXMvIy9kZW1vcy9kcmFnZ2luZy5qc1xyXG5cclxuICAgICAgICAgICAgdmFyIGFwcE9wdGlvbnMgPSBPYmplY3RMaXRlcmFsLkNyZWF0ZTxSZXR5cGVkLnBpeGlfanMuUElYSS5JQXBwbGljYXRpb25PcHRpb25zPigpO1xyXG4gICAgICAgICAgICBhcHBPcHRpb25zLmJhY2tncm91bmRDb2xvciA9IDB4MTA5OWJiO1xyXG5cclxuICAgICAgICAgICAgYXBwID0gbmV3IFJldHlwZWQucGl4aV9qcy5QSVhJLkFwcGxpY2F0aW9uKDgwMCwgNjAwLCBhcHBPcHRpb25zKTtcclxuICAgICAgICAgICAgZG9tLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudC5JbnRlcmZhY2U+KGFwcC52aWV3KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBTcHJpdGUgZnJvbSBhbiBpbWFnZSBwYXRoXHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBSZXR5cGVkLnBpeGlfanMuUElYSS5UZXh0dXJlLmZyb21JbWFnZShcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9waXhpanMvZXhhbXBsZXMvZ2gtcGFnZXMvcmVxdWlyZWQvYXNzZXRzL2J1bm55LnBuZ1wiKTtcclxuICAgICAgICAgICAgdGV4dHVyZS5iYXNlVGV4dHVyZS5zY2FsZU1vZGUgPSBSZXR5cGVkLnBpeGlfanMuUElYSS5TQ0FMRV9NT0RFUy5ORUFSRVNUO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RhcnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJlbmRlcmVyID0gKFJldHlwZWQucGl4aV9qcy5QSVhJLkNhbnZhc1JlbmRlcmVyKWFwcC5yZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQnVubnkoXHJcbiAgICAgICAgICAgICAgICAgICAgZXM1Lk1hdGguZmxvb3IoZXM1Lk1hdGgucmFuZG9tKCkgKiByZW5kZXJlci53aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgZXM1Lk1hdGguZmxvb3IoZXM1Lk1hdGgucmFuZG9tKCkgKiByZW5kZXJlci5oZWlnaHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGNyZWF0ZUJ1bm55KGRvdWJsZSB4LCBkb3VibGUgeSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBvdXIgbGl0dGxlIGJ1bm55IGZyaWVuZC4uXHJcbiAgICAgICAgICAgIHZhciBidW5ueSA9IG5ldyBSZXR5cGVkLnBpeGlfanMuUElYSS5TcHJpdGUodGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBlbmFibGUgdGhlIGJ1bm55IHRvIGJlIGludGVyYWN0aXZlLi4uIHRoaXMgd2lsbCBhbGxvdyBpdCB0byByZXNwb25kIHRvIG1vdXNlIGFuZCB0b3VjaCBldmVudHNcclxuICAgICAgICAgICAgYnVubnkuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcyBidXR0b24gbW9kZSB3aWxsIG1lYW4gdGhlIGhhbmQgY3Vyc29yIGFwcGVhcnMgd2hlbiB5b3Ugcm9sbCBvdmVyIHRoZSBidW5ueSB3aXRoIHlvdXIgbW91c2VcclxuICAgICAgICAgICAgYnVubnkuYnV0dG9uTW9kZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBjZW50ZXIgdGhlIGJ1bm55J3MgYW5jaG9yIHBvaW50XHJcbiAgICAgICAgICAgIGJ1bm55LmFuY2hvci5zZXQoMC41KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1ha2UgaXQgYSBiaXQgYmlnZ2VyLCBzbyBpdCdzIGVhc2llciB0byBncmFiXHJcbiAgICAgICAgICAgIGJ1bm55LnNjYWxlLnNldCgzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHVwIGV2ZW50cyBmb3IgbW91c2UgKyB0b3VjaCB1c2luZ1xyXG4gICAgICAgICAgICAvLyB0aGUgcG9pbnRlciBldmVudHNcclxuXHJcbiAgICAgICAgICAgIGJ1bm55Lm9uKFwicG9pbnRlcmRvd25cIiwgKEFjdGlvbjxSZXR5cGVkLnBpeGlfanMuUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50PilvbkRyYWdTdGFydCk7XHJcbiAgICAgICAgICAgIGJ1bm55Lm9uKFwicG9pbnRlcnVwXCIsIChBY3Rpb248UmV0eXBlZC5waXhpX2pzLlBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudD4pb25EcmFnRW5kKTtcclxuICAgICAgICAgICAgYnVubnkub24oXCJwb2ludGVydXBvdXRzaWRlXCIsIChBY3Rpb248UmV0eXBlZC5waXhpX2pzLlBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudD4pb25EcmFnRW5kKTtcclxuICAgICAgICAgICAgYnVubnkub24oXCJwb2ludGVybW92ZVwiLCAoQWN0aW9uPFJldHlwZWQucGl4aV9qcy5QSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQ+KW9uRHJhZ01vdmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgc3ByaXRlIHRvIGl0cyBkZXNpZ25hdGVkIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGJ1bm55LnggPSB4O1xyXG4gICAgICAgICAgICBidW5ueS55ID0geTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3RhZ2VcclxuICAgICAgICAgICAgYXBwLnN0YWdlLmFkZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5waXhpX2pzLlBJWEkuU3ByaXRlPihidW5ueSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgb25EcmFnU3RhcnQoUmV0eXBlZC5waXhpX2pzLlBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCBldilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBkYXRhXHJcbiAgICAgICAgICAgIC8vIHRoZSByZWFzb24gZm9yIHRoaXMgaXMgYmVjYXVzZSBvZiBtdWx0aXRvdWNoXHJcbiAgICAgICAgICAgIC8vIHdlIHdhbnQgdG8gdHJhY2sgdGhlIG1vdmVtZW50IG9mIHRoaXMgcGFydGljdWxhciB0b3VjaFxyXG5cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IChUYXJnZXRFeCkgZXYuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRhcmdldC5kYXRhID0gZXYuZGF0YTtcclxuICAgICAgICAgICAgdGFyZ2V0LmFscGhhID0gMC41O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIG9uRHJhZ0VuZChSZXR5cGVkLnBpeGlfanMuUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50IGV2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IChUYXJnZXRFeCkgZXYuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5hbHBoYSA9IDE7XHJcbiAgICAgICAgICAgIHRhcmdldC5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHNldCB0aGUgaW50ZXJhY3Rpb24gZGF0YSB0byBudWxsXHJcbiAgICAgICAgICAgIHRhcmdldC5kYXRhID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBvbkRyYWdNb3ZlKFJldHlwZWQucGl4aV9qcy5QSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQgZXYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gKFRhcmdldEV4KSBldi5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldC5kcmFnZ2luZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdGFyZ2V0LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0YXJnZXQucGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQueCA9IG5ld1Bvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQueSA9IG5ld1Bvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
