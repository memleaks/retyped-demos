/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("SyncfusionDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("SyncfusionDemo.App", {
        main: function Main () {
            // Another way of initializing interfaces:
            // var btnModel = ObjectLiteral.Create<ej.Button.Model.Interface>();
            // btnModel.size = ej_web_all.ej.ButtonSize.Large;
            // ...

            var btnModel = { size: ej.ButtonSize.Large, showRoundedCorner: true, click: function (args) {
                SyncfusionDemo.SyncfusionExtensions.ej$1(jQuery, "#dialog1").ejDialog("open");
            } };

            // Use mapping method #1:
            SyncfusionDemo.SyncfusionExtensions.ej(jQuery("#button1")).ejButton(btnModel);

            // Use mapping method #2:
            SyncfusionDemo.SyncfusionExtensions.ej$1(jQuery, "#dialog1").ejDialog({ title: "Info", showOnInit: false });
        }
    });

    /** @namespace SyncfusionDemo */

    /**
     * Syncfusion mappings.
     *
     * @static
     * @abstract
     * @public
     * @class SyncfusionDemo.SyncfusionExtensions
     */
    Bridge.define("SyncfusionDemo.SyncfusionExtensions", {
        statics: {
            methods: {
                /**
                 * This method maps original jQuery interface to Syncfusion jQuery extension.
                 *
                 * @static
                 * @public
                 * @this SyncfusionDemo.SyncfusionExtensions
                 * @memberof SyncfusionDemo.SyncfusionExtensions
                 * @param   {Retyped..JQuery}    jquery
                 * @return  {Retyped..JQuery}
                 */
                ej: function (jquery) {
                    return jquery;
                },
                /**
                 * Another mapping, helping to make the syntax even cleaner
                 *
                 * @static
                 * @public
                 * @this SyncfusionDemo.SyncfusionExtensions
                 * @memberof SyncfusionDemo.SyncfusionExtensions
                 * @param   {Retyped..JQueryStatic}    jquery      
                 * @param   {string}                   selector
                 * @return  {Retyped..JQuery}
                 */
                ej$1: function (jquery, selector) {
                    return SyncfusionDemo.SyncfusionExtensions.ej(jQuery(selector));
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTeW5jZnVzaW9uRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7WUFjWUEsZUFBZUEsUUFFSkEscURBRUNBO2dCQUFRQTs7OztZQUlwQkEsb0VBQXVEQTs7O1lBR3ZEQSxzRUFBOENBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBZ0JmQTtvQkFFL0JBLE9BQU9BOzs7Ozs7Ozs7Ozs7O2dDQU13QkEsUUFBeUNBO29CQUV4RUEsT0FBT0EsOENBQTZCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgU3luY2Z1c2lvbkRlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEFub3RoZXIgd2F5IG9mIGluaXRpYWxpemluZyBpbnRlcmZhY2VzOlxyXG4gICAgICAgICAgICAvLyB2YXIgYnRuTW9kZWwgPSBPYmplY3RMaXRlcmFsLkNyZWF0ZTxlai5CdXR0b24uTW9kZWwuSW50ZXJmYWNlPigpO1xyXG4gICAgICAgICAgICAvLyBidG5Nb2RlbC5zaXplID0gZWpfd2ViX2FsbC5lai5CdXR0b25TaXplLkxhcmdlO1xyXG4gICAgICAgICAgICAvLyAuLi5cclxuXHJcbiAgICAgICAgICAgIHZhciBidG5Nb2RlbCA9IG5ldyBSZXR5cGVkLmVqX3dlYl9hbGwuZWouQnV0dG9uLk1vZGVsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBSZXR5cGVkLmVqX3dlYl9hbGwuZWouQnV0dG9uU2l6ZS5MYXJnZSxcclxuICAgICAgICAgICAgICAgIHNob3dSb3VuZGVkQ29ybmVyID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNsaWNrID0gYXJncyA9PiBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuZWooXCIjZGlhbG9nMVwiKS5lakRpYWxvZyhcIm9wZW5cIilcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBtYXBwaW5nIG1ldGhvZCAjMTpcclxuICAgICAgICAgICAgUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNidXR0b24xXCIpLmVqKCkuZWpCdXR0b24oYnRuTW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXNlIG1hcHBpbmcgbWV0aG9kICMyOlxyXG4gICAgICAgICAgICBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuZWooXCIjZGlhbG9nMVwiKS5lakRpYWxvZyhuZXcgUmV0eXBlZC5lal93ZWJfYWxsLmVqLkRpYWxvZy5Nb2RlbFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9IFwiSW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgc2hvd09uSW5pdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gU3luY2Z1c2lvbiBtYXBwaW5ncy5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFN5bmNmdXNpb25FeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGlzIG1ldGhvZCBtYXBzIG9yaWdpbmFsIGpRdWVyeSBpbnRlcmZhY2UgdG8gU3luY2Z1c2lvbiBqUXVlcnkgZXh0ZW5zaW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBlal93ZWJfYWxsLkpRdWVyeSBlaih0aGlzIGpxdWVyeS5KUXVlcnkganF1ZXJ5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpxdWVyeS5Bczxlal93ZWJfYWxsLkpRdWVyeT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQW5vdGhlciBtYXBwaW5nLCBoZWxwaW5nIHRvIG1ha2UgdGhlIHN5bnRheCBldmVuIGNsZWFuZXJcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZWpfd2ViX2FsbC5KUXVlcnkgZWoodGhpcyBSZXR5cGVkLmpxdWVyeS5KUXVlcnlTdGF0aWMganF1ZXJ5LCBzdHJpbmcgc2VsZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChzZWxlY3RvcikuZWooKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
