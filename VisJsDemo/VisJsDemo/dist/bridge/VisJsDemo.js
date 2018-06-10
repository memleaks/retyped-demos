/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("VisJsDemo", function ($asm, globals) {
    "use strict";

    require(["vis"], function (vis) {
        Bridge.define("VisJsDemo.App", {
            main: function Main () {
                VisJsDemo.App._content = Bridge.cast(document.querySelector("#content"), Element);
    
                var btnNetwork = Bridge.cast(document.querySelector("#btnNetwork"), HTMLButtonElement);
                var btnTimeline = Bridge.cast(document.querySelector("#btnTimeline"), HTMLButtonElement);
    
                btnNetwork.onclick = function (ev) {
                    VisJsDemo.App.RenderNetwork();
                };
    
                btnTimeline.onclick = function (ev) {
                    VisJsDemo.App.RenderTimeline();
                };
    
                // Render Network sample by default
                VisJsDemo.App.RenderNetwork();
            },
            statics: {
                fields: {
                    _rootDiv: null,
                    _content: null
                },
                methods: {
                    /**
                     * Original sources: http://visjs.org/examples/network/nodeStyles/groups.html
                     *
                     * @static
                     * @private
                     * @this VisJsDemo.App
                     * @memberof VisJsDemo.App
                     * @return  {void}
                     */
                    RenderNetwork: function () {
                        if (VisJsDemo.App._rootDiv != null) {
                            VisJsDemo.App._content.removeChild(VisJsDemo.App._rootDiv);
                        }
    
                        // Add root Div to the Document
                        VisJsDemo.App._rootDiv = document.createElement("div");
                        VisJsDemo.App._content.appendChild(VisJsDemo.App._rootDiv);
    
                        VisJsDemo.App._rootDiv.style.width = "800px";
                        VisJsDemo.App._rootDiv.style.height = "800px";
                        VisJsDemo.App._rootDiv.style.border = "1px solid #444444";
                        VisJsDemo.App._rootDiv.style.backgroundColor = "#222222";
    
                        // create a network
                        var data = { nodes: System.Array.init([{ id: 0, label: "0", group: "0" }, { id: 1, label: "1", group: "0" }, { id: 2, label: "2", group: "0" }, { id: 3, label: "3", group: "1" }, { id: 4, label: "4", group: "1" }, { id: 5, label: "5", group: "1" }, { id: 6, label: "6", group: "2" }, { id: 7, label: "7", group: "2" }, { id: 8, label: "8", group: "2" }, { id: 9, label: "9", group: "3" }, { id: 10, label: "10", group: "3" }, { id: 11, label: "11", group: "3" }, { id: 12, label: "12", group: "4" }, { id: 13, label: "13", group: "4" }, { id: 14, label: "14", group: "4" }, { id: 15, label: "15", group: "5" }, { id: 16, label: "16", group: "5" }, { id: 17, label: "17", group: "5" }, { id: 18, label: "18", group: "6" }, { id: 19, label: "19", group: "6" }, { id: 20, label: "20", group: "6" }, { id: 21, label: "21", group: "7" }, { id: 22, label: "22", group: "7" }, { id: 23, label: "23", group: "7" }, { id: 24, label: "24", group: "8" }, { id: 25, label: "25", group: "8" }, { id: 26, label: "26", group: "8" }, { id: 27, label: "27", group: "9" }, { id: 28, label: "28", group: "9" }, { id: 29, label: "29", group: "9" }], System.Object), edges: System.Array.init([{ from: 1, to: 0 }, { from: 2, to: 0 }, { from: 4, to: 3 }, { from: 5, to: 4 }, { from: 4, to: 0 }, { from: 7, to: 6 }, { from: 8, to: 7 }, { from: 7, to: 0 }, { from: 10, to: 9 }, { from: 11, to: 10 }, { from: 10, to: 4 }, { from: 13, to: 12 }, { from: 14, to: 13 }, { from: 13, to: 0 }, { from: 16, to: 15 }, { from: 17, to: 15 }, { from: 15, to: 10 }, { from: 19, to: 18 }, { from: 20, to: 19 }, { from: 19, to: 4 }, { from: 22, to: 21 }, { from: 23, to: 22 }, { from: 22, to: 13 }, { from: 25, to: 24 }, { from: 26, to: 25 }, { from: 25, to: 7 }, { from: 28, to: 27 }, { from: 29, to: 28 }, { from: 28, to: 0 }], System.Object) };
    
                        var options = { nodes: { shape: "dot", size: 30, font: { size: 32, color: "#ffffff" }, borderWidth: 2 }, edges: { width: 2 } };
    
                        var network = new vis.Network(VisJsDemo.App._rootDiv, data, options);
                    },
                    /**
                     * Original sources: http://visjs.org/examples/timeline/editing/individualEditableItems.html
                     *
                     * @static
                     * @private
                     * @this VisJsDemo.App
                     * @memberof VisJsDemo.App
                     * @return  {void}
                     */
                    RenderTimeline: function () {
                        if (VisJsDemo.App._rootDiv != null) {
                            VisJsDemo.App._content.removeChild(VisJsDemo.App._rootDiv);
                        }
    
                        // Add root Div to the Document
                        VisJsDemo.App._rootDiv = document.createElement("div");
                        VisJsDemo.App._content.appendChild(VisJsDemo.App._rootDiv);
    
                        // create groups to highlight groupUpdate
                        var groups = new vis.DataSet(System.Array.init([{ id: 1, content: "Group 1" }, { id: 2, content: "Group 2" }], System.Object));
    
                        // create a DataSet with items
                        var items = new vis.DataSet(System.Array.init([{ id: 1, content: "Editable", editable: true, start: "2010-08-23", group: 1 }, { id: 2, content: "Editable", editable: true, start: "2010-08-23T23:00:00", group: 2 }, { id: 3, content: "Read-only", editable: false, start: "2010-08-24T16:00:00", group: 1 }, { id: 4, content: "Read-only", editable: false, start: "2010-08-26", end: "2010-09-02", group: 2 }, { id: 5, content: "Edit Time Only", editable: { updateTime: true, updateGroup: false, remove: false }, start: "2010-08-28", group: 1 }, { id: 6, content: "Edit Group Only", editable: { updateTime: false, updateGroup: true, remove: false }, start: "2010-08-29", group: 2 }, { id: 7, content: "Remove Only", editable: { updateTime: false, updateGroup: false, remove: true }, start: "2010-08-31", end: "2010-09-03", group: 1 }, { id: 8, content: "Default", start: "2010-09-04T12:00:00", group: 2 }], System.Object));
    
                        var options = { editable: true };
    
                        var timeline = new vis.Timeline(VisJsDemo.App._rootDiv, items, groups, options);
                    }
                }
            }
        });
        Bridge.init();
    });
});
