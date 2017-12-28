/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.6.0
 */
Bridge.assembly("ChartJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("ChartJsDemo.App", {
        main: function Main () {
            // Chart.JS is accessed via Global variables,
            // see "loader" setting in bridge.json file.

            var random = new System.Random.ctor();

            ChartJsDemo.App._chart1 = ChartJsDemo.App.CreateBarChart("myChart1", random.next());
            ChartJsDemo.App._chart2 = ChartJsDemo.App.CreatePieChart("myChart2", random.next());
            ChartJsDemo.App._chart3 = ChartJsDemo.App.CreatePolarChart("myChart3", random.next());
            ChartJsDemo.App._chart4 = ChartJsDemo.App.CreateLineChart("myChart4", random.next());

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

                    var rootElD = Bridge.cast(document.getElementById(rootEl), HTMLCanvasElement);
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
                        var randomizeBtn = Bridge.cast(document.getElementById("randomizeData" + suffix), HTMLButtonElement);
                        var addDataSet = Bridge.cast(document.getElementById("addDataset" + suffix), HTMLButtonElement);
                        var removeDataset = Bridge.cast(document.getElementById("removeDataset" + suffix), HTMLButtonElement);

                        var random = { v : new System.Random.ctor() };

                        randomizeBtn.addEventListener("click", (function ($me, chartData, random, chart) {
                            return function () {
                                var $t;
                                $t = Bridge.getEnumerator(chartData.v.datasets);
                                try {
                                    while ($t.moveNext()) {
                                        var dataset = $t.Current;
                                        dataset.data = ChartJsDemo.App.GetRandomData(100, random.v.next());
                                    }
                                } finally {
                                    if (Bridge.is($t, System.IDisposable)) {
                                        $t.System$IDisposable$dispose();
                                    }
                                }
                                chart.v.update(null, null);
                            };
                        })(this, chartData, random, chart));

                        addDataSet.addEventListener("click", (function ($me, chartData, random, chart) {
                            return function () {
                                var newDataset = { label: "Dataset " + (((chartData.v.datasets.length + 1) | 0)), data: ChartJsDemo.App.GetRandomData(100, random.v.next()), borderWidth: 1, backgroundColor: ChartJsDemo.App.GetBackgroundColor(), borderColor: ChartJsDemo.App.GetBorderColor() };
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
                    return System.Array.init(["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], System.String);
                },
                GetRandomData: function (max, seed) {
                    if (seed === void 0) { seed = 0; }
                    var rnd = new System.Random.$ctor1(seed);
                    return System.Array.init([rnd.next$1(max), rnd.next$1(max), rnd.next$1(max), rnd.next$1(max), rnd.next$1(max), rnd.next$1(max)], System.Double);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaGFydEpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O1lBaUJZQSxhQUFhQSxJQUFJQTs7WUFFakJBLDBCQUFVQSwyQ0FBMkJBO1lBQ3JDQSwwQkFBVUEsMkNBQTJCQTtZQUNyQ0EsMEJBQVVBLDZDQUE2QkE7WUFDdkNBLDBCQUFVQSw0Q0FBNEJBOztZQUV0Q0E7Ozs7Ozs7Ozs7MENBR2lEQSxRQUFlQTs7b0JBRWhFQSxrQkFBa0JBLHFCQUdQQSxVQUVNQSx1Q0FDRUEsbUJBRVBBLDRCQUdXQSxtQ0FBbUJBLHdDQUVSQSxtREFDSkEsZ0VBSWhCQTs7b0JBTWRBLGNBQWNBLFlBQWdDQSx3QkFBb0NBOzs7b0JBR2xGQSxZQUFZQSxJQUFJQSxNQUF1QkEsU0FBU0E7O29CQUVoREEsT0FBT0E7OzBDQUcwQ0EsUUFBZUE7O29CQUVoRUEsa0JBQWtCQSxxQkFHUEEsVUFFTUEsdUNBQ0VBLG1CQUVQQSw0QkFHV0EsbUNBQW1CQSx3Q0FFUkEsbURBQ0pBLGdFQUloQkE7O29CQU9kQSxZQUFZQSxJQUFJQSxNQUF1QkEsUUFBUUE7O29CQUUvQ0EsT0FBT0E7OzRDQUc0Q0EsUUFBZUE7O29CQUVsRUEsa0JBQWtCQSwyQkFHUEEsVUFFTUEsdUNBQ0VBLG1CQUVQQSw0QkFHV0EsbUNBQW1CQSx3Q0FFUkEsbURBQ0pBLGdFQUloQkE7O29CQU9kQSxZQUFZQSxJQUFJQSxNQUF1QkEsUUFBUUE7O29CQUUvQ0EsT0FBT0E7OzJDQUcyQ0EsUUFBZUE7O29CQUVqRUEsa0JBQWtCQSxzQkFHUEEsVUFFTUEsdUNBQ0VBLG1CQUVQQSw0QkFHV0EsbUNBQW1CQSx3Q0FFUkEsbURBQ0pBLGdFQUloQkE7O29CQU1kQSxZQUFZQSxJQUFJQSxNQUF1QkEsUUFBUUE7O29CQUUvQ0EsT0FBT0E7OztvQkFLUEEsYUFBYUEsbUJBQVFBLHlCQUFTQSx5QkFBU0EseUJBQVNBOztvQkFFaERBLEtBQUtBLFdBQVdBLElBQUlBLGVBQWVBO3dCQUUvQkEsa0JBQVlBLDBCQUFPQSxHQUFQQTt3QkFDWkEsc0JBQWdCQSxBQUF3Q0E7O3dCQUV4REEsYUFBYUE7d0JBQ2JBLG1CQUFtQkEsWUFBK0JBLHdCQUFvQ0Esa0JBQWtCQTt3QkFDeEdBLGlCQUFpQkEsWUFBK0JBLHdCQUFvQ0EsZUFBZUE7d0JBQ25HQSxvQkFBb0JBLFlBQStCQSx3QkFBb0NBLGtCQUFrQkE7O3dCQUV6R0EsbUJBQWFBLElBQUlBOzt3QkFFakJBLHVDQUF1Q0EsQUFBd0JBOzs7Z0NBRTNEQSwwQkFBd0JBOzs7O3dDQUVwQkEsZUFBZUEsbUNBQW1CQTs7Ozs7OztnQ0FHdENBLGVBQWFBLE1BQU1BOzs7O3dCQUd2QkEscUNBQXFDQSxBQUF3QkE7O2dDQUV6REEsaUJBQWlCQSxTQUVMQSxhQUFhQSxDQUFDQSxnREFDZkEsbUNBQW1CQSxtREFFUkEsbURBQ0pBO2dDQUV0Q0EsQUFDb0JBLDBCQUFtQkE7Z0NBQ25CQSxlQUFhQSxNQUFNQTs7Ozt3QkFHdkJBLHdDQUF3Q0EsQUFBd0JBOztnQ0FFNURBO2dDQUNBQSxlQUFhQSxNQUFNQTs7Ozs7O29CQU8zQkEsT0FBT0E7O3lDQUcyQkEsS0FBU0E7O29CQUUzQ0EsVUFBVUEsSUFBSUEscUJBQU9BO29CQUNyQkEsT0FBT0EsbUJBRUhBLFdBQVNBLE1BQ1RBLFdBQVNBLE1BQ1RBLFdBQVNBLE1BQ1RBLFdBQVNBLE1BQ1RBLFdBQVNBLE1BQ1RBLFdBQVNBOzs7b0JBTWJBLE9BQU9BLG1CQUVIQSwyQkFDQUEsMkJBQ0FBLDJCQUNBQSwyQkFDQUEsNEJBQ0FBOzs7b0JBTUpBLE9BQU9BLG1CQUVIQSx5QkFDQUEseUJBQ0FBLHlCQUNBQSx5QkFDQUEsMEJBQ0FBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIENoYXJ0SnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IF9jaGFydDE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBfY2hhcnQyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgX2NoYXJ0MztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IF9jaGFydDQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENoYXJ0LkpTIGlzIGFjY2Vzc2VkIHZpYSBHbG9iYWwgdmFyaWFibGVzLFxyXG4gICAgICAgICAgICAvLyBzZWUgXCJsb2FkZXJcIiBzZXR0aW5nIGluIGJyaWRnZS5qc29uIGZpbGUuXHJcblxyXG4gICAgICAgICAgICB2YXIgcmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgX2NoYXJ0MSA9IENyZWF0ZUJhckNoYXJ0KFwibXlDaGFydDFcIiwgcmFuZG9tLk5leHQoKSk7XHJcbiAgICAgICAgICAgIF9jaGFydDIgPSBDcmVhdGVQaWVDaGFydChcIm15Q2hhcnQyXCIsIHJhbmRvbS5OZXh0KCkpO1xyXG4gICAgICAgICAgICBfY2hhcnQzID0gQ3JlYXRlUG9sYXJDaGFydChcIm15Q2hhcnQzXCIsIHJhbmRvbS5OZXh0KCkpO1xyXG4gICAgICAgICAgICBfY2hhcnQ0ID0gQ3JlYXRlTGluZUNoYXJ0KFwibXlDaGFydDRcIiwgcmFuZG9tLk5leHQoKSk7XHJcblxyXG4gICAgICAgICAgICBJbml0RXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBDcmVhdGVCYXJDaGFydChzdHJpbmcgcm9vdEVsLCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRDb25maWcgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiYmFyXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuTGluZWFyQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciByb290RWxEID0gKFJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50KSBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb290RWwpO1xyXG4gICAgICAgICAgICAvL0Agcm9vdEVsRCA9IHJvb3RFbEQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNoYXJ0ID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQocm9vdEVsRCwgY2hhcnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBDcmVhdGVQaWVDaGFydChzdHJpbmcgcm9vdEVsLCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRDb25maWcgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwicGllXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuTGluZWFyQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhcnQgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydChyb290RWwsIGNoYXJ0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgQ3JlYXRlUG9sYXJDaGFydChzdHJpbmcgcm9vdEVsLCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRDb25maWcgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwicG9sYXJBcmVhXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuTGluZWFyQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhcnQgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydChyb290RWwsIGNoYXJ0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgQ3JlYXRlTGluZUNoYXJ0KHN0cmluZyByb290RWwsIGludCBzZWVkID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGFydENvbmZpZyA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuTGluZWFyQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGFydCA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0KHJvb3RFbCwgY2hhcnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0RXZlbnRIYW5kbGVycygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRzID0gbmV3W10geyBfY2hhcnQxLCBfY2hhcnQyLCBfY2hhcnQzLCBfY2hhcnQ0IH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0ID0gY2hhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0RGF0YSA9IChSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkxpbmVhckNoYXJ0RGF0YSljaGFydC5jb25maWcuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3VmZml4ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9taXplQnRuID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9taXplRGF0YVwiICsgc3VmZml4KTtcclxuICAgICAgICAgICAgICAgIHZhciBhZGREYXRhU2V0ID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkRGF0YXNldFwiICsgc3VmZml4KTtcclxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVEYXRhc2V0ID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVtb3ZlRGF0YXNldFwiICsgc3VmZml4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJhbmRvbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgZGF0YXNldCBpbiBjaGFydERhdGEuZGF0YXNldHMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmRhdGEgPSBHZXRSYW5kb21EYXRhKDEwMCwgcmFuZG9tLk5leHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGFydC51cGRhdGUobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkRGF0YVNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YXNldCA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0RGF0YVNldHNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gXCJEYXRhc2V0IFwiICsgKGNoYXJ0RGF0YS5kYXRhc2V0cy5MZW5ndGggKyAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEdldFJhbmRvbURhdGEoMTAwLCByYW5kb20uTmV4dCgpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBHZXRCYWNrZ3JvdW5kQ29sb3IoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3IgPSBHZXRCb3JkZXJDb2xvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuU3lzdGVtLkFycmF5RXh0ZW5zaW9ucy5QdXNoPGdsb2JhbDo6UmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydERhdGFTZXRzPihcclxuICAgICAgICAgICAgICAgICAgICBjaGFydERhdGEuZGF0YXNldHMsbmV3RGF0YXNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnQudXBkYXRlKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbW92ZURhdGFzZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnREYXRhLmRhdGFzZXRzLlNwbGljZSgwLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC51cGRhdGUobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0cmluZ1tdIEdldExhYmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3W10ge1wiUmVkXCIsIFwiQmx1ZVwiLCBcIlllbGxvd1wiLCBcIkdyZWVuXCIsIFwiUHVycGxlXCIsIFwiT3JhbmdlXCJ9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlW10gR2V0UmFuZG9tRGF0YShpbnQgbWF4LCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcm5kID0gbmV3IFJhbmRvbShzZWVkKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBkb3VibGVbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBybmQuTmV4dChtYXgpLFxyXG4gICAgICAgICAgICAgICAgcm5kLk5leHQobWF4KSxcclxuICAgICAgICAgICAgICAgIHJuZC5OZXh0KG1heCksXHJcbiAgICAgICAgICAgICAgICBybmQuTmV4dChtYXgpLFxyXG4gICAgICAgICAgICAgICAgcm5kLk5leHQobWF4KSxcclxuICAgICAgICAgICAgICAgIHJuZC5OZXh0KG1heCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29sb3IgR2V0QmFja2dyb3VuZENvbG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDb2xvcigyNTUsIDk5LCAxMzIsIDAuMiksXHJcbiAgICAgICAgICAgICAgICBDb2xvcig1NCwgMTYyLCAyMzUsIDAuMiksXHJcbiAgICAgICAgICAgICAgICBDb2xvcigyNTUsIDIwNiwgODYsIDAuMiksXHJcbiAgICAgICAgICAgICAgICBDb2xvcig3NSwgMTkyLCAxOTIsIDAuMiksXHJcbiAgICAgICAgICAgICAgICBDb2xvcigxNTMsIDEwMiwgMjU1LCAwLjIpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoMjU1LCAxNTksIDY0LCAwLjIpXHJcbiAgICAgICAgICAgIH0uQXM8UmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbG9yPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbG9yIEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDb2xvcigyNTUsIDk5LCAxMzIsIDEpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoNTQsIDE2MiwgMjM1LCAxKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDI1NSwgMjA2LCA4NiwgMSksXHJcbiAgICAgICAgICAgICAgICBDb2xvcig3NSwgMTkyLCAxOTIsIDEpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoMTUzLCAxMDIsIDI1NSwgMSksXHJcbiAgICAgICAgICAgICAgICBDb2xvcigyNTUsIDE1OSwgNjQsIDEpXHJcbiAgICAgICAgICAgIH0uQXM8UmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbG9yPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiXFxcInJnYmEoezB9LCB7MX0sIHsyfSwgezN9KVxcXCJcIildXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRDb2xvciBDb2xvcihieXRlIHIsIGJ5dGUgZywgYnl0ZSBiLCBkb3VibGUgYSk7XHJcbiAgICB9XHJcbn0iXQp9Cg==
