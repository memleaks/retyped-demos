using Bridge;
using System;
using Retyped;
using Retyped.Primitive;
using static Retyped.node;
using static Retyped.express_serve_static_core;

namespace NodeJsDemo
{
    /// <summary>
    /// Main application. Contains an entry point.
    /// </summary>
    public class App
    {
        [Init(InitPosition.Top)]
        public static void InitGlobals()
        {
            // Preload "bridge.js" before the script below is executed by NodeJS.
            require.Self("./bridge.js");
        }

        public static void Main()
        {
            var app = InitExpressApp();
            if (app == null)
            {
                return;
            }

            var server = InitServer(app, 3001);
            if (server == null)
            {
                return;
            }
        }

        private static ExpressApp InitExpressApp()
        {
            // We can still use "System.Console.Write()" and "System.Console.WriteLine()" - 
            // they will be translated to "console.log()" function. However, NodeJS always prints "console.log()" 
            // mesages in separate lines. 
            // In order to print a message without adding a new line, we can use "process.stdout":
            process.stdout.write(">> Init Express App.. ");

            try
            {
                // Create an Express app instance:
                var app = new ExpressApp();

                // Assign a request handler to the paths:
                app.Get["/sqr/:Value"] = (request, response) =>
                {
                    var args = (RequestArgs) request.@params;
                    var val = args.Value;
                    var responseTxt = $"sqr({val}) = {val * val}";
                    response.send.Self(responseTxt);
                };

                // Another request handler:
                app.Get["/sqrt/:Value"] = (request, response) =>
                {
                    var args = (RequestArgs)request.@params;
                    var val = args.Value;
                    var responseTxt = $"sqrt({val}) = {Math.Sqrt(val)}";
                    response.send.Self(responseTxt);
                };

                System.Console.WriteLine("Done!");

                return app;
            }
            catch (Exception e)
            {
                System.Console.WriteLine("Error: " + e.Message);
                return null;
            }
        }

        private static http.Server InitServer(ExpressApp app, int port)
        {
            process.stdout.write($">> Creating Server on port {port}.. ");

            try
            {
                // Create a Server:
                var server = http.createServer(app.AsCreateServerFn());

                // Assign Event Handlers:
                server.on(node.Literals.listening, () =>
                {
                    System.Console.WriteLine("[Server] Server is started!");
                });

                server.on(node.Literals.error, err =>
                {
                    System.Console.WriteLine("[Server] Error: " + err.message);
                });

                server.on(node.Literals.connection, socket =>
                {
                    System.Console.WriteLine($"[Server] Connection established from remote: {socket.remoteAddress}:{socket.remotePort}");
                });

                // Start listening on the specified port:
                server.listen(port);
                System.Console.WriteLine("Done!");

                return server;
            }
            catch (Exception e)
            {
                System.Console.WriteLine("Error: " + e.Message);
                return null;
            }
        }
    }

    /// <summary>
    /// That class incapsulates Express application
    /// and simplifies interaction with Express API
    /// </summary>
    public class ExpressApp
    {
        public Express App { get; }

        public ExpressAppHandlerConfig Get { get; }

        public ExpressAppHandlerConfig Post { get; }

        public ExpressAppHandlerConfig Put { get; }

        public ExpressAppHandlerConfig Delete { get; }

        public ExpressApp()
        {
            // Create Express application
            App = express.e2();

            // Create configs for different request types:
            Get = new ExpressAppHandlerConfig(this, ((IRouter)App).get);
            Put = new ExpressAppHandlerConfig(this, App.put);
            Post = new ExpressAppHandlerConfig(this, App.post);
            Delete = new ExpressAppHandlerConfig(this, App.delete);
        }

        /// <summary>
        /// Converts <see cref="App"/>, as it can act as <see cref="http.createServerFn"/>.
        /// </summary>
        /// <returns></returns>
        [Template("{this}.App")]
        public extern http.createServerFn AsCreateServerFn();

        /// <summary>
        /// This class helps with 
        /// </summary>
        public class ExpressAppHandlerConfig
        {
            private readonly ExpressApp _app;
            private readonly IRouterMatcher<This<IRouter>> _config;

            public Action<Request, Response> this[string path]
            {
                set
                {
                    AddHandler(path, value);
                }
            }

            public ExpressAppHandlerConfig(ExpressApp app, IRouterMatcher<This<IRouter>> config)
            {
                if (config == null) throw new ArgumentNullException(nameof(config));

                _app = app;
                _config = config;
            }

            public void AddHandler(string path, Action<Request, Response> action)
            {
                Call(_app.App, _config, path, ToHandler(action));
            }

            public void AddHandler(string path, Action<Request, Response, NextFunction> action)
            {
                Call(_app.App, _config, path, ToHandler(action));
            }

            /// <summary>
            /// This method is required to pass "Express app" as a context for "config(path, handler)" function call.
            /// </summary>
            [Template("{1}.call({0}, {2}, {3})")]
            private static extern void Call(Express app, IRouterMatcher<This<IRouter>> config, string path, RequestHandler handler);

            /// <summary>
            /// Converts .NET delegate to a <see cref="RequestHandler"/> class instance.
            /// </summary>
            [Template("{0}")]
            private static extern RequestHandler ToHandler(Action<Request, Response> action);

            /// <summary>
            /// Converts .NET delegate to a <see cref="RequestHandler"/> class instance.
            /// </summary>
            [Template("{0}")]
            private static extern RequestHandler ToHandler(Action<Request, Response, NextFunction> action);
        }
    }

    /// <summary>
    /// Represents arguments passed to request handlers.
    /// </summary>
    [ObjectLiteral]
    public class RequestArgs
    {
        public double Value { get; set; }
    }
}