using static Retyped.dom;

namespace HowlerJsDemo.RadioDemo
{
    /// <summary>
    /// Radio station display info.
    /// </summary>
    public class RadioStationRenderInfo
    {
        public HTMLDivElement Station { get; set; }

        public HTMLDivElement Title { get; set; }

        public HTMLDivElement Live { get; set; }

        public HTMLDivElement Playing { get; set; }
    }
}