/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.5.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTd2VldEFsZXJ0RGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQWFZQSxxQkFBcUJBOzs7WUFHckJBOzs7WUFHQUEsc0JBQTRCQTtZQUM1QkE7WUFDQUE7WUFDQUE7Ozs7OztZQU1BQSxLQUE2QkEsZ0JBQWdCQSxBQUFpRUE7b0JBRTFHQSxXQUF1QkEsQUFBbUNBOzt3QkFHdERBLEtBQTZCQSw4Q0FBcUNBOzs7b0JBR3RFQSxPQUFPQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgU3dlZXRBbGVydERlbW9cclxue1xyXG4gICAgLy8gTGV0J3MgaW50cm9kdWNlIGFuIGFsaWFzIHRvIG1ha2UgdGhlIGNvZGUgY2xlYW5lcjpcclxuICAgIHVzaW5nIFNldHRpbmdzT3JQcm9tcHRTZXR0aW5ncyA9IEludGVyc2VjdGlvbjxTd2VldEFsZXJ0LlNldHRpbmdzLCBTd2VldEFsZXJ0LlByb210TW9kYWxTZXR0aW5ncz47XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgc2V0dGluZ3MgKGJhc2VkIG9uIHRoZSBkLnRzLCBQcm9tcHRTZXR0aW5ncyBpcyBhIHBsYWluIG9iamVjdCBsaXRlcmFsKTpcclxuICAgICAgICAgICAgdmFyIHByb21wdFNldHRpbmdzID0gT2JqZWN0TGl0ZXJhbC5DcmVhdGU8U2V0dGluZ3NPclByb21wdFNldHRpbmdzPigpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IFNldHRpbmdzIHR5cGUgZmllbGRzIChJdGVtMSBoYXMgdHlwZSBTd2VldEFsZXJ0LlNldHRpbmdzKTpcclxuICAgICAgICAgICAgcHJvbXB0U2V0dGluZ3MuVHlwZTEudGl0bGUgPSBcIlN3ZWV0QWxlcnQgZGVtb1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IFByb210TW9kYWxTZXR0aW5ncyBmaWVsZHMgKEl0ZW0yIGhhcyB0eXBlIFN3ZWV0QWxlcnQuUHJvbXRNb2RhbFNldHRpbmdzKTpcclxuICAgICAgICAgICAgcHJvbXB0U2V0dGluZ3MuVHlwZTIudHlwZSA9IHN3ZWV0YWxlcnQuTGl0ZXJhbHMuaW5wdXQ7XHJcbiAgICAgICAgICAgIHByb21wdFNldHRpbmdzLlR5cGUyLnRleHQgPSBcIlBsZWFzZSBlbnRlciBzb21lIHRleHQgb3IgcHJlc3MgUmVqZWN0OlwiO1xyXG4gICAgICAgICAgICBwcm9tcHRTZXR0aW5ncy5UeXBlMi5zaG93Q2FuY2VsQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJvbXB0U2V0dGluZ3MuVHlwZTIuY2FuY2VsQnV0dG9uVGV4dCA9IFwiUmVqZWN0XCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJbiBKYXZhU2NyaXB0IHRoZSBjYWxsIHdvdWxkIGxvb2sgbGlrZTogc3dhbChwcm9tcHRTZXR0aW5ncywgLi4uKTtcclxuICAgICAgICAgICAgLy8gU2luY2Ugc3dhbCBpcyBhbiBvYmplY3QsIHRoZSBzYW1lIGNhbGwgc2hvdWxkIGJlIGRvbmUgdXNpbmcgXCJTZWxmXCIgbWV0aG9kOlxyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyBwcm9tcHQgYW5kIHByb2Nlc3MgdGhlIGlucHV0OlxyXG4gICAgICAgICAgICBSZXR5cGVkLnN3ZWV0YWxlcnQuc3dhbC5TZWxmKHByb21wdFNldHRpbmdzLCAoZ2xvYmFsOjpSZXR5cGVkLnN3ZWV0YWxlcnQuU3dlZXRBbGVydC5Td2VldEFsZXJ0U3RhdGljLlNlbGZGbjIpKHJlc3VsdCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5zZXRUaW1lb3V0KChnbG9iYWw6OlJldHlwZWQuZG9tLnNldFRpbWVvdXRGbikoYXJncyA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgYW5vdGhlciBwcm9tcHQsIHRvIHNob3cgdGhlIGlucHV0dGVkIHRleHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5zd2VldGFsZXJ0LnN3YWwuU2VsZihzdHJpbmcuRm9ybWF0KFwiRW50ZXJlZCB0ZXh0OiAnezB9Jy5cIixyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgIH0pLCAyMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
