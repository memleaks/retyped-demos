/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.3.2
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

            jQuery.get(url, "", function (data, status, xhr) {
                var $t, $t1;
                var response = data;

                quoteEl.text(($t = response.contents.quotes)[System.Array.index(0, $t)].quote);
                authorEl.text(($t1 = response.contents.quotes)[System.Array.index(0, $t1)].author);

                return null;
            });

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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaHJvbWVEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O1lBY1lBOztZQUVBQSxjQUFjQTtZQUNkQSxlQUFlQTs7WUFFZkEsV0FBMEJBLFNBQVNBLEFBQTRDQSxVQUFDQSxNQUFNQSxRQUFRQTs7Z0JBRTFGQSxlQUFlQSxBQUFnQkE7O2dCQUUvQkEsYUFBYUE7Z0JBQ2JBLGNBQWNBOztnQkFFZEEsT0FBT0E7Ozs7WUFJWEEsa0NBQWtDQSxBQUF3RUEsVUFBQ0EsSUFBSUEsTUFBTUE7Z0JBRWpIQSxJQUFJQTtvQkFFQUEsV0FBdUJBLEFBQW1DQTt3QkFFdERBLG1CQUFtQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIENocm9tZURlbW9cclxue1xyXG4gICAgdXNpbmcgY2hyb21lID0gUmV0eXBlZC5jaHJvbWUuY2hyb21lMjtcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgZGVtbzogXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cuYy1zaGFycGNvcm5lci5jb20vYXJ0aWNsZS9tYWtlLWEtY2hyb21lLWV4dGVuc2lvbi1pbi01LW1pbnV0ZXMvXHJcblxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIHVybCA9IFwiaHR0cDovL3F1b3Rlcy5yZXN0L3FvZC5qc29uXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVvdGVFbCA9IFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5zZWxlY3QoXCIjcXVvdGVibG9ja1wiKTtcclxuICAgICAgICAgICAgdmFyIGF1dGhvckVsID0gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNhdXRob3JcIik7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuZ2V0KHVybCwgXCJcIiwgKGdsb2JhbDo6UmV0eXBlZC5qcXVlcnkuSlF1ZXJ5U3RhdGljLmdldEZuKSgoZGF0YSwgc3RhdHVzLCB4aHIpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IChRdW90ZVJlc3BvbnNlKSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIHF1b3RlRWwudGV4dChyZXNwb25zZS5jb250ZW50cy5xdW90ZXNbMF0ucXVvdGUpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yRWwudGV4dChyZXNwb25zZS5jb250ZW50cy5xdW90ZXNbMF0uYXV0aG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0J3MgcmVsb2FkIGEgbmV3IHRhYiBldmVyeSAxNSBzZWNvbmRzOlxyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKGdsb2JhbDo6UmV0eXBlZC5jaHJvbWUuY2hyb21lMi50YWJzLlRhYlVwZGF0ZWRFdmVudC5UYWJVcGRhdGVkRXZlbnRGbikoKGlkLCBpbmZvLCB0YWIpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWIudXJsID09IFwiY2hyb21lOi8vbmV3dGFiL1wiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLnNldFRpbWVvdXQoKGdsb2JhbDo6UmV0eXBlZC5kb20uc2V0VGltZW91dEZuKShlID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5yZWxvYWQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLCAxNTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEJlbG93IGlzIHBhcnRpYWwgaW1wbGVtZW50YXRpb24gb2YgaHR0cDovL3F1b3Rlcy5yZXN0LyBBUElcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgW09iamVjdExpdGVyYWxdXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVvdGVSZXNwb25zZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBRdW90ZUNvbnRlbnQgY29udGVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgW09iamVjdExpdGVyYWxdXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVvdGVDb250ZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFF1b3RlW10gcXVvdGVzO1xyXG4gICAgfVxyXG5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFF1b3RlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBxdW90ZTtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGF1dGhvcjtcclxuICAgIH1cclxufSJdCn0K
