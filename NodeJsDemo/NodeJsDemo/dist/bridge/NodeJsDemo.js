// Preload "bridge.js" before the script below is executed by NodeJS.
require("./bridge.js");

/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("NodeJsDemo", function ($asm, globals) {
    "use strict";

    var express_serve_static_core = require("express-serve-static-core");
    var http = require("http");
    var net = require("net");
    var e = require("express");

    Bridge.define("NodeJsDemo.App", {
        main: function Main () {
            var app = NodeJsDemo.App.InitExpressApp();
            if (app == null) {
                return;
            }

            var server = NodeJsDemo.App.InitServer(app, 3001);
            if (server == null) {
                return;
            }
        },
        statics: {
            methods: {
                InitExpressApp: function () {
                    // We can still use "System.Console.Write()" and "System.Console.WriteLine()" - 
                    // they will be translated to "console.log()" function. However, NodeJS always prints "console.log()" 
                    // mesages in separate lines. 
                    // In order to print a message without adding a new line, we can use "process.stdout":
                    process.stdout.write(">> Init Express App.. ");

                    try {
                        // Create an Express app instance:
                        var app = new NodeJsDemo.ExpressApp();

                        // Assign a request handler to the paths:
                        app.Get.setItem("/sqr/:Value", function (request, response) {
                            var args = request.params;
                            var val = args.Value;
                            var responseTxt = System.String.format("sqr({0}) = {1}", Bridge.box(val, System.Double, System.Double.format, System.Double.getHashCode), Bridge.box(val * val, System.Double, System.Double.format, System.Double.getHashCode));
                            response.send(responseTxt);
                        });

                        // Another request handler:
                        app.Get.setItem("/sqrt/:Value", function (request, response) {
                            var args = request.params;
                            var val = args.Value;
                            var responseTxt = System.String.format("sqrt({0}) = {1}", Bridge.box(val, System.Double, System.Double.format, System.Double.getHashCode), Bridge.box(Math.sqrt(val), System.Double, System.Double.format, System.Double.getHashCode));
                            response.send(responseTxt);
                        });

                        System.Console.WriteLine("Done!");

                        return app;
                    }
                    catch (e) {
                        e = System.Exception.create(e);
                        System.Console.WriteLine("Error: " + (e.Message || ""));
                        return null;
                    }
                },
                InitServer: function (app, port) {
                    process.stdout.write(System.String.format(">> Creating Server on port {0}.. ", [Bridge.box(port, System.Int32)]));

                    try {
                        // Create a Server:
                        var server = http.createServer(app.App);

                        // Assign Event Handlers:
                        server.on("listening", function () {
                            System.Console.WriteLine("[Server] Server is started!");
                        });

                        server.on("error", function (err) {
                            System.Console.WriteLine("[Server] Error: " + (err.message || ""));
                        });

                        server.on("connection", function (socket) {
                            System.Console.WriteLine(System.String.format("[Server] Connection established from remote: {0}:{1}", socket.remoteAddress, Bridge.box(socket.remotePort, System.Double, System.Double.format, System.Double.getHashCode)));
                        });

                        // Start listening on the specified port:
                        server.listen(port);
                        System.Console.WriteLine("Done!");

                        return server;
                    }
                    catch (e) {
                        e = System.Exception.create(e);
                        System.Console.WriteLine("Error: " + (e.Message || ""));
                        return null;
                    }
                }
            }
        }
    });

    /** @namespace NodeJsDemo */

    /**
     * That class incapsulates Express application
     and simplifies interaction with Express API
     *
     * @public
     * @class NodeJsDemo.ExpressApp
     */
    Bridge.define("NodeJsDemo.ExpressApp", {
        fields: {
            App: null,
            Get: null,
            Post: null,
            Put: null,
            Delete: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                // Create Express application
                this.App = e();

                // Create configs for different request types:
                this.Get = new NodeJsDemo.ExpressApp.ExpressAppHandlerConfig(this, this.App.get);
                this.Put = new NodeJsDemo.ExpressApp.ExpressAppHandlerConfig(this, this.App.put);
                this.Post = new NodeJsDemo.ExpressApp.ExpressAppHandlerConfig(this, this.App.post);
                this.Delete = new NodeJsDemo.ExpressApp.ExpressAppHandlerConfig(this, this.App.delete);
            }
        }
    });

    /**
     * This class helps with
     *
     * @public
     * @class NodeJsDemo.ExpressApp.ExpressAppHandlerConfig
     */
    Bridge.define("NodeJsDemo.ExpressApp.ExpressAppHandlerConfig", {
        fields: {
            _app: null,
            _config: null
        },
        ctors: {
            ctor: function (app, config) {
                this.$initialize();
                if (config == null) {
                    throw new System.ArgumentNullException("config");
                }

                this._app = app;
                this._config = config;
            }
        },
        methods: {
            setItem: function (path, value) {
                this.AddHandler(path, value);
            },
            AddHandler: function (path, action) {
                this._config.call(this._app.App, path, action);
            },
            AddHandler$1: function (path, action) {
                this._config.call(this._app.App, path, action);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJOb2RlSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7QUFhWUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0FBLFVBQVVBO1lBQ1ZBLElBQUlBLE9BQU9BO2dCQUVQQTs7O1lBR0pBLGFBQWFBLDBCQUFXQTtZQUN4QkEsSUFBSUEsVUFBVUE7Z0JBRVZBOzs7Ozs7Ozs7O29CQVVKQTs7b0JBRUFBOzt3QkFHSUEsVUFBVUEsSUFBSUE7Ozt3QkFHZEEsK0JBQXlCQSxVQUFDQSxTQUFTQTs0QkFFL0JBLFdBQVdBLEFBQWNBOzRCQUN6QkEsVUFBVUE7NEJBQ1ZBLGtCQUFrQkEsdUNBQStCQSxpRkFBSUEsaUJBQU1BOzRCQUMzREEsY0FBbUJBOzs7O3dCQUl2QkEsZ0NBQTBCQSxVQUFDQSxTQUFTQTs0QkFFaENBLFdBQVdBLEFBQWFBOzRCQUN4QkEsVUFBVUE7NEJBQ1ZBLGtCQUFrQkEsd0NBQWdDQSxpRkFBSUEscUJBQVVBOzRCQUNoRUEsY0FBbUJBOzs7d0JBR3ZCQTs7d0JBRUFBLE9BQU9BOzs7O3dCQUlQQSx5QkFBeUJBLGFBQVlBO3dCQUNyQ0EsT0FBT0E7OztzQ0FJb0NBLEtBQWdCQTtvQkFFL0RBLHFCQUFrQ0EsMkRBQWtEQTs7b0JBRXBGQTs7d0JBR0lBLGFBQWFBLGtCQUErQkEsQUFBMENBOzs7d0JBR3RGQSxVQUFVQSxhQUF5QkEsQUFBd0JBOzRCQUV2REE7Ozt3QkFHSkEsVUFBVUEsU0FBcUJBLEFBQXdDQTs0QkFFbkVBLHlCQUF5QkEsc0JBQXFCQTs7O3dCQUdsREEsVUFBVUEsY0FBMEJBLEFBQXVDQTs0QkFFdkVBLHlCQUF5QkEsNkVBQXFFQSxzQkFBcUJBOzs7O3dCQUl2SEEsY0FBY0E7d0JBQ2RBOzt3QkFFQUEsT0FBT0E7Ozs7d0JBSVBBLHlCQUF5QkEsYUFBWUE7d0JBQ3JDQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkF3QlhBLFdBQU1BOzs7Z0JBR05BLFdBQU1BLElBQUlBLDhDQUF3QkEsTUFBTUEsQUFBQ0EsQUFBMkNBO2dCQUNwRkEsV0FBTUEsSUFBSUEsOENBQXdCQSxNQUFNQTtnQkFDeENBLFlBQU9BLElBQUlBLDhDQUF3QkEsTUFBTUE7Z0JBQ3pDQSxjQUFTQSxJQUFJQSw4Q0FBd0JBLE1BQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs0QkEwQlpBLEtBQWdCQTs7Z0JBRTNDQSxJQUFJQSxVQUFVQTtvQkFBTUEsTUFBTUEsSUFBSUE7OztnQkFFOUJBLFlBQU9BO2dCQUNQQSxlQUFVQTs7OzsrQkFiNEZBO2dCQUlsR0EsZ0JBQVdBLE1BQU1BLEFBQThIQTs7a0NBWWhJQSxNQUFhQTtnQkFFaENBLEFBQWVBLGtCQUFWQSxlQUFtQkEsTUFBTUEsQUFBVUEsQUFBOEhBOztvQ0FHbkpBLE1BQWFBO2dCQUVoQ0EsQUFBZUEsa0JBQVZBLGVBQW1CQSxNQUFNQSxBQUFVQSxBQUFzTEEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcbnVzaW5nIFJldHlwZWQuUHJpbWl0aXZlO1xyXG5cclxubmFtZXNwYWNlIE5vZGVKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIFtJbml0KEluaXRQb3NpdGlvbi5Ub3ApXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBJbml0R2xvYmFscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBQcmVsb2FkIFwiYnJpZGdlLmpzXCIgYmVmb3JlIHRoZSBzY3JpcHQgYmVsb3cgaXMgZXhlY3V0ZWQgYnkgTm9kZUpTLlxyXG4gICAgICAgICAgICBSZXR5cGVkLm5vZGUucmVxdWlyZS5TZWxmKFwiLi9icmlkZ2UuanNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYXBwID0gSW5pdEV4cHJlc3NBcHAoKTtcclxuICAgICAgICAgICAgaWYgKGFwcCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBJbml0U2VydmVyKGFwcCwgMzAwMSk7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBFeHByZXNzQXBwIEluaXRFeHByZXNzQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCB1c2UgXCJTeXN0ZW0uQ29uc29sZS5Xcml0ZSgpXCIgYW5kIFwiU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKClcIiAtIFxyXG4gICAgICAgICAgICAvLyB0aGV5IHdpbGwgYmUgdHJhbnNsYXRlZCB0byBcImNvbnNvbGUubG9nKClcIiBmdW5jdGlvbi4gSG93ZXZlciwgTm9kZUpTIGFsd2F5cyBwcmludHMgXCJjb25zb2xlLmxvZygpXCIgXHJcbiAgICAgICAgICAgIC8vIG1lc2FnZXMgaW4gc2VwYXJhdGUgbGluZXMuIFxyXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBwcmludCBhIG1lc3NhZ2Ugd2l0aG91dCBhZGRpbmcgYSBuZXcgbGluZSwgd2UgY2FuIHVzZSBcInByb2Nlc3Muc3Rkb3V0XCI6XHJcbiAgICAgICAgICAgIFJldHlwZWQubm9kZS5wcm9jZXNzLnN0ZG91dC53cml0ZShcIj4+IEluaXQgRXhwcmVzcyBBcHAuLiBcIik7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIEV4cHJlc3MgYXBwIGluc3RhbmNlOlxyXG4gICAgICAgICAgICAgICAgdmFyIGFwcCA9IG5ldyBFeHByZXNzQXBwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIGEgcmVxdWVzdCBoYW5kbGVyIHRvIHRoZSBwYXRoczpcclxuICAgICAgICAgICAgICAgIGFwcC5HZXRbXCIvc3FyLzpWYWx1ZVwiXSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IChSZXF1ZXN0QXJncykgcmVxdWVzdC5AcGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBhcmdzLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZVR4dCA9IHN0cmluZy5Gb3JtYXQoXCJzcXIoezB9KSA9IHsxfVwiLHZhbCx2YWwgKiB2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQuU2VsZihyZXNwb25zZVR4dCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFub3RoZXIgcmVxdWVzdCBoYW5kbGVyOlxyXG4gICAgICAgICAgICAgICAgYXBwLkdldFtcIi9zcXJ0LzpWYWx1ZVwiXSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IChSZXF1ZXN0QXJncylyZXF1ZXN0LkBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3MuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlVHh0ID0gc3RyaW5nLkZvcm1hdChcInNxcnQoezB9KSA9IHsxfVwiLHZhbCxNYXRoLlNxcnQodmFsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZC5TZWxmKHJlc3BvbnNlVHh0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRG9uZSFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkVycm9yOiBcIiArIGUuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5ub2RlLmh0dHAuU2VydmVyIEluaXRTZXJ2ZXIoRXhwcmVzc0FwcCBhcHAsIGludCBwb3J0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5ub2RlLnByb2Nlc3Muc3Rkb3V0LndyaXRlKHN0cmluZy5Gb3JtYXQoXCI+PiBDcmVhdGluZyBTZXJ2ZXIgb24gcG9ydCB7MH0uLiBcIixwb3J0KSk7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgU2VydmVyOlxyXG4gICAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IFJldHlwZWQubm9kZS5odHRwLmNyZWF0ZVNlcnZlcigoZ2xvYmFsOjpSZXR5cGVkLm5vZGUuaHR0cC5jcmVhdGVTZXJ2ZXJGbilhcHAuQXNDcmVhdGVTZXJ2ZXJGbigpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gRXZlbnQgSGFuZGxlcnM6XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub24obm9kZS5MaXRlcmFscy5saXN0ZW5pbmcsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiW1NlcnZlcl0gU2VydmVyIGlzIHN0YXJ0ZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlcnZlci5vbihub2RlLkxpdGVyYWxzLmVycm9yLCAoZ2xvYmFsOjpSZXR5cGVkLm5vZGUubmV0LlNlcnZlci5vbkZuMikoZXJyID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiW1NlcnZlcl0gRXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlcnZlci5vbihub2RlLkxpdGVyYWxzLmNvbm5lY3Rpb24sIChnbG9iYWw6OlJldHlwZWQubm9kZS5uZXQuU2VydmVyLm9uRm4pKHNvY2tldCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShzdHJpbmcuRm9ybWF0KFwiW1NlcnZlcl0gQ29ubmVjdGlvbiBlc3RhYmxpc2hlZCBmcm9tIHJlbW90ZTogezB9OnsxfVwiLHNvY2tldC5yZW1vdGVBZGRyZXNzLHNvY2tldC5yZW1vdGVQb3J0KSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgbGlzdGVuaW5nIG9uIHRoZSBzcGVjaWZpZWQgcG9ydDpcclxuICAgICAgICAgICAgICAgIHNlcnZlci5saXN0ZW4ocG9ydCk7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJEb25lIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRXJyb3I6IFwiICsgZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGF0IGNsYXNzIGluY2Fwc3VsYXRlcyBFeHByZXNzIGFwcGxpY2F0aW9uXHJcbiAgICAvLy8gYW5kIHNpbXBsaWZpZXMgaW50ZXJhY3Rpb24gd2l0aCBFeHByZXNzIEFQSVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBFeHByZXNzQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5FeHByZXNzIEFwcCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIEdldCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIFBvc3QgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyBQdXQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyBEZWxldGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBFeHByZXNzIGFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgIEFwcCA9IGV4cHJlc3MuZTIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjb25maWdzIGZvciBkaWZmZXJlbnQgcmVxdWVzdCB0eXBlczpcclxuICAgICAgICAgICAgR2V0ID0gbmV3IEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnKHRoaXMsICgoUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXIpQXBwKS5nZXQpO1xyXG4gICAgICAgICAgICBQdXQgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgQXBwLnB1dCk7XHJcbiAgICAgICAgICAgIFBvc3QgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgQXBwLnBvc3QpO1xyXG4gICAgICAgICAgICBEZWxldGUgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgQXBwLmRlbGV0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbnZlcnRzIDxzZWUgY3JlZj1cIkFwcFwiLz4sIGFzIGl0IGNhbiBhY3QgYXMgPHNlZSBjcmVmPVwiaHR0cC5jcmVhdGVTZXJ2ZXJGblwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIFtUZW1wbGF0ZShcInt0aGlzfS5BcHBcIildXHJcbiAgICAgICAgcHVibGljIGV4dGVybiBSZXR5cGVkLm5vZGUuaHR0cC5jcmVhdGVTZXJ2ZXJGbiBBc0NyZWF0ZVNlcnZlckZuKCk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhpcyBjbGFzcyBoZWxwcyB3aXRoIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGNsYXNzIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEV4cHJlc3NBcHAgX2FwcDtcclxuICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlck1hdGNoZXIgPGdsb2JhbDo6UmV0eXBlZC5QcmltaXRpdmUuVGhpczxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyPj5fY29uZmlnO1xyXG5cclxuICAgICAgICAgICAgcHVibGljIEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlPiB0aGlzW3N0cmluZyBwYXRoXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBZGRIYW5kbGVyKHBhdGgsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+KXZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnKEV4cHJlc3NBcHAgYXBwLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlck1hdGNoZXIgPGdsb2JhbDo6UmV0eXBlZC5QcmltaXRpdmUuVGhpczxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyPj5jb25maWcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWcgPT0gbnVsbCkgdGhyb3cgbmV3IEFyZ3VtZW50TnVsbEV4Y2VwdGlvbihcImNvbmZpZ1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfYXBwID0gYXBwO1xyXG4gICAgICAgICAgICAgICAgX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZvaWQgQWRkSGFuZGxlcihzdHJpbmcgcGF0aCwgQWN0aW9uPFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+IGFjdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ2FsbChfYXBwLkFwcCwgX2NvbmZpZywgcGF0aCwgVG9IYW5kbGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+KWFjdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKHN0cmluZyBwYXRoLCBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYWxsKF9hcHAuQXBwLCBfY29uZmlnLCBwYXRoLCBUb0hhbmRsZXIoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuTmV4dEZ1bmN0aW9uPilhY3Rpb24pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gVGhpcyBtZXRob2QgaXMgcmVxdWlyZWQgdG8gcGFzcyBcIkV4cHJlc3MgYXBwXCIgYXMgYSBjb250ZXh0IGZvciBcImNvbmZpZyhwYXRoLCBoYW5kbGVyKVwiIGZ1bmN0aW9uIGNhbGwuXHJcbiAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIFtUZW1wbGF0ZShcInsxfS5jYWxsKHswfSwgezJ9LCB7M30pXCIpXVxyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gdm9pZCBDYWxsKFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5FeHByZXNzIGFwcCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXJNYXRjaGVyIDxnbG9iYWw6OlJldHlwZWQuUHJpbWl0aXZlLlRoaXM8Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlcj4+Y29uZmlnLCBzdHJpbmcgcGF0aCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3RIYW5kbGVyIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gQ29udmVydHMgLk5FVCBkZWxlZ2F0ZSB0byBhIDxzZWUgY3JlZj1cIlJlcXVlc3RIYW5kbGVyXCIvPiBjbGFzcyBpbnN0YW5jZS5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgW1RlbXBsYXRlKFwiezB9XCIpXVxyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3RIYW5kbGVyIFRvSGFuZGxlcihBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gYWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIENvbnZlcnRzIC5ORVQgZGVsZWdhdGUgdG8gYSA8c2VlIGNyZWY9XCJSZXF1ZXN0SGFuZGxlclwiLz4gY2xhc3MgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0SGFuZGxlciBUb0hhbmRsZXIoQWN0aW9uPFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2UsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5OZXh0RnVuY3Rpb24+IGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBSZXByZXNlbnRzIGFyZ3VtZW50cyBwYXNzZWQgdG8gcmVxdWVzdCBoYW5kbGVycy5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBSZXF1ZXN0QXJnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgVmFsdWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgfVxyXG59Il0KfQo=
