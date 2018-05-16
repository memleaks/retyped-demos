require("./bridge.js");

/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("NodeJsDemo", function ($asm, globals) {
    "use strict";

    var http = require("http");
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
                            var responseTxt = System.String.format("sqr({0}) = {1}", val, val * val);
                            response.send(responseTxt);
                        });

                        app.Get.setItem("/sqrt/:Value", function (request, response) {
                            var args = request.params;
                            var val = args.Value;
                            var responseTxt = System.String.format("sqrt({0}) = {1}", val, Math.sqrt(val));
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
                    process.stdout.write(System.String.format(">> Creating Server on port {0}.. ", [port]));

                    try {
                        var server = http.createServer(app.App);

                        server.on("listening", function () {
                            System.Console.WriteLine("[Server] Server is started!");
                        });

                        server.on("error", function (err) {
                            System.Console.WriteLine("[Server] Error: " + (err.message || ""));
                        });

                        server.on("connection", function (socket) {
                            System.Console.WriteLine(System.String.format("[Server] Connection established from remote: {0}:{1}", socket.remoteAddress, socket.remotePort));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJOb2RlSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICJEQWdCWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0FBLFVBQVVBO1lBQ1ZBLElBQUlBLE9BQU9BO2dCQUVQQTs7O1lBR0pBLGFBQWFBLDBCQUFXQTtZQUN4QkEsSUFBSUEsVUFBVUE7Z0JBRVZBOzs7Ozs7b0JBVUpBOztvQkFFQUE7d0JBR0lBLFVBQVVBLElBQUlBOzt3QkFHZEEsK0JBQXlCQSxVQUFDQSxTQUFTQTs0QkFFL0JBLFdBQVdBLEFBQWNBOzRCQUN6QkEsVUFBVUE7NEJBQ1ZBLGtCQUFrQkEsdUNBQStCQSxLQUFJQSxNQUFNQTs0QkFDM0RBLGNBQWNBOzs7d0JBSWxCQSxnQ0FBMEJBLFVBQUNBLFNBQVNBOzRCQUVoQ0EsV0FBV0EsQUFBYUE7NEJBQ3hCQSxVQUFVQTs0QkFDVkEsa0JBQWtCQSx3Q0FBZ0NBLEtBQUlBLFVBQVVBOzRCQUNoRUEsY0FBY0E7Ozt3QkFHbEJBOzt3QkFFQUEsT0FBT0E7Ozs7d0JBSVBBLHlCQUF5QkEsYUFBWUE7d0JBQ3JDQSxPQUFPQTs7O3NDQUlvQ0EsS0FBZ0JBO29CQUUvREEscUJBQW1DQSwyREFBa0RBOztvQkFFckZBO3dCQUdJQSxhQUFhQSxrQkFBK0JBLEFBQTBDQTs7d0JBR3RGQSxVQUFVQSxhQUF5QkEsQUFBd0JBOzRCQUV2REE7Ozt3QkFHSkEsVUFBVUEsU0FBcUJBLEFBQXdDQTs0QkFFbkVBLHlCQUF5QkEsc0JBQXFCQTs7O3dCQUdsREEsVUFBVUEsY0FBMEJBLEFBQXdDQTs0QkFFeEVBLHlCQUF5QkEsNkVBQXFFQSxzQkFBcUJBOzs7d0JBSXZIQSxjQUFjQTt3QkFDZEE7O3dCQUVBQSxPQUFPQTs7Ozt3QkFJUEEseUJBQXlCQSxhQUFZQTt3QkFDckNBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQXdCWEEsV0FBTUE7O2dCQUdOQSxXQUFNQSxJQUFJQSw4Q0FBd0JBLE1BQU1BLEFBQUNBLEFBQXFEQTtnQkFDOUZBLFdBQU1BLElBQUlBLDhDQUF3QkEsTUFBTUE7Z0JBQ3hDQSxZQUFPQSxJQUFJQSw4Q0FBd0JBLE1BQU1BO2dCQUN6Q0EsY0FBU0EsSUFBSUEsOENBQXdCQSxNQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQTBCWkEsS0FBZ0JBOztnQkFFM0NBLElBQUlBLFVBQVVBO29CQUFNQSxNQUFNQSxJQUFJQTs7O2dCQUU5QkEsWUFBT0E7Z0JBQ1BBLGVBQVVBOzs7OytCQWI0RkE7Z0JBSWxHQSxnQkFBV0EsTUFBTUEsQUFBOEhBOztrQ0FZaElBLE1BQWFBO2dCQUVoQ0EsQUFBZUEsa0JBQVZBLGVBQW1CQSxNQUFNQSxBQUEwREEsQUFBVUEsQUFBOEhBOztvQ0FHN01BLE1BQWFBO2dCQUVoQ0EsQUFBZUEsa0JBQVZBLGVBQW1CQSxNQUFNQSxBQUEwREEsQUFBVUEsQUFBc0xBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBSZXR5cGVkO1xyXG51c2luZyBSZXR5cGVkLlByaW1pdGl2ZTtcclxuXHJcbm5hbWVzcGFjZSBOb2RlSnNEZW1vXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBNYWluIGFwcGxpY2F0aW9uLiBDb250YWlucyBhbiBlbnRyeSBwb2ludC5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgW0luaXQoSW5pdFBvc2l0aW9uLlRvcCldXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEluaXRHbG9iYWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFByZWxvYWQgXCJicmlkZ2UuanNcIiBiZWZvcmUgdGhlIHNjcmlwdCBiZWxvdyBpcyBleGVjdXRlZCBieSBOb2RlSlMuXHJcbiAgICAgICAgICAgIFJldHlwZWQubm9kZS5yZXF1aXJlLlNlbGYoXCIuL2JyaWRnZS5qc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhcHAgPSBJbml0RXhwcmVzc0FwcCgpO1xyXG4gICAgICAgICAgICBpZiAoYXBwID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IEluaXRTZXJ2ZXIoYXBwLCAzMDAxKTtcclxuICAgICAgICAgICAgaWYgKHNlcnZlciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEV4cHJlc3NBcHAgSW5pdEV4cHJlc3NBcHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gV2UgY2FuIHN0aWxsIHVzZSBcIlN5c3RlbS5Db25zb2xlLldyaXRlKClcIiBhbmQgXCJTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoKVwiIC0gXHJcbiAgICAgICAgICAgIC8vIHRoZXkgd2lsbCBiZSB0cmFuc2xhdGVkIHRvIFwiY29uc29sZS5sb2coKVwiIGZ1bmN0aW9uLiBIb3dldmVyLCBOb2RlSlMgYWx3YXlzIHByaW50cyBcImNvbnNvbGUubG9nKClcIiBcclxuICAgICAgICAgICAgLy8gbWVzYWdlcyBpbiBzZXBhcmF0ZSBsaW5lcy4gXHJcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIHByaW50IGEgbWVzc2FnZSB3aXRob3V0IGFkZGluZyBhIG5ldyBsaW5lLCB3ZSBjYW4gdXNlIFwicHJvY2Vzcy5zdGRvdXRcIjpcclxuICAgICAgICAgICAgUmV0eXBlZC5ub2RlLnByb2Nlc3MyLnN0ZG91dC53cml0ZShcIj4+IEluaXQgRXhwcmVzcyBBcHAuLiBcIik7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIEV4cHJlc3MgYXBwIGluc3RhbmNlOlxyXG4gICAgICAgICAgICAgICAgdmFyIGFwcCA9IG5ldyBFeHByZXNzQXBwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIGEgcmVxdWVzdCBoYW5kbGVyIHRvIHRoZSBwYXRoczpcclxuICAgICAgICAgICAgICAgIGFwcC5HZXRbXCIvc3FyLzpWYWx1ZVwiXSA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IChSZXF1ZXN0QXJncykgcmVxdWVzdC5AcGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBhcmdzLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZVR4dCA9IHN0cmluZy5Gb3JtYXQoXCJzcXIoezB9KSA9IHsxfVwiLHZhbCx2YWwgKiB2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQocmVzcG9uc2VUeHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBbm90aGVyIHJlcXVlc3QgaGFuZGxlcjpcclxuICAgICAgICAgICAgICAgIGFwcC5HZXRbXCIvc3FydC86VmFsdWVcIl0gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSAoUmVxdWVzdEFyZ3MpcmVxdWVzdC5AcGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBhcmdzLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZVR4dCA9IHN0cmluZy5Gb3JtYXQoXCJzcXJ0KHswfSkgPSB7MX1cIix2YWwsTWF0aC5TcXJ0KHZhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNlbmQocmVzcG9uc2VUeHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJEb25lIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRXJyb3I6IFwiICsgZS5NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLm5vZGUuaHR0cC5TZXJ2ZXIgSW5pdFNlcnZlcihFeHByZXNzQXBwIGFwcCwgaW50IHBvcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXR5cGVkLm5vZGUucHJvY2VzczIuc3Rkb3V0LndyaXRlKHN0cmluZy5Gb3JtYXQoXCI+PiBDcmVhdGluZyBTZXJ2ZXIgb24gcG9ydCB7MH0uLiBcIixwb3J0KSk7XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgU2VydmVyOlxyXG4gICAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IFJldHlwZWQubm9kZS5odHRwLmNyZWF0ZVNlcnZlcigoZ2xvYmFsOjpSZXR5cGVkLm5vZGUuaHR0cC5jcmVhdGVTZXJ2ZXJGbilhcHAuQXNDcmVhdGVTZXJ2ZXJGbigpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gRXZlbnQgSGFuZGxlcnM6XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub24obm9kZS5MaXRlcmFscy5saXN0ZW5pbmcsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiW1NlcnZlcl0gU2VydmVyIGlzIHN0YXJ0ZWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlcnZlci5vbihub2RlLkxpdGVyYWxzLmVycm9yLCAoZ2xvYmFsOjpSZXR5cGVkLm5vZGUubmV0LlNlcnZlci5vbkZuMykoZXJyID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiW1NlcnZlcl0gRXJyb3I6IFwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlcnZlci5vbihub2RlLkxpdGVyYWxzLmNvbm5lY3Rpb24sIChnbG9iYWw6OlJldHlwZWQubm9kZS5uZXQuU2VydmVyLm9uRm4yKShzb2NrZXQgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoc3RyaW5nLkZvcm1hdChcIltTZXJ2ZXJdIENvbm5lY3Rpb24gZXN0YWJsaXNoZWQgZnJvbSByZW1vdGU6IHswfTp7MX1cIixzb2NrZXQucmVtb3RlQWRkcmVzcyxzb2NrZXQucmVtb3RlUG9ydCkpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IGxpc3RlbmluZyBvbiB0aGUgc3BlY2lmaWVkIHBvcnQ6XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIubGlzdGVuKHBvcnQpO1xyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRG9uZSFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkVycm9yOiBcIiArIGUuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhhdCBjbGFzcyBpbmNhcHN1bGF0ZXMgRXhwcmVzcyBhcHBsaWNhdGlvblxyXG4gICAgLy8vIGFuZCBzaW1wbGlmaWVzIGludGVyYWN0aW9uIHdpdGggRXhwcmVzcyBBUElcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgRXhwcmVzc0FwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuRXhwcmVzcyBBcHAgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyBHZXQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyBQb3N0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcgUHV0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcgRGVsZXRlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgRXhwcmVzcyBhcHBsaWNhdGlvblxyXG4gICAgICAgICAgICBBcHAgPSBleHByZXNzLmUyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY29uZmlncyBmb3IgZGlmZmVyZW50IHJlcXVlc3QgdHlwZXM6XHJcbiAgICAgICAgICAgIEdldCA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCAoKFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyLkludGVyZmFjZSlBcHApLmdldCk7XHJcbiAgICAgICAgICAgIFB1dCA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCBBcHAucHV0KTtcclxuICAgICAgICAgICAgUG9zdCA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCBBcHAucG9zdCk7XHJcbiAgICAgICAgICAgIERlbGV0ZSA9IG5ldyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyh0aGlzLCBBcHAuZGVsZXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29udmVydHMgPHNlZSBjcmVmPVwiQXBwXCIvPiwgYXMgaXQgY2FuIGFjdCBhcyA8c2VlIGNyZWY9XCJodHRwLmNyZWF0ZVNlcnZlckZuXCIvPi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgW1RlbXBsYXRlKFwie3RoaXN9LkFwcFwiKV1cclxuICAgICAgICBwdWJsaWMgZXh0ZXJuIFJldHlwZWQubm9kZS5odHRwLmNyZWF0ZVNlcnZlckZuIEFzQ3JlYXRlU2VydmVyRm4oKTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGlzIGNsYXNzIGhlbHBzIHdpdGggXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgRXhwcmVzc0FwcEhhbmRsZXJDb25maWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRXhwcmVzc0FwcCBfYXBwO1xyXG4gICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyTWF0Y2hlciA8Z2xvYmFsOjpSZXR5cGVkLlByaW1pdGl2ZS5UaGlzPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXI+Pl9jb25maWc7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgQWN0aW9uPFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+IHRoaXNbc3RyaW5nIHBhdGhdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFkZEhhbmRsZXIocGF0aCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4pdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcoRXhwcmVzc0FwcCBhcHAsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyTWF0Y2hlciA8Z2xvYmFsOjpSZXR5cGVkLlByaW1pdGl2ZS5UaGlzPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXI+PmNvbmZpZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZyA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY29uZmlnXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9hcHAgPSBhcHA7XHJcbiAgICAgICAgICAgICAgICBfY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKHN0cmluZyBwYXRoLCBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYWxsKF9hcHAuQXBwLCBfY29uZmlnLCBwYXRoLCAoZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIpVG9IYW5kbGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+KWFjdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKHN0cmluZyBwYXRoLCBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYWxsKF9hcHAuQXBwLCBfY29uZmlnLCBwYXRoLCAoZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIpVG9IYW5kbGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2UsIGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4pYWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIHRvIHBhc3MgXCJFeHByZXNzIGFwcFwiIGFzIGEgY29udGV4dCBmb3IgXCJjb25maWcocGF0aCwgaGFuZGxlcilcIiBmdW5jdGlvbiBjYWxsLlxyXG4gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICBbVGVtcGxhdGUoXCJ7MX0uY2FsbCh7MH0sIHsyfSwgezN9KVwiKV1cclxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIHZvaWQgQ2FsbChSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuRXhwcmVzcyBhcHAsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyTWF0Y2hlciA8Z2xvYmFsOjpSZXR5cGVkLlByaW1pdGl2ZS5UaGlzPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXI+PmNvbmZpZywgc3RyaW5nIHBhdGgsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0SGFuZGxlciBoYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIENvbnZlcnRzIC5ORVQgZGVsZWdhdGUgdG8gYSA8c2VlIGNyZWY9XCJSZXF1ZXN0SGFuZGxlclwiLz4gY2xhc3MgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIFtUZW1wbGF0ZShcInswfVwiKV1cclxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0SGFuZGxlciBUb0hhbmRsZXIoQWN0aW9uPFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXF1ZXN0LCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+IGFjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyBDb252ZXJ0cyAuTkVUIGRlbGVnYXRlIHRvIGEgPHNlZSBjcmVmPVwiUmVxdWVzdEhhbmRsZXJcIi8+IGNsYXNzIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICBbVGVtcGxhdGUoXCJ7MH1cIildXHJcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGljIGV4dGVybiBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIgVG9IYW5kbGVyKEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuTmV4dEZ1bmN0aW9uPiBhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gUmVwcmVzZW50cyBhcmd1bWVudHMgcGFzc2VkIHRvIHJlcXVlc3QgaGFuZGxlcnMuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgW09iamVjdExpdGVyYWxdXHJcbiAgICBwdWJsaWMgY2xhc3MgUmVxdWVzdEFyZ3NcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZG91YmxlIFZhbHVlIHsgZ2V0OyBzZXQ7IH1cclxuICAgIH1cclxufSJdCn0K
