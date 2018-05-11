using Bridge;
using HowlerJsDemo.RadioDemo;
using HowlerJsDemo.SpriteDemo;
using Retyped;
using static Retyped.dom;

namespace HowlerJsDemo
{
    public class App
    {
        private static HTMLDivElement _rootDiv;
        private static Element _content;
        private static Radio _radio;
        private static Sprite _sprite;

        public static void Main()
        {
            _content = (Element)document.querySelector("#content");

            var btnRadio = (HTMLButtonElement)document.querySelector("#btnRadio");
            var btnSprite = (HTMLButtonElement)document.querySelector("#btnSprite");

            btnRadio.onclick = ev =>
            {
                _radio?.Stop();
                _sprite?.Stop();

                RenderRadio();
                return true;
            };

            btnSprite.onclick = ev =>
            {
                _radio?.Stop();
                _sprite?.Stop();

                RenderSprite();
                return true;
            };

            // Render Radio sample by default
            RenderRadio();
        }

        #region Radio Demo

        /// <summary>
        /// Original sources: https://github.com/goldfire/howler.js/blob/df3aa43806e5e393312254946e36a4514e3a8f4d/examples/radio/radio.js
        /// </summary>
        private static void RenderRadio()
        {
            if (_rootDiv != null)
            {
                _content.removeChild(_rootDiv);
            }

            // Add root Div to the Document
            _rootDiv = new HTMLDivElement
            {
                className = "radioRoot",
                style = {padding = "100px"}
            };

            _content.appendChild(_rootDiv);

            _radio = new Radio(_rootDiv, new[]
            {
                new RadioStation
                {
                    Freq = "81.4",
                    Title = "Groove Salad",
                    Sources = new[]
                    {
                        new RadioStationSrc {Url = "http://ice1.somafm.com/groovesalad-128-mp3", Format = "mp3"},
                        new RadioStationSrc {Url = "http://ice1.somafm.com/groovesalad-128-aac", Format = "aac"}
                    }
                },
                new RadioStation
                {
                    Freq = "89.9",
                    Title = "Secret Agent",
                    Sources = new[]
                    {
                        new RadioStationSrc {Url = "http://ice1.somafm.com/secretagent-128-mp3", Format = "mp3"},
                        new RadioStationSrc {Url = "http://ice1.somafm.com/secretagent-128-aac", Format = "aac"}
                    }
                },
                new RadioStation
                {
                    Freq = "98.9",
                    Title = "Indie Pop",
                    Sources = new[]
                    {
                        new RadioStationSrc {Url = "http://ice1.somafm.com/indiepop-128-mp3", Format = "mp3"},
                        new RadioStationSrc {Url = "http://ice1.somafm.com/indiepop-128-aac", Format = "aac"}
                    }
                },
                new RadioStation
                {
                    Freq = "103.3",
                    Title = "Police Radio",
                    Sources = new[]
                    {
                        new RadioStationSrc {Url = "http://ice1.somafm.com/sf1033-128-mp3", Format = "mp3"},
                        new RadioStationSrc {Url = "http://ice2.somafm.com/sf1033-64-aac", Format = "aac"}
                    }
                },
                new RadioStation
                {
                    Freq = "107.7",
                    Title = "The Trip",
                    Sources = new[]
                    {
                        new RadioStationSrc {Url = "http://ice1.somafm.com/thetrip-128-mp3", Format = "mp3"},
                        new RadioStationSrc {Url = "http://ice2.somafm.com/thetrip-64-aac", Format = "aac"}
                    }
                }
            });
        }

        #endregion

        #region Sprite Demo

        /// <summary>
        /// Original sources: https://github.com/goldfire/howler.js/blob/df3aa43806e5e393312254946e36a4514e3a8f4d/examples/sprite/sprite.js
        /// </summary>
        private static void RenderSprite()
        {
            if (_rootDiv != null)
            {
                _content.removeChild(_rootDiv);
            }

            // Add root Div to the Document
            _rootDiv = new HTMLDivElement
            {
                className = "spriteRoot"
            };

            _content.appendChild(_rootDiv);

            _sprite = new Sprite(_rootDiv, new SpriteOptions
            {
                Width = new[] {78, 60, 62, 70, 62, 1895},
                Left = new[] {0, 342, 680, 1022, 1361},
                //Src = new[] {"sound2.webm", "sound2.mp3"},
                Src = new[] {
                    "https://raw.githubusercontent.com/Retyped/Demos/master/HowlerJsDemo/HowlerJsDemo/dist/assets/audio/sound2.webm",
                    "https://raw.githubusercontent.com/Retyped/Demos/master/HowlerJsDemo/HowlerJsDemo/dist/assets/audio/sound2.mp3" 
                },
                Sprite = new howler.IHowlSoundSpriteDefinition
                {
                    ["one"] = new Sequence<double, double>(0, 450),
                    ["two"] = new Sequence<double, double>(2000, 250),
                    ["three"] = new Sequence<double, double>(4000, 350),
                    ["four"] = new Sequence<double, double>(6000, 380),
                    ["five"] = new Sequence<double, double>(8000, 340),
                    ["beat"] = new Sequence<double, double>(10000, 11163)
                },
                SpriteNames = new[]
                {
                    "one",
                    "two",
                    "three",
                    "four",
                    "five",
                    "beat"
                }
            });
        }

        #endregion
    }
}