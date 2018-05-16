/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
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
                    return new Array(System.Array.init(["Red"], System.String), System.Array.init(["Blue"], System.String), System.Array.init(["Yellow"], System.String), System.Array.init(["Green"], System.String), System.Array.init(["Purple"], System.String), System.Array.init(["Orange"], System.String));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDaGFydEpzRGVtby5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztZQWtCWUEsYUFBYUEsSUFBSUE7O1lBRWpCQSwwQkFBVUEsMkNBQTJCQTtZQUNyQ0EsMEJBQVVBLDJDQUEyQkE7WUFDckNBLDBCQUFVQSw2Q0FBNkJBO1lBQ3ZDQSwwQkFBVUEsNENBQTRCQTs7WUFFdENBOzs7Ozs7Ozs7OzBDQUdpREEsUUFBZUE7O29CQUVoRUEsa0JBQWtCQSxxQkFHUEEsVUFFTUEsdUNBQ0VBLG1CQUVQQSw0QkFHV0EsbUNBQW1CQSx3Q0FFUkEsbURBQ0pBLGdFQUloQkE7O29CQU1kQSxjQUFjQSxBQUFnQ0Esd0JBQW9DQTs7O29CQUdsRkEsWUFBWUEsSUFBSUEsTUFBdUJBLFNBQVNBOztvQkFFaERBLE9BQU9BOzswQ0FHMENBLFFBQWVBOztvQkFFaEVBLGtCQUFrQkEscUJBR1BBLFVBRU1BLHVDQUNFQSxtQkFFUEEsNEJBR1dBLG1DQUFtQkEsd0NBRVJBLG1EQUNKQSxnRUFJaEJBOztvQkFPZEEsWUFBWUEsSUFBSUEsTUFBdUJBLFFBQVFBOztvQkFFL0NBLE9BQU9BOzs0Q0FHNENBLFFBQWVBOztvQkFFbEVBLGtCQUFrQkEsMkJBR1BBLFVBRU1BLHVDQUNFQSxtQkFFUEEsNEJBR1dBLG1DQUFtQkEsd0NBRVJBLG1EQUNKQSxnRUFJaEJBOztvQkFPZEEsWUFBWUEsSUFBSUEsTUFBdUJBLFFBQVFBOztvQkFFL0NBLE9BQU9BOzsyQ0FHMkNBLFFBQWVBOztvQkFFakVBLGtCQUFrQkEsc0JBR1BBLFVBRU1BLHVDQUNFQSxtQkFFUEEsNEJBR1dBLG1DQUFtQkEsd0NBRVJBLG1EQUNKQSxnRUFJaEJBOztvQkFNZEEsWUFBWUEsSUFBSUEsTUFBdUJBLFFBQVFBOztvQkFFL0NBLE9BQU9BOzs7b0JBS1BBLGFBQWFBLG1CQUFRQSx5QkFBU0EseUJBQVNBLHlCQUFTQTs7b0JBRWhEQSxLQUFLQSxXQUFXQSxJQUFJQSxlQUFlQTt3QkFFL0JBLGtCQUFZQSwwQkFBT0EsR0FBUEE7d0JBQ1pBLHNCQUFnQkE7O3dCQUVoQkEsYUFBYUE7d0JBQ2JBLG1CQUFtQkEsQUFBK0JBLHdCQUFvQ0Esa0JBQWtCQTt3QkFDeEdBLGlCQUFpQkEsQUFBK0JBLHdCQUFvQ0EsZUFBZUE7d0JBQ25HQSxvQkFBb0JBLEFBQStCQSx3QkFBb0NBLGtCQUFrQkE7O3dCQUV6R0EsbUJBQWFBLElBQUlBOzt3QkFFakJBLHVDQUF1Q0EsQUFBd0JBOzs7Z0NBRTNEQSwwQkFBd0JBOzs7O3dDQUVwQkEsZUFBZUEsbUNBQW1CQTs7Ozs7OztnQ0FHdENBLGVBQWFBLE1BQU1BOzs7O3dCQUd2QkEscUNBQXFDQSxBQUF3QkE7O2dDQUV6REEsaUJBQWlCQSxTQUVMQSxhQUFhQSxDQUFDQSxnREFDZkEsbUNBQW1CQSxtREFFUkEsbURBQ0pBO2dDQUV0Q0EsQUFDb0JBLDBCQUFtQkE7Z0NBQ25CQSxlQUFhQSxNQUFNQTs7Ozt3QkFHdkJBLHdDQUF3Q0EsQUFBd0JBOztnQ0FFNURBO2dDQUNBQSxlQUFhQSxNQUFNQTs7Ozs7O29CQU8zQkEsT0FBT0EsSUFBSUEsTUFDUEEsMkNBQ0FBLDRDQUNBQSw4Q0FDQUEsNkNBQ0FBLDhDQUNBQTs7eUNBRzhCQSxLQUFTQTs7b0JBRTNDQSxVQUFVQSxJQUFJQSxxQkFBT0E7b0JBQ3JCQSxPQUFPQSxtQkFFSEEsV0FBU0EsTUFDVEEsV0FBU0EsTUFDVEEsV0FBU0EsTUFDVEEsV0FBU0EsTUFDVEEsV0FBU0EsTUFDVEEsV0FBU0E7OztvQkFNYkEsT0FBT0EsbUJBRUhBLDJCQUNBQSwyQkFDQUEsMkJBQ0FBLDJCQUNBQSw0QkFDQUE7OztvQkFNSkEsT0FBT0EsbUJBRUhBLHlCQUNBQSx5QkFDQUEseUJBQ0FBLHlCQUNBQSwwQkFDQUEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIENoYXJ0SnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IF9jaGFydDE7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBfY2hhcnQyO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgX2NoYXJ0MztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0IF9jaGFydDQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENoYXJ0LkpTIGlzIGFjY2Vzc2VkIHZpYSBHbG9iYWwgdmFyaWFibGVzLFxyXG4gICAgICAgICAgICAvLyBzZWUgXCJsb2FkZXJcIiBzZXR0aW5nIGluIGJyaWRnZS5qc29uIGZpbGUuXHJcblxyXG4gICAgICAgICAgICB2YXIgcmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgX2NoYXJ0MSA9IENyZWF0ZUJhckNoYXJ0KFwibXlDaGFydDFcIiwgcmFuZG9tLk5leHQoKSk7XHJcbiAgICAgICAgICAgIF9jaGFydDIgPSBDcmVhdGVQaWVDaGFydChcIm15Q2hhcnQyXCIsIHJhbmRvbS5OZXh0KCkpO1xyXG4gICAgICAgICAgICBfY2hhcnQzID0gQ3JlYXRlUG9sYXJDaGFydChcIm15Q2hhcnQzXCIsIHJhbmRvbS5OZXh0KCkpO1xyXG4gICAgICAgICAgICBfY2hhcnQ0ID0gQ3JlYXRlTGluZUNoYXJ0KFwibXlDaGFydDRcIiwgcmFuZG9tLk5leHQoKSk7XHJcblxyXG4gICAgICAgICAgICBJbml0RXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBDcmVhdGVCYXJDaGFydChzdHJpbmcgcm9vdEVsLCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRDb25maWcgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiYmFyXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciByb290RWxEID0gKFJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50KSBSZXR5cGVkLmRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb290RWwpO1xyXG4gICAgICAgICAgICAvL0Agcm9vdEVsRCA9IHJvb3RFbEQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNoYXJ0ID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQocm9vdEVsRCwgY2hhcnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5jaGFydF9qcy5DaGFydCBDcmVhdGVQaWVDaGFydChzdHJpbmcgcm9vdEVsLCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRDb25maWcgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwicGllXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhcnQgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydChyb290RWwsIGNoYXJ0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgQ3JlYXRlUG9sYXJDaGFydChzdHJpbmcgcm9vdEVsLCBpbnQgc2VlZCA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRDb25maWcgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwicG9sYXJBcmVhXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhcnQgPSBuZXcgUmV0eXBlZC5jaGFydF9qcy5DaGFydChyb290RWwsIGNoYXJ0Q29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGFydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQgQ3JlYXRlTGluZUNoYXJ0KHN0cmluZyByb290RWwsIGludCBzZWVkID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGFydENvbmZpZyA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29uZmlndXJhdGlvblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzID0gR2V0TGFiZWxzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHMgPSBuZXdbXVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFwiRGF0YXNldCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHNlZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gR2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGFydCA9IG5ldyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0KHJvb3RFbCwgY2hhcnRDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0RXZlbnRIYW5kbGVycygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2hhcnRzID0gbmV3W10geyBfY2hhcnQxLCBfY2hhcnQyLCBfY2hhcnQzLCBfY2hhcnQ0IH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0cy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0ID0gY2hhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0RGF0YSA9IGNoYXJ0LmNvbmZpZy5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBpICsgMTtcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21pemVCdG4gPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb21pemVEYXRhXCIgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFkZERhdGFTZXQgPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGREYXRhc2V0XCIgKyBzdWZmaXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFzZXQgPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW1vdmVEYXRhc2V0XCIgKyBzdWZmaXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByYW5kb20gPSBuZXcgUmFuZG9tKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmFuZG9taXplQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBkYXRhc2V0IGluIGNoYXJ0RGF0YS5kYXRhc2V0cylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXQuZGF0YSA9IEdldFJhbmRvbURhdGEoMTAwLCByYW5kb20uTmV4dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGREYXRhU2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdEYXRhc2V0ID0gbmV3IFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnREYXRhU2V0c1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBcIkRhdGFzZXQgXCIgKyAoY2hhcnREYXRhLmRhdGFzZXRzLkxlbmd0aCArIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gR2V0UmFuZG9tRGF0YSgxMDAsIHJhbmRvbS5OZXh0KCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvciA9IEdldEJhY2tncm91bmRDb2xvcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IEdldEJvcmRlckNvbG9yKClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5TeXN0ZW0uQXJyYXlFeHRlbnNpb25zLlB1c2g8Z2xvYmFsOjpSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0RGF0YVNldHM+KFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0RGF0YS5kYXRhc2V0cyxuZXdEYXRhc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydC51cGRhdGUobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydERhdGEuZGF0YXNldHMuU3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0LnVwZGF0ZShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgUmV0eXBlZC5lczUuQXJyYXk8VW5pb248c3RyaW5nLCBzdHJpbmdbXT4+IEdldExhYmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJldHlwZWQuZXM1LkFycmF5PFVuaW9uPHN0cmluZywgc3RyaW5nW10+PihcclxuICAgICAgICAgICAgICAgIG5ld1tdIHtcIlJlZFwifSxcclxuICAgICAgICAgICAgICAgIG5ld1tdIHtcIkJsdWVcIn0sXHJcbiAgICAgICAgICAgICAgICBuZXdbXSB7XCJZZWxsb3dcIn0sXHJcbiAgICAgICAgICAgICAgICBuZXdbXSB7XCJHcmVlblwifSxcclxuICAgICAgICAgICAgICAgIG5ld1tdIHtcIlB1cnBsZVwifSxcclxuICAgICAgICAgICAgICAgIG5ld1tdIHtcIk9yYW5nZVwifSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGVbXSBHZXRSYW5kb21EYXRhKGludCBtYXgsIGludCBzZWVkID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBybmQgPSBuZXcgUmFuZG9tKHNlZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGRvdWJsZVtdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJuZC5OZXh0KG1heCksXHJcbiAgICAgICAgICAgICAgICBybmQuTmV4dChtYXgpLFxyXG4gICAgICAgICAgICAgICAgcm5kLk5leHQobWF4KSxcclxuICAgICAgICAgICAgICAgIHJuZC5OZXh0KG1heCksXHJcbiAgICAgICAgICAgICAgICBybmQuTmV4dChtYXgpLFxyXG4gICAgICAgICAgICAgICAgcm5kLk5leHQobWF4KSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFJldHlwZWQuY2hhcnRfanMuQ2hhcnQuQ2hhcnRDb2xvciBHZXRCYWNrZ3JvdW5kQ29sb3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbG9yKDI1NSwgOTksIDEzMiwgMC4yKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDU0LCAxNjIsIDIzNSwgMC4yKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDI1NSwgMjA2LCA4NiwgMC4yKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDc1LCAxOTIsIDE5MiwgMC4yKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDE1MywgMTAyLCAyNTUsIDAuMiksXHJcbiAgICAgICAgICAgICAgICBDb2xvcigyNTUsIDE1OSwgNjQsIDAuMilcclxuICAgICAgICAgICAgfS5BczxSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29sb3I+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29sb3IgR2V0Qm9yZGVyQ29sb3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1tdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbG9yKDI1NSwgOTksIDEzMiwgMSksXHJcbiAgICAgICAgICAgICAgICBDb2xvcig1NCwgMTYyLCAyMzUsIDEpLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IoMjU1LCAyMDYsIDg2LCAxKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDc1LCAxOTIsIDE5MiwgMSksXHJcbiAgICAgICAgICAgICAgICBDb2xvcigxNTMsIDEwMiwgMjU1LCAxKSxcclxuICAgICAgICAgICAgICAgIENvbG9yKDI1NSwgMTU5LCA2NCwgMSlcclxuICAgICAgICAgICAgfS5BczxSZXR5cGVkLmNoYXJ0X2pzLkNoYXJ0LkNoYXJ0Q29sb3I+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJcXFwicmdiYSh7MH0sIHsxfSwgezJ9LCB7M30pXFxcIlwiKV1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5jaGFydF9qcy5DaGFydC5DaGFydENvbG9yIENvbG9yKGJ5dGUgciwgYnl0ZSBnLCBieXRlIGIsIGRvdWJsZSBhKTtcclxuICAgIH1cclxufSJdCn0K
