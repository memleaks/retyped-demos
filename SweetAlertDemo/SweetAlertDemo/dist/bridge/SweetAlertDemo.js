/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("SweetAlertDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("SweetAlertDemo.App", {
        main: function Main () {
            // Initialize settings (based on the d.ts, PromptSettings is a plain object literal):
            var promptSettings = { };

            // Set Settings type fields (Item1 has type SweetAlert.Settings):
            promptSettings.title = "SweetAlert demo";

            // Set PromtModalSettings fields (Item2 has type SweetAlert.PromtModalSettings):
            promptSettings.type = "input";
            promptSettings.text = "Please enter some text or press Reject:";
            promptSettings.showCancelButton = true;
            promptSettings.cancelButtonText = "Reject";

            // In JavaScript the call would look like: swal(promptSettings, ...);
            // Since swal is an object, the same call should be done using "Self" method:

            // Show prompt and process the input:
            swal(promptSettings, function (result) {
                    setTimeout(function (args) {
                        // Show another prompt, to show the inputted text:
                        swal(System.String.format("Entered text: '{0}'.", [result]));
                    }, 200);

                    return null;
                });
        }
    });
});
