using Retyped;

namespace HowlerJsDemo.RadioDemo
{
    /// <summary>
    /// Contains metadata for a radio station.
    /// </summary>
    public class RadioStation
    {
        public string Freq { get; set; }

        public string Title { get; set; }

        public RadioStationSrc[] Sources { get; set; }

        public howler.Howl Howl { get; set; }
    }
}