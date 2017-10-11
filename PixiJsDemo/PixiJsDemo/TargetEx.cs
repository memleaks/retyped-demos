using Bridge;
using static Retyped.pixi_js.PIXI;

namespace PixiJsDemo
{
    /// <summary>
    /// Contains additional properties for <see cref="DisplayObject"/>.
    /// </summary>
    [External]
    [IgnoreCast]
    public class TargetEx : DisplayObject
    {
        public interaction.InteractionData data { get; set; }

        public bool dragging { get; set; }
    }
}