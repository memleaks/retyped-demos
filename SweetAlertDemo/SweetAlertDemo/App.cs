using Bridge;
using Retyped;
using static Retyped.dom;
using static Retyped.sweetalert;

namespace SweetAlertDemo
{
    // Let's introduce an alias to make the code cleaner:
    using SettingsOrPromptSettings = Intersection<SweetAlert.Settings, SweetAlert.PromtModalSettings>;

    public class App
    {
        public static void Main()
        {
            // Initialize settings (based on the d.ts, PromptSettings is a plain object literal):
            var promptSettings = ObjectLiteral.Create<SettingsOrPromptSettings>();

            // Set Settings type fields (Item1 has type SweetAlert.Settings):
            promptSettings.Item1.title = "SweetAlert demo";

            // Set PromtModalSettings fields (Item2 has type SweetAlert.PromtModalSettings):
            promptSettings.Item2.type = sweetalert.Literals.input;
            promptSettings.Item2.text = "Please enter some text or press Reject:";
            promptSettings.Item2.showCancelButton = true;
            promptSettings.Item2.cancelButtonText = "Reject";

            // In JavaScript the call would look like: swal(promptSettings, ...);
            // Since swal is an object, the same call should be done using "Self" method:

            // Show prompt and process the input:
            swal.Self(promptSettings, result =>
            {
                setTimeout(args =>
                {
                    // Show another prompt, to show the inputted text:
                    swal.Self($"Entered text: '{result}'.");
                }, 200);

                return null;
            });
        }
    }
}