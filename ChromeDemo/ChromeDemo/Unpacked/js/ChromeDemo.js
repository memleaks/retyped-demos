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
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaHJvbWVEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7O1lBWVlBOztZQUVBQSxjQUFjQTtZQUNkQSxlQUFlQTs7WUFFZkEsV0FBMEJBLFNBQVNBLEFBQTRDQSxVQUFDQSxNQUFNQSxRQUFRQTs7Z0JBRTFGQSxlQUFlQSxBQUFnQkE7Z0JBQy9CQSxhQUFhQTtnQkFDYkEsY0FBY0E7Z0JBQ2RBLE9BQU9BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBDaHJvbWVEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBPcmlnaW5hbCBkZW1vOiBcclxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy5jLXNoYXJwY29ybmVyLmNvbS9hcnRpY2xlL21ha2UtYS1jaHJvbWUtZXh0ZW5zaW9uLWluLTUtbWludXRlcy9cclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgdXJsID0gXCJodHRwOi8vcXVvdGVzLnJlc3QvcW9kLmpzb25cIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBxdW90ZUVsID0gUmV0eXBlZC5qcXVlcnkualF1ZXJ5LnNlbGVjdChcIiNxdW90ZWJsb2NrXCIpO1xyXG4gICAgICAgICAgICB2YXIgYXV0aG9yRWwgPSBSZXR5cGVkLmpxdWVyeS5qUXVlcnkuc2VsZWN0KFwiI2F1dGhvclwiKTtcclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuanF1ZXJ5LmpRdWVyeS5nZXQodXJsLCBcIlwiLCAoZ2xvYmFsOjpSZXR5cGVkLmpxdWVyeS5KUXVlcnlTdGF0aWMuZ2V0Rm4pKChkYXRhLCBzdGF0dXMsIHhocikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gKFF1b3RlUmVzcG9uc2UpIGRhdGE7XHJcbiAgICAgICAgICAgICAgICBxdW90ZUVsLnRleHQocmVzcG9uc2UuY29udGVudHMucXVvdGVzWzBdLnF1b3RlKTtcclxuICAgICAgICAgICAgICAgIGF1dGhvckVsLnRleHQocmVzcG9uc2UuY29udGVudHMucXVvdGVzWzBdLmF1dGhvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQmVsb3cgaXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiBvZiBodHRwOi8vcXVvdGVzLnJlc3QvIEFQSVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBRdW90ZVJlc3BvbnNlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFF1b3RlQ29udGVudCBjb250ZW50cztcclxuICAgIH1cclxuXHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBRdW90ZUNvbnRlbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUXVvdGVbXSBxdW90ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgW09iamVjdExpdGVyYWxdXHJcbiAgICBwdWJsaWMgY2xhc3MgUXVvdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIHF1b3RlO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgYXV0aG9yO1xyXG4gICAgfVxyXG59Il0KfQo=
