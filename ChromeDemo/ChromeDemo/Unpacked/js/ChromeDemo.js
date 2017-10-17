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

            // Let's reload a new tab every 3 seconds:
            chrome.tabs.onUpdated.addListener(function (id, info, tab) {
                if (Bridge.referenceEquals(tab.url, "chrome://newtab/")) {
                    setTimeout(function (e) {
                        chrome.tabs.reload(id);
                    }, 3000);
                }
            });
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaHJvbWVEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O1lBZVlBOztZQUVBQSxjQUFjQTtZQUNkQSxlQUFlQTs7WUFFZkEsV0FBMEJBLFNBQVNBLEFBQTRDQSxVQUFDQSxNQUFNQSxRQUFRQTs7Z0JBRTFGQSxlQUFlQSxBQUFnQkE7Z0JBQy9CQSxhQUFhQTtnQkFDYkEsY0FBY0E7Z0JBQ2RBLE9BQU9BOzs7O1lBSVhBLGtDQUFrQ0EsQUFBd0VBLFVBQUNBLElBQUlBLE1BQU1BO2dCQUVqSEEsSUFBSUE7b0JBRUFBLFdBQXVCQSxBQUFtQ0E7d0JBRXREQSxtQkFBbUJBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBDaHJvbWVEZW1vXHJcbntcclxuICAgIHVzaW5nIGNocm9tZSA9IFJldHlwZWQuY2hyb21lLmNocm9tZTI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBPcmlnaW5hbCBkZW1vOiBcclxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy5jLXNoYXJwY29ybmVyLmNvbS9hcnRpY2xlL21ha2UtYS1jaHJvbWUtZXh0ZW5zaW9uLWluLTUtbWludXRlcy9cclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgdXJsID0gXCJodHRwOi8vcXVvdGVzLnJlc3QvcW9kLmpzb25cIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBxdW90ZUVsID0gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNxdW90ZWJsb2NrXCIpO1xyXG4gICAgICAgICAgICB2YXIgYXV0aG9yRWwgPSBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuc2VsZWN0KFwiI2F1dGhvclwiKTtcclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5nZXQodXJsLCBcIlwiLCAoZ2xvYmFsOjpSZXR5cGVkLmpxdWVyeS5KUXVlcnlTdGF0aWMuZ2V0Rm4pKChkYXRhLCBzdGF0dXMsIHhocikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gKFF1b3RlUmVzcG9uc2UpIGRhdGE7XHJcbiAgICAgICAgICAgICAgICBxdW90ZUVsLnRleHQocmVzcG9uc2UuY29udGVudHMucXVvdGVzWzBdLnF1b3RlKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvckVsLnRleHQocmVzcG9uc2UuY29udGVudHMucXVvdGVzWzBdLmF1dGhvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0J3MgcmVsb2FkIGEgbmV3IHRhYiBldmVyeSAzIHNlY29uZHM6XHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigoZ2xvYmFsOjpSZXR5cGVkLmNocm9tZS5jaHJvbWUyLnRhYnMuVGFiVXBkYXRlZEV2ZW50LlRhYlVwZGF0ZWRFdmVudEZuKSgoaWQsIGluZm8sIHRhYikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhYi51cmwgPT0gXCJjaHJvbWU6Ly9uZXd0YWIvXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uc2V0VGltZW91dCgoZ2xvYmFsOjpSZXR5cGVkLmRvbS5zZXRUaW1lb3V0Rm4pKGUgPT5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbG9hZChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBCZWxvdyBpcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9uIG9mIGh0dHA6Ly9xdW90ZXMucmVzdC8gQVBJXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFF1b3RlUmVzcG9uc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUXVvdGVDb250ZW50IGNvbnRlbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFF1b3RlQ29udGVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBRdW90ZVtdIHF1b3RlcztcclxuICAgIH1cclxuXHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBRdW90ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgcXVvdGU7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBhdXRob3I7XHJcbiAgICB9XHJcbn0iXQp9Cg==
