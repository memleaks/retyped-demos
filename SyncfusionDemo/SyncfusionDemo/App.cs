using System;
using Retyped;

using static Retyped.jquery;
using static Retyped.ej_web_all;
using static Retyped.ej_web_all.ej;

namespace SyncfusionDemo
{
    public class App
    {
        public static void Main()
        {
            // Another way of initializing interfaces:
            // var btnModel = ObjectLiteral.Create<ej.Button.Model.Interface>();
            // btnModel.size = ej_web_all.ej.ButtonSize.Large;
            // ...

            var btnModel = new Button.Model
            {
                size = ButtonSize.Large,
                showRoundedCorner = true,
                click = args => jQuery.ej("#dialog1").ejDialog("open")
            };

            // Use mapping method #1:
            jQuery.select("#button1").ej().ejButton(btnModel);

            // Use mapping method #2:
            jQuery.ej("#dialog1").ejDialog(new Dialog.Model
            {
                title = "Info",
                showOnInit = false
            });
        }
    }

    /// <summary>
    /// Syncfusion mappings.
    /// </summary>
    public static class SyncfusionExtensions
    {
        /// <summary>
        /// This method maps original jQuery interface to Syncfusion jQuery extension.
        /// </summary>
        public static ej_web_all.JQuery ej(this jquery.JQuery jquery)
        {
            return jquery.As<ej_web_all.JQuery>();
        }

        /// <summary>
        /// Another mapping, helping to make the syntax even cleaner
        /// </summary>
        public static ej_web_all.JQuery ej(this JQueryStatic jquery, string selector)
        {
            return jQuery.select(selector).ej();
        }
    }
}