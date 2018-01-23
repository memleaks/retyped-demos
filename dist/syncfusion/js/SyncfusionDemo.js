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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTeW5jZnVzaW9uRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBUVlBLGVBQWVBLFFBRUpBLHFEQUVDQTtnQkFBUUE7Ozs7WUFJcEJBLDRCQUErREE7OztZQUcvREEsNEJBQStEQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFN5bmNmdXNpb25EZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnRuTW9kZWwgPSBuZXcgUmV0eXBlZC5lal93ZWJfYWxsLmVqLkJ1dHRvbi5Nb2RlbFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gUmV0eXBlZC5lal93ZWJfYWxsLmVqLkJ1dHRvblNpemUuTGFyZ2UsXHJcbiAgICAgICAgICAgICAgICBzaG93Um91bmRlZENvcm5lciA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjbGljayA9IGFyZ3MgPT4gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNkaWFsb2cxXCIpLmVqX3dlYl9hbGwoKS5lakRpYWxvZyhcIm9wZW5cIilcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBtYXBwaW5nIG1ldGhvZCAjMTpcclxuICAgICAgICAgICAgUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNidXR0b24xXCIpLmVqX3dlYl9hbGwoKS5lakJ1dHRvbihidG5Nb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgbWFwcGluZyBtZXRob2QgIzI6XHJcbiAgICAgICAgICAgIFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5zZWxlY3QoXCIjZGlhbG9nMVwiKS5lal93ZWJfYWxsKCkuZWpEaWFsb2cobmV3IFJldHlwZWQuZWpfd2ViX2FsbC5lai5EaWFsb2cuTW9kZWxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcIkluZm9cIixcclxuICAgICAgICAgICAgICAgIHNob3dPbkluaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
