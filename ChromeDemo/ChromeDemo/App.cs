using Bridge;

using static Retyped.jquery;

namespace ChromeDemo
{
    public class App
    {
        public static void Main()
        {
            // Original demo: 
            // http://www.c-sharpcorner.com/article/make-a-chrome-extension-in-5-minutes/


            const string url = "http://quotes.rest/qod.json";

            var quoteEl = jQuery.select("#quoteblock");
            var authorEl = jQuery.select("#author");

            jQuery.get(url, "", (data, status, xhr) =>
            {
                var response = (QuoteResponse) data;
                quoteEl.text(response.contents.quotes[0].quote);
                authorEl.text(response.contents.quotes[0].author);
                return null;
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