require("./bridge.js");

/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJOb2RlSnNEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICJEQWVZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQUEsVUFBVUE7WUFDVkEsSUFBSUEsT0FBT0E7Z0JBRVBBOzs7WUFHSkEsYUFBYUEsMEJBQVdBO1lBQ3hCQSxJQUFJQSxVQUFVQTtnQkFFVkE7Ozs7OztvQkFVSkE7O29CQUVBQTt3QkFHSUEsVUFBVUEsSUFBSUE7O3dCQUdkQSwrQkFBeUJBLFVBQUNBLFNBQVNBOzRCQUUvQkEsV0FBV0EsQUFBY0E7NEJBQ3pCQSxVQUFVQTs0QkFDVkEsa0JBQWtCQSx1Q0FBK0JBLEtBQUlBLE1BQU1BOzRCQUMzREEsY0FBY0E7Ozt3QkFJbEJBLGdDQUEwQkEsVUFBQ0EsU0FBU0E7NEJBRWhDQSxXQUFXQSxBQUFhQTs0QkFDeEJBLFVBQVVBOzRCQUNWQSxrQkFBa0JBLHdDQUFnQ0EsS0FBSUEsVUFBVUE7NEJBQ2hFQSxjQUFjQTs7O3dCQUdsQkE7O3dCQUVBQSxPQUFPQTs7Ozt3QkFJUEEseUJBQXlCQSxhQUFZQTt3QkFDckNBLE9BQU9BOzs7c0NBSW9DQSxLQUFnQkE7b0JBRS9EQSxxQkFBbUNBLDJEQUFrREE7O29CQUVyRkE7d0JBR0lBLGFBQWFBLGtCQUErQkEsQUFBMENBOzt3QkFHdEZBLFVBQVVBLGFBQXlCQSxBQUF3QkE7NEJBRXZEQTs7O3dCQUdKQSxVQUFVQSxTQUFxQkEsQUFBd0NBOzRCQUVuRUEseUJBQXlCQSxzQkFBcUJBOzs7d0JBR2xEQSxVQUFVQSxjQUEwQkEsQUFBd0NBOzRCQUV4RUEseUJBQXlCQSw2RUFBcUVBLHNCQUFxQkE7Ozt3QkFJdkhBLGNBQWNBO3dCQUNkQTs7d0JBRUFBLE9BQU9BOzs7O3dCQUlQQSx5QkFBeUJBLGFBQVlBO3dCQUNyQ0EsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBd0JYQSxXQUFNQTs7Z0JBR05BLFdBQU1BLElBQUlBLDhDQUF3QkEsTUFBTUEsQUFBQ0EsQUFBcURBO2dCQUM5RkEsV0FBTUEsSUFBSUEsOENBQXdCQSxNQUFNQTtnQkFDeENBLFlBQU9BLElBQUlBLDhDQUF3QkEsTUFBTUE7Z0JBQ3pDQSxjQUFTQSxJQUFJQSw4Q0FBd0JBLE1BQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBMEJaQSxLQUFnQkE7O2dCQUUzQ0EsSUFBSUEsVUFBVUE7b0JBQU1BLE1BQU1BLElBQUlBOzs7Z0JBRTlCQSxZQUFPQTtnQkFDUEEsZUFBVUE7Ozs7K0JBYjRGQTtnQkFJbEdBLGdCQUFXQSxNQUFNQSxBQUE4SEE7O2tDQVloSUEsTUFBYUE7Z0JBRWhDQSxBQUFlQSxrQkFBVkEsZUFBbUJBLE1BQU1BLEFBQTBEQSxBQUFVQSxBQUE4SEE7O29DQUc3TUEsTUFBYUE7Z0JBRWhDQSxBQUFlQSxrQkFBVkEsZUFBbUJBLE1BQU1BLEFBQTBEQSxBQUFVQSxBQUFzTEEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFJldHlwZWQ7XHJcblxyXG5uYW1lc3BhY2UgTm9kZUpzRGVtb1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gTWFpbiBhcHBsaWNhdGlvbi4gQ29udGFpbnMgYW4gZW50cnkgcG9pbnQuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIFtJbml0KEluaXRQb3NpdGlvbi5Ub3ApXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBJbml0R2xvYmFscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBQcmVsb2FkIFwiYnJpZGdlLmpzXCIgYmVmb3JlIHRoZSBzY3JpcHQgYmVsb3cgaXMgZXhlY3V0ZWQgYnkgTm9kZUpTLlxyXG4gICAgICAgICAgICBSZXR5cGVkLm5vZGUucmVxdWlyZS5TZWxmKFwiLi9icmlkZ2UuanNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYXBwID0gSW5pdEV4cHJlc3NBcHAoKTtcclxuICAgICAgICAgICAgaWYgKGFwcCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBJbml0U2VydmVyKGFwcCwgMzAwMSk7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBFeHByZXNzQXBwIEluaXRFeHByZXNzQXBwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCB1c2UgXCJTeXN0ZW0uQ29uc29sZS5Xcml0ZSgpXCIgYW5kIFwiU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKClcIiAtIFxyXG4gICAgICAgICAgICAvLyB0aGV5IHdpbGwgYmUgdHJhbnNsYXRlZCB0byBcImNvbnNvbGUubG9nKClcIiBmdW5jdGlvbi4gSG93ZXZlciwgTm9kZUpTIGFsd2F5cyBwcmludHMgXCJjb25zb2xlLmxvZygpXCIgXHJcbiAgICAgICAgICAgIC8vIG1lc2FnZXMgaW4gc2VwYXJhdGUgbGluZXMuIFxyXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBwcmludCBhIG1lc3NhZ2Ugd2l0aG91dCBhZGRpbmcgYSBuZXcgbGluZSwgd2UgY2FuIHVzZSBcInByb2Nlc3Muc3Rkb3V0XCI6XHJcbiAgICAgICAgICAgIFJldHlwZWQubm9kZS5wcm9jZXNzMi5zdGRvdXQud3JpdGUoXCI+PiBJbml0IEV4cHJlc3MgQXBwLi4gXCIpO1xyXG5cclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBFeHByZXNzIGFwcCBpbnN0YW5jZTpcclxuICAgICAgICAgICAgICAgIHZhciBhcHAgPSBuZXcgRXhwcmVzc0FwcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBhIHJlcXVlc3QgaGFuZGxlciB0byB0aGUgcGF0aHM6XHJcbiAgICAgICAgICAgICAgICBhcHAuR2V0W1wiL3Nxci86VmFsdWVcIl0gPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSAoUmVxdWVzdEFyZ3MpIHJlcXVlc3QuQHBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gYXJncy5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VUeHQgPSBzdHJpbmcuRm9ybWF0KFwic3FyKHswfSkgPSB7MX1cIix2YWwsdmFsICogdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHJlc3BvbnNlVHh0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW5vdGhlciByZXF1ZXN0IGhhbmRsZXI6XHJcbiAgICAgICAgICAgICAgICBhcHAuR2V0W1wiL3NxcnQvOlZhbHVlXCJdID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gKFJlcXVlc3RBcmdzKXJlcXVlc3QuQHBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gYXJncy5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VUeHQgPSBzdHJpbmcuRm9ybWF0KFwic3FydCh7MH0pID0gezF9XCIsdmFsLE1hdGguU3FydCh2YWwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zZW5kKHJlc3BvbnNlVHh0KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKFwiRG9uZSFcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkVycm9yOiBcIiArIGUuTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5ub2RlLmh0dHAuU2VydmVyIEluaXRTZXJ2ZXIoRXhwcmVzc0FwcCBhcHAsIGludCBwb3J0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmV0eXBlZC5ub2RlLnByb2Nlc3MyLnN0ZG91dC53cml0ZShzdHJpbmcuRm9ybWF0KFwiPj4gQ3JlYXRpbmcgU2VydmVyIG9uIHBvcnQgezB9Li4gXCIscG9ydCkpO1xyXG5cclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIFNlcnZlcjpcclxuICAgICAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBSZXR5cGVkLm5vZGUuaHR0cC5jcmVhdGVTZXJ2ZXIoKGdsb2JhbDo6UmV0eXBlZC5ub2RlLmh0dHAuY3JlYXRlU2VydmVyRm4pYXBwLkFzQ3JlYXRlU2VydmVyRm4oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIEV2ZW50IEhhbmRsZXJzOlxyXG4gICAgICAgICAgICAgICAgc2VydmVyLm9uKG5vZGUuTGl0ZXJhbHMubGlzdGVuaW5nLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIltTZXJ2ZXJdIFNlcnZlciBpcyBzdGFydGVkIVwiKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub24obm9kZS5MaXRlcmFscy5lcnJvciwgKGdsb2JhbDo6UmV0eXBlZC5ub2RlLm5ldC5TZXJ2ZXIub25GbjMpKGVyciA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIltTZXJ2ZXJdIEVycm9yOiBcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIub24obm9kZS5MaXRlcmFscy5jb25uZWN0aW9uLCAoZ2xvYmFsOjpSZXR5cGVkLm5vZGUubmV0LlNlcnZlci5vbkZuMikoc29ja2V0ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKHN0cmluZy5Gb3JtYXQoXCJbU2VydmVyXSBDb25uZWN0aW9uIGVzdGFibGlzaGVkIGZyb20gcmVtb3RlOiB7MH06ezF9XCIsc29ja2V0LnJlbW90ZUFkZHJlc3Msc29ja2V0LnJlbW90ZVBvcnQpKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGFydCBsaXN0ZW5pbmcgb24gdGhlIHNwZWNpZmllZCBwb3J0OlxyXG4gICAgICAgICAgICAgICAgc2VydmVyLmxpc3Rlbihwb3J0KTtcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkRvbmUhXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJFcnJvcjogXCIgKyBlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoYXQgY2xhc3MgaW5jYXBzdWxhdGVzIEV4cHJlc3MgYXBwbGljYXRpb25cclxuICAgIC8vLyBhbmQgc2ltcGxpZmllcyBpbnRlcmFjdGlvbiB3aXRoIEV4cHJlc3MgQVBJXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEV4cHJlc3NBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLkV4cHJlc3MgQXBwIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcgR2V0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcgUG9zdCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIFB1dCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnIERlbGV0ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEV4cHJlc3NBcHAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEV4cHJlc3MgYXBwbGljYXRpb25cclxuICAgICAgICAgICAgQXBwID0gZXhwcmVzcy5lMigpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbmZpZ3MgZm9yIGRpZmZlcmVudCByZXF1ZXN0IHR5cGVzOlxyXG4gICAgICAgICAgICBHZXQgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgKChSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlci5JbnRlcmZhY2UpQXBwKS5nZXQpO1xyXG4gICAgICAgICAgICBQdXQgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgQXBwLnB1dCk7XHJcbiAgICAgICAgICAgIFBvc3QgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgQXBwLnBvc3QpO1xyXG4gICAgICAgICAgICBEZWxldGUgPSBuZXcgRXhwcmVzc0FwcEhhbmRsZXJDb25maWcodGhpcywgQXBwLmRlbGV0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbnZlcnRzIDxzZWUgY3JlZj1cIkFwcFwiLz4sIGFzIGl0IGNhbiBhY3QgYXMgPHNlZSBjcmVmPVwiaHR0cC5jcmVhdGVTZXJ2ZXJGblwiLz4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIFtUZW1wbGF0ZShcInt0aGlzfS5BcHBcIildXHJcbiAgICAgICAgcHVibGljIGV4dGVybiBSZXR5cGVkLm5vZGUuaHR0cC5jcmVhdGVTZXJ2ZXJGbiBBc0NyZWF0ZVNlcnZlckZuKCk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhpcyBjbGFzcyBoZWxwcyB3aXRoIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGNsYXNzIEV4cHJlc3NBcHBIYW5kbGVyQ29uZmlnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEV4cHJlc3NBcHAgX2FwcDtcclxuICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlck1hdGNoZXIgPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXI+X2NvbmZpZztcclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gdGhpc1tzdHJpbmcgcGF0aF1cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWRkSGFuZGxlcihwYXRoLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlPil2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBFeHByZXNzQXBwSGFuZGxlckNvbmZpZyhFeHByZXNzQXBwIGFwcCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLklSb3V0ZXJNYXRjaGVyIDxnbG9iYWw6OlJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyPmNvbmZpZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZyA9PSBudWxsKSB0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiY29uZmlnXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9hcHAgPSBhcHA7XHJcbiAgICAgICAgICAgICAgICBfY29uZmlnID0gY29uZmlnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKHN0cmluZyBwYXRoLCBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZT4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYWxsKF9hcHAuQXBwLCBfY29uZmlnLCBwYXRoLCAoZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIpVG9IYW5kbGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2U+KWFjdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRIYW5kbGVyKHN0cmluZyBwYXRoLCBBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4gYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDYWxsKF9hcHAuQXBwLCBfY29uZmlnLCBwYXRoLCAoZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIpVG9IYW5kbGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgZ2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVzcG9uc2UsIGdsb2JhbDo6UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4pYWN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIHRvIHBhc3MgXCJFeHByZXNzIGFwcFwiIGFzIGEgY29udGV4dCBmb3IgXCJjb25maWcocGF0aCwgaGFuZGxlcilcIiBmdW5jdGlvbiBjYWxsLlxyXG4gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICBbVGVtcGxhdGUoXCJ7MX0uY2FsbCh7MH0sIHsyfSwgezN9KVwiKV1cclxuICAgICAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIHZvaWQgQ2FsbChSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuRXhwcmVzcyBhcHAsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5JUm91dGVyTWF0Y2hlciA8Z2xvYmFsOjpSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuSVJvdXRlcj5jb25maWcsIHN0cmluZyBwYXRoLCBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIgaGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyBDb252ZXJ0cyAuTkVUIGRlbGVnYXRlIHRvIGEgPHNlZSBjcmVmPVwiUmVxdWVzdEhhbmRsZXJcIi8+IGNsYXNzIGluc3RhbmNlLlxyXG4gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICBbVGVtcGxhdGUoXCJ7MH1cIildXHJcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGljIGV4dGVybiBSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdEhhbmRsZXIgVG9IYW5kbGVyKEFjdGlvbjxSZXR5cGVkLmV4cHJlc3Nfc2VydmVfc3RhdGljX2NvcmUuUmVxdWVzdCwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlc3BvbnNlPiBhY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gQ29udmVydHMgLk5FVCBkZWxlZ2F0ZSB0byBhIDxzZWUgY3JlZj1cIlJlcXVlc3RIYW5kbGVyXCIvPiBjbGFzcyBpbnN0YW5jZS5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgW1RlbXBsYXRlKFwiezB9XCIpXVxyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3RIYW5kbGVyIFRvSGFuZGxlcihBY3Rpb248UmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLlJlcXVlc3QsIFJldHlwZWQuZXhwcmVzc19zZXJ2ZV9zdGF0aWNfY29yZS5SZXNwb25zZSwgUmV0eXBlZC5leHByZXNzX3NlcnZlX3N0YXRpY19jb3JlLk5leHRGdW5jdGlvbj4gYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFJlcHJlc2VudHMgYXJndW1lbnRzIHBhc3NlZCB0byByZXF1ZXN0IGhhbmRsZXJzLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIFtPYmplY3RMaXRlcmFsXVxyXG4gICAgcHVibGljIGNsYXNzIFJlcXVlc3RBcmdzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
