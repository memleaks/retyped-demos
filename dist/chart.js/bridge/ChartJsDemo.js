/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("ChartJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("ChartJsDemo.App", {
        main: function Main () {

            var random = new System.Random.ctor();

            ChartJsDemo.App._chart1 = ChartJsDemo.App.CreateBarChart("myChart1", random.Next());
            ChartJsDemo.App._chart2 = ChartJsDemo.App.CreatePieChart("myChart2", random.Next());
            ChartJsDemo.App._chart3 = ChartJsDemo.App.CreatePolarChart("myChart3", random.Next());
            ChartJsDemo.App._chart4 = ChartJsDemo.App.CreateLineChart("myChart4", random.Next());

            ChartJsDemo.App.InitEventHandlers();
        },
        statics: {
            fields: {
                _chart1: null,
                _chart2: null,
                _chart3: null,
                _chart4: null
            },
            methods: {
                CreateBarChart: function (rootEl, seed) {
                    if (seed === void 0) { seed = 0; }
                    var chartConfig = { type: "bar", data: { labels: ChartJsDemo.App.GetLabels(), datasets: System.Array.init([{ label: "Dataset 1", data: ChartJsDemo.App.GetRandomData(100, seed), borderWidth: 1, backgroundColor: ChartJsDemo.App.GetBackgroundColor(), borderColor: ChartJsDemo.App.GetBorderColor() }], System.Object) }, options: { responsive: true } };

                    var rootElD = document.getElementById(rootEl);
                    rootElD = rootElD.getContext("2d");

                    var chart = new Chart(rootElD, chartConfig);

                    return chart;
                },
                CreatePieChart: function (rootEl, seed) {
                    if (seed === void 0) { seed = 0; }
                    var chartConfig = { type: "pie", data: { labels: ChartJsDemo.App.GetLabels(), datasets: System.Array.init([{ label: "Dataset 1", data: ChartJsDemo.App.GetRandomData(100, seed), borderWidth: 1, backgroundColor: ChartJsDemo.App.GetBackgroundColor(), borderColor: ChartJsDemo.App.GetBorderColor() }], System.Object) }, options: { responsive: true, maintainAspectRatio: false } };

                    var chart = new Chart(rootEl, chartConfig);

                    return chart;
                },
                CreatePolarChart: function (rootEl, seed) {
                    if (seed === void 0) { seed = 0; }
                    var chartConfig = { type: "polarArea", data: { labels: ChartJsDemo.App.GetLabels(), datasets: System.Array.init([{ label: "Dataset 1", data: ChartJsDemo.App.GetRandomData(100, seed), borderWidth: 1, backgroundColor: ChartJsDemo.App.GetBackgroundColor(), borderColor: ChartJsDemo.App.GetBorderColor() }], System.Object) }, options: { responsive: true, maintainAspectRatio: false } };

                    var chart = new Chart(rootEl, chartConfig);

                    return chart;
                },
                CreateLineChart: function (rootEl, seed) {
                    if (seed === void 0) { seed = 0; }
                    var chartConfig = { type: "line", data: { labels: ChartJsDemo.App.GetLabels(), datasets: System.Array.init([{ label: "Dataset 1", data: ChartJsDemo.App.GetRandomData(100, seed), borderWidth: 1, backgroundColor: ChartJsDemo.App.GetBackgroundColor(), borderColor: ChartJsDemo.App.GetBorderColor() }], System.Object) }, options: { responsive: true } };

                    var chart = new Chart(rootEl, chartConfig);

                    return chart;
                },
                InitEventHandlers: function () {
                    var charts = System.Array.init([ChartJsDemo.App._chart1, ChartJsDemo.App._chart2, ChartJsDemo.App._chart3, ChartJsDemo.App._chart4], Chart);

                    for (var i = 0; i < charts.length; i = (i + 1) | 0) {
                        var chart = { v : charts[System.Array.index(i, charts)] };
                        var chartData = { v : chart.v.config.data };

                        var suffix = (i + 1) | 0;
                        var randomizeBtn = document.getElementById("randomizeData" + suffix);
                        var addDataSet = document.getElementById("addDataset" + suffix);
                        var removeDataset = document.getElementById("removeDataset" + suffix);

                        var random = { v : new System.Random.ctor() };

                        randomizeBtn.addEventListener("click", (function ($me, chartData, random, chart) {
                            return function () {
                                var $t;
                                $t = Bridge.getEnumerator(chartData.v.datasets);
                                try {
                                    while ($t.moveNext()) {
                                        var dataset = $t.Current;
                                        dataset.data = ChartJsDemo.App.GetRandomData(100, random.v.Next());
                                    }
                                } finally {
                                    if (Bridge.is($t, System.IDisposable)) {
                                        $t.System$IDisposable$Dispose();
                                    }
                                }
                                chart.v.update(null, null);
                            };
                        })(this, chartData, random, chart));

                        addDataSet.addEventListener("click", (function ($me, chartData, random, chart) {
                            return function () {
                                var newDataset = { label: "Dataset " + (((chartData.v.datasets.length + 1) | 0)), data: ChartJsDemo.App.GetRandomData(100, random.v.Next()), borderWidth: 1, backgroundColor: ChartJsDemo.App.GetBackgroundColor(), borderColor: ChartJsDemo.App.GetBorderColor() };
                                chartData.v.datasets.push(newDataset);
                                chart.v.update(null, null);
                            };
                        })(this, chartData, random, chart));

                        removeDataset.addEventListener("click", (function ($me, chartData, chart) {
                            return function () {
                                chartData.v.datasets.splice(0, 1);
                                chart.v.update(null, null);
                            };
                        })(this, chartData, chart));
                    }
                },
                GetLabels: function () {
                    return new Array("Red", System.Array.init(["Blue"], System.String), System.Array.init(["Yellow"], System.String), System.Array.init(["Green"], System.String), System.Array.init(["Purple"], System.String), System.Array.init(["Orange"], System.String));
                },
                GetRandomData: function (max, seed) {
                    if (seed === void 0) { seed = 0; }
                    var rnd = new System.Random.$ctor1(seed);
                    return System.Array.init([rnd.Next$1(max), rnd.Next$1(max), rnd.Next$1(max), rnd.Next$1(max), rnd.Next$1(max), rnd.Next$1(max)], System.Double);
                },
                GetBackgroundColor: function () {
                    return System.Array.init(["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"], Bridge.virtualc("Chart.ChartColor"));
                },
                GetBorderColor: function () {
                    return System.Array.init(["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"], Bridge.virtualc("Chart.ChartColor"));
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaGFydEpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQWtCWUEsYUFBYUEsSUFBSUE7O1lBRWpCQSwwQkFBVUEsMkNBQTJCQTtZQUNyQ0EsMEJBQVVBLDJDQUEyQkE7WUFDckNBLDBCQUFVQSw2Q0FBNkJBO1lBQ3ZDQSwwQkFBVUEsNENBQTRCQTs7WUFFdENBOzs7Ozs7Ozs7OzBDQUdpREEsUUFBZUE7O29CQUVoRUEsa0JBQWtCQSxxQkFHUEEsVUFFTUEsdUNBQ0VBLG1CQUVQQSw0QkFHV0EsbUNBQW1CQSx3Q0FFUkEsbURBQ0pBLGdFQUloQkE7O29CQU1kQSxjQUFjQSxBQUFnQ0Esd0JBQW9DQTs7O29CQUdsRkEsWUFBWUEsSUFBSUEsTUFBdUJBLFNBQVNBOztvQkFFaERBLE9BQU9BOzswQ0FHMENBLFFBQWVBOztvQkFFaEVBLGtCQUFrQkEscUJBR1BBLFVBRU1BLHVDQUNFQSxtQkFFUEEsNEJBR1dBLG1DQUFtQkEsd0NBRVJBLG1EQUNKQSxnRUFJaEJBOztvQkFPZEEsWUFBWUEsSUFBSUEsTUFBdUJBLFFBQVFBOztvQkFFL0NBLE9BQU9BOzs0Q0FHNENBLFFBQWVBOztvQkFFbEVBLGtCQUFrQkEsMkJBR1BBLFVBRU1BLHVDQUNFQSxtQkFFUEEsNEJBR1dBLG1DQUFtQkEsd0NBRVJBLG1EQUNKQSxnRUFJaEJBOztvQkFPZEEsWUFBWUEsSUFBSUEsTUFBdUJBLFFBQVFBOztvQkFFL0NBLE9BQU9BOzsyQ0FHMkNBLFFBQWVBOztvQkFFakVBLGtCQUFrQkEsc0JBR1BBLFVBRU1BLHVDQUNFQSxtQkFFUEEsNEJBR1dBLG1DQUFtQkEsd0NBRVJBLG1EQUNKQSxnRUFJaEJBOztvQkFNZEEsWUFBWUEsSUFBSUEsTUFBdUJBLFFBQVFBOztvQkFFL0NBLE9BQU9BOzs7b0JBS1BBLGFBQWFBLG1CQUFRQSx5QkFBU0EseUJBQVNBLHlCQUFTQTs7b0JBRWhEQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFlQTt3QkFFL0JBLGtCQUFZQSwwQkFBT0EsR0FBUEE7d0JBQ1pBLHNCQUFnQkE7O3dCQUVoQkEsYUFBYUE7d0JBQ2JBLG1CQUFtQkEsQUFBK0JBLHdCQUFvQ0Esa0JBQWtCQTt3QkFDeEdBLGlCQUFpQkEsQUFBK0JBLHdCQUFvQ0EsZUFBZUE7d0JBQ25HQSxvQkFBb0JBLEFBQStCQSx3QkFBb0NBLGtCQUFrQkE7O3dCQUV6R0EsbUJBQWFBLElBQUlBOzt3QkFFakJBLHVDQUF1Q0EsQUFBd0JBOzs7Z0NBRTNEQSwwQkFBd0JBOzs7O3dDQUVwQkEsZUFBZUEsbUNBQW1CQTs7Ozs7OztnQ0FHdENBLGVBQWFBLE1BQU1BOzs7O3dCQUd2QkEscUNBQXFDQSxBQUF3QkE7O2dDQUV6REEsaUJBQWlCQSxTQUVMQSxhQUFhQSxDQUFDQSxnREFDZkEsbUNBQW1CQSxtREFFUkEsbURBQ0pBO2dDQUV0Q0EsQUFDb0JBLDBCQUFtQkE7Z0NBQ25CQSxlQUFhQSxNQUFNQTs7Ozt3QkFHdkJBLHdDQUF3Q0EsQUFBd0JBOztnQ0FFNURBO2dDQUNBQSxlQUFhQSxNQUFNQTs7Ozs7O29CQU8zQkEsT0FBT0EsSUFBSUEsYUFFUEEsNENBQ0FBLDhDQUNBQSw2Q0FDQUEsOENBQ0FBOzt5Q0FHOEJBLEtBQVNBOztvQkFFM0NBLFVBQVVBLElBQUlBLHFCQUFPQTtvQkFDckJBLE9BQU9BLG1CQUVIQSxXQUFTQSxNQUNUQSxXQUFTQSxNQUNUQSxXQUFTQSxNQUNUQSxXQUFTQSxNQUNUQSxXQUFTQSxNQUNUQSxXQUFTQTs7O29CQU1iQSxPQUFPQSxtQkFFSEEsMkJBQ0FBLDJCQUNBQSwyQkFDQUEsMkJBQ0FBLDRCQUNBQTs7O29CQU1KQSxPQUFPQSxtQkFFSEEseUJBQ0FBLHlCQUNBQSx5QkFDQUEseUJBQ0FBLDBCQUNBQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBCcmlkZ2U7XHJcblxyXG5uYW1lc3BhY2UgQ2hhcnRKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgX2NoYXJ0MTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IF9jaGFydDI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBfY2hhcnQzO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgX2NoYXJ0NDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ2hhcnQuSlMgaXMgYWNjZXNzZWQgdmlhIEdsb2JhbCB2YXJpYWJsZXMsXHJcbiAgICAgICAgICAgIC8vIHNlZSBcImxvYWRlclwiIHNldHRpbmcgaW4gYnJpZGdlLmpzb24gZmlsZS5cclxuXHJcbiAgICAgICAgICAgIHZhciByYW5kb20gPSBuZXcgUmFuZG9tKCk7XHJcblxyXG4gICAgICAgICAgICBfY2hhcnQxID0gQ3JlYXRlQmFyQ2hhcnQoXCJteUNoYXJ0MVwiLCByYW5kb20uTmV4dCgpKTtcclxuICAgICAgICAgICAgX2NoYXJ0MiA9IENyZWF0ZVBpZUNoYXJ0KFwibXlDaGFydDJcIiwgcmFuZG9tLk5leHQoKSk7XHJcbiAgICAgICAgICAgIF9jaGFydDMgPSBDcmVhdGVQb2xhckNoYXJ0KFwibXlDaGFydDNcIiwgcmFuZG9tLk5leHQoKSk7XHJcbiAgICAgICAgICAgIF9jaGFydDQgPSBDcmVhdGVMaW5lQ2hhcnQoXCJteUNoYXJ0NFwiLCByYW5kb20uTmV4dCgpKTtcclxuXHJcbiAgICAgICAgICAgIEluaXRFdmVudEhhbmRsZXJzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IENyZWF0ZUJhckNoYXJ0KHN0cmluZyByb290RWwsIGludCBzZWVkID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGFydENvbmZpZyA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJiYXJcIixcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHMgPSBHZXRMYWJlbHMoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFTZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gXCJEYXRhc2V0IDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBHZXRSYW5kb21EYXRhKDEwMCwgc2VlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBHZXRCYWNrZ3JvdW5kQ29sb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yID0gR2V0Qm9yZGVyQ29sb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydE9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvb3RFbEQgPSAoUmV0eXBlZC5kb20uSFRNTENhbnZhc0VsZW1lbnQpIFJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvb3RFbCk7XHJcbiAgICAgICAgICAgIC8vQCByb290RWxEID0gcm9vdEVsRC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhcnQgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydChyb290RWxELCBjaGFydENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IENyZWF0ZVBpZUNoYXJ0KHN0cmluZyByb290RWwsIGludCBzZWVkID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGFydENvbmZpZyA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJwaWVcIixcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHMgPSBHZXRMYWJlbHMoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFTZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gXCJEYXRhc2V0IDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBHZXRSYW5kb21EYXRhKDEwMCwgc2VlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBHZXRCYWNrZ3JvdW5kQ29sb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yID0gR2V0Qm9yZGVyQ29sb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydE9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGFydCA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0KHJvb3RFbCwgY2hhcnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBDcmVhdGVQb2xhckNoYXJ0KHN0cmluZyByb290RWwsIGludCBzZWVkID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGFydENvbmZpZyA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJwb2xhckFyZWFcIixcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHMgPSBHZXRMYWJlbHMoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFTZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gXCJEYXRhc2V0IDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBHZXRSYW5kb21EYXRhKDEwMCwgc2VlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBHZXRCYWNrZ3JvdW5kQ29sb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yID0gR2V0Qm9yZGVyQ29sb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydE9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGFydCA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0KHJvb3RFbCwgY2hhcnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBDcmVhdGVMaW5lQ2hhcnQoc3RyaW5nIHJvb3RFbCwgaW50IHNlZWQgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNoYXJ0Q29uZmlnID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRDb25maWd1cmF0aW9uXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImxpbmVcIixcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHMgPSBHZXRMYWJlbHMoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0cyA9IG5ld1tdXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFTZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gXCJEYXRhc2V0IDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBHZXRSYW5kb21EYXRhKDEwMCwgc2VlZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBHZXRCYWNrZ3JvdW5kQ29sb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yID0gR2V0Qm9yZGVyQ29sb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydE9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNoYXJ0ID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQocm9vdEVsLCBjaGFydENvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY2hhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIEluaXRFdmVudEhhbmRsZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGFydHMgPSBuZXdbXSB7IF9jaGFydDEsIF9jaGFydDIsIF9jaGFydDMsIF9jaGFydDQgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnRzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnQgPSBjaGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhcnREYXRhID0gY2hhcnQuY29uZmlnLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbWl6ZUJ0biA9IChSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbWl6ZURhdGFcIiArIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkRGF0YVNldCA9IChSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZERhdGFzZXRcIiArIHN1ZmZpeCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlRGF0YXNldCA9IChSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbW92ZURhdGFzZXRcIiArIHN1ZmZpeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbSA9IG5ldyBSYW5kb20oKTtcclxuXHJcbiAgICAgICAgICAgICAgICByYW5kb21pemVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAodmFyIGRhdGFzZXQgaW4gY2hhcnREYXRhLmRhdGFzZXRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5kYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHJhbmRvbS5OZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnQudXBkYXRlKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZERhdGFTZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RhdGFzZXQgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFTZXRzXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCBcIiArIChjaGFydERhdGEuZGF0YXNldHMuTGVuZ3RoICsgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBHZXRSYW5kb21EYXRhKDEwMCwgcmFuZG9tLk5leHQoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoID0gMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yID0gR2V0Qm9yZGVyQ29sb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblN5c3RlbS5BcnJheUV4dGVuc2lvbnMuUHVzaDxnbG9iYWw6OlJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0cz4oXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnREYXRhLmRhdGFzZXRzLG5ld0RhdGFzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhc2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0RGF0YS5kYXRhc2V0cy5TcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnQudXBkYXRlKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmVzNS5BcnJheTxVbmlvbjxzdHJpbmcsIHN0cmluZ1tdPj4gR2V0TGFiZWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmV0eXBlZC5lczUuQXJyYXk8VW5pb248c3RyaW5nLCBzdHJpbmdbXT4+KFxyXG4gICAgICAgICAgICAgICAgbmV3W10ge1wiUmVkXCJ9LFxyXG4gICAgICAgICAgICAgICAgbmV3W10ge1wiQmx1ZVwifSxcclxuICAgICAgICAgICAgICAgIG5ld1tdIHtcIlllbGxvd1wifSxcclxuICAgICAgICAgICAgICAgIG5ld1tdIHtcIkdyZWVuXCJ9LFxyXG4gICAgICAgICAgICAgICAgbmV3W10ge1wiUHVycGxlXCJ9LFxyXG4gICAgICAgICAgICAgICAgbmV3W10ge1wiT3JhbmdlXCJ9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZVtdIEdldFJhbmRvbURhdGEoaW50IG1heCwgaW50IHNlZWQgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJuZCA9IG5ldyBSYW5kb20oc2VlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgZG91YmxlW11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm5kLk5leHQobWF4KSxcclxuICAgICAgICAgICAgICAgIHJuZC5OZXh0KG1heCksXHJcbiAgICAgICAgICAgICAgICBybmQuTmV4dChtYXgpLFxyXG4gICAgICAgICAgICAgICAgcm5kLk5leHQobWF4KSxcclxuICAgICAgICAgICAgICAgIHJuZC5OZXh0KG1heCksXHJcbiAgICAgICAgICAgICAgICBybmQuTmV4dChtYXgpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbG9yIEdldEJhY2tncm91bmRDb2xvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29sb3IoMjU1LCA5OSwgMTMyLCAwLjIpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoNTQsIDE2MiwgMjM1LCAwLjIpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoMjU1LCAyMDYsIDg2LCAwLjIpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoNzUsIDE5MiwgMTkyLCAwLjIpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoMTUzLCAxMDIsIDI1NSwgMC4yKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDI1NSwgMTU5LCA2NCwgMC4yKVxyXG4gICAgICAgICAgICB9LkFzPFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRDb2xvcj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRDb2xvciBHZXRCb3JkZXJDb2xvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29sb3IoMjU1LCA5OSwgMTMyLCAxKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDU0LCAxNjIsIDIzNSwgMSksXHJcbiAgICAgICAgICAgICAgICBDb2xvcigyNTUsIDIwNiwgODYsIDEpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoNzUsIDE5MiwgMTkyLCAxKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDE1MywgMTAyLCAyNTUsIDEpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoMjU1LCAxNTksIDY0LCAxKVxyXG4gICAgICAgICAgICB9LkFzPFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRDb2xvcj4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcIlxcXCJyZ2JhKHswfSwgezF9LCB7Mn0sIHszfSlcXFwiXCIpXVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGV4dGVybiBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29sb3IgQ29sb3IoYnl0ZSByLCBieXRlIGcsIGJ5dGUgYiwgZG91YmxlIGEpO1xyXG4gICAgfVxyXG59Il0KfQo=
