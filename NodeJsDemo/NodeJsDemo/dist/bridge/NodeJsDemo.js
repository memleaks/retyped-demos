require("./bridge.js");

/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("NodeJsDemo", function ($asm, globals) {
    "use strict";

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
                    process.stdout.write(">> Init Express App.. ");

                    try {
                        var app = new NodeJsDemo.ExpressApp();

                        app.Get.setItem("/sqr/:Value", function (request, response) {
                            var args = request.params;
                            var val = args.Value;
                            var responseTxt = System.String.format("sqr({0}) = {1}", Bridge.box(val, System.Double, System.Double.format, System.Double.getHashCode), Bridge.box(val * val, System.Double, System.Double.format, System.Double.getHashCode));
                            response.send(responseTxt);
                        });

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
                        var server = http.createServer(app.App);

                        server.on("listening", function () {
                            System.Console.WriteLine("[Server] Server is started!");
                        });

                        server.on("error", function (err) {
                            System.Console.WriteLine("[Server] Error: " + (err.message || ""));
                        });

                        server.on("connection", function (socket) {
                            System.Console.WriteLine(System.String.format("[Server] Connection established from remote: {0}:{1}", socket.remoteAddress, Bridge.box(socket.remotePort, System.Double, System.Nullable.toStringFn(System.Double.format), System.Nullable.getHashCodeFn(System.Double.getHashCode))));
                        });

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
                this.App = e();

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
        $kind: "nested class",
        fields: {
            _app: null,
            _config: null
        },
        ctors: {
            ctor: function (app, config) {
                this.$initialize();
                if (config == null) {
                    throw new System.ArgumentNullException.$ctor1("config");
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJOb2RlSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICJEQWdCWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBQSxVQUFVQTtZQUNWQSxJQUFJQSxPQUFPQTtnQkFFUEE7OztZQUdKQSxhQUFhQSwwQkFBV0E7WUFDeEJBLElBQUlBLFVBQVVBO2dCQUVWQTs7Ozs7O29CQVVKQTs7b0JBRUFBO3dCQUdJQSxVQUFVQSxJQUFJQTs7d0JBR2RBLCtCQUF5QkEsVUFBQ0EsU0FBU0E7NEJBRS9CQSxXQUFXQSxBQUFjQTs0QkFDekJBLFVBQVVBOzRCQUNWQSxrQkFBa0JBLHVDQUErQkEsaUZBQUlBLGlCQUFNQTs0QkFDM0RBLGNBQWNBOzs7d0JBSWxCQSxnQ0FBMEJBLFVBQUNBLFNBQVNBOzRCQUVoQ0EsV0FBV0EsQUFBYUE7NEJBQ3hCQSxVQUFVQTs0QkFDVkEsa0JBQWtCQSx3Q0FBZ0NBLGlGQUFJQSxxQkFBVUE7NEJBQ2hFQSxjQUFjQTs7O3dCQUdsQkE7O3dCQUVBQSxPQUFPQTs7Ozt3QkFJUEEseUJBQXlCQSxhQUFZQTt3QkFDckNBLE9BQU9BOzs7c0NBSW9DQSxLQUFnQkE7b0JBRS9EQSxxQkFBbUNBLDJEQUFrREE7O29CQUVyRkE7d0JBR0lBLGFBQWFBLGtCQUErQkEsQUFBMENBOzt3QkFHdEZBLFVBQVVBLGFBQXlCQSxBQUF3QkE7NEJBRXZEQTs7O3dCQUdKQSxVQUFVQSxTQUFxQkEsQUFBd0NBOzRCQUVuRUEseUJBQXlCQSxzQkFBcUJBOzs7d0JBR2xEQSxVQUFVQSxjQUEwQkEsQUFBd0NBOzRCQUV4RUEseUJBQXlCQSw2RUFBcUVBLHNCQUFxQkE7Ozt3QkFJdkhBLGNBQWNBO3dCQUNkQTs7d0JBRUFBLE9BQU9BOzs7O3dCQUlQQSx5QkFBeUJBLGFBQVlBO3dCQUNyQ0EsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBd0JYQSxXQUFNQTs7Z0JBR05BLFdBQU1BLElBQUlBLDhDQUF3QkEsTUFBTUEsQUFBQ0EsQUFBcURBO2dCQUM5RkEsV0FBTUEsSUFBSUEsOENBQXdCQSxNQUFNQTtnQkFDeENBLFlBQU9BLElBQUlBLDhDQUF3QkEsTUFBTUE7Z0JBQ3pDQSxjQUFTQSxJQUFJQSw4Q0FBd0JBLE1BQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBMEJaQSxLQUFnQkE7O2dCQUUzQ0EsSUFBSUEsVUFBVUE7b0JBQU1BLE1BQU1BLElBQUlBOzs7Z0JBRTlCQSxZQUFPQTtnQkFDUEEsZUFBVUE7Ozs7K0JBYjRGQTtnQkFJbEdBLGdCQUFXQSxNQUFNQSxBQUE4SEE7O2tDQVloSUEsTUFBYUE7Z0JBRWhDQSxBQUFlQSxrQkFBVkEsZUFBbUJBLE1BQU1BLEFBQTBEQSxBQUFVQSxBQUE4SEE7O29DQUc3TUEsTUFBYUE7Z0JBRWhDQSxBQUFlQSxrQkFBVkEsZUFBbUJBLE1BQU1BLEFBQTBEQSxBQUFVQSxBQUFzTEEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcbnVzaW5nIFJldHlwZWQuUHJpbWl0aXZlO1xyXG5cclxubmFtZXNwYWNlIE5vZGVKc0RlbW9cclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE1haW4gYXBwbGljYXRpb24uIENvbnRhaW5zIGFuIGVudHJ5IHBvaW50LlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBbSW5pdChJbml0UG9zaXRpb24uVG9wKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgSW5pdEdsb2JhbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUHJlbG9hZCBcImJyaWRnZS5qc1wiIGJlZm9yZSB0aGUgc2NyaXB0IGJlbG93IGlzIGV4ZWN1dGVkIGJ5IE5vZGVKUy5cclxuICAgICAgICAgICAgUmV0eXBlZC5ub2RlLnJlcXVpcmUuU2VsZihcIi4vYnJpZGdlLmpzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGFwcCA9IEluaXRFeHByZXNzQXBwKCk7XHJcbiAgICAgICAgICAgIGlmIChhcHAgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gSW5pdFNlcnZlcihhcHAsIDMwMDEpO1xyXG4gICAgICAgICAgICBpZiAoc2VydmVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRXhwcmVzc0FwcCBJbml0RXhwcmVzc0FwcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBXZSBjYW4gc3RpbGwgdXNlIFwiU3lzdGVtLkNvbnNvbGUuV3JpdGUoKVwiIGFuZCBcIlN5c3RlbS5Db25zb2xlLldyaXRlTGluZSgpXCIgLSBcclxuICAgICAgICAgICAgLy8gdGhleSB3aWxsIGJlIHRyYW5zbGF0ZWQgdG8gXCJjb25zb2xlLmxvZygpXCIgZnVuY3Rpb24uIEhvd2V2ZXIsIE5vZGVKUyBhbHdheXMgcHJpbnRzIFwiY29uc29sZS5sb2coKVwiIFxyXG4gICAgICAgICAgICAvLyBtZXNhZ2VzIGluIHNlcGFyYXRlIGxpbmVzLiBcclxuICAgICAgICAgICAgLy8gSW4gb3JkZXIgdG8gcHJpbnQgYSBtZXNzYWdlIHdpdGhvdXQgYWRkaW5nIGEgbmV3IGxpbmUsIHdlIGNhbiB1c2UgXCJwcm9jZXNzLnN0ZG91dFwiOlxyXG4gICAgICAgICAgICBSZXR5cGVkLm5vZGUucHJvY2VzczIuc3Rkb3V0LndyaXRlKFwiPj4gSW5pdCBFeHByZXNzIEFwcC4uIFwiKTtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gRXhwcmVzcyBhcHAgaW5zdGFuY2U6XHJcbiAgICAgICAgICAgICAgICB2YXIgYXBwID0gbmV3IEV4cHJlc3NBcHAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gYSByZXF1ZXN0IGhhbmRsZXIgdG8gdGhlIHBhdGhzOlxyXG4gICAgICAgICAgICAgICAgYXBwLkdldFtcIi9zcXIvOlZhbHVlXCJdID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gKFJlcXVlc3RBcmdzKSByZXF1ZXN0LkBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3MuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlVHh0ID0gc3RyaW5nLkZvcm1hdChcInNxcih7MH0pID0gezF9XCIsdmFsLHZhbCAqIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZChyZXNwb25zZVR4dCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFub3RoZXIgcmVxdWVzdCBoYW5kbGVyOlxyXG4gICAgICAgICAgICAgICAgYXBwLkdldFtcIi9zcXJ0LzpWYWx1ZVwiXSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IChSZXF1ZXN0QXJncylyZXF1ZXN0LkBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3MuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlVHh0ID0gc3RyaW5nLkZvcm1hdChcInNxcnQoezB9KSA9IHsxfVwiLHZhbCxNYXRoLlNxcnQodmFsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc2VuZChyZXNwb25zZVR4dCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkRvbmUhXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBhcHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJFcnJvcjogXCIgKyBlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQubm9kZS5odHRwLlNlcnZlciBJbml0U2VydmVyKEV4cHJlc3NBcHAgYXBwLCBpbnQgcG9ydClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJldHlwZWQubm9kZS5wcm9jZXNzMi5zdGRvdXQud3JpdGUoc3RyaW5nLkZvcm1hdChcIj4+IENyZWF0aW5nIFNlcnZlciBvbiBwb3J0IHswfS4uIFwiLHBvcnQpKTtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBTZXJ2ZXI6XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VydmVyID0gUmV0eXBlZC5ub2RlLmh0dHAuY3JlYXRlU2VydmVyKChnbG9iYWw6OlJldHlwZWQubm9kZS5odHRwLmNyZWF0ZVNlcnZlckZuKWFwcC5Bc0NyZWF0ZVNlcnZlckZuKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBFdmVudCBIYW5kbGVyczpcclxuICAgICAgICAgICAgICAgIHNlcnZlci5vbihub2RlLkxpdGVyYWxzLmxpc3RlbmluZywgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJbU2VydmVyXSBTZXJ2ZXIgaXMgc3RhcnRlZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VydmVyLm9uKG5vZGUuTGl0ZXJhbHMuZXJyb3IsIChnbG9iYWw6OlJldHlwZWQubm9kZS5uZXQuU2VydmVyLm9uRm4zKShlcnIgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJbU2VydmVyXSBFcnJvcjogXCIgKyBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VydmVyLm9uKG5vZGUuTGl0ZXJhbHMuY29ubmVjdGlvbiwgKGdsb2JhbDo6UmV0eXBlZC5ub2RlLm5ldC5TZXJ2ZXIub25GbjIpKHNvY2tldCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShzdHJpbmcuRm9ybWF0KFwiW1NlcnZlcl0gQ29ubmVjdGlvbiBlc3RhYmxpc2hlZCBmcm9tIHJlbW90ZTogezB9OnsxfVwiLHNvY2tldC5yZW1vdGVBZGRyZXNzLHNvY2tldC5yZW1vdGVQb3J0KSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgbGlzdGVuaW5nIG9uIHRoZSBzcGVjaWZpZWQgcG9ydDpcclxuICAgICAgICAgICAgICAgIHNlcnZlci5saXN0ZW4ocG9ydCk7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJEb25lIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRXJyb3I6IFwiICsgZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUaGF0IGNsYXNzIGluY2Fwc3VsYXRlcyBFeHByZXNzIGFwcGxpY2F0aW9uXHJcbiAgICAvLy8gYW5kIHNpbXBsaWZpZXMgaW50ZXJhY3Rpb24gd2l0aCBFeHByZXNzIEFQSVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBFeHByZXNzQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5FeHByZXNzIEFwcCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIEdldCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIFBvc3QgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyBQdXQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyBEZWxldGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBFeHByZXNzIGFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgIEFwcCA9IGV4cHJlc3MuZTIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjb25maWdzIGZvciBkaWZmZXJlbnQgcmVxdWVzdCB0eXBlczpcclxuICAgICAgICAgICAgR2V0ID0gbmV3IEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnKHRoaXMsICgoUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXIuSW50ZXJmYWNlKUFwcCkuZ2V0KTtcclxuICAgICAgICAgICAgUHV0ID0gbmV3IEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnKHRoaXMsIEFwcC5wdXQpO1xyXG4gICAgICAgICAgICBQb3N0ID0gbmV3IEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnKHRoaXMsIEFwcC5wb3N0KTtcclxuICAgICAgICAgICAgRGVsZXRlID0gbmV3IEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnKHRoaXMsIEFwcC5kZWxldGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb252ZXJ0cyA8c2VlIGNyZWY9XCJBcHBcIi8+LCBhcyBpdCBjYW4gYWN0IGFzIDxzZWUgY3JlZj1cImh0dHAuY3JlYXRlU2VydmVyRm5cIi8+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBbVGVtcGxhdGUoXCJ7dGhpc30uQXBwXCIpXVxyXG4gICAgICAgIHB1YmxpYyBleHRlcm4gUmV0eXBlZC5ub2RlLmh0dHAuY3JlYXRlU2VydmVyRm4gQXNDcmVhdGVTZXJ2ZXJGbigpO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoaXMgY2xhc3MgaGVscHMgd2l0aCBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBFeHByZXNzQXBwIF9hcHA7XHJcbiAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXJNYXRjaGVyIDxnbG9iYWw6OlJldHlwZWQuUHJpbWl0aXZlLlRoaXM8Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlcj4+X2NvbmZpZztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gdGhpc1tzdHJpbmcgcGF0aF1cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWRkSGFuZGxlcihwYXRoLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlPil2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyhFeHByZXNzQXBwIGFwcCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXJNYXRjaGVyIDxnbG9iYWw6OlJldHlwZWQuUHJpbWl0aXZlLlRoaXM8Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlcj4+Y29uZmlnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnID09IG51bGwpIHRocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJjb25maWdcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgX2FwcCA9IGFwcDtcclxuICAgICAgICAgICAgICAgIF9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoc3RyaW5nIHBhdGgsIEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlPiBhY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENhbGwoX2FwcC5BcHAsIF9jb25maWcsIHBhdGgsIChnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0SGFuZGxlcilUb0hhbmRsZXIoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4pYWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoc3RyaW5nIHBhdGgsIEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuTmV4dEZ1bmN0aW9uPiBhY3Rpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENhbGwoX2FwcC5BcHAsIF9jb25maWcsIHBhdGgsIChnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0SGFuZGxlcilUb0hhbmRsZXIoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuTmV4dEZ1bmN0aW9uPilhY3Rpb24pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gVGhpcyBtZXRob2QgaXMgcmVxdWlyZWQgdG8gcGFzcyBcIkV4cHJlc3MgYXBwXCIgYXMgYSBjb250ZXh0IGZvciBcImNvbmZpZyhwYXRoLCBoYW5kbGVyKVwiIGZ1bmN0aW9uIGNhbGwuXHJcbiAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIFtUZW1wbGF0ZShcInsxfS5jYWxsKHswfSwgezJ9LCB7M30pXCIpXVxyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gdm9pZCBDYWxsKFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5FeHByZXNzIGFwcCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXJNYXRjaGVyIDxnbG9iYWw6OlJldHlwZWQuUHJpbWl0aXZlLlRoaXM8Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlcj4+Y29uZmlnLCBzdHJpbmcgcGF0aCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3RIYW5kbGVyIGhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gQ29udmVydHMgLk5FVCBkZWxlZ2F0ZSB0byBhIDxzZWUgY3JlZj1cIlJlcXVlc3RIYW5kbGVyXCIvPiBjbGFzcyBpbnN0YW5jZS5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgW1RlbXBsYXRlKFwiezB9XCIpXVxyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3RIYW5kbGVyIFRvSGFuZGxlcihBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gYWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIENvbnZlcnRzIC5ORVQgZGVsZWdhdGUgdG8gYSA8c2VlIGNyZWY9XCJSZXF1ZXN0SGFuZGxlclwiLz4gY2xhc3MgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0SGFuZGxlciBUb0hhbmRsZXIoQWN0aW9uPFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2UsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5OZXh0RnVuY3Rpb24+IGFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBSZXByZXNlbnRzIGFyZ3VtZW50cyBwYXNzZWQgdG8gcmVxdWVzdCBoYW5kbGVycy5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBbT2JqZWN0TGl0ZXJhbF1cclxuICAgIHB1YmxpYyBjbGFzcyBSZXF1ZXN0QXJnc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgVmFsdWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgfVxyXG59Il0KfQo=
