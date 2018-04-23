using System;
using System.Linq;
using Bridge;
using static Retyped.dom;
using static Retyped.chart_js;

namespace ChartJsDemo
{
    public class App
    {
        private static Chart _chart1;
        private static Chart _chart2;
        private static Chart _chart3;
        private static Chart _chart4;

        public static void Main()
        {
            // Chart.JS is accessed via Global variables,
            // see "loader" setting in bridge.json file.

            var random = new Random();

            _chart1 = CreateBarChart("myChart1", random.Next());
            _chart2 = CreatePieChart("myChart2", random.Next());
            _chart3 = CreatePolarChart("myChart3", random.Next());
            _chart4 = CreateLineChart("myChart4", random.Next());

            InitEventHandlers();
        }

        private static Chart CreateBarChart(string rootEl, int seed = 0)
        {
            var chartConfig = new Chart.ChartConfiguration
            {
                type = "bar",
                data = new Chart.ChartData
                {
                    labels = GetLabels(),
                    datasets = new[]
                    {
                        new Chart.ChartDataSets
                        {
                            label = "Dataset 1",
                            data = GetRandomData(100, seed),
                            borderWidth = 1,
                            backgroundColor = GetBackgroundColor(),
                            borderColor = GetBorderColor()
                        }
                    }
                },
                options = new Chart.ChartOptions
                {
                    responsive = true
                }
            };

            var rootElD = (HTMLCanvasElement) document.getElementById(rootEl);
            //@ rootElD = rootElD.getContext("2d");

            var chart = new Chart(rootElD, chartConfig);

            return chart;
        }

        private static Chart CreatePieChart(string rootEl, int seed = 0)
        {
            var chartConfig = new Chart.ChartConfiguration
            {
                type = "pie",
                data = new Chart.ChartData
                {
                    labels = GetLabels(),
                    datasets = new[]
                    {
                        new Chart.ChartDataSets
                        {
                            label = "Dataset 1",
                            data = GetRandomData(100, seed),
                            borderWidth = 1,
                            backgroundColor = GetBackgroundColor(),
                            borderColor = GetBorderColor()
                        }
                    }
                },
                options = new Chart.ChartOptions
                {
                    responsive = true,
                    maintainAspectRatio = false
                }
            };

            var chart = new Chart(rootEl, chartConfig);

            return chart;
        }

        private static Chart CreatePolarChart(string rootEl, int seed = 0)
        {
            var chartConfig = new Chart.ChartConfiguration
            {
                type = "polarArea",
                data = new Chart.ChartData
                {
                    labels = GetLabels(),
                    datasets = new[]
                    {
                        new Chart.ChartDataSets
                        {
                            label = "Dataset 1",
                            data = GetRandomData(100, seed),
                            borderWidth = 1,
                            backgroundColor = GetBackgroundColor(),
                            borderColor = GetBorderColor()
                        }
                    }
                },
                options = new Chart.ChartOptions
                {
                    responsive = true,
                    maintainAspectRatio = false
                }
            };

            var chart = new Chart(rootEl, chartConfig);

            return chart;
        }

        private static Chart CreateLineChart(string rootEl, int seed = 0)
        {
            var chartConfig = new Chart.ChartConfiguration
            {
                type = "line",
                data = new Chart.ChartData
                {
                    labels = GetLabels(),
                    datasets = new[]
                    {
                        new Chart.ChartDataSets
                        {
                            label = "Dataset 1",
                            data = GetRandomData(100, seed),
                            borderWidth = 1,
                            backgroundColor = GetBackgroundColor(),
                            borderColor = GetBorderColor()
                        }
                    }
                },
                options = new Chart.ChartOptions
                {
                    responsive = true
                }
            };

            var chart = new Chart(rootEl, chartConfig);

            return chart;
        }

        private static void InitEventHandlers()
        {
            var charts = new[] { _chart1, _chart2, _chart3, _chart4 };

            for (var i = 0; i < charts.Length; i++)
            {
                var chart = charts[i];
                var chartData = chart.config.data;

                var suffix = i + 1;
                var randomizeBtn = (HTMLButtonElement)document.getElementById("randomizeData" + suffix);
                var addDataSet = (HTMLButtonElement)document.getElementById("addDataset" + suffix);
                var removeDataset = (HTMLButtonElement)document.getElementById("removeDataset" + suffix);

                var random = new Random();

                randomizeBtn.addEventListener("click", () =>
                {
                    foreach (var dataset in chartData.datasets)
                    {
                        dataset.data = GetRandomData(100, random.Next());
                    }

                    chart.update(null, null);
                });

                addDataSet.addEventListener("click", () =>
                {
                    var newDataset = new Chart.ChartDataSets
                    {
                        label = "Dataset " + (chartData.datasets.Length + 1),
                        data = GetRandomData(100, random.Next()),
                        borderWidth = 1,
                        backgroundColor = GetBackgroundColor(),
                        borderColor = GetBorderColor()
                    };

                    chartData.datasets.Push(newDataset);
                    chart.update(null, null);
                });

                removeDataset.addEventListener("click", () =>
                {
                    chartData.datasets.Splice(0, 1);
                    chart.update(null, null);
                });
            }
        }

        private static Retyped.es5.Array<Union<string, string[]>> GetLabels()
        {
            return new Retyped.es5.Array<Union<string, string[]>>(
                new[] {"Red"},
                new[] {"Blue"},
                new[] {"Yellow"},
                new[] {"Green"},
                new[] {"Purple"},
                new[] {"Orange"});
        }

        private static double[] GetRandomData(int max, int seed = 0)
        {
            var rnd = new Random(seed);
            return new double[]
            {
                rnd.Next(max),
                rnd.Next(max),
                rnd.Next(max),
                rnd.Next(max),
                rnd.Next(max),
                rnd.Next(max),
            };
        }

        private static Chart.ChartColor GetBackgroundColor()
        {
            return new[]
            {
                Color(255, 99, 132, 0.2),
                Color(54, 162, 235, 0.2),
                Color(255, 206, 86, 0.2),
                Color(75, 192, 192, 0.2),
                Color(153, 102, 255, 0.2),
                Color(255, 159, 64, 0.2)
            }.As<Chart.ChartColor>();
        }

        private static Chart.ChartColor GetBorderColor()
        {
            return new[]
            {
                Color(255, 99, 132, 1),
                Color(54, 162, 235, 1),
                Color(255, 206, 86, 1),
                Color(75, 192, 192, 1),
                Color(153, 102, 255, 1),
                Color(255, 159, 64, 1)
            }.As<Chart.ChartColor>();
        }

        [Template("\"rgba({0}, {1}, {2}, {3})\"")]
        private static extern Chart.ChartColor Color(byte r, byte g, byte b, double a);
    }
}