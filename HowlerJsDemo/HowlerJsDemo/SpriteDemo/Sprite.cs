using System;
using System.Collections.Generic;

using static Retyped.dom;
using static Retyped.howler;

namespace HowlerJsDemo.SpriteDemo
{
    /// <summary>
    /// Sprite class containing the state of our sprites to play and their progress.
    /// </summary>
    public class Sprite
    {
        private const string DataSetSpriteProp = "sprite";

        private readonly SpriteOptions _options;

        private readonly Howl _sound;
        private readonly List<HTMLDivElement> _sounds = new List<HTMLDivElement>();
        private readonly Dictionary<string, HTMLDivElement> _spriteElms = new Dictionary<string, HTMLDivElement>();

        /// <summary>
        /// Inits a new Sprite object.
        /// </summary>
        /// <param name="rootEl">Root HTML element where sprites will be rendered.</param>
        /// <param name="options">Settings to pass into and setup the sound and visuals.</param>
        public Sprite(HTMLDivElement rootEl,  SpriteOptions options)
        {
            // Setup the options to define this sprite display.
            _options = options;
            Render(rootEl);

            // Create our audio sprite definition.
            _sound = new Howl( new IHowlProperties
            {
                src = options.Src,
                sprite = options.Sprite
            });

            // Setup a resize event and fire it to setup our sprite overlays.
            window.addEventListener("resize", (Event e) =>
            {
                Resize();
            }, false);

            Resize();

            // Begin the progress step tick.
            requestAnimationFrame(Step);
        }

        /// <summary>
        /// Render elements and setup the listeners for each sprite click area.
        /// </summary>
        /// <param name="rootEl"></param>
        private void Render(HTMLDivElement rootEl)
        {
            var instructDiv = new HTMLDivElement { className = "instructions" };

            var titleSpan = new HTMLSpanElement
            {
                className = "spriteTitle",
                innerHTML = "Audio Sprite Visual"
            };

            var descSpan = new HTMLSpanElement
            {
                className = "description",
                innerHTML = "Click a section of the waveform to play the sprite."
            };

            var waveDiv = new HTMLDivElement { id = "waveform" };
            var spritesDiv = new HTMLDivElement { className = "sprites" };

            instructDiv.appendChild(titleSpan);
            instructDiv.appendChild(new HTMLBRElement());
            instructDiv.appendChild(descSpan);

            rootEl.appendChild(instructDiv);
            rootEl.appendChild(waveDiv);
            rootEl.appendChild(spritesDiv);

            var count = 0;
            foreach (var spriteName in _options.SpriteNames)
            {
                var spriteDiv = new HTMLDivElement
                {
                    id = $"sprite{count++}",
                    className = "sprite"
                };

                spriteDiv.addEventListener("click", e =>
                {
                    Play(spriteName);
                }, false);

                var spriteLabelDiv = new HTMLDivElement
                {
                    className = "sprite-label",
                    innerHTML = spriteName
                };

                spriteDiv.appendChild(spriteLabelDiv);

                spritesDiv.appendChild(spriteDiv);

                _spriteElms.Add(spriteName, spriteDiv);
            }
        }

        /// <summary>
        /// Play a sprite when clicked and track the progress.
        /// </summary>
        /// <param name="spriteName">Name in a sprite object.</param>
        public void Play(string spriteName)
        {
            // Play the sprite sound and capture the ID.
            var id = _sound.play(spriteName);

            // Create a progress element and begin visually tracking it.
            var elm = new HTMLDivElement
            {
                id = id.ToString(),
                className = "progress",
                dataset = {[DataSetSpriteProp] = spriteName},
            };

            _spriteElms[spriteName].appendChild(elm);
            _sounds.Add(elm);

            // When this sound is finished, remove the progress element.
            _sound.once("end", () =>
            {
                if (_sounds.Remove(elm))
                {
                    _spriteElms[spriteName].removeChild(elm);
                }
            }, id);
        }

        /// <summary>
        /// Stop playing.
        /// </summary>
        public void Stop()
        {
            _sound?.stop();
        }

        /// <summary>
        /// Called on window resize to correctly psotion and size the click overlays.
        /// </summary>
        private void Resize()
        {
            // Calculate the scale of our window from "full" size.
            var scale = (window.innerWidth - 60) / 3600; // 60 is margin width

            // Resize and reposition the sprite overlays.
            for (var i = 0; i < _options.SpriteNames.Length; i++)
            {
                var spriteName = _options.SpriteNames[i];
                var sprite = _spriteElms[spriteName];

                sprite.style.width = Math.Round(_options.Width[i] * (double)scale) + "px";
                if (i < _options.Left.Length && _options.Left[i] > 0)
                {
                    sprite.style.left = Math.Round(_options.Left[i] * (double)scale) + "px";
                }
            }
        }

        /// <summary>
        /// The step called within requestAnimationFrame to update the playback positions.
        /// </summary>
        private void Step(double time)
        {
            // Loop through all active sounds and update their progress bar.
            foreach (var sound in _sounds)
            {
                var id = int.Parse(sound.id, 10);
                var spriteName = (string) sound.dataset[DataSetSpriteProp];

                var range = (Bridge.Sequence<double, double>) _options.Sprite[spriteName];
                var offset = range.Item1;

                var seek = ((double?) _sound.seek(id) ?? 0) - (offset / 1000);
                sound.style.width = (seek / _sound.duration(id) * 100) + "%";
            }

            requestAnimationFrame(Step);
        }
    }
}
