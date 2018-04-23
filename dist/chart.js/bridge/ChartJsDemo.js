/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
 */
Bridge.assembly("ChartJsDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("ChartJsDemo.App", {
        main: function Main () {
            // Chart.JS is accessed via Global variables,
            // see "loader" setting in bridge.json file.

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
