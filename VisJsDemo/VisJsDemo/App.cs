using System;
using Retyped;
using static Retyped.dom;
using static Retyped.vis;

namespace VisJsDemo
{
    public class App
    {
        private static HTMLDivElement _rootDiv;
        private static Element _content;

        public static void Main()
        {
            _content = (Element)document.querySelector("#content");

            var btnNetwork = (HTMLButtonElement)document.querySelector("#btnNetwork");
            var btnTimeline = (HTMLButtonElement)document.querySelector("#btnTimeline");

            btnNetwork.onclick = ev =>
            {
                RenderNetwork();
                return true;
            };

            btnTimeline.onclick = ev =>
            {
                RenderTimeline();
                return true;
            };

            // Render Network sample by default
            RenderNetwork();
        }

        /// <summary>
        /// Original sources: http://visjs.org/examples/network/nodeStyles/groups.html
        /// </summary>
        private static void RenderNetwork()
        {
            if (_rootDiv != null)
            {
                _content.removeChild(_rootDiv);
            }

            // Add root Div to the Document
            _rootDiv = new HTMLDivElement();
            _content.appendChild(_rootDiv);

            _rootDiv.style.width = "800px";
            _rootDiv.style.height = "800px";
            _rootDiv.style.border = "1px solid #444444";
            _rootDiv.style.backgroundColor = "#222222";

            // create a network
            var data = new Data
            {
                nodes = new[]
                {
                    new vis.Node {id = 0, label = "0", group = "0"},
                    new vis.Node {id = 1, label = "1", group = "0"},
                    new vis.Node {id = 2, label = "2", group = "0"},
                    new vis.Node {id = 3, label = "3", group = "1"},
                    new vis.Node {id = 4, label = "4", group = "1"},
                    new vis.Node {id = 5, label = "5", group = "1"},
                    new vis.Node {id = 6, label = "6", group = "2"},
                    new vis.Node {id = 7, label = "7", group = "2"},
                    new vis.Node {id = 8, label = "8", group = "2"},
                    new vis.Node {id = 9, label = "9", group = "3"},
                    new vis.Node {id = 10, label = "10", group = "3"},
                    new vis.Node {id = 11, label = "11", group = "3"},
                    new vis.Node {id = 12, label = "12", group = "4"},
                    new vis.Node {id = 13, label = "13", group = "4"},
                    new vis.Node {id = 14, label = "14", group = "4"},
                    new vis.Node {id = 15, label = "15", group = "5"},
                    new vis.Node {id = 16, label = "16", group = "5"},
                    new vis.Node {id = 17, label = "17", group = "5"},
                    new vis.Node {id = 18, label = "18", group = "6"},
                    new vis.Node {id = 19, label = "19", group = "6"},
                    new vis.Node {id = 20, label = "20", group = "6"},
                    new vis.Node {id = 21, label = "21", group = "7"},
                    new vis.Node {id = 22, label = "22", group = "7"},
                    new vis.Node {id = 23, label = "23", group = "7"},
                    new vis.Node {id = 24, label = "24", group = "8"},
                    new vis.Node {id = 25, label = "25", group = "8"},
                    new vis.Node {id = 26, label = "26", group = "8"},
                    new vis.Node {id = 27, label = "27", group = "9"},
                    new vis.Node {id = 28, label = "28", group = "9"},
                    new vis.Node {id = 29, label = "29", group = "9"}
                },
                edges = new[]
                {
                    new Edge {from = 1, to = 0},
                    new Edge {from = 2, to = 0},
                    new Edge {from = 4, to = 3},
                    new Edge {from = 5, to = 4},
                    new Edge {from = 4, to = 0},
                    new Edge {from = 7, to = 6},
                    new Edge {from = 8, to = 7},
                    new Edge {from = 7, to = 0},
                    new Edge {from = 10, to = 9},
                    new Edge {from = 11, to = 10},
                    new Edge {from = 10, to = 4},
                    new Edge {from = 13, to = 12},
                    new Edge {from = 14, to = 13},
                    new Edge {from = 13, to = 0},
                    new Edge {from = 16, to = 15},
                    new Edge {from = 17, to = 15},
                    new Edge {from = 15, to = 10},
                    new Edge {from = 19, to = 18},
                    new Edge {from = 20, to = 19},
                    new Edge {from = 19, to = 4},
                    new Edge {from = 22, to = 21},
                    new Edge {from = 23, to = 22},
                    new Edge {from = 22, to = 13},
                    new Edge {from = 25, to = 24},
                    new Edge {from = 26, to = 25},
                    new Edge {from = 25, to = 7},
                    new Edge {from = 28, to = 27},
                    new Edge {from = 29, to = 28},
                    new Edge {from = 28, to = 0}
                }
            };

            var options = new Options
            {
                nodes = new NodeOptions
                {
                    shape = "dot",
                    size = 30,
                    font = new NodeOptions.fontConfig
                    {
                        size = 32,
                        color = "#ffffff"
                    },
                    borderWidth = 2,
                },
                edges = new EdgeOptions
                {
                    width = 2
                }
            };
           
            var network = new Network(_rootDiv, data, options);
        }

        /// <summary>
        /// Original sources: http://visjs.org/examples/timeline/editing/individualEditableItems.html
        /// </summary>
        private static void RenderTimeline()
        {
            if (_rootDiv != null)
            {
                _content.removeChild(_rootDiv);
            }

            // Add root Div to the Document
            _rootDiv = new HTMLDivElement();
            _content.appendChild(_rootDiv);

            // create groups to highlight groupUpdate
            var groups = new DataSet<DataGroup>(
                new[]
                {
                    new DataGroup {id = 1, content = "Group 1"},
                    new DataGroup {id = 2, content = "Group 2"},
                }
            );

            // create a DataSet with items
            var items = new DataSet<TimelineItem>(new[]
                {
                    new TimelineItem {id = 1, content = "Editable", editable = true, start= "2010-08-23", group = 1},
                    new TimelineItem {id = 2, content = "Editable", editable = true, start= "2010-08-23T23:00:00", group = 2},
                    new TimelineItem {id = 3, content = "Read-only", editable = false, start= "2010-08-24T16:00:00", group = 1},
                    new TimelineItem {id = 4, content = "Read-only", editable = false, start= "2010-08-26", end= "2010-09-02", group = 2},
                    new TimelineItem {id = 5, content = "Edit Time Only", editable = new TimelineItemEditableOption { updateTime = true, updateGroup = false, remove = false }, start = "2010-08-28", group = 1},
                    new TimelineItem {id = 6, content = "Edit Group Only", editable = new TimelineItemEditableOption { updateTime = false, updateGroup = true, remove = false }, start = "2010-08-29", group = 2},
                    new TimelineItem {id = 7, content = "Remove Only", editable = new TimelineItemEditableOption { updateTime = false, updateGroup = false, remove = true }, start = "2010-08-31", end = "2010-09-03", group = 1},
                    new TimelineItem {id = 8, content = "Default", start = "2010-09-04T12:00:00", group = 2}
                }
            );

            var options = new TimelineOptions
            {
                editable = true // default for all items
            };

            var timeline = new Timeline(
                _rootDiv,
                items.As<DataItemCollectionType>(),
                groups.As<DataGroupCollectionType>(),
                options);
        }
    }
}