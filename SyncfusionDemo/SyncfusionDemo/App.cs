using Retyped;

using static Retyped.jquery;
using static Retyped.ej_web_all.ej;

namespace SyncfusionDemo
{
    public class App
    {
        public static void Main()
        {
            var btnModel = new Button.Model
            {
                size = ButtonSize.Large,
                showRoundedCorner = true,
                click = args => jQuery.select("#dialog1").ej_web_all().ejDialog("open")
            };

            // Use mapping method #1:
            jQuery.select("#button1").ej_web_all().ejButton(btnModel);

            // Use mapping method #2:
            jQuery.select("#dialog1").ej_web_all().ejDialog(new Dialog.Model
            {
                title = "Info",
                showOnInit = false
            });
        }
    }
}