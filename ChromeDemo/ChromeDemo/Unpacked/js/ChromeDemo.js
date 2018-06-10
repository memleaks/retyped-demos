/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("ChromeDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("ChromeDemo.App", {
        main: function Main () {
            // Original demo: 
            // http://www.c-sharpcorner.com/article/make-a-chrome-extension-in-5-minutes/


            var url = "http://quotes.rest/qod.json";

            var quoteEl = jQuery("#quoteblock");
            var authorEl = jQuery("#author");

            jQuery.get(url, "", new (Bridge.virtualc("JQuery.jqXHR.DoneCallback"))(function (data, status, xhr, never) {
                var $t, $t1;
                var response = data;

                quoteEl.text(($t = response.contents.quotes)[System.Array.index(0, $t)].quote);
                authorEl.text(($t1 = response.contents.quotes)[System.Array.index(0, $t1)].author);
            }));

            // Let's reload a new tab every 15 seconds:
            chrome.tabs.onUpdated.addListener(function (id, info, tab) {
                if (Bridge.referenceEquals(tab.url, "chrome://newtab/")) {
                    setTimeout(function (e) {
                        chrome.tabs.reload(id);
                    }, 15000);
                }
            });
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaHJvbWVEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O1lBY1lBOztZQUVBQSxjQUFjQTtZQUNkQSxlQUFlQTs7WUFFZkEsV0FBMEJBLFNBQVNBLEtBQUlBLDhDQUFzRkEsVUFBQ0EsTUFBTUEsUUFBUUEsS0FBS0E7O2dCQUU3SUEsZUFBZUEsQUFBZ0JBOztnQkFFL0JBLGFBQWFBO2dCQUNiQSxjQUFjQTs7OztZQUlsQkEsa0NBQWtEQSxBQUF3RUEsVUFBQ0EsSUFBSUEsTUFBTUE7Z0JBRWpJQSxJQUFJQTtvQkFFQUEsV0FBdUJBLEFBQW1DQTt3QkFFdERBLG1CQUFtQ0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIENocm9tZURlbW9cclxue1xyXG4gICAgdXNpbmcgY2hyb21lID0gUmV0eXBlZC5jaHJvbWUuY2hyb21lMjtcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgZGVtbzogXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cuYy1zaGFycGNvcm5lci5jb20vYXJ0aWNsZS9tYWtlLWEtY2hyb21lLWV4dGVuc2lvbi1pbi01LW1pbnV0ZXMvXHJcblxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIHVybCA9IFwiaHR0cDovL3F1b3Rlcy5yZXN0L3FvZC5qc29uXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVvdGVFbCA9IFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5zZWxlY3QoXCIjcXVvdGVibG9ja1wiKTtcclxuICAgICAgICAgICAgdmFyIGF1dGhvckVsID0gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNhdXRob3JcIik7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuZ2V0KHVybCwgXCJcIiwgbmV3IFJldHlwZWQuanF1ZXJ5LkpRdWVyeS5qcVhIUi5Eb25lQ2FsbGJhY2s8b2JqZWN0LCBSZXR5cGVkLmpxdWVyeS5KUXVlcnkuanFYSFI8b2JqZWN0Pj4oKGRhdGEsIHN0YXR1cywgeGhyLCBuZXZlcikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gKFF1b3RlUmVzcG9uc2UpIGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgcXVvdGVFbC50ZXh0KHJlc3BvbnNlLmNvbnRlbnRzLnF1b3Rlc1swXS5xdW90ZSk7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JFbC50ZXh0KHJlc3BvbnNlLmNvbnRlbnRzLnF1b3Rlc1swXS5hdXRob3IpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQncyByZWxvYWQgYSBuZXcgdGFiIGV2ZXJ5IDE1IHNlY29uZHM6XHJcbiAgICAgICAgICAgIFJldHlwZWQuY2hyb21lLmNocm9tZTIudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKGdsb2JhbDo6UmV0eXBlZC5jaHJvbWUuY2hyb21lMi50YWJzLlRhYlVwZGF0ZWRFdmVudC5UYWJVcGRhdGVkRXZlbnRGbikoKGlkLCBpbmZvLCB0YWIpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWIudXJsID09IFwiY2hyb21lOi8vbmV3dGFiL1wiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLnNldFRpbWVvdXQoKGdsb2JhbDo6UmV0eXBlZC5kb20uc2V0VGltZW91dEZuKShlID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR5cGVkLmNocm9tZS5jaHJvbWUyLnRhYnMucmVsb2FkKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSwgMTUwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBCZWxvdyBpcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9uIG9mIGh0dHA6Ly9xdW90ZXMucmVzdC8gQVBJXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFF1b3RlUmVzcG9uc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUXVvdGVDb250ZW50IGNvbnRlbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFF1b3RlQ29udGVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBRdW90ZVtdIHF1b3RlcztcclxuICAgIH1cclxuXHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBRdW90ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgcXVvdGU7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBhdXRob3I7XHJcbiAgICB9XHJcbn0iXQp9Cg==
