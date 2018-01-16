/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.1
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaHJvbWVEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O1lBY1lBOztZQUVBQSxjQUFjQTtZQUNkQSxlQUFlQTs7WUFFZkEsV0FBMEJBLFNBQVNBLEFBQTRDQSxVQUFDQSxNQUFNQSxRQUFRQTs7Z0JBRTFGQSxlQUFlQSxBQUFnQkE7O2dCQUUvQkEsYUFBYUE7Z0JBQ2JBLGNBQWNBOztnQkFFZEEsT0FBT0E7Ozs7WUFJWEEsa0NBQWtEQSxBQUF3RUEsVUFBQ0EsSUFBSUEsTUFBTUE7Z0JBRWpJQSxJQUFJQTtvQkFFQUEsV0FBdUJBLEFBQW1DQTt3QkFFdERBLG1CQUFtQ0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIENocm9tZURlbW9cclxue1xyXG4gICAgdXNpbmcgY2hyb21lID0gUmV0eXBlZC5jaHJvbWUuY2hyb21lMjtcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gT3JpZ2luYWwgZGVtbzogXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cuYy1zaGFycGNvcm5lci5jb20vYXJ0aWNsZS9tYWtlLWEtY2hyb21lLWV4dGVuc2lvbi1pbi01LW1pbnV0ZXMvXHJcblxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nIHVybCA9IFwiaHR0cDovL3F1b3Rlcy5yZXN0L3FvZC5qc29uXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVvdGVFbCA9IFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5zZWxlY3QoXCIjcXVvdGVibG9ja1wiKTtcclxuICAgICAgICAgICAgdmFyIGF1dGhvckVsID0gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNhdXRob3JcIik7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuZ2V0KHVybCwgXCJcIiwgKGdsb2JhbDo6UmV0eXBlZC5qcXVlcnkuSlF1ZXJ5U3RhdGljLmdldEZuKSgoZGF0YSwgc3RhdHVzLCB4aHIpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IChRdW90ZVJlc3BvbnNlKSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIHF1b3RlRWwudGV4dChyZXNwb25zZS5jb250ZW50cy5xdW90ZXNbMF0ucXVvdGUpO1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yRWwudGV4dChyZXNwb25zZS5jb250ZW50cy5xdW90ZXNbMF0uYXV0aG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0J3MgcmVsb2FkIGEgbmV3IHRhYiBldmVyeSAxNSBzZWNvbmRzOlxyXG4gICAgICAgICAgICBSZXR5cGVkLmNocm9tZS5jaHJvbWUyLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKChnbG9iYWw6OlJldHlwZWQuY2hyb21lLmNocm9tZTIudGFicy5UYWJVcGRhdGVkRXZlbnQuVGFiVXBkYXRlZEV2ZW50Rm4pKChpZCwgaW5mbywgdGFiKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiLnVybCA9PSBcImNocm9tZTovL25ld3RhYi9cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5zZXRUaW1lb3V0KChnbG9iYWw6OlJldHlwZWQuZG9tLnNldFRpbWVvdXRGbikoZSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5jaHJvbWUuY2hyb21lMi50YWJzLnJlbG9hZChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDE1MDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQmVsb3cgaXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiBvZiBodHRwOi8vcXVvdGVzLnJlc3QvIEFQSVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBRdW90ZVJlc3BvbnNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFF1b3RlQ29udGVudCBjb250ZW50cztcclxuICAgIH1cclxuXHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBRdW90ZUNvbnRlbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUXVvdGVbXSBxdW90ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgW09iamVjdExpdGVyYWxdXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVvdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIHF1b3RlO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgYXV0aG9yO1xyXG4gICAgfVxyXG59Il0KfQo=
