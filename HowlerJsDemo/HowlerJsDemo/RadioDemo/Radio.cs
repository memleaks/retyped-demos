using System.Linq;

using static Retyped.dom;
using static Retyped.howler;

namespace HowlerJsDemo.RadioDemo
{
    /// <summary>
    /// Radio class containing the state of our stations.
    /// Includes all methods for playing, stopping, etc.
    /// </summary>
    public class Radio
    {
        private readonly RadioStation[] _stations;
        private readonly RadioStationRenderInfo[] _renderInfo;
        private int _index;

        /// <summary>
        /// Inits Radio class containing the state of our stations.
        /// </summary>
        /// <param name="rootEl">HTML Element will be using as a root element for rendering.</param>
        /// <param name="stations">Array of objects with station details.</param>
        public Radio(HTMLElement rootEl, RadioStation[] stations)
        {
            _index = 0;
            _stations = stations;
            _renderInfo = new RadioStationRenderInfo[stations.Length];

            // Setup the display for each station.
            for (var i = 0; i < stations.Length; i++)
            {
                // Render station:
                _renderInfo[i] = Render(rootEl, stations[i], i);
            }
        }

        /// <summary>
        /// Render station.
        /// </summary>
        private RadioStationRenderInfo Render(HTMLElement rootEl, RadioStation station, int stationIndex)
        {
            var stationDiv = new HTMLDivElement {className = "station"};
            var titleDiv = new HTMLDivElement { className = "title" };

            var subtitleDiv = new HTMLDivElement { className = "subtitle" };
            var liveDiv = new HTMLDivElement { className = "live", innerHTML = "LIVE"};
            var playingDiv = new HTMLDivElement { className = "playing" };

            var rect1Div = new HTMLDivElement { className = "rect1" };
            var rect2Div = new HTMLDivElement { className = "rect2" };
            var rect3Div = new HTMLDivElement { className = "rect3" };
            var rect4Div = new HTMLDivElement { className = "rect4" };
            var rect5Div = new HTMLDivElement { className = "rect5" };

            playingDiv.appendChild(rect1Div);
            playingDiv.appendChild(rect2Div);
            playingDiv.appendChild(rect3Div);
            playingDiv.appendChild(rect4Div);
            playingDiv.appendChild(rect5Div);

            titleDiv.appendChild(subtitleDiv);
            titleDiv.appendChild(liveDiv);
            titleDiv.appendChild(playingDiv);

            stationDiv.appendChild(titleDiv);

            var renderInfo = new RadioStationRenderInfo
            {
                Station = stationDiv,
                Title = subtitleDiv,
                Live = liveDiv,
                Playing = playingDiv
            };

            renderInfo.Title.innerHTML = $"<b>{station.Freq}</b> {station.Title}";
            renderInfo.Station.addEventListener("click", e =>
            {
                var isNotPlaying = station.Howl == null || !station.Howl.playing();

                // Stop other sounds or the current one.
                Stop();

                // If the station isn't already playing or it doesn't exist, play it.
                if (station.Howl == null || isNotPlaying)
                {
                    Play(stationIndex);
                }
            });

            rootEl.appendChild(stationDiv);

            return renderInfo;
        }

        /// <summary>
        /// Play a station with a specific index.
        /// </summary>
        /// <param name="stationIndex">Index in the array of stations.</param>
        public void Play(int? stationIndex = null)
        {
            var index = stationIndex ?? _index;

            var data = _stations[index];

            // If we already loaded this track, use the current one.
            // Otherwise, setup and load a new Howl.
            if (data.Howl == null)
            {
                var srcArray = data.Sources.Select(x => x.Url).ToArray();
                var formatArray = data.Sources.Select(x => x.Format).ToArray();

                data.Howl = new Howl(new IHowlProperties
                {
                    src = srcArray,
                    html5 = true,   // A live stream can only be played through HTML5 Audio.
                    format = formatArray
                });
            }
            
            // Begin playing the sound.
            data.Howl.play();

            // Toggle the display.
            ToggleStationDisplay(index, true);

            // Keep track of the index we are currently playing.
            _index = index;
        }

        /// <summary>
        /// Stop a station's live stream.
        /// </summary>
        public void Stop()
        {
            // Get the Howl we want to manipulate.
            var sound = _stations[_index].Howl;

            // Toggle the display.
            ToggleStationDisplay(_index, false);

            // Stop the sound.
            sound?.stop();
        }

        /// <summary>
        /// Toggle the display of a station to off/on.
        /// </summary>
        /// <param name="index">Index of the station to toggle.</param>
        /// <param name="state">true is on and false is off.</param>
        public void ToggleStationDisplay(int index, bool state)
        {
            // Highlight/un-highlight the row.
            _renderInfo[index].Station.style.backgroundColor = state ? "rgba(255, 255, 255, 0.33)" : string.Empty;

            // Show/hide the "live" marker.
            _renderInfo[index].Live.style.opacity = state ? "1" : "0";

            // Show/hide the "playing" animation.
            _renderInfo[index].Playing.style.display = state ? "block" : "none";
        }
    }
}