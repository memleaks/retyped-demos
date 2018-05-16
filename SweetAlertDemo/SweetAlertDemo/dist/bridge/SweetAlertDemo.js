/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("SweetAlertDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("SweetAlertDemo.App", {
        main: function Main () {
            var promptSettings = { };

            promptSettings.title = "SweetAlert demo";

            promptSettings.type = "input";
            promptSettings.text = "Please enter some text or press Reject:";
            promptSettings.showCancelButton = true;
            promptSettings.cancelButtonText = "Reject";


            swal(promptSettings, function (result) {
                    setTimeout(function (args) {
                        swal(System.String.format("Entered text: '{0}'.", [result]));
                    }, 200);

                    return null;
                });
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTd2VldEFsZXJ0RGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBYVlBLHFCQUFxQkE7O1lBR3JCQTs7WUFHQUEsc0JBQTRCQTtZQUM1QkE7WUFDQUE7WUFDQUE7OztZQU1BQSxLQUE2QkEsZ0JBQWdCQSxBQUFpRUE7b0JBRTFHQSxXQUF1QkEsQUFBbUNBO3dCQUd0REEsS0FBNkJBLDhDQUFxQ0E7OztvQkFHdEVBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBTd2VldEFsZXJ0RGVtb1xyXG57XHJcbiAgICAvLyBMZXQncyBpbnRyb2R1Y2UgYW4gYWxpYXMgdG8gbWFrZSB0aGUgY29kZSBjbGVhbmVyOlxyXG4gICAgdXNpbmcgU2V0dGluZ3NPclByb21wdFNldHRpbmdzID0gSW50ZXJzZWN0aW9uPFN3ZWV0QWxlcnQuU2V0dGluZ3MsIFN3ZWV0QWxlcnQuUHJvbXRNb2RhbFNldHRpbmdzPjtcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBzZXR0aW5ncyAoYmFzZWQgb24gdGhlIGQudHMsIFByb21wdFNldHRpbmdzIGlzIGEgcGxhaW4gb2JqZWN0IGxpdGVyYWwpOlxyXG4gICAgICAgICAgICB2YXIgcHJvbXB0U2V0dGluZ3MgPSBPYmplY3RMaXRlcmFsLkNyZWF0ZTxTZXR0aW5nc09yUHJvbXB0U2V0dGluZ3M+KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgU2V0dGluZ3MgdHlwZSBmaWVsZHMgKEl0ZW0xIGhhcyB0eXBlIFN3ZWV0QWxlcnQuU2V0dGluZ3MpOlxyXG4gICAgICAgICAgICBwcm9tcHRTZXR0aW5ncy5UeXBlMS50aXRsZSA9IFwiU3dlZXRBbGVydCBkZW1vXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgUHJvbXRNb2RhbFNldHRpbmdzIGZpZWxkcyAoSXRlbTIgaGFzIHR5cGUgU3dlZXRBbGVydC5Qcm9tdE1vZGFsU2V0dGluZ3MpOlxyXG4gICAgICAgICAgICBwcm9tcHRTZXR0aW5ncy5UeXBlMi50eXBlID0gc3dlZXRhbGVydC5MaXRlcmFscy5pbnB1dDtcclxuICAgICAgICAgICAgcHJvbXB0U2V0dGluZ3MuVHlwZTIudGV4dCA9IFwiUGxlYXNlIGVudGVyIHNvbWUgdGV4dCBvciBwcmVzcyBSZWplY3Q6XCI7XHJcbiAgICAgICAgICAgIHByb21wdFNldHRpbmdzLlR5cGUyLnNob3dDYW5jZWxCdXR0b24gPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm9tcHRTZXR0aW5ncy5UeXBlMi5jYW5jZWxCdXR0b25UZXh0ID0gXCJSZWplY3RcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIEluIEphdmFTY3JpcHQgdGhlIGNhbGwgd291bGQgbG9vayBsaWtlOiBzd2FsKHByb21wdFNldHRpbmdzLCAuLi4pO1xyXG4gICAgICAgICAgICAvLyBTaW5jZSBzd2FsIGlzIGFuIG9iamVjdCwgdGhlIHNhbWUgY2FsbCBzaG91bGQgYmUgZG9uZSB1c2luZyBcIlNlbGZcIiBtZXRob2Q6XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93IHByb21wdCBhbmQgcHJvY2VzcyB0aGUgaW5wdXQ6XHJcbiAgICAgICAgICAgIFJldHlwZWQuc3dlZXRhbGVydC5zd2FsLlNlbGYocHJvbXB0U2V0dGluZ3MsIChnbG9iYWw6OlJldHlwZWQuc3dlZXRhbGVydC5Td2VldEFsZXJ0LlN3ZWV0QWxlcnRTdGF0aWMuU2VsZkZuMikocmVzdWx0ID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLnNldFRpbWVvdXQoKGdsb2JhbDo6UmV0eXBlZC5kb20uc2V0VGltZW91dEZuKShhcmdzID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyBhbm90aGVyIHByb21wdCwgdG8gc2hvdyB0aGUgaW5wdXR0ZWQgdGV4dDpcclxuICAgICAgICAgICAgICAgICAgICBSZXR5cGVkLnN3ZWV0YWxlcnQuc3dhbC5TZWxmKHN0cmluZy5Gb3JtYXQoXCJFbnRlcmVkIHRleHQ6ICd7MH0nLlwiLHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgfSksIDIwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
