// Preload "bridge.js" before the script below is executed by NodeJS.
require("./bridge.js");

/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.1
 */
Bridge.assembly("NodeJsDemo", function ($asm, globals) {
    "use strict";

    var express_serve_static_core = require("express-serve-static-core");
    var http = require("http");
    var net = require("net");
    var e = require("express");

    /** @namespace NodeJsDemo */

    /**
     * Main application. Contains an entry point.
     *
     * @public
     * @class NodeJsDemo.App
     */
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJOb2RlSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7QUFnQllBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0FBLFVBQVVBO1lBQ1ZBLElBQUlBLE9BQU9BO2dCQUVQQTs7O1lBR0pBLGFBQWFBLDBCQUFXQTtZQUN4QkEsSUFBSUEsVUFBVUE7Z0JBRVZBOzs7Ozs7Ozs7O29CQVVKQTs7b0JBRUFBOzt3QkFHSUEsVUFBVUEsSUFBSUE7Ozt3QkFHZEEsK0JBQXlCQSxVQUFDQSxTQUFTQTs0QkFFL0JBLFdBQVdBLEFBQWNBOzRCQUN6QkEsVUFBVUE7NEJBQ1ZBLGtCQUFrQkEsdUNBQStCQSxpRkFBSUEsaUJBQU1BOzRCQUMzREEsY0FBbUJBOzs7O3dCQUl2QkEsZ0NBQTBCQSxVQUFDQSxTQUFTQTs0QkFFaENBLFdBQVdBLEFBQWFBOzRCQUN4QkEsVUFBVUE7NEJBQ1ZBLGtCQUFrQkEsd0NBQWdDQSxpRkFBSUEscUJBQVVBOzRCQUNoRUEsY0FBbUJBOzs7d0JBR3ZCQTs7d0JBRUFBLE9BQU9BOzs7O3dCQUlQQSx5QkFBeUJBLGFBQVlBO3dCQUNyQ0EsT0FBT0E7OztzQ0FJb0NBLEtBQWdCQTtvQkFFL0RBLHFCQUFrQ0EsMkRBQWtEQTs7b0JBRXBGQTs7d0JBR0lBLGFBQWFBLGtCQUErQkEsQUFBMENBOzs7d0JBR3RGQSxVQUFVQSxhQUF5QkEsQUFBd0JBOzRCQUV2REE7Ozt3QkFHSkEsVUFBVUEsU0FBcUJBLEFBQXdDQTs0QkFFbkVBLHlCQUF5QkEsc0JBQXFCQTs7O3dCQUdsREEsVUFBVUEsY0FBMEJBLEFBQXVDQTs0QkFFdkVBLHlCQUF5QkEsNkVBQXFFQSxzQkFBcUJBOzs7O3dCQUl2SEEsY0FBY0E7d0JBQ2RBOzt3QkFFQUEsT0FBT0E7Ozs7d0JBSVBBLHlCQUF5QkEsYUFBWUE7d0JBQ3JDQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBd0JYQSxXQUFNQTs7O2dCQUdOQSxXQUFNQSxJQUFJQSw4Q0FBd0JBLE1BQU1BLEFBQUNBLEFBQTJDQTtnQkFDcEZBLFdBQU1BLElBQUlBLDhDQUF3QkEsTUFBTUE7Z0JBQ3hDQSxZQUFPQSxJQUFJQSw4Q0FBd0JBLE1BQU1BO2dCQUN6Q0EsY0FBU0EsSUFBSUEsOENBQXdCQSxNQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBMEJaQSxLQUFnQkE7O2dCQUUzQ0EsSUFBSUEsVUFBVUE7b0JBQU1BLE1BQU1BLElBQUlBOzs7Z0JBRTlCQSxZQUFPQTtnQkFDUEEsZUFBVUE7Ozs7K0JBYjRGQTtnQkFJbEdBLGdCQUFXQSxNQUFNQSxBQUE4SEE7O2tDQVloSUEsTUFBYUE7Z0JBRWhDQSxBQUFlQSxrQkFBVkEsZUFBbUJBLE1BQU1BLEFBQVVBLEFBQThIQTs7b0NBR25KQSxNQUFhQTtnQkFFaENBLEFBQWVBLGtCQUFWQSxlQUFtQkEsTUFBTUEsQUFBVUEsQUFBc0xBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBSZXR5cGVkO1xyXG51c2luZyBSZXR5cGVkLlByaW1pdGl2ZTtcclxuXHJcbm5hbWVzcGFjZSBOb2RlSnNEZW1vXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBNYWluIGFwcGxpY2F0aW9uLiBDb250YWlucyBhbiBlbnRyeSBwb2ludC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgW0luaXQoSW5pdFBvc2l0aW9uLlRvcCldXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEluaXRHbG9iYWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFByZWxvYWQgXCJicmlkZ2UuanNcIiBiZWZvcmUgdGhlIHNjcmlwdCBiZWxvdyBpcyBleGVjdXRlZCBieSBOb2RlSlMuXHJcbiAgICAgICAgICAgIFJldHlwZWQubm9kZS5yZXF1aXJlLlNlbGYoXCIuL2JyaWRnZS5qc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhcHAgPSBJbml0RXhwcmVzc0FwcCgpO1xyXG4gICAgICAgICAgICBpZiAoYXBwID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IEluaXRTZXJ2ZXIoYXBwLCAzMDAxKTtcclxuICAgICAgICAgICAgaWYgKHNlcnZlciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEV4cHJlc3NBcHAgSW5pdEV4cHJlc3NBcHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gV2UgY2FuIHN0aWxsIHVzZSBcIlN5c3RlbS5Db25zb2xlLldyaXRlKClcIiBhbmQgXCJTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoKVwiIC0gXHJcbiAgICAgICAgICAgIC8vIHRoZXkgd2lsbCBiZSB0cmFuc2xhdGVkIHRvIFwiY29uc29sZS5sb2coKVwiIGZ1bmN0aW9uLiBIb3dldmVyLCBOb2RlSlMgYWx3YXlzIHByaW50cyBcImNvbnNvbGUubG9nKClcIiBcclxuICAgICAgICAgICAgLy8gbWVzYWdlcyBpbiBzZXBhcmF0ZSBsaW5lcy4gXHJcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIHByaW50IGEgbWVzc2FnZSB3aXRob3V0IGFkZGluZyBhIG5ldyBsaW5lLCB3ZSBjYW4gdXNlIFwicHJvY2Vzcy5zdGRvdXRcIjpcclxuICAgICAgICAgICAgUmV0eXBlZC5ub2RlLnByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiPj4gSW5pdCBFeHByZXNzIEFwcC4uIFwiKTtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gRXhwcmVzcyBhcHAgaW5zdGFuY2U6XHJcbiAgICAgICAgICAgICAgICB2YXIgYXBwID0gbmV3IEV4cHJlc3NBcHAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gYSByZXF1ZXN0IGhhbmRsZXIgdG8gdGhlIHBhdGhzOlxyXG4gICAgICAgICAgICAgICAgYXBwLkdldFtcIi9zcXIvOlZhbHVlXCJdID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gKFJlcXVlc3RBcmdzKSByZXF1ZXN0LkBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3MuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlVHh0ID0gc3RyaW5nLkZvcm1hdChcInNxcih7MH0pID0gezF9XCIsdmFsLHZhbCAqIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZC5TZWxmKHJlc3BvbnNlVHh0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW5vdGhlciByZXF1ZXN0IGhhbmRsZXI6XHJcbiAgICAgICAgICAgICAgICBhcHAuR2V0W1wiL3NxcnQvOlZhbHVlXCJdID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gKFJlcXVlc3RBcmdzKXJlcXVlc3QuQHBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gYXJncy5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VUeHQgPSBzdHJpbmcuRm9ybWF0KFwic3FydCh7MH0pID0gezF9XCIsdmFsLE1hdGguU3FydCh2YWwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kLlNlbGYocmVzcG9uc2VUeHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJEb25lIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRXJyb3I6IFwiICsgZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLm5vZGUuaHR0cC5TZXJ2ZXIgSW5pdFNlcnZlcihFeHByZXNzQXBwIGFwcCwgaW50IHBvcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXR5cGVkLm5vZGUucHJvY2Vzcy5zdGRvdXQud3JpdGUoc3RyaW5nLkZvcm1hdChcIj4+IENyZWF0aW5nIFNlcnZlciBvbiBwb3J0IHswfS4uIFwiLHBvcnQpKTtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBTZXJ2ZXI6XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VydmVyID0gUmV0eXBlZC5ub2RlLmh0dHAuY3JlYXRlU2VydmVyKChnbG9iYWw6OlJldHlwZWQubm9kZS5odHRwLmNyZWF0ZVNlcnZlckZuKWFwcC5Bc0NyZWF0ZVNlcnZlckZuKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBFdmVudCBIYW5kbGVyczpcclxuICAgICAgICAgICAgICAgIHNlcnZlci5vbihub2RlLkxpdGVyYWxzLmxpc3RlbmluZywgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJbU2VydmVyXSBTZXJ2ZXIgaXMgc3RhcnRlZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VydmVyLm9uKG5vZGUuTGl0ZXJhbHMuZXJyb3IsIChnbG9iYWw6OlJldHlwZWQubm9kZS5uZXQuU2VydmVyLm9uRm4yKShlcnIgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJbU2VydmVyXSBFcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VydmVyLm9uKG5vZGUuTGl0ZXJhbHMuY29ubmVjdGlvbiwgKGdsb2JhbDo6UmV0eXBlZC5ub2RlLm5ldC5TZXJ2ZXIub25Gbikoc29ja2V0ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKHN0cmluZy5Gb3JtYXQoXCJbU2VydmVyXSBDb25uZWN0aW9uIGVzdGFibGlzaGVkIGZyb20gcmVtb3RlOiB7MH06ezF9XCIsc29ja2V0LnJlbW90ZUFkZHJlc3Msc29ja2V0LnJlbW90ZVBvcnQpKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGFydCBsaXN0ZW5pbmcgb24gdGhlIHNwZWNpZmllZCBwb3J0OlxyXG4gICAgICAgICAgICAgICAgc2VydmVyLmxpc3Rlbihwb3J0KTtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkRvbmUhXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJFcnJvcjogXCIgKyBlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoYXQgY2xhc3MgaW5jYXBzdWxhdGVzIEV4cHJlc3MgYXBwbGljYXRpb25cclxuICAgIC8vLyBhbmQgc2ltcGxpZmllcyBpbnRlcmFjdGlvbiB3aXRoIEV4cHJlc3MgQVBJXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEV4cHJlc3NBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLkV4cHJlc3MgQXBwIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcgR2V0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcgUG9zdCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIFB1dCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIERlbGV0ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEV4cHJlc3MgYXBwbGljYXRpb25cclxuICAgICAgICAgICAgQXBwID0gZXhwcmVzcy5lMigpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbmZpZ3MgZm9yIGRpZmZlcmVudCByZXF1ZXN0IHR5cGVzOlxyXG4gICAgICAgICAgICBHZXQgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgKChSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlcilBcHApLmdldCk7XHJcbiAgICAgICAgICAgIFB1dCA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCBBcHAucHV0KTtcclxuICAgICAgICAgICAgUG9zdCA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCBBcHAucG9zdCk7XHJcbiAgICAgICAgICAgIERlbGV0ZSA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCBBcHAuZGVsZXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29udmVydHMgPHNlZSBjcmVmPVwiQXBwXCIvPiwgYXMgaXQgY2FuIGFjdCBhcyA8c2VlIGNyZWY9XCJodHRwLmNyZWF0ZVNlcnZlckZuXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgW1RlbXBsYXRlKFwie3RoaXN9LkFwcFwiKV1cclxuICAgICAgICBwdWJsaWMgZXh0ZXJuIFJldHlwZWQubm9kZS5odHRwLmNyZWF0ZVNlcnZlckZuIEFzQ3JlYXRlU2VydmVyRm4oKTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGlzIGNsYXNzIGhlbHBzIHdpdGggXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgRXhwcmVzc0FwcEhhbmRsZXJDb25maWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRXhwcmVzc0FwcCBfYXBwO1xyXG4gICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyTWF0Y2hlciA8Z2xvYmFsOjpSZXR5cGVkLlByaW1pdGl2ZS5UaGlzPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXI+Pl9jb25maWc7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQWN0aW9uPFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+IHRoaXNbc3RyaW5nIHBhdGhdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFkZEhhbmRsZXIocGF0aCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4pdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcoRXhwcmVzc0FwcCBhcHAsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyTWF0Y2hlciA8Z2xvYmFsOjpSZXR5cGVkLlByaW1pdGl2ZS5UaGlzPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXI+PmNvbmZpZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZyA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY29uZmlnXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9hcHAgPSBhcHA7XHJcbiAgICAgICAgICAgICAgICBfY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKHN0cmluZyBwYXRoLCBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYWxsKF9hcHAuQXBwLCBfY29uZmlnLCBwYXRoLCBUb0hhbmRsZXIoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4pYWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoc3RyaW5nIHBhdGgsIEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuTmV4dEZ1bmN0aW9uPiBhY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENhbGwoX2FwcC5BcHAsIF9jb25maWcsIHBhdGgsIFRvSGFuZGxlcigoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlLCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5OZXh0RnVuY3Rpb24+KWFjdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCB0byBwYXNzIFwiRXhwcmVzcyBhcHBcIiBhcyBhIGNvbnRleHQgZm9yIFwiY29uZmlnKHBhdGgsIGhhbmRsZXIpXCIgZnVuY3Rpb24gY2FsbC5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgW1RlbXBsYXRlKFwiezF9LmNhbGwoezB9LCB7Mn0sIHszfSlcIildXHJcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGljIGV4dGVybiB2b2lkIENhbGwoUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLkV4cHJlc3MgYXBwLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlck1hdGNoZXIgPGdsb2JhbDo6UmV0eXBlZC5QcmltaXRpdmUuVGhpczxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyPj5jb25maWcsIHN0cmluZyBwYXRoLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIgaGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyBDb252ZXJ0cyAuTkVUIGRlbGVnYXRlIHRvIGEgPHNlZSBjcmVmPVwiUmVxdWVzdEhhbmRsZXJcIi8+IGNsYXNzIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICBbVGVtcGxhdGUoXCJ7MH1cIildXHJcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGljIGV4dGVybiBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIgVG9IYW5kbGVyKEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlPiBhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gQ29udmVydHMgLk5FVCBkZWxlZ2F0ZSB0byBhIDxzZWUgY3JlZj1cIlJlcXVlc3RIYW5kbGVyXCIvPiBjbGFzcyBpbnN0YW5jZS5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgW1RlbXBsYXRlKFwiezB9XCIpXVxyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3RIYW5kbGVyIFRvSGFuZGxlcihBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4gYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFJlcHJlc2VudHMgYXJndW1lbnRzIHBhc3NlZCB0byByZXF1ZXN0IGhhbmRsZXJzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFJlcXVlc3RBcmdzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
