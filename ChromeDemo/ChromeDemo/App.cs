using Bridge;

using static Retyped.dom;
using static Retyped.jquery;

namespace ChromeDemo
{
    using chrome = Retyped.chrome.chrome2;

    public class App
    {
        public static void Main()
        {
            // Original demo: 
            // http://www.c-sharpcorner.com/article/make-a-chrome-extension-in-5-minutes/


            const string url = "http://quotes.rest/qod.json";

            var quoteEl = jQuery.select("#quoteblock");
            var authorEl = jQuery.select("#author");

            jQuery.get(url, "", new JQuery.jqXHR.DoneCallback<object, JQuery.jqXHR<object>>((data, status, xhr, never) =>
            {
                var response = (QuoteResponse) data;

                quoteEl.text(response.contents.quotes[0].quote);
                authorEl.text(response.contents.quotes[0].author);
            }));

            // Let's reload a new tab every 15 seconds:
            chrome.tabs.onUpdated.addListener((id, info, tab) =>
            {
                if (tab.url == "chrome://newtab/")
                {
                    setTimeout(e =>
                    {
                        chrome.tabs.reload(id);
                    }, 15000);
                }
            });
        }
    }

    // --------------------------------------------------------------
    // Below is partial implementation of http://quotes.rest/ API
    // --------------------------------------------------------------

    [ObjectLiteral]
    public class QuoteResponse
    {
        public QuoteContent contents;
    }

    [ObjectLiteral]
    public class QuoteContent
    {
        public Quote[] quotes;
    }

    [ObjectLiteral]
    public class Quote
    {
        public string quote;
        public string author;
    }
}