using System;
using Bridge;
using MissingAPI;

using static Retyped.dom;
using static Retyped.svg_js;

namespace SvgJsDemo
{
    public class App
    {
        private static HTMLDivElement _rootDiv;

        public static void Main()
        {
            var btnPongGame = (HTMLButtonElement)document.querySelector("#btnPongGame");
            var btnAnimation = (HTMLButtonElement)document.querySelector("#btnAnimation");

            btnPongGame.onclick = ev =>
            {
                RenderPongGame();
                return true;
            };

            btnAnimation.onclick = ev =>
            {
                RenderAnimation();
                return true;
            };
        }

        private static void RenderPongGame()
        {
            if (_rootDiv != null)
            {
                document.body.removeChild(_rootDiv);
            }

            // Create Div for SVG elements:
            var svgDiv = new HTMLDivElement();
            new PongGame().Render(svgDiv);

            // Add Label:
            var label = new HTMLLabelElement();
            label.innerHTML = "Hit SPACE to start. Use ARROWS to control the pad.";

            // Add root Div to the Document
            _rootDiv = new HTMLDivElement();
            _rootDiv.appendChild(svgDiv);
            _rootDiv.appendChild(label);

            document.body.appendChild(_rootDiv);
        }

        private static void RenderAnimation()
        {
            if (_rootDiv != null)
            {
                document.body.removeChild(_rootDiv);
            }

            // Create Input for text:
            var input = new HTMLInputElement
            {
                type = "text",
                value = "Retyped.svg.js -- - ->",
                placeholder = "Type text here..."
            };

            // Create Div for SVG elements:
            var svgDiv = new HTMLDivElement();

            var draw = svgjs2.Self(svgDiv).viewbox(0, 0, 300, 140).Value;
            var text = draw.text(add =>
            {
                add.tspan(input.value);
            });

            text
                .path("M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80").Value
                .animate(1000, "<>")
                .plot("M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80")
                .loop(null, true);

            input.addEventListener("keyup", () => text.tspan(input.value));

            // Add root Div to the Document
            _rootDiv = new HTMLDivElement();
            _rootDiv.appendChild(input);
            _rootDiv.appendChild(svgDiv);

            document.body.appendChild(_rootDiv);
        }
    }
}

namespace MissingAPI
{
    public static class SvgJsExtensions
    {
        [Template("{0}.loop({1}, {2})")]
        public static extern T loop<T>(this T el, int? times, bool reverse)
            where T : svgjs.Element;

        [Template("{0}.loop({1}, {2})")]
        public static extern svgjs.Animation loop(this svgjs.Animation el, int? times, bool reverse);

        [Template("{0}.plot({1})")]
        public static extern svgjs.Animation plot(this svgjs.Animation animation, svgjs.PointArrayAlias points);

        [Template("{0}.opacity({1})")]
        public static extern svgjs.Animation opacity(this svgjs.Animation animation, double value);

        [Template("{0}.font({1}, {2})")]
        public static extern svgjs.Text font(this svgjs.Text font, string attr, string value);

        [Template("{0}.on({1}, {2}, {3})")]
        public static extern void on(this svgjs.Library svg, EventTarget target, string action, Delegate handler);
    }
}