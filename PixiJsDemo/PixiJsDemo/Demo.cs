using System;
using Bridge;
using Retyped;

using static Retyped.pixi_js.PIXI;

namespace PixiJsDemo
{
    public class Demo
    {
        private readonly Application app;
        private readonly Texture texture;

        public Demo()
        {
            // Original demo:
            // http://pixijs.github.io/examples/#/demos/dragging.js

            var appOptions = ObjectLiteral.Create<IApplicationOptions>();
            appOptions.backgroundColor = 0x1099bb;

            var rootEl = dom.document.querySelector("#root");
            app = new Application(800, 600, appOptions);
            rootEl.appendChild(app.view);

            // create a new Sprite from an image path
            texture = Texture.fromImage("https://raw.githubusercontent.com/pixijs/examples/gh-pages/required/assets/bunny.png");
            texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
        }

        public void Start()
        {
            var renderer = (CanvasRenderer)app.renderer;

            for (var i = 0; i < 10; i++)
            {
                createBunny(
                    es5.Math.floor(es5.Math.random() * renderer.width),
                    es5.Math.floor(es5.Math.random() * renderer.height));
            }
        }

        private void createBunny(double x, double y)
        {
            // create our little bunny friend..
            var bunny = new Sprite(texture);

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

            bunny.on("pointerdown", (Action<interaction.InteractionEvent>)onDragStart);
            bunny.on("pointerup", (Action<interaction.InteractionEvent>)onDragEnd);
            bunny.on("pointerupoutside", (Action<interaction.InteractionEvent>)onDragEnd);
            bunny.on("pointermove", (Action<interaction.InteractionEvent>)onDragMove);

            // move the sprite to its designated position
            bunny.x = x;
            bunny.y = y;

            // add it to the stage
            app.stage.addChild(bunny);
        }

        private void onDragStart(interaction.InteractionEvent ev)
        {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch

            var target = (TargetEx) ev.currentTarget;

            target.dragging = true;
            target.data = ev.data;
            target.alpha = 0.5;
        }

        private void onDragEnd(interaction.InteractionEvent ev)
        {
            var target = (TargetEx) ev.currentTarget;

            target.alpha = 1;
            target.dragging = false;
                
            // set the interaction data to null
            target.data = null;
        }

        private void onDragMove(interaction.InteractionEvent ev)
        {
            var target = (TargetEx) ev.currentTarget;

            if (target.dragging)
            {
                var newPosition = target.data.getLocalPosition(target.parent);

                target.x = newPosition.x;
                target.y = newPosition.y;
            }
        }
    }
}