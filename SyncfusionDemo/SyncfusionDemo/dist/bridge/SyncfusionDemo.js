/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("SyncfusionDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("SyncfusionDemo.App", {
        main: function Main () {
            var btnModel = { size: ej.ButtonSize.Large, showRoundedCorner: true, click: function (args) {
                jQuery("#dialog1").ejDialog("open");
            } };

            jQuery("#button1").ejButton(btnModel);

            jQuery("#dialog1").ejDialog({ title: "Info", showOnInit: false });
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTeW5jZnVzaW9uRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBUVlBLGVBQWVBLFFBRUpBLHFEQUVDQTtnQkFBUUE7OztZQUlwQkEsNEJBQStEQTs7WUFHL0RBLDRCQUErREEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBTeW5jZnVzaW9uRGVtb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ0bk1vZGVsID0gbmV3IFJldHlwZWQuZWpfd2ViX2FsbC5lai5CdXR0b24uTW9kZWxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IFJldHlwZWQuZWpfd2ViX2FsbC5lai5CdXR0b25TaXplLkxhcmdlLFxyXG4gICAgICAgICAgICAgICAgc2hvd1JvdW5kZWRDb3JuZXIgPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2xpY2sgPSBhcmdzID0+IFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5zZWxlY3QoXCIjZGlhbG9nMVwiKS5lal93ZWJfYWxsKCkuZWpEaWFsb2coXCJvcGVuXCIpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgbWFwcGluZyBtZXRob2QgIzE6XHJcbiAgICAgICAgICAgIFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5zZWxlY3QoXCIjYnV0dG9uMVwiKS5lal93ZWJfYWxsKCkuZWpCdXR0b24oYnRuTW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIG1hcHBpbmcgbWV0aG9kICMyOlxyXG4gICAgICAgICAgICBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuc2VsZWN0KFwiI2RpYWxvZzFcIikuZWpfd2ViX2FsbCgpLmVqRGlhbG9nKG5ldyBSZXR5cGVkLmVqX3dlYl9hbGwuZWouRGlhbG9nLk1vZGVsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gXCJJbmZvXCIsXHJcbiAgICAgICAgICAgICAgICBzaG93T25Jbml0ID0gZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
