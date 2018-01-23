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
