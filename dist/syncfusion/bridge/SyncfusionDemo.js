/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("SyncfusionDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("SyncfusionDemo.App", {
        main: function Main () {
            var btnModel = { size: ej.ButtonSize.Large, showRoundedCorner: true, click: function (args) {
                jQuery("#dialog1").ejDialog("open");
            } };

            // Use mapping method #1:
            jQuery("#button1").ejButton(btnModel);

            // Use mapping method #2:
            jQuery("#dialog1").ejDialog({ title: "Info", showOnInit: false });
        }
    });
});
