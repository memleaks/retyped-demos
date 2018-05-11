using Retyped;

namespace HowlerJsDemo.SpriteDemo
{
    /// <summary>
    /// Settings to pass into and setup the sound and visuals.
    /// </summary>
    public class SpriteOptions
    {
        public int[] Width { get; set; }

        public int[] Left { get; set; }

        public string[] Src { get; set; }

        public howler.IHowlSoundSpriteDefinition Sprite { get; set; }

        public string[] SpriteNames { get; set; }
    }
}