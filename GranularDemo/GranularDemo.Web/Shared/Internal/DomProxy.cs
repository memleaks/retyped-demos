using GranularDemo.Shared.Interfaces;

using static Retyped.jquery;

namespace GranularDemo.Shared.Internal
{
    public class DomProxy : IDomProxy
    {
        public void Alert(string msg)
        {
            Retyped.dom.alert(msg);
        }

        public void UpdateBtnText(string buttonId, string text)
        {
            var btn = jQuery.select("#" + buttonId);
            var contentDiv = btn.find("contentpresenter textblock div");
            contentDiv.html(text);
        }
    }
}
